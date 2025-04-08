
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CompetencesList from "./CompetencesList";
import { CompetenceCode, TypeMaintenance, NiveauFormation } from "@/types/mspc";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CheckCircle2, ClipboardCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NewActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityCreated?: (activity: any) => void;
}

interface Student {
  id: string;
  name: string;
  classe: NiveauFormation;
}

const mockStudents: Student[] = [
  { id: "1", name: "Thomas Dupont", classe: "2PMIA" },
  { id: "2", name: "Julie Martin", classe: "1MSPC" },
  { id: "3", name: "Lucas Dubois", classe: "TMSPC" },
  { id: "4", name: "Emma Bernard", classe: "2PMIA" },
  { id: "5", name: "Léo Petit", classe: "1MSPC" },
  { id: "6", name: "Chloé Durand", classe: "TMSPC" },
];

const equipmentOptions = [
  { id: "eq1", name: "Machine-outil CNC" },
  { id: "eq2", name: "Système automatisé de production" },
  { id: "eq3", name: "Banc de test hydraulique" },
  { id: "eq4", name: "Convoyeur à bande" },
  { id: "eq5", name: "Robot manipulateur" },
];

const maintenanceTypes: { value: TypeMaintenance; label: string }[] = [
  { value: "correctif", label: "Maintenance corrective" },
  { value: "preventif_systematique", label: "Maintenance préventive systématique" },
  { value: "preventif_conditionnel", label: "Maintenance préventive conditionnelle" },
  { value: "amelioratif", label: "Maintenance améliorative" },
];

const NewActivityModal: React.FC<NewActivityModalProps> = ({
  open,
  onOpenChange,
  onActivityCreated,
}) => {
  const [selectedCompetences, setSelectedCompetences] = useState<CompetenceCode[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [classe, setClasse] = useState<NiveauFormation>("2PMIA");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents.filter(s => s.classe === "2PMIA"));
  
  const form = useForm({
    defaultValues: {
      title: "",
      student: "",
      equipment: "",
      maintenanceType: "correctif" as TypeMaintenance,
      description: "",
      report: "",
      isValidated: false,
      validatedBy: "",
    },
  });

  const handleCompetenceSelect = (code: CompetenceCode, selected: boolean) => {
    if (selected) {
      setSelectedCompetences(prev => [...prev, code]);
    } else {
      setSelectedCompetences(prev => prev.filter(c => c !== code));
    }
  };

  const handleClassChange = (value: NiveauFormation) => {
    setClasse(value);
    setFilteredStudents(mockStudents.filter(s => s.classe === value));
    form.setValue("student", "");
  };

  const onSubmit = (data: any) => {
    if (selectedCompetences.length === 0) {
      toast.error("Vous devez sélectionner au moins une compétence");
      return;
    }

    const newActivity = {
      id: `act-${Date.now()}`,
      title: data.title,
      date: format(date, "yyyy-MM-dd"),
      student: {
        id: data.student,
        name: mockStudents.find(s => s.id === data.student)?.name,
        classe,
      },
      equipment: equipmentOptions.find(e => e.id === data.equipment)?.name,
      maintenanceType: data.maintenanceType,
      description: data.description,
      competences: selectedCompetences,
      report: data.report,
      isValidated: data.isValidated,
      validatedBy: data.validatedBy,
      createdAt: new Date().toISOString(),
    };

    console.log("New activity created:", newActivity);
    toast.success("Activité enregistrée avec succès");
    
    if (onActivityCreated) {
      onActivityCreated(newActivity);
    }
    
    // Reset form
    form.reset();
    setSelectedCompetences([]);
    setDate(new Date());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="text-primary" size={20} />
            Enregistrer une nouvelle activité de maintenance
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Le titre est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de l'activité</FormLabel>
                      <FormControl>
                        <Input placeholder="Maintenance préventive du système hydraulique..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Date de réalisation</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Classe</Label>
                  <Select value={classe} onValueChange={(value: NiveauFormation) => handleClassChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                        <SelectItem value="2PMIA">2nde PMIA</SelectItem>
                        <SelectItem value="1MSPC">1ère MSPC</SelectItem>
                        <SelectItem value="TMSPC">Term. MSPC</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <FormField
                  control={form.control}
                  name="student"
                  rules={{ required: "L'élève est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Élève</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un élève" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Élèves de {classe}</SelectLabel>
                            {filteredStudents.length > 0 ? (
                              filteredStudents.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                Aucun élève dans cette classe
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment"
                  rules={{ required: "L'équipement est requis" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Équipement / Support</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un équipement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Équipements</SelectLabel>
                            {equipmentOptions.map((equipment) => (
                              <SelectItem key={equipment.id} value={equipment.id}>
                                {equipment.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de maintenance</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de maintenance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Types de maintenance</SelectLabel>
                            {maintenanceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "La description est requise" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de l'activité</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez l'activité de maintenance..." 
                          className="h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Compétences validées</FormLabel>
                  <div className="border rounded-md p-2 h-[200px] overflow-y-auto bg-white">
                    <CompetencesList 
                      selectedCompetences={selectedCompetences}
                      onSelectCompetence={handleCompetenceSelect}
                      niveau={classe}
                    />
                  </div>
                  {selectedCompetences.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedCompetences.length} compétence(s) sélectionnée(s)
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="report"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compte-rendu</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Compte-rendu de l'intervention..."
                          className="h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 pt-2">
                    <FormField
                      control={form.control}
                      name="isValidated"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Valider cette activité</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {form.watch("isValidated") && (
                    <FormField
                      control={form.control}
                      name="validatedBy"
                      rules={{ required: "Le validateur est requis si l'activité est validée" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validé par</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom du professeur ou validateur" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" className="gap-2">
                <CheckCircle2 size={16} />
                Enregistrer l'activité
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewActivityModal;
