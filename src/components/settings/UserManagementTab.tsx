
import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { NiveauFormation } from "@/types/mspc";
import { Plus, Edit, Trash, Key } from "lucide-react";

type UserRole = "teacher" | "student" | "admin";

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  classe?: NiveauFormation[];
  actif: boolean;
  dateCreation: string;
}

const UserManagementTab = () => {
  const [activeUserTab, setActiveUserTab] = useState<"teachers" | "students">("teachers");
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      role: "teacher",
      classe: [NiveauFormation.SECONDE],
      actif: true,
      dateCreation: "2023-01-15",
    },
    {
      id: "2",
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@example.com",
      role: "teacher",
      classe: [NiveauFormation.PREMIERE, NiveauFormation.TERMINALE],
      actif: true,
      dateCreation: "2023-02-20",
    },
    {
      id: "3",
      nom: "Petit",
      prenom: "Lucas",
      email: "lucas.petit@example.com",
      role: "student",
      classe: [NiveauFormation.SECONDE],
      actif: true,
      dateCreation: "2023-09-01",
    },
    {
      id: "4",
      nom: "Leroy",
      prenom: "Emma",
      email: "emma.leroy@example.com",
      role: "student",
      classe: [NiveauFormation.PREMIERE],
      actif: true, 
      dateCreation: "2023-09-01",
    },
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isCreatingCredentials, setIsCreatingCredentials] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("teacher");
  const [classe, setClasse] = useState<NiveauFormation[]>([]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      nom,
      prenom,
      email,
      role,
      classe: role === "teacher" || role === "student" ? classe : undefined,
      actif: true,
      dateCreation: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    resetForm();
    setIsAddingUser(false);
    toast.success(`${role === "teacher" ? "Enseignant" : "Élève"} ajouté avec succès`);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          nom,
          prenom,
          email,
          role,
          classe: role === "teacher" || role === "student" ? classe : undefined,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    resetForm();
    setIsEditingUser(false);
    toast.success(`Utilisateur modifié avec succès`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("Utilisateur supprimé avec succès");
  };

  const handleCreateCredentials = () => {
    if (!selectedUser || password !== passwordConfirm) return;

    // In a real app, this would send the credentials to the backend
    // Here we just show a success message
    toast.success(`Identifiants créés pour ${selectedUser.prenom} ${selectedUser.nom}`);
    setIsCreatingCredentials(false);
    setPassword("");
    setPasswordConfirm("");
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setRole(user.role);
    setClasse(user.classe || []);
    setIsEditingUser(true);
  };

  const handleCredentialsClick = (user: User) => {
    setSelectedUser(user);
    setIsCreatingCredentials(true);
  };

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setRole("teacher");
    setClasse([]);
    setPassword("");
    setPasswordConfirm("");
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    if (activeUserTab === "teachers") return user.role === "teacher" || user.role === "admin";
    return user.role === "student";
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
          <CardDescription>
            Créez et gérez les comptes des enseignants et des élèves
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeUserTab} onValueChange={(value: "teachers" | "students") => setActiveUserTab(value)}>
            <TabsList className="mb-4">
              <TabsTrigger value="teachers">Enseignants</TabsTrigger>
              <TabsTrigger value="students">Élèves</TabsTrigger>
            </TabsList>

            <TabsContent value="teachers" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Liste des enseignants</h3>
                <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un enseignant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un enseignant</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations pour créer un compte enseignant
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nom" className="text-right">Nom</Label>
                        <Input
                          id="nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prenom" className="text-right">Prénom</Label>
                        <Input
                          id="prenom"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Rôle</Label>
                        <Select
                          value={role}
                          onValueChange={(value: UserRole) => setRole(value)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher">Enseignant</SelectItem>
                            <SelectItem value="admin">Administrateur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="classe" className="text-right">Classes</Label>
                        <Select
                          value={classe[0] || ""}
                          onValueChange={(value) => setClasse([value as NiveauFormation])}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                            <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                            <SelectItem value={NiveauFormation.TERMINALE}>Terminale MSPC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingUser(false)}>Annuler</Button>
                      <Button onClick={handleAddUser}>Ajouter</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>{`${user.prenom.charAt(0)}${user.nom.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {user.prenom} {user.nom}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role === "admin" ? "Admin" : "Enseignant"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.classe?.join(", ") || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={user.actif ? "outline" : "destructive"}>
                          {user.actif ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleCredentialsClick(user)}>
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Liste des élèves</h3>
                <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un élève
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un élève</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations pour créer un compte élève
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nom" className="text-right">Nom</Label>
                        <Input
                          id="nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prenom" className="text-right">Prénom</Label>
                        <Input
                          id="prenom"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="classe" className="text-right">Classe</Label>
                        <Select
                          value={classe[0] || ""}
                          onValueChange={(value) => setClasse([value as NiveauFormation])}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                            <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                            <SelectItem value={NiveauFormation.TERMINALE}>Terminale MSPC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingUser(false)}>Annuler</Button>
                      <Button onClick={handleAddUser}>Ajouter</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>{`${user.prenom.charAt(0)}${user.nom.charAt(0)}`}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {user.prenom} {user.nom}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.classe?.join(", ") || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={user.actif ? "outline" : "destructive"}>
                          {user.actif ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleCredentialsClick(user)}>
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditingUser} onOpenChange={setIsEditingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nom" className="text-right">Nom</Label>
              <Input
                id="edit-nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-prenom" className="text-right">Prénom</Label>
              <Input
                id="edit-prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            {(role === "teacher" || role === "student") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-classe" className="text-right">Classe</Label>
                <Select
                  value={classe[0] || ""}
                  onValueChange={(value) => setClasse([value as NiveauFormation])}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                    <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                    <SelectItem value={NiveauFormation.TERMINALE}>Terminale MSPC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingUser(false)}>Annuler</Button>
            <Button onClick={handleEditUser}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Credentials Dialog */}
      <Dialog open={isCreatingCredentials} onOpenChange={setIsCreatingCredentials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gérer les identifiants</DialogTitle>
            <DialogDescription>
              {selectedUser && `Définir les identifiants pour ${selectedUser.prenom} ${selectedUser.nom}`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Identifiant</Label>
              <Input
                id="username"
                value={selectedUser?.email || ""}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">Confirmer</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="col-span-3"
              />
            </div>
            {password !== passwordConfirm && password && passwordConfirm && (
              <p className="text-sm text-destructive">Les mots de passe ne correspondent pas.</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingCredentials(false)}>Annuler</Button>
            <Button 
              onClick={handleCreateCredentials} 
              disabled={!password || password !== passwordConfirm}
            >
              Valider les identifiants
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementTab;
