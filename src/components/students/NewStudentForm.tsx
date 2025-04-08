
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { NiveauFormation, NiveauFormationType } from "@/types/niveauFormation";
import { Eleve } from "@/types/mspc";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { getDisplayFromNiveauFormation } from "@/types/niveauFormation";

interface NewStudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentCreated: (student: Eleve) => void;
  existingStudents: Eleve[];
}

const NewStudentForm: React.FC<NewStudentFormProps> = ({
  open,
  onOpenChange,
  onStudentCreated,
  existingStudents
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classe, setClasse] = useState<NiveauFormationType>(null);
  const [teacherRef, setTeacherRef] = useState("");
  
  const classesMap = {
    [NiveauFormation.SECONDE]: "2PMIA",
    [NiveauFormation.PREMIERE]: "1MSPC",
    [NiveauFormation.TERMINALE]: "TMSPC"
  };
  
  const teachers = [
    { id: "1", name: "M. Martin" },
    { id: "2", name: "Mme Robert" },
    { id: "3", name: "M. Dubois" },
    { id: "4", name: "Mme Bernard" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !classe || !teacherRef) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    // Check if we've reached the class limit (30 students)
    const studentsInClass = existingStudents.filter(student => student.classe === classe);
    if (studentsInClass.length >= 30) {
      toast.error(`La classe ${getDisplayFromNiveauFormation(classe as NiveauFormation)} a déjà atteint sa capacité maximale (30 élèves)`);
      return;
    }
    
    // Generate unique ID
    const newId = `student-${Date.now()}`;
    
    const newStudent: Eleve = {
      id: newId,
      nom: lastName,
      prenom: firstName,
      classe: classe,
      competencesAcquises: [],
      ordresTravauxRealises: [],
      referent: teacherRef
    };
    
    onStudentCreated(newStudent);
    toast.success(`${firstName} ${lastName} a été ajouté(e) à la classe ${getDisplayFromNiveauFormation(classe as NiveauFormation)}`);
    
    // Reset form
    setFirstName("");
    setLastName("");
    setClasse(null);
    setTeacherRef("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel élève</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer un nouvel élève
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input 
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom de famille"
              autoComplete="family-name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input 
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
              autoComplete="given-name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class">Classe</Label>
            <Select 
              value={classe as string}
              onValueChange={(value) => setClasse(value as NiveauFormation)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NiveauFormation.SECONDE}>2nde PMIA</SelectItem>
                <SelectItem value={NiveauFormation.PREMIERE}>1ère MSPC</SelectItem>
                <SelectItem value={NiveauFormation.TERMINALE}>Term. MSPC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacher">Enseignant référent</Label>
            <Select
              value={teacherRef}
              onValueChange={(value) => setTeacherRef(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un enseignant" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map(teacher => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewStudentForm;
