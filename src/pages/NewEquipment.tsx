
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wrench, 
  Save, 
  QrCode, 
  Tag,
  Map,
  FileText,
  Upload,
  Camera,
  Link as LinkIcon
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
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import QRCodeGenerator from "@/components/equipment/QRCodeGenerator";
import { toast } from "sonner";

// Schéma de validation pour le formulaire d'équipement
const equipmentSchema = z.object({
  tag: z.string().min(2, "Le tag doit contenir au moins 2 caractères"),
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  brand: z.string().min(2, "La marque doit être spécifiée"),
  model: z.string().min(2, "Le modèle doit être spécifié"),
  location: z.string().min(2, "La localisation doit être spécifiée"),
  status: z.enum(["operational", "maintenance", "faulty"]),
  docLink: z.string().url("Veuillez entrer une URL valide").optional().or(z.literal("")),
});

type EquipmentForm = z.infer<typeof equipmentSchema>;

const NewEquipment = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedQRCode, setGeneratedQRCode] = useState<boolean>(false);
  
  // Initialiser le formulaire avec React Hook Form
  const form = useForm<EquipmentForm>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      tag: "",
      name: "",
      description: "",
      brand: "",
      model: "",
      location: "",
      status: "operational",
      docLink: "",
    },
  });
  
  // Gérer le téléchargement d'image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Soumettre le formulaire
  const onSubmit = (data: EquipmentForm) => {
    // Dans une application réelle, vous enverriez ces données à une API
    console.log("Données d'équipement soumises:", data);
    console.log("Image:", imagePreview);
    
    // Simuler la création réussie
    toast.success("Équipement créé avec succès");
    
    // Rediriger vers la liste des équipements
    setTimeout(() => {
      navigate("/equipment");
    }, 1500);
  };
  
  // Générer QR Code pour le lien de documentation
  const generateQRCode = () => {
    const docLink = form.getValues("docLink");
    if (!docLink) {
      toast.error("Veuillez d'abord entrer un lien de documentation valide");
      return;
    }
    
    setGeneratedQRCode(true);
    toast.success("QR Code généré avec succès");
  };
  
  // Construire l'URL de prévisualisation pour le QR Code
  const getQRCodeValue = () => {
    const baseUrl = window.location.origin;
    const tag = form.getValues("tag");
    const docLink = form.getValues("docLink");
    
    if (docLink) {
      return docLink;
    } else if (tag) {
      return `${baseUrl}/equipment/${tag}`;
    }
    return baseUrl;
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="h-8 w-8" />
            Nouvel équipement
          </h1>
          <p className="text-muted-foreground mt-1">
            Créez une nouvelle fiche d'équipement avec QR code
          </p>
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md rounded-xl border p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations générales */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Informations générales</h2>
                
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        Tag d'identification
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="EQ-123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'équipement</FormLabel>
                      <FormControl>
                        <Input placeholder="Robot Fanuc LR Mate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description détaillée de l'équipement..." 
                          {...field} 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Fanuc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modèle</FormLabel>
                        <FormControl>
                          <Input placeholder="LR Mate 200iD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Map className="h-4 w-4" />
                        Localisation
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Atelier robotique" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>État</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez l'état" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="operational">Opérationnel</SelectItem>
                          <SelectItem value="maintenance">En maintenance</SelectItem>
                          <SelectItem value="faulty">En panne</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Documentation et médias */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Documentation et médias</h2>
                
                <FormField
                  control={form.control}
                  name="docLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Lien vers la documentation
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Input 
                            placeholder="https://example.com/docs" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateQRCode}
                          className="flex items-center gap-1"
                        >
                          <QrCode className="h-4 w-4" />
                          <span>QR Code</span>
                        </Button>
                      </div>
                      <FormDescription>
                        Lien vers le dossier technique ou la documentation du fabricant
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center gap-1">
                    <Camera className="h-4 w-4" />
                    Photo de l'équipement
                  </Label>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Aperçu"
                            className="mx-auto max-h-64 rounded-md"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Cliquez pour changer d'image
                          </p>
                        </div>
                      ) : (
                        <div className="py-8 flex flex-col items-center">
                          <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="font-medium">Cliquez pour télécharger une image</p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG ou GIF (max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                {generatedQRCode && (
                  <div className="border rounded-md p-4 space-y-2 bg-muted/20">
                    <h3 className="font-medium">QR Code généré</h3>
                    <div className="flex flex-col items-center">
                      <QRCodeGenerator value={getQRCodeValue()} size={180} />
                      <p className="text-sm text-muted-foreground mt-2">
                        Scannez ce QR code pour accéder à la documentation
                      </p>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => {
                          // Dans une vraie application, implémentez l'impression ici
                          toast.info("Fonction d'impression en développement");
                        }}
                      >
                        Imprimer le QR code
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate("/equipment")}
              >
                Annuler
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewEquipment;
