
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, 
  UserCog, 
  Shield, 
  GraduationCap, 
  Users, 
  X, 
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface NewUserFormProps {
  onClose: () => void;
  onUserCreated: (user: any) => void;
  existingGroups: string[];
  currentUserRole?: string;
  defaultRole?: string;
  defaultClass?: string;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ 
  onClose, 
  onUserCreated,
  existingGroups = [],
  currentUserRole = "admin",
  defaultRole,
  defaultClass
}) => {
  const [step, setStep] = useState<'user' | 'class'>('user');
  const [selectedRole, setSelectedRole] = useState<string>(defaultRole || (currentUserRole === "admin" ? "teacher" : "student"));
  const [newGroup, setNewGroup] = useState<string>("");
  const [isCreatingGroup, setIsCreatingGroup] = useState<boolean>(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: defaultRole || (currentUserRole === "admin" ? "teacher" : "student"),
      group: defaultClass || "",
    }
  });
  
  const handleCreateUser = (data: any) => {
    // Création d'un nouvel utilisateur avec un ID unique
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      username: data.username,
      role: data.role,
      email: data.email,
      class: data.role === "student" ? data.group : undefined,
      avatar: null,
      status: "active"
    };
    
    onUserCreated(newUser);
    
    toast.success(
      "Utilisateur créé avec succès",
      { description: `${data.name} a été ajouté en tant que ${getRoleLabel(data.role)}.` }
    );
    
    onClose();
  };
  
  const handleCreateGroup = () => {
    if (!newGroup.trim()) {
      toast.error("Veuillez saisir un nom de classe");
      return;
    }
    
    if (existingGroups.includes(newGroup)) {
      toast.error("Cette classe existe déjà");
      return;
    }
    
    // Soumettre le formulaire avec le nouveau groupe
    form.setValue("group", newGroup);
    setIsCreatingGroup(false);
    setNewGroup("");
    
    toast.success(
      "Classe créée",
      { description: `La classe ${newGroup} a été ajoutée.` }
    );
  };
  
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

  // Only show allowed roles based on current user role
  const getAllowedRoles = () => {
    switch (currentUserRole) {
      case "admin":
        return ["admin", "teacher", "student"];
      case "teacher":
        return ["student"];
      default:
        return ["student"];
    }
  };

  return (
    <div className="p-6">
      {step === 'user' ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Nouvel utilisateur</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X size={18} />
            </Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="j.dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôle</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRole(value);
                      }}
                      disabled={getAllowedRoles().length === 1}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full gap-2">
                          {getRoleIcon(field.value)}
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getAllowedRoles().includes("admin") && (
                          <SelectItem value="admin" className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Shield size={16} />
                              <span>Administrateur</span>
                            </div>
                          </SelectItem>
                        )}
                        {getAllowedRoles().includes("teacher") && (
                          <SelectItem value="teacher" className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <UserCog size={16} />
                              <span>Enseignant</span>
                            </div>
                          </SelectItem>
                        )}
                        {getAllowedRoles().includes("student") && (
                          <SelectItem value="student" className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <GraduationCap size={16} />
                              <span>Élève</span>
                            </div>
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedRole === "student" && (
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        <span>Classe</span>
                        {!isCreatingGroup && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setIsCreatingGroup(true)}
                            className="h-6 px-2 text-xs"
                          >
                            + Nouvelle classe
                          </Button>
                        )}
                      </FormLabel>
                      {isCreatingGroup ? (
                        <div className="flex gap-2">
                          <Input 
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                            placeholder="Nom de la classe"
                          />
                          <Button type="button" onClick={handleCreateGroup} className="shrink-0 gap-1">
                            <Check size={14} />
                            <span>Ajouter</span>
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsCreatingGroup(false);
                              setNewGroup("");
                            }}
                            className="shrink-0 gap-1"
                          >
                            <X size={14} />
                            <span>Annuler</span>
                          </Button>
                        </div>
                      ) : (
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full gap-2">
                              <Users size={16} />
                              <SelectValue placeholder="Sélectionner une classe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {existingGroups.map(group => (
                              <SelectItem key={group} value={group} className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <Users size={16} />
                                  <span>{group}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button type="submit">
                  Créer l'utilisateur
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Nouvelle classe</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X size={18} />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <FormLabel>Nom de la classe</FormLabel>
              <Input 
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                placeholder="Ex: MSPC1"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep('user')}>
                Retour
              </Button>
              <Button onClick={handleCreateGroup}>
                Créer la classe
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewUserForm;
