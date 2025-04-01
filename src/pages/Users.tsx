
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
  Shield
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
} from "@/components/ui/dialog";
import NewUserForm from "@/components/users/NewUserForm";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data
  const users = [
    {
      id: "1",
      name: "Étienne Martin",
      email: "e.martin@mimard.fr",
      role: "admin",
      class: null,
      avatar: null
    },
    {
      id: "2",
      name: "Sophie Dubois",
      email: "s.dubois@mimard.fr",
      role: "teacher",
      class: null,
      avatar: null
    },
    {
      id: "3",
      name: "Laurent Petit",
      email: "l.petit@mimard.fr",
      role: "teacher",
      class: null,
      avatar: null
    },
    {
      id: "4",
      name: "Marie Lambert",
      email: "m.lambert@etudiant.mimard.fr",
      role: "student",
      class: "BTS MSPC 1",
      avatar: null
    },
    {
      id: "5",
      name: "Thomas Moreau",
      email: "t.moreau@etudiant.mimard.fr",
      role: "student",
      class: "BTS MSPC 1",
      avatar: null
    },
    {
      id: "6",
      name: "Léa Bernard",
      email: "l.bernard@etudiant.mimard.fr",
      role: "student",
      class: "BTS MSPC 2",
      avatar: null
    },
    {
      id: "7",
      name: "Lucas Girard",
      email: "l.girard@etudiant.mimard.fr",
      role: "student",
      class: "BTS MSPC 2",
      avatar: null
    }
  ];

  // Sample classes
  const classes = [
    {
      id: "1",
      name: "BTS MSPC 1",
      level: "bts1",
      studentCount: 14
    },
    {
      id: "2",
      name: "BTS MSPC 2",
      level: "bts2",
      studentCount: 12
    },
    {
      id: "3",
      name: "BAC PRO MSPC 1",
      level: "bac1",
      studentCount: 18
    },
    {
      id: "4",
      name: "BAC PRO MSPC 2",
      level: "bac2",
      studentCount: 16
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === "all" || user.role === activeRole;
    
    return matchesSearch && matchesRole;
  });

  const maintenanceImages = [
    "/maintenance-1.jpg",
    "/maintenance-2.jpg",
    "/maintenance-3.jpg",
  ];

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
              <Button className="gap-2 bg-accent hover:bg-accent/90">
                <PlusCircle size={16} />
                <span>Nouvel utilisateur</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Ajouter un élève, un enseignant ou un administrateur au système.
                </DialogDescription>
              </DialogHeader>
              <NewUserForm onSubmit={() => setIsDialogOpen(false)} classes={classes} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-xl h-40 vibrant-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-4 px-4">
            {maintenanceImages.map((img, idx) => (
              <div key={idx} className="relative h-28 w-40 overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img 
                  src={img} 
                  alt={`Maintenance ${idx + 1}`}
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
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
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 size={16} />
                    </Button>
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
                      <DialogHeader>
                        <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                        <DialogDescription>
                          Ajouter un élève, un enseignant ou un administrateur au système.
                        </DialogDescription>
                      </DialogHeader>
                      <NewUserForm onSubmit={() => {}} classes={classes} />
                    </DialogContent>
                  </Dialog>
                </BlurryCard>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="classes" className="space-y-6">
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
                  <CardDescription>Niveau: {cls.level.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">Sophie Dubois (Responsable)</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Modifier</Button>
                  <Button variant="outline" size="sm">Voir les élèves</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col items-center justify-center p-8 border-dashed">
              <GraduationCap size={36} className="text-muted-foreground mb-4" />
              <CardTitle className="text-center mb-2">Nouvelle classe</CardTitle>
              <CardDescription className="text-center mb-4">
                Ajouter une nouvelle classe ou groupe d'élèves
              </CardDescription>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Créer une classe
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default Users;
