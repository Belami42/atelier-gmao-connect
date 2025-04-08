import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MaintenanceTask } from "@/components/equipment/EquipmentCard";
import { Equipment } from "@/components/equipment/EquipmentCard";
import { CompetenceCode, NiveauFormation } from "@/types/mspc";
import CompetencesList from "@/components/mspc/CompetencesList";
import { NiveauFormationType } from "@/types/niveauFormation";

type MaintenanceTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  equipmentOptions?: Equipment[];
  onSave?: (equipmentId: string, task: MaintenanceTask) => void;
  existingTask?: MaintenanceTask;
  editMode?: boolean;
  equipmentId?: string;
  equipmentName?: string;
};

const MaintenanceTaskModal: React.FC<MaintenanceTaskModalProps> = ({
  isOpen,
  onClose,
  selectedDate = null,
  equipmentOptions = [],
  onSave = () => {},
  existingTask,
  editMode = false,
  equipmentId,
  equipmentName
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"preventive" | "corrective" | "improvement">("preventive");
  const [date, setDate] = useState<Date | undefined>(selectedDate || undefined);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(equipmentId || "");
  const [niveau, setNiveau] = useState<NiveauFormation>("2PMIA");
  const [selectedCompetences, setSelectedCompetences] = useState<CompetenceCode[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  
  useEffect(() => {
    if (isOpen) {
      if (editMode && existingTask) {
        setTitle(existingTask.title);
        setDescription(existingTask.description || "");
        setType(existingTask.type);
        setDate(existingTask.date instanceof Date ? existingTask.date : new Date(existingTask.date));
        setNiveau(existingTask.niveau || "2PMIA");
        setSelectedCompetences(existingTask.competences || []);
        if (equipmentId) {
          setSelectedEquipmentId(equipmentId);
        }
      } else {
        setTitle("");
        setDescription("");
        setType("preventive");
        setDate(selectedDate || undefined);
        setNiveau("2PMIA");
        setSelectedCompetences([]);
        setSelectedEquipmentId(equipmentId || (equipmentOptions.length > 0 ? equipmentOptions[0].id : ""));
      }
    }
  }, [isOpen, editMode, existingTask, selectedDate, equipmentOptions, equipmentId]);
  
  const handleCompetenceSelect = (code: CompetenceCode, selected: boolean) => {
    if (selected) {
      setSelectedCompetences(prev => [...prev, code]);
    } else {
      setSelectedCompetences(prev => prev.filter(c => c !== code));
    }
  };
  
  const handleSubmit = () => {
    if (!title || !date || !selectedEquipmentId) return;
    
    const newTask: MaintenanceTask = {
      id: existingTask ? existingTask.id : `task-${Date.now()}`,
      title,
      description,
      date,
      type,
      completed: existingTask ? existingTask.completed : false,
      niveau,
      competences: selectedCompetences
    };
    
    onSave(selectedEquipmentId, newTask);
    onClose();
  };
  
  const getEquipmentNiveau = (): NiveauFormation => {
    if (equipmentId) {
      const equipment = equipmentOptions.find(eq => eq.id === equipmentId);
      return equipment?.niveau || "2PMIA";
    } else if (selectedEquipmentId) {
      const equipment = equipmentOptions.find(eq => eq.id === selectedEquipmentId);
      return equipment?.niveau || "2PMIA"; 
    }
    return "2PMIA";
  };
  
  useEffect(() => {
    if (!editMode) {
      setNiveau(getEquipmentNiveau());
    }
  }, [selectedEquipmentId]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editMode ? "Modifier la tâche" : "Nouvelle tâche de maintenance"}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="competences">Compétences MSPC</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            {!equipmentId && equipmentOptions.length > 0 && (
              <div className="grid gap-2">
                <Label htmlFor="equipment">Équipement</Label>
                <Select 
                  value={selectedEquipmentId} 
                  onValueChange={setSelectedEquipmentId}
                  disabled={editMode || !!equipmentId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un équipement" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentOptions.map(equipment => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        {equipment.name} {equipment.niveau ? `(${equipment.niveau})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {equipmentId && equipmentName && (
              <div className="grid gap-2">
                <Label htmlFor="equipment">Équipement</Label>
                <div className="p-2 border rounded-md bg-muted/40">
                  {equipmentName}
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Vérification des niveaux d'huile"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optionnelle)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Détails de la maintenance à effectuer..."
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Type de maintenance</Label>
              <RadioGroup 
                value={type} 
                onValueChange={(value) => setType(value as "preventive" | "corrective" | "improvement")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="preventive" id="preventive" />
                  <Label htmlFor="preventive" className="text-sm font-normal cursor-pointer">Préventive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corrective" id="corrective" />
                  <Label htmlFor="corrective" className="text-sm font-normal cursor-pointer">Corrective</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improvement" id="improvement" />
                  <Label htmlFor="improvement" className="text-sm font-normal cursor-pointer">Améliorative</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label>Date planifiée</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>Niveau de formation</Label>
              <Select 
                value={niveau} 
                onValueChange={(value) => setNiveau(value as NiveauFormation)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2PMIA">2nde PMIA</SelectItem>
                  <SelectItem value="1MSPC">1ère MSPC</SelectItem>
                  <SelectItem value="TMSPC">Terminale MSPC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="competences">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Compétences mobilisées</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sélectionnez les compétences du référentiel MSPC associées à cette tâche de maintenance.
                </p>
                
                <div className="bg-slate-50 p-2 rounded-md border">
                  <CompetencesList 
                    selectedCompetences={selectedCompetences}
                    onSelectCompetence={handleCompetenceSelect}
                    niveau={niveau}
                  />
                </div>
                
                <div className="mt-4">
                  <p className="text-sm">
                    <span className="font-medium">{selectedCompetences.length}</span> compétence(s) sélectionnée(s)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={!title || !date}>
            {editMode ? "Mettre à jour" : "Créer la tâche"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceTaskModal;
