import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash } from 'lucide-react';
import { Enseignant, NiveauFormation } from "@/types/mspc";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

const Users: React.FC = () => {
  const [teachers, setTeachers] = useState<Enseignant[]>([
    {
      id: "1",
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      classes: [NiveauFormation.SECONDE],
      actif: true,
      dateCreation: "2023-01-15",
      role: 'teacher',
    },
    {
      id: "2",
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@example.com",
      classes: [NiveauFormation.PREMIERE, NiveauFormation.TERMINALE],
      actif: false,
      dateCreation: "2023-02-20",
      role: 'teacher',
    },
    {
      id: "3",
      nom: "Lefevre",
      prenom: "Pierre",
      email: "pierre.lefevre@example.com",
      classes: [NiveauFormation.TERMINALE],
      actif: true,
      dateCreation: "2023-03-10",
      role: 'admin',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Enseignant | null>(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [classes, setClasses] = useState<NiveauFormation[]>([NiveauFormation.SECONDE]);
  const [actif, setActif] = useState(true);
  const [role, setRole] = useState<'teacher' | 'admin'>('teacher');
  const [dateCreation, setDateCreation] = useState<Date | null>(null);

  const [isActif, setIsActif] = useState(true);

  const handleCreate = () => {
    const newTeacher: Enseignant = {
      id: String(Date.now()),
      nom,
      prenom,
      email,
      classes,
      actif,
      dateCreation: dateCreation ? dateCreation.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      role,
    };
    setTeachers([...teachers, newTeacher]);
    setOpen(false);
    clearForm();
  };

  const handleEdit = () => {
    if (selectedTeacher) {
      const updatedTeacher: Enseignant = {
        ...selectedTeacher,
        nom,
        prenom,
        email,
        classes,
        actif,
        role,
      };
      setTeachers(teachers.map(teacher => teacher.id === selectedTeacher.id ? updatedTeacher : teacher));
      setEditOpen(false);
      clearForm();
    }
  };

  const handleDelete = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter(teacher => teacher.id !== selectedTeacher.id));
      setDeleteOpen(false);
    }
  };

  const clearForm = () => {
    setNom('');
    setPrenom('');
    setEmail('');
    setClasses([NiveauFormation.SECONDE]);
    setActif(true);
    setRole('teacher');
    setDateCreation(null);
  };

  const handleEditOpen = (teacher: Enseignant) => {
    setSelectedTeacher(teacher);
    setNom(teacher.nom);
    setPrenom(teacher.prenom);
    setEmail(teacher.email);
    setClasses(teacher.classes);
    setActif(teacher.actif);
    setRole(teacher.role);
    setDateCreation(teacher.dateCreation ? new Date(teacher.dateCreation) : null);
    setEditOpen(true);
  };

  const handleDeleteOpen = (teacher: Enseignant) => {
    setSelectedTeacher(teacher);
    setDeleteOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Créer un utilisateur</DialogTitle>
              <DialogDescription>
                Ajouter un nouvel utilisateur à la base de données.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom" className="text-right">
                  Nom
                </Label>
                <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prenom" className="text-right">
                  Prénom
                </Label>
                <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classes" className="text-right">
                  Classes
                </Label>
                <Select onValueChange={(value) => setClasses([value as NiveauFormation])}>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rôle
                </Label>
                <Select onValueChange={(value) => setRole(value as 'teacher' | 'admin')}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Professeur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="actif" className="text-right">
                  Actif
                </Label>
                <Switch id="actif" checked={actif} onCheckedChange={(checked) => setActif(checked)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateCreation" className="text-right">
                  Date de création
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !dateCreation && "text-muted-foreground"
                      )}
                    >
                      {dateCreation ? format(dateCreation, "PPP") : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateCreation}
                      onSelect={setDateCreation}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleCreate}>Créer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Classe(s)</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${teacher.nom}.png`} />
                    <AvatarFallback>{teacher.nom.charAt(0)}{teacher.prenom.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{teacher.nom} {teacher.prenom}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.classes.join(', ')}</TableCell>
                <TableCell>
                  <Badge variant={teacher.role === 'admin' ? 'default' : 'secondary'}>
                    {teacher.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={teacher.actif ? 'outline' : 'destructive'}>
                    {teacher.actif ? 'Oui' : 'Non'}
                  </Badge>
                </TableCell>
                <TableCell>{teacher.dateCreation}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditOpen(teacher)}>
                    <Edit className="h-4 w-4 mr-2" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteOpen(teacher)}>
                    <Trash className="h-4 w-4 mr-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier un utilisateur</DialogTitle>
            <DialogDescription>
              Modifier les informations de l'utilisateur.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom
              </Label>
              <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prenom" className="text-right">
                Prénom
              </Label>
              <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classes" className="text-right">
                Classes
              </Label>
              <Select onValueChange={(value) => setClasses([value as NiveauFormation])} defaultValue={classes[0]}>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <Select onValueChange={(value) => setRole(value as 'teacher' | 'admin')} defaultValue={role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Professeur</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="actif" className="text-right">
                Actif
              </Label>
              <Switch id="actif" checked={actif} onCheckedChange={(checked) => setActif(checked)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateCreation" className="text-right">
                Date de création
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !dateCreation && "text-muted-foreground"
                    )}
                  >
                    {dateCreation ? format(dateCreation, "PPP") : (
                      <span>Choisir une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dateCreation}
                    onSelect={setDateCreation}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setEditOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleEdit}>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr(e) ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement l'utilisateur.
              Êtes-vous sûr(e) de vouloir continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;
