import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Wrench, 
  Clock, 
  Calendar, 
  User, 
  Send,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";
import { saveMission } from "@/services/missionService";
import { toast } from "sonner";
import { Mission, MissionType, MissionPriority, MissionStatus } from "@/components/mission/MissionCard";

const NewMission = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [missionType, setMissionType] = useState<MissionType | undefined>(undefined);
  const [priority, setPriority] = useState<MissionPriority | undefined>(undefined);
  const [status, setStatus] = useState<MissionStatus>("to_assign");
  const [plannedDate, setPlannedDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data
  const equipment = [
    { id: "robot1", name: "Robot FANUC LR Mate 200iD", location: "Atelier 1" },
    { id: "cnc1", name: "Machine CNC Haas", location: "Atelier 1" },
    { id: "conveyor1", name: "Convoyeur à bande", location: "Atelier 2" },
    { id: "plc1", name: "Automate Siemens S7", location: "Laboratoire 1" },
    { id: "pump1", name: "Système hydraulique", location: "Atelier 2" }
  ];

  const users = [
    { id: "user1", name: "Thomas D.", role: "teacher" },
    { id: "user2", name: "Julie M.", role: "teacher" },
    { id: "user3", name: "Marie L.", role: "student", class: "BTS MSPC 1" },
    { id: "user4", name: "Alex B.", role: "student", class: "BTS MSPC 1" },
    { id: "user5", name: "Léa B.", role: "student", class: "BTS MSPC 2" },
    { id: "user6", name: "Lucas G.", role: "student", class: "BTS MSPC 2" }
  ];

  const skills = [
    { id: "skill1", code: "MS1", name: "Analyser un système" },
    { id: "skill2", code: "MS2", name: "Préparer une intervention" },
    { id: "skill3", code: "MS3", name: "Mettre en œuvre une intervention" },
    { id: "skill4", code: "MS4", name: "Améliorer un système" },
    { id: "skill5", code: "MS5", name: "Communiquer les informations" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!title || !description || !selectedEquipment || !missionType || !priority) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Prepare mission data
      const missionData = {
        title,
        description,
        equipmentId: selectedEquipment,
        equipmentName: equipment.find(eq => eq.id === selectedEquipment)?.name || "",
        type: missionType,
        status,
        priority,
        assignedToNames: [
          ...users.filter(user => selectedTeachers.includes(user.id)).map(user => user.name),
          ...users.filter(user => selectedStudents.includes(user.id)).map(user => user.name)
        ],
        plannedDate: plannedDate || undefined,
        estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : undefined
      };
      
      // Save mission
      const savedMission = saveMission(missionData);
      
      // Navigate to missions list
      setTimeout(() => {
        navigate("/missions");
      }, 1500);
      
    } catch (error) {
      console.error("Error creating mission:", error);
      toast.error("Erreur lors de la création de la mission");
      setIsSubmitting(false);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };
  
  const handleTeacherToggle = (teacherId: string) => {
    setSelectedTeachers(prev => 
      prev.includes(teacherId) 
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };
  
  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="pl-0 text-muted-foreground mb-2 -ml-3" 
            onClick={() => navigate("/missions")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux missions
          </Button>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Nouvel ordre de mission
          </h1>
          <p className="text-muted-foreground mt-1">
            Créer une nouvelle mission de maintenance
          </p>
        </div>
        
        <SchoolLogo className="hidden md:block" />
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
          <h2 className="text-white font-bold text-2xl shadow-text">Nouvel Ordre de Mission</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BlurryCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Informations générales</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la mission*</Label>
                    <Input 
                      id="title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required 
                      placeholder="Ex: Remplacement capteur" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de mission*</Label>
                    <Select 
                      value={missionType} 
                      onValueChange={(value) => setMissionType(value as MissionType)} 
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventive">Préventive</SelectItem>
                        <SelectItem value="corrective">Corrective</SelectItem>
                        <SelectItem value="improvement">Améliorative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description détaillée de la mission..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="equipment">Équipement concerné*</Label>
                  <Select 
                    value={selectedEquipment} 
                    onValueChange={setSelectedEquipment} 
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un équipement" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.map((eq) => (
                        <SelectItem key={eq.id} value={eq.id}>
                          {eq.name} ({eq.location})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité*</Label>
                    <Select 
                      value={priority} 
                      onValueChange={(value) => setPriority(value as MissionPriority)} 
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut initial*</Label>
                    <Select 
                      value={status} 
                      onValueChange={(value) => setStatus(value as MissionStatus)} 
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to_assign">À assigner</SelectItem>
                        <SelectItem value="assigned">Assigné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </BlurryCard>
            
            <BlurryCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Planification</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="planned_date">Date prévue</Label>
                    <Input 
                      id="planned_date" 
                      type="date" 
                      value={plannedDate}
                      onChange={(e) => setPlannedDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estimated_duration">Durée estimée (minutes)</Label>
                    <Input 
                      id="estimated_duration" 
                      type="number" 
                      min="0" 
                      placeholder="Ex: 60" 
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prérequis et matériel nécessaire</Label>
                  <Textarea 
                    id="prerequisites" 
                    placeholder="Outils, pièces de rechange, documentation..."
                    rows={3}
                    value={prerequisites}
                    onChange={(e) => setPrerequisites(e.target.value)}
                  />
                </div>
              </div>
            </BlurryCard>
            
            <BlurryCard className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                <h3 className="text-lg font-medium">Attribution</h3>
                
                <Tabs defaultValue="students" className="w-fit">
                  <TabsList>
                    <TabsTrigger value="students">Élèves</TabsTrigger>
                    <TabsTrigger value="teachers">Enseignants</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.filter(user => user.role === "student").map((student) => (
                    <div key={student.id} className="flex items-center space-x-2 border rounded-md p-3">
                      <Checkbox 
                        id={`student-${student.id}`} 
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                      <Label htmlFor={`student-${student.id}`} className="flex flex-col">
                        <span>{student.name}</span>
                        <span className="text-sm text-muted-foreground">{student.class}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.filter(user => user.role === "teacher").map((teacher) => (
                      <div key={teacher.id} className="flex items-center space-x-2 border rounded-md p-3">
                        <Checkbox 
                          id={`teacher-${teacher.id}`}
                          checked={selectedTeachers.includes(teacher.id)}
                          onCheckedChange={() => handleTeacherToggle(teacher.id)} 
                        />
                        <Label htmlFor={`teacher-${teacher.id}`}>{teacher.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurryCard>
          </div>
          
          <div className="space-y-6">
            <BlurryCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Résumé de la mission</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Wrench size={18} className="text-primary" />
                  <span className="font-medium">Type:</span>
                  {missionType ? (
                    <Badge className={
                      missionType === "preventive" ? "bg-[#0EA5E9] text-white" : 
                      missionType === "corrective" ? "bg-[#F97316] text-white" : 
                      "bg-[#8B5CF6] text-white"
                    }>
                      {missionType === "preventive" ? "Préventive" : 
                       missionType === "corrective" ? "Corrective" : "Améliorative"}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Non sélectionné</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-primary" />
                  <span className="font-medium">Priorité:</span>
                  {priority ? (
                    <Badge className={
                      priority === "low" ? "bg-primary text-white" : 
                      priority === "normal" ? "bg-amber-500 text-white" : 
                      "bg-red-500 text-white"
                    }>
                      {priority === "low" ? "Basse" : 
                       priority === "normal" ? "Normale" : "Haute"}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Non sélectionné</span>
                  )}
                </div>
                
                <div className="flex items-start gap-2">
                  <Wrench size={18} className="text-primary mt-1" />
                  <div>
                    <span className="font-medium">Équipement:</span>
                    {selectedEquipment ? (
                      <div className="mt-1">
                        {equipment.find(eq => eq.id === selectedEquipment)?.name}
                        <div className="text-sm text-muted-foreground">
                          {equipment.find(eq => eq.id === selectedEquipment)?.location}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground mt-1">Non sélectionné</div>
                    )}
                  </div>
                </div>
              </div>
            </BlurryCard>
            
            <BlurryCard className="p-6">
              <h3 className="text-lg font-medium mb-4">Compétences associées</h3>
              
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`skill-${skill.id}`}
                      checked={selectedSkills.includes(skill.id)}
                      onCheckedChange={() => handleSkillToggle(skill.id)}
                    />
                    <Label htmlFor={`skill-${skill.id}`} className="text-sm flex gap-2">
                      <Badge variant="outline">{skill.code}</Badge>
                      <span>{skill.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </BlurryCard>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Prêt à créer la mission ?</CardTitle>
                <CardDescription className="text-center">
                  Vérifiez les informations avant de créer la mission
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="space-y-2 w-full">
                  <Button 
                    type="submit" 
                    className="w-full gap-2 bg-accent hover:bg-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">●</span>
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Créer la mission</span>
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/missions")}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
      
      <div className="md:hidden mt-8">
        <SchoolLogo />
      </div>
    </div>
  );
};

export default NewMission;
