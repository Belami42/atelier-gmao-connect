
import React from "react";
import { useNavigate } from "react-router-dom";
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
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowLeft, Plus, Upload, Trash2 } from "lucide-react";
import BlurryCard from "@/components/ui/BlurryCard";
import SchoolLogo from "@/components/shared/SchoolLogo";

const NewEquipment = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the submission
    navigate("/equipment");
  };

  const maintenanceImages = [
    "/lovable-uploads/89799078-f0a6-43dc-a2f0-bcd0e8907332.png",
    "/lovable-uploads/552dcec9-49b8-4640-99f8-c6989b60b59a.png",
    "/lovable-uploads/61cdf18f-b447-4984-b172-082bc046ad1f.png",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      {/* Technical Equipment Banner - Now at the top */}
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
          <h2 className="text-white font-bold text-2xl shadow-text">Nouvel Équipement</h2>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <Button 
            variant="ghost" 
            className="pl-0 text-muted-foreground mb-2 -ml-3" 
            onClick={() => navigate("/equipment")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux équipements
          </Button>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Nouvel équipement
          </h1>
          <p className="text-muted-foreground mt-1">
            Ajouter un nouvel équipement au parc
          </p>
        </div>
        
        <SchoolLogo className="hidden md:block" size="small" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BlurryCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations générales</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'équipement*</Label>
                    <Input id="name" required placeholder="Ex: Robot FANUC LR Mate 200iD" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference">Référence*</Label>
                    <Input id="reference" required placeholder="Ex: ROBOT-001" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Description de l'équipement..."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie*</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="robot">Robot</SelectItem>
                        <SelectItem value="cnc">CNC</SelectItem>
                        <SelectItem value="conveyor">Convoyeur</SelectItem>
                        <SelectItem value="hydraulic">Système hydraulique</SelectItem>
                        <SelectItem value="pneumatic">Système pneumatique</SelectItem>
                        <SelectItem value="electric">Système électrique</SelectItem>
                        <SelectItem value="plc">Automate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Fabricant</Label>
                    <Input id="manufacturer" placeholder="Ex: FANUC" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input id="model" placeholder="Ex: LR Mate 200iD" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Localisation et état</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Emplacement*</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zone_systeme">Zone système</SelectItem>
                        <SelectItem value="zone_experimentation">Zone expérimentation</SelectItem>
                        <SelectItem value="zone_fabrication">Zone fabrication</SelectItem>
                        <SelectItem value="zone_demontage">Zone démontage</SelectItem>
                        <SelectItem value="magasin">Magasin</SelectItem>
                        <SelectItem value="zone_stockage">Zone de stockage</SelectItem>
                        <SelectItem value="zone_stockage_petit">Zone stockage petits composants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">État*</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Opérationnel</SelectItem>
                        <SelectItem value="maintenance_required">Maintenance requise</SelectItem>
                        <SelectItem value="out_of_service">Hors service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serial">Numéro de série</Label>
                    <Input id="serial" placeholder="Ex: SN-12345678" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="acquisition_date">Date d'acquisition</Label>
                    <Input id="acquisition_date" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="warranty">Garantie jusqu'au</Label>
                    <Input id="warranty" type="date" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maintenance</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenance_interval">Intervalle de maintenance (jours)</Label>
                    <Input id="maintenance_interval" type="number" min="0" placeholder="Ex: 90" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_maintenance">Dernière maintenance</Label>
                    <Input id="last_maintenance" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenance_instructions">Instructions de maintenance</Label>
                  <Textarea 
                    id="maintenance_instructions" 
                    placeholder="Instructions spécifiques pour la maintenance de cet équipement..."
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => navigate("/equipment")}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  <Plus size={16} className="mr-2" />
                  Créer l'équipement
                </Button>
              </div>
            </form>
          </BlurryCard>
        </div>
        
        <div className="space-y-6">
          <BlurryCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Images</h3>
            <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h4 className="font-medium">Glisser-déposer des images</h4>
                <p className="text-sm text-muted-foreground">ou cliquez pour parcourir</p>
              </div>
              <Button variant="outline" className="w-full">
                Parcourir
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center">
                    IMG
                  </div>
                  <span>equipement-1.jpg</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </BlurryCard>
          
          <BlurryCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Documents</h3>
            <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h4 className="font-medium">Glisser-déposer des fichiers</h4>
                <p className="text-sm text-muted-foreground">PDF, DOC, XLS, etc.</p>
              </div>
              <Button variant="outline" className="w-full">
                Parcourir
              </Button>
            </div>
          </BlurryCard>
          
          <SchoolLogo className="md:hidden" size="small" />
        </div>
      </div>
    </div>
  );
};

export default NewEquipment;
