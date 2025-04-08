import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Database, 
  School, 
  Palette, 
  HelpCircle,
  Save,
  Check,
  ChevronRight,
  UserCog,
  Key,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BlurryCard from "@/components/ui/BlurryCard";
import { toast } from "sonner";
import { NiveauFormation, getDisplayFromNiveauFormation } from "@/types/niveauFormation";
import { Enseignant, UserCredentials } from "@/types/mspc";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("generale");
  
  // Sample settings data
  const [settings, setSettings] = useState({
    // ... keep existing code (general, notifications, appearance, database settings)
  });

  // Teachers and Access Management
  const [teachers, setTeachers] = useState<Enseignant[]>([
    {
      id: "1",
      nom: "Dubois",
      prenom: "Sophie",
      email: "s.dubois@mimard.fr",
      classes: [NiveauFormation.SECONDE, NiveauFormation.PREMIERE],
      specialite: "Maintenance industrielle",
      actif: true,
      dateCreation: "2023-09-01",
      role: "teacher"
    },
    {
      id: "2",
      nom: "Martin",
      prenom: "Philippe",
      email: "p.martin@mimard.fr",
      classes: [NiveauFormation.PREMIERE, NiveauFormation.TERMINALE],
      specialite: "Électrotechnique",
      actif: true,
      dateCreation: "2023-09-01",
      role: "teacher"
    },
    {
      id: "3",
      nom: "Leroy",
      prenom: "Catherine",
      email: "c.leroy@mimard.fr",
      classes: [NiveauFormation.SECONDE],
      specialite: "Mécanique",
      actif: false,
      dateCreation: "2023-09-01",
      role: "teacher"
    }
  ]);

  const [userCredentials, setUserCredentials] = useState<UserCredentials[]>([
    {
      id: "1",
      email: "s.dubois@mimard.fr",
      password: "password123",
      role: "teacher",
      actif: true,
      dateCreation: "2023-09-01"
    },
    {
      id: "2",
      email: "p.martin@mimard.fr",
      password: "password123",
      role: "teacher",
      actif: true,
      dateCreation: "2023-09-01"
    },
    {
      id: "3",
      email: "c.leroy@mimard.fr",
      password: "password123",
      role: "teacher",
      actif: false,
      dateCreation: "2023-09-01"
    },
    {
      id: "4",
      email: "m.dubois@etudiant.mimard.fr",
      password: "eleve123",
      role: "student",
      actif: true,
      dateCreation: "2023-09-15"
    }
  ]);

  // Dialogs and forms
  const [teacherDialogOpen, setTeacherDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Enseignant | null>(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserCredentials | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // Teacher form schema
  const teacherFormSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    classes: z.array(z.nativeEnum(NiveauFormation)).min(1, "Sélectionnez au moins une classe"),
    specialite: z.string().optional(),
    role: z.enum(["teacher", "admin"]),
    actif: z.boolean().default(true)
  });

  // User credentials form schema
  const userCredentialsFormSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    role: z.enum(["student", "teacher", "admin"]),
    actif: z.boolean().default(true)
  });

  const teacherForm = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      classes: [],
      specialite: "",
      role: "teacher",
      actif: true
    }
  });

  const userForm = useForm<z.infer<typeof userCredentialsFormSchema>>({
    resolver: zodResolver(userCredentialsFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
      actif: true
    }
  });

  const handleSettingsChange = (category: string, setting: string, value: any) => {
    // ... keep existing code (handleSettingsChange function)
  };

  const handleSaveSettings = () => {
    // ... keep existing code (handleSaveSettings function)
  };

  const handleAddTeacher = (data: z.infer<typeof teacherFormSchema>) => {
    const newTeacher: Enseignant = {
      id: editingTeacher ? editingTeacher.id : Date.now().toString(),
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      classes: data.classes,
      specialite: data.specialite,
      actif: data.actif,
      dateCreation: editingTeacher ? editingTeacher.dateCreation : new Date().toISOString(),
      role: data.role
    };

    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? newTeacher : t));
      toast.success("Enseignant modifié avec succès");
    } else {
      setTeachers([...teachers, newTeacher]);
      
      // Créer automatiquement les identifiants pour le nouvel enseignant
      const newCredentials: UserCredentials = {
        id: Date.now().toString(),
        email: data.email,
        password: generatePassword(),
        role: data.role,
        actif: data.actif,
        dateCreation: new Date().toISOString()
      };
      
      setUserCredentials([...userCredentials, newCredentials]);
      toast.success("Enseignant ajouté avec succès");
    }
    
    setTeacherDialogOpen(false);
    setEditingTeacher(null);
    teacherForm.reset();
  };

  const handleAddUser = (data: z.infer<typeof userCredentialsFormSchema>) => {
    const newUser: UserCredentials = {
      id: editingUser ? editingUser.id : Date.now().toString(),
      email: data.email,
      password: data.password,
      role: data.role,
      actif: data.actif,
      dateCreation: editingUser ? editingUser.dateCreation : new Date().toISOString()
    };

    if (editingUser) {
      setUserCredentials(userCredentials.map(u => u.id === editingUser.id ? newUser : u));
      toast.success("Identifiants modifiés avec succès");
    } else {
      setUserCredentials([...userCredentials, newUser]);
      toast.success("Identifiants créés avec succès");
    }
    
    setUserDialogOpen(false);
    setEditingUser(null);
    userForm.reset();
  };

  const handleDeleteTeacher = (id: string) => {
    // Supprimer l'enseignant
    setTeachers(teachers.filter(t => t.id !== id));
    
    // Trouver l'email de l'enseignant pour supprimer aussi ses identifiants
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      setUserCredentials(userCredentials.filter(u => u.email !== teacher.email));
    }
    
    toast.success("Enseignant supprimé avec succès");
  };

  const handleDeleteUser = (id: string) => {
    setUserCredentials(userCredentials.filter(u => u.id !== id));
    toast.success("Identifiants supprimés avec succès");
  };

  const editTeacher = (teacher: Enseignant) => {
    setEditingTeacher(teacher);
    teacherForm.reset({
      nom: teacher.nom,
      prenom: teacher.prenom,
      email: teacher.email,
      classes: teacher.classes,
      specialite: teacher.specialite || "",
      role: teacher.role,
      actif: teacher.actif
    });
    setTeacherDialogOpen(true);
  };

  const editUser = (user: UserCredentials) => {
    setEditingUser(user);
    userForm.reset({
      email: user.email,
      password: user.password,
      role: user.role,
      actif: user.actif
    });
    setUserDialogOpen(true);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords({
      ...showPasswords,
      [id]: !showPasswords[id]
    });
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = userCredentials.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom[0]}${nom[0]}`.toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Paramètres
          </h1>
          <p className="text-muted-foreground mt-1">
            Configuration de l'application et gestion des préférences
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={handleSaveSettings} className="gap-2 bg-primary hover:bg-primary/90">
            <Save size={16} />
            <span>Enregistrer les modifications</span>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <div className="hidden md:block">
          <BlurryCard className="p-0">
            <nav className="flex flex-col">
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'generale' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('generale')}
              >
                <School size={18} />
                <span>Général</span>
                {activeTab === 'generale' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} />
                <span>Notifications</span>
                {activeTab === 'notifications' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'apparence' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('apparence')}
              >
                <Palette size={18} />
                <span>Apparence</span>
                {activeTab === 'apparence' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'securite' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('securite')}
              >
                <Lock size={18} />
                <span>Sécurité</span>
                {activeTab === 'securite' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'database' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('database')}
              >
                <Database size={18} />
                <span>Base de données</span>
                {activeTab === 'database' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'enseignants' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('enseignants')}
              >
                <UserCog size={18} />
                <span>Enseignants & Accès</span>
                {activeTab === 'enseignants' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'aide' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('aide')}
              >
                <HelpCircle size={18} />
                <span>Aide</span>
                {activeTab === 'aide' && <ChevronRight className="ml-auto" size={16} />}
              </button>
            </nav>
          </BlurryCard>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="generale" className="gap-2">
                <School size={14} />
                <span>Général</span>
              </TabsTrigger>
              <TabsTrigger value="enseignants" className="gap-2">
                <UserCog size={14} />
                <span>Enseignants</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2">
                <Database size={14} />
                <span>Base de données</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Settings content */}
        <div className="space-y-6">
          {/* General Settings */}
          {activeTab === 'generale' && (
            <BlurryCard className="p-6">
              {/* ... keep existing code (General settings content) */}
            </BlurryCard>
          )}
          
          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <BlurryCard className="p-6">
              {/* ... keep existing code (Notifications settings content) */}
            </BlurryCard>
          )}
          
          {/* Database Settings */}
          {activeTab === 'database' && (
            <BlurryCard className="p-6">
              {/* ... keep existing code (Database settings content) */}
            </BlurryCard>
          )}
          
          {/* Teachers and Access Management Settings */}
          {activeTab === 'enseignants' && (
            <div className="space-y-6">
              <BlurryCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Gestion des enseignants</h2>
                  </div>
                  <Dialog open={teacherDialogOpen} onOpenChange={setTeacherDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="gap-2" 
                        onClick={() => {
                          setEditingTeacher(null);
                          teacherForm.reset({
                            nom: "",
                            prenom: "",
                            email: "",
                            classes: [],
                            specialite: "",
                            role: "teacher",
                            actif: true
                          });
                        }}
                      >
                        <Plus size={16} />
                        <span>Nouvel enseignant</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{editingTeacher ? "Modifier l'enseignant" : "Ajouter un enseignant"}</DialogTitle>
                        <DialogDescription>
                          {editingTeacher 
                            ? "Modifiez les informations de l'enseignant" 
                            : "Remplissez les informations pour créer un nouvel enseignant"}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...teacherForm}>
                        <form onSubmit={teacherForm.handleSubmit(handleAddTeacher)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={teacherForm.control}
                              name="nom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nom" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={teacherForm.control}
                              name="prenom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Prénom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Prénom" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={teacherForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={teacherForm.control}
                            name="specialite"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Spécialité</FormLabel>
                                <FormControl>
                                  <Input placeholder="Spécialité" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={teacherForm.control}
                            name="classes"
                            render={() => (
                              <FormItem>
                                <FormLabel>Classes</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <Checkbox 
                                      checked={teacherForm.watch("classes")?.includes(NiveauFormation.SECONDE)}
                                      onCheckedChange={(checked) => {
                                        const currentClasses = teacherForm.getValues("classes") || [];
                                        const updatedClasses = checked 
                                          ? [...currentClasses, NiveauFormation.SECONDE]
                                          : currentClasses.filter(c => c !== NiveauFormation.SECONDE);
                                        teacherForm.setValue("classes", updatedClasses);
                                      }}
                                      id="seconde"
                                    />
                                    <label htmlFor="seconde">{getDisplayFromNiveauFormation(NiveauFormation.SECONDE)}</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Checkbox 
                                      checked={teacherForm.watch("classes")?.includes(NiveauFormation.PREMIERE)}
                                      onCheckedChange={(checked) => {
                                        const currentClasses = teacherForm.getValues("classes") || [];
                                        const updatedClasses = checked 
                                          ? [...currentClasses, NiveauFormation.PREMIERE]
                                          : currentClasses.filter(c => c !== NiveauFormation.PREMIERE);
                                        teacherForm.setValue("classes", updatedClasses);
                                      }}
                                      id="premiere"
                                    />
                                    <label htmlFor="premiere">{getDisplayFromNiveauFormation(NiveauFormation.PREMIERE)}</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Checkbox 
                                      checked={teacherForm.watch("classes")?.includes(NiveauFormation.TERMINALE)}
                                      onCheckedChange={(checked) => {
                                        const currentClasses = teacherForm.getValues("classes") || [];
                                        const updatedClasses = checked 
                                          ? [...currentClasses, NiveauFormation.TERMINALE]
                                          : currentClasses.filter(c => c !== NiveauFormation.TERMINALE);
                                        teacherForm.setValue("classes", updatedClasses);
                                      }}
                                      id="terminale"
                                    />
                                    <label htmlFor="terminale">{getDisplayFromNiveauFormation(NiveauFormation.TERMINALE)}</label>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={teacherForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rôle</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un rôle" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="teacher">Enseignant</SelectItem>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={teacherForm.control}
                            name="actif"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Compte actif</FormLabel>
                                  <FormDescription>
                                    Désactivez pour bloquer l'accès temporairement
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">{editingTeacher ? "Mettre à jour" : "Ajouter"}</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Rechercher un enseignant..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Enseignant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Classes</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher) => (
                          <TableRow key={teacher.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{getInitials(teacher.nom, teacher.prenom)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div>
                                    {teacher.prenom} {teacher.nom}
                                  </div>
                                  {teacher.specialite && (
                                    <div className="text-xs text-muted-foreground">{teacher.specialite}</div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.map((classe) => (
                                  <Badge key={classe} variant="outline" className="text-xs">
                                    {getDisplayFromNiveauFormation(classe)}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={teacher.role === "admin" ? "bg-red-500" : "bg-blue-500"}>
                                {teacher.role === "admin" ? "Administrateur" : "Enseignant"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => editTeacher(teacher)}>
                                  <Edit size={16} />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                      <Trash2 size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Supprimer cet enseignant ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action est irréversible. Toutes les données associées à {teacher.prenom} {teacher.nom} seront supprimées.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive"
                                        onClick={() => handleDeleteTeacher(teacher.id)}
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            Aucun enseignant trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </BlurryCard>

              <BlurryCard className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Gestion des accès utilisateur</h2>
                  </div>
                  <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="gap-2" 
                        onClick={() => {
                          setEditingUser(null);
                          userForm.reset({
                            email: "",
                            password: generatePassword(),
                            role: "student",
                            actif: true
                          });
                        }}
                      >
                        <Plus size={16} />
                        <span>Nouvel identifiant</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{editingUser ? "Modifier les identifiants" : "Créer des identifiants"}</DialogTitle>
                        <DialogDescription>
                          {editingUser 
                            ? "Modifiez les identifiants de connexion" 
                            : "Créez des identifiants pour un nouvel utilisateur"}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...userForm}>
                        <form onSubmit={userForm.handleSubmit(handleAddUser)} className="space-y-4">
                          <FormField
                            control={userForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={userForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input 
                                      type={showPasswords["form"] ? "text" : "password"} 
                                      placeholder="••••••••" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-1 top-1/2 -translate-y-1/2" 
                                    onClick={() => togglePasswordVisibility("form")}
                                  >
                                    {showPasswords["form"] ? <EyeOff size={16} /> : <Eye size={16} />}
                                  </Button>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <FormMessage />
                                  <Button 
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newPassword = generatePassword();
                                      userForm.setValue("password", newPassword);
                                    }}
                                    className="text-xs h-7"
                                  >
                                    Générer
                                  </Button>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={userForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rôle</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un rôle" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="student">Élève</SelectItem>
                                    <SelectItem value="teacher">Enseignant</SelectItem>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={userForm.control}
                            name="actif"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Compte actif</FormLabel>
                                  <FormDescription>
                                    Désactivez pour bloquer l'accès temporairement
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">{editingUser ? "Mettre à jour" : "Créer"}</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Mot de passe</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <div className="relative">
                                <Input 
                                  type={showPasswords[user.id] ? "text" : "password"} 
                                  value={user.password} 
                                  readOnly 
                                  className="pr-10 bg-muted"
                                />
                                <Button
                                  variant="ghost" 
                                  size="icon" 
                                  className="absolute right-1 top-1/2 -translate-y-1/2" 
                                  onClick={() => togglePasswordVisibility(user.id)}
                                >
                                  {showPasswords[user.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                user.role === "admin" ? "bg-red-500" : 
                                user.role === "teacher" ? "bg-blue-500" : "bg-green-500"
                              }>
                                {user.role === "admin" ? "Administrateur" : 
                                 user.role === "teacher" ? "Enseignant" : "Élève"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={user.actif ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}>
                                {user.actif ? "Actif" : "Inactif"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" onClick={() => editUser(user)}>
                                  <Edit size={16} />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                      <Trash2 size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Supprimer ces identifiants ?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action est irréversible. L'utilisateur {user.email} ne pourra plus se connecter.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive"
                                        onClick={() => handleDeleteUser(user.id)}
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            Aucun identifiant trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </BlurryCard>
            </div>
          )}
          
          {/* Other settings tabs would go here */}
          {(activeTab !== 'generale' && activeTab !== 'notifications' && activeTab !== 'database' && activeTab !== 'enseignants') && (
            <BlurryCard className="p-6">
              <h2 className="text-xl font-semibold mb-6">Paramètres {activeTab}</h2>
              <p className="text-muted-foreground">Cette section est en cours de développement.</p>
            </BlurryCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
