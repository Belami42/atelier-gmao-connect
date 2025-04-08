import React, { useState } from "react";
import { 
  Users as UsersIcon, 
  Search, 
  PlusCircle, 
  X, 
  Edit, 
  Trash2, 
  UserCircle,
  GraduationCap,
  BookOpen,
  Shield,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import NewUserForm from "@/components/users/NewUserForm";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { toast } from "sonner";
import { NiveauFormation, getDisplayFromNiveauFormation, NiveauFormationType } from "@/types/niveauFormation";

interface ClassInfo {
  id: string;
  name: string;
  level: string;
  studentCount: number;
  avatar?: string; // Added missing avatar property
}

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("admin"); // simulating logged-in user role
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Étienne Martin",
      email: "e.martin@mimard.fr",
      role: "admin",
      class: null,
      avatar: null,
      createdBy: "self"
    },
    {
      id: "2",
      name: "Sophie Dubois",
      email: "s.dubois@mimard.fr",
      role: "teacher",
      class: null,
      avatar: null,
      createdBy: "admin"
    },
    {
      id: "3",
      name: "Laurent Petit",
      email: "l.petit@mimard.fr",
      role: "teacher",
      class: null,
      avatar: null,
      createdBy: "admin"
    },
    {
      id: "4",
      name: "Marie Lambert",
      email: "m.lambert@etudiant.mimard.fr",
      role: "student",
      class: "2PMIA",
      avatar: null,
      createdBy: "teacher"
    },
    {
      id: "5",
      name: "Thomas Moreau",
      email: "t.moreau@etudiant.mimard.fr",
      role: "student",
      class: "1MSPC",
      avatar: null,
      createdBy: "teacher"
    },
    {
      id: "6",
      name: "Léa Bernard",
      email: "l.bernard@etudiant.mimard.fr",
      role: "student",
      class: "TMSPC",
      avatar: null,
      createdBy: "teacher"
    },
    {
      id: "7",
      name: "Lucas Girard",
      email: "l.girard@etudiant.mimard.fr",
      role: "student",
      class: "TMSPC",
      avatar: null,
      createdBy: "teacher"
    }
  ]);

  const [classes, setClasses] = useState([
    {
      id: "1",
      name: "2PMIA",
      level: "2PMIA",
      studentCount: 14,
      avatar: null
    },
    {
      id: "2",
      name: "1MSPC",
      level: "1MSPC",
      studentCount: 12,
      avatar: null
    },
    {
      id: "3",
      name: "TMSPC",
      level: "TMSPC",
      studentCount: 18,
      avatar: null
    }
  ]);

  const existingGroups = classes.map(cls => cls.name);

  const handleAddUser = (newUser: any) => {
    newUser.createdBy = currentUserRole === "admin" ? 
      (newUser.role === "admin" ? "self" : "admin") : 
      "teacher";

    setUsers(prevUsers => [...prevUsers, newUser]);
    
    if (newUser.role === "student" && newUser.class) {
      setClasses(prevClasses => prevClasses.map(cls => 
        cls.name === newUser.class 
          ? { ...cls, studentCount: cls.studentCount + 1 } 
          : cls
      ));
    }
  };

  const handleAddClass = (newClass: any) => {
    setClasses(prevClasses => [
      ...prevClasses, 
      { ...newClass, id: Date.now().toString(), studentCount: 0 }
    ]);
    toast.success("Classe ajoutée avec succès");
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    if (userToDelete && userToDelete.role === "student" && userToDelete.class) {
      setClasses(prevClasses => prevClasses.map(cls => 
        cls.name === userToDelete.class
          ? { ...cls, studentCount: Math.max(0, cls.studentCount - 1) }
          : cls
      ));
    }
    
    toast.success("Utilisateur supprimé avec succès");
  };

  const handleDeleteClass = (classId: string) => {
    const classToDelete = classes.find(cls => cls.id === classId);
    
    if (!classToDelete) return;
    
    const studentsInClass = users.filter(user => 
      user.role === "student" && user.class === classToDelete.name
    );
    
    if (studentsInClass.length > 0) {
      toast.error(`Impossible de supprimer la classe ${classToDelete.name} car elle contient des élèves`);
      return;
    }
    
    setClasses(prevClasses => prevClasses.filter(cls => cls.id !== classId));
    toast.success("Classe supprimée avec succès");
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === "all" || user.role === activeRole;
    
    return matchesSearch && matchesRole;
  });

  const studentsByClass = classes.map(cls => {
    const students = users.filter(user => 
      user.role === "student" && user.class === cls.name
    );
    
    return {
      ...cls,
      students
    };
  });

  const canManageUser = (userRole: string) => {
    if (currentUserRole === "admin") return true;
    if (currentUserRole === "teacher" && userRole === "student") return true;
    return false;
  };

  const canCreateUserType = (role: string) => {
    if (currentUserRole === "admin") return true;
    if (currentUserRole === "teacher" && role === "student") return true;
    return false;
  };

  const roleIcons = {
    "admin": <Shield className="h-5 w-5 text-red-500" />,
    "teacher": <BookOpen className="h-5 w-5 text-blue-500" />,
    "student": <GraduationCap className="h-5 w-5 text-green-500" />
  };

  const roleLabels = {
    "admin": "Administrateur",
    "teacher": "Enseignant",
    "student": "Élève"
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case "admin": return "bg-red-500 text-white";
      case "teacher": return "bg-blue-500 text-white";
      case "student": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassLevel, setNewClassLevel] = useState<NiveauFormationType>("2PMIA");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Utilisateurs
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestion des élèves, enseignants et administrateurs
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SchoolLogo className="hidden md:block" />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <PlusCircle size={16} />
                <span>Nouvel utilisateur</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <NewUserForm 
                onClose={() => setIsDialogOpen(false)}
                onUserCreated={handleAddUser}
                existingGroups={existingGroups}
                currentUserRole={currentUserRole}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 vibrant-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4 px-4">
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/89799078-f0a6-43dc-a2f0-bcd0e8907332.png" 
                alt="Maintenance 1"
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/552dcec9-49b8-4640-99f8-c6989b60b59a.png" 
                alt="Maintenance 2"
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img 
                src="/lovable-uploads/61cdf18f-b447-4984-b172-082bc046ad1f.png" 
                alt="Maintenance 3"
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white font-bold text-2xl shadow-text">Communauté Éducative</h2>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="users" className="gap-2">
            <UsersIcon size={14} />
            <span>Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="classes" className="gap-2">
            <BookOpen size={14} />
            <span>Classes</span>
          </TabsTrigger>
          <TabsTrigger value="by-class" className="gap-2">
            <GraduationCap size={14} />
            <span>Élèves par classe</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <BlurryCard className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full md:w-auto">
                <TabsList className="bg-muted w-full md:w-auto">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="student">Élèves</TabsTrigger>
                  <TabsTrigger value="teacher">Enseignants</TabsTrigger>
                  <TabsTrigger value="admin">Administrateurs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </BlurryCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <BlurryCard 
                  key={user.id} 
                  className="p-6 fade-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className={getRoleColor(user.role)}>
                      {roleLabels[user.role as keyof typeof roleLabels]}
                    </Badge>
                    {user.class && (
                      <Badge variant="outline" className="border-primary/20 bg-primary/5">
                        {user.class}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-accent/20 bg-accent/5">
                      {user.createdBy === "self" ? "Auto-créé" : 
                       user.createdBy === "admin" ? "Créé par admin" : "Créé par enseignant"}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    {canManageUser(user.role) && (
                      <>
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer cet utilisateur ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Toutes les données associées à {user.name} seront définitivement supprimées.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </BlurryCard>
              ))
            ) : (
              <div className="col-span-full">
                <BlurryCard className="p-8 text-center">
                  <UserCircle size={40} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
                  <p className="text-muted-foreground mt-2">
                    Essayez de modifier vos critères de recherche ou ajoutez un nouvel utilisateur.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4 gap-2">
                        <PlusCircle size={16} />
                        <span>Nouvel utilisateur</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <NewUserForm 
                        onClose={() => {}}
                        onUserCreated={handleAddUser}
                        existingGroups={existingGroups}
                        currentUserRole={currentUserRole}
                      />
                    </DialogContent>
                  </Dialog>
                </BlurryCard>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="classes" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={16} />
                  <span>Nouvelle classe</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle classe</DialogTitle>
                  <DialogDescription>
                    Ajoutez une nouvelle classe ou un groupe d'élèves
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="className">Nom de la classe</label>
                    <Input 
                      id="className" 
                      value={newClassName} 
                      onChange={(e) => setNewClassName(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="classLevel">Niveau</label>
                    <select 
                      id="classLevel" 
                      value={newClassLevel}
                      onChange={(e) => setNewClassLevel(e.target.value as NiveauFormationType)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="2PMIA">2nde PMIA</option>
                      <option value="1MSPC">1ère MSPC</option>
                      <option value="TMSPC">Terminale MSPC</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={() => {
                      if (!newClassName.trim()) {
                        toast.error("Le nom de la classe est requis");
                        return;
                      }
                      
                      if (classes.some(c => c.name === newClassName.trim())) {
                        toast.error("Cette classe existe déjà");
                        return;
                      }
                      
                      handleAddClass({
                        name: newClassName.trim(),
                        level: newClassLevel
                      });
                      
                      setNewClassName("");
                      setIsClassDialogOpen(false);
                    }}
                  >
                    Créer la classe
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
              <Card key={cls.id} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{cls.name}</CardTitle>
                    <Badge className="bg-primary">
                      {cls.studentCount} élèves
                    </Badge>
                  </div>
                  <CardDescription>Niveau: {cls.level}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={cls.avatar || ""} />
                      <AvatarFallback>{getInitials(cls.name)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">Sophie Dubois (Responsable)</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                        Supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cette classe ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action ne sera possible que si aucun élève n'est associé à cette classe.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" size="sm">Voir les élèves</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="by-class" className="space-y-8">
          {studentsByClass.map((cls, index) => (
            <BlurryCard key={cls.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">{cls.name}</h3>
                  <Badge className="ml-2 bg-primary/80">
                    {cls.students.length} élèves
                  </Badge>
                </div>
                {canCreateUserType("student") && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle size={14} />
                        <span>Ajouter un élève</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <NewUserForm 
                        onClose={() => {}}
                        onUserCreated={handleAddUser}
                        existingGroups={existingGroups}
                        currentUserRole={currentUserRole}
                        defaultClass={cls.name}
                        defaultRole="student"
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <Separator className="mb-4" />
              
              {cls.students.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cls.students.map((student) => (
                    <div
                      key={student.id}
                      className="border rounded-lg p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || ""} />
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer cet élève ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Toutes les données associées à {student.name} seront définitivement supprimées.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDeleteUser(student.id)}
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Aucun élève dans cette classe</p>
                  {canCreateUserType("student") && (
                    <Button className="mt-4 gap-2" variant="outline" size="sm">
                      <PlusCircle size={14} />
                      <span>Ajouter un élève</span>
                    </Button>
                  )}
                </div>
              )}
            </BlurryCard>
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default Users;
