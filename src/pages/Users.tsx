
import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  User, 
  X,
  Check,
  MoreHorizontal,
  Edit,
  Trash,
  UserCog,
  Shield,
  GraduationCap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import BlurryCard from "@/components/ui/BlurryCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  username: string;
  role: "admin" | "teacher" | "student";
  group?: string;
  email?: string;
  avatar?: string;
  status: "active" | "inactive";
}

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  // Données de démo
  const usersData: User[] = [
    {
      id: "1",
      name: "Jean Dupont",
      username: "j.dupont",
      role: "teacher",
      email: "j.dupont@education.fr",
      status: "active"
    },
    {
      id: "2",
      name: "Marie Lambert",
      username: "m.lambert",
      role: "admin",
      email: "m.lambert@education.fr",
      status: "active"
    },
    {
      id: "3",
      name: "Thomas Dubois",
      username: "t.dubois",
      role: "student",
      group: "MSPC1",
      email: "t.dubois@student.fr",
      status: "active"
    },
    {
      id: "4",
      name: "Julie Martin",
      username: "j.martin",
      role: "student",
      group: "MSPC1",
      email: "j.martin@student.fr",
      status: "active"
    },
    {
      id: "5",
      name: "Alex Bernard",
      username: "a.bernard",
      role: "student",
      group: "MSPC2",
      email: "a.bernard@student.fr",
      status: "active"
    },
    {
      id: "6",
      name: "Sophie Petit",
      username: "s.petit",
      role: "student",
      group: "MSPC2",
      email: "s.petit@student.fr",
      status: "inactive"
    },
    {
      id: "7",
      name: "Marc Leroy",
      username: "m.leroy",
      role: "student",
      group: "MSPC1",
      email: "m.leroy@student.fr",
      status: "active"
    },
    {
      id: "8",
      name: "Emma Richard",
      username: "e.richard",
      role: "student",
      group: "MSPC2",
      email: "e.richard@student.fr",
      status: "active"
    },
    {
      id: "9",
      name: "Pierre Moreau",
      username: "p.moreau",
      role: "teacher",
      email: "p.moreau@education.fr",
      status: "active"
    }
  ];
  
  // Extraire les groupes uniques
  const groups = [...new Set(usersData.filter(user => user.group).map(user => user.group))];
  
  // Filtrer les utilisateurs
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    
    const matchesGroup = !selectedGroup || user.group === selectedGroup;
    
    return matchesSearch && matchesRole && matchesGroup;
  });
  
  // Fonction pour obtenir la couleur du badge en fonction du rôle
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-violet-500";
      case "teacher":
        return "bg-blue-500";
      case "student":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Fonction pour obtenir le libellé du rôle
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrateur";
      case "teacher":
        return "Enseignant";
      case "student":
        return "Élève";
      default:
        return "Utilisateur";
    }
  };
  
  // Fonction pour obtenir l'icône du rôle
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield size={16} />;
      case "teacher":
        return <UserCog size={16} />;
      case "student":
        return <GraduationCap size={16} />;
      default:
        return <User size={16} />;
    }
  };
  
  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedRole(null);
    setSelectedGroup(null);
  };
  
  // Vérifier si des filtres sont appliqués
  const hasActiveFilters = selectedRole || selectedGroup;
  
  // Regrouper les utilisateurs par rôle
  const usersByRole = {
    all: filteredUsers,
    admin: filteredUsers.filter(user => user.role === "admin"),
    teacher: filteredUsers.filter(user => user.role === "teacher"),
    student: filteredUsers.filter(user => user.role === "student")
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground mt-1">
            Gestion des comptes utilisateurs
          </p>
        </div>
        
        <Button className="gap-2">
          <Plus size={16} />
          <span>Nouvel utilisateur</span>
        </Button>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-4 mb-8 smooth-transition shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
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
          
          <div className="flex gap-2">
            <Select value={selectedRole || ""} onValueChange={(value) => setSelectedRole(value || null)}>
              <SelectTrigger className="w-40 gap-2">
                <User size={14} />
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="teacher">Enseignant</SelectItem>
                <SelectItem value="student">Élève</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedGroup || ""} onValueChange={(value) => setSelectedGroup(value || null)}>
              <SelectTrigger className="w-40 gap-2">
                <Users size={14} />
                <SelectValue placeholder="Groupe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les groupes</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {hasActiveFilters && (
              <Button variant="ghost" size="icon" onClick={resetFilters} title="Réinitialiser les filtres">
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
        
        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedRole && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                {getRoleIcon(selectedRole)}
                <span>{getRoleLabel(selectedRole)}</span>
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            {selectedGroup && (
              <Badge variant="secondary" className="gap-1 px-3 py-1">
                <Users size={12} />
                <span>{selectedGroup}</span>
                <button 
                  onClick={() => setSelectedGroup(null)}
                  className="ml-1 hover:text-foreground smooth-transition"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters} 
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Effacer tous les filtres
            </Button>
          </div>
        )}
      </div>
      
      {/* Message si aucun résultat */}
      {filteredUsers.length === 0 && (
        <div className="text-center p-10 bg-white/70 backdrop-blur-md rounded-xl border">
          <div className="flex justify-center mb-4 text-muted-foreground">
            <Users size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
          <p className="text-muted-foreground mt-1">
            Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery("");
            resetFilters();
          }}>
            Réinitialiser la recherche
          </Button>
        </div>
      )}
      
      {/* Liste des utilisateurs */}
      {filteredUsers.length > 0 && (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="gap-2">
              Tous
              <Badge>{usersByRole.all.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              Administrateurs
              <Badge>{usersByRole.admin.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="teacher" className="gap-2">
              Enseignants
              <Badge>{usersByRole.teacher.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="student" className="gap-2">
              Élèves
              <Badge>{usersByRole.student.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(usersByRole).map(([role, users]) => (
            <TabsContent key={role} value={role}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                  <BlurryCard key={user.id} className="fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                              {user.name.split(' ').map(name => name[0]).join('')}
                            </div>
                            {user.status === "active" && (
                              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                                <Check size={10} className="text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield size={14} className="mr-2" />
                              <span>Changer le rôle</span>
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem>
                                <X size={14} className="mr-2" />
                                <span>Désactiver</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Check size={14} className="mr-2" />
                                <span>Activer</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash size={14} className="mr-2" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge className={`gap-1 ${getRoleBadgeColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span>{getRoleLabel(user.role)}</span>
                        </Badge>
                        
                        {user.group && (
                          <Badge variant="outline" className="bg-primary/5 gap-1">
                            <Users size={12} />
                            <span>{user.group}</span>
                          </Badge>
                        )}
                        
                        {user.status === "inactive" && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive gap-1">
                            <X size={12} />
                            <span>Inactif</span>
                          </Badge>
                        )}
                      </div>
                      
                      {user.email && (
                        <p className="mt-4 text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      )}
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit size={14} />
                          <span>Éditer</span>
                        </Button>
                        
                        <Button size="sm" className="gap-1">
                          <User size={14} />
                          <span>Profil</span>
                        </Button>
                      </div>
                    </div>
                  </BlurryCard>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default UsersPage;
