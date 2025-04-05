import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Database, 
  School, 
  Palette, 
  HelpCircle,
  Save,
  Check,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BlurryCard from "@/components/ui/BlurryCard";
import { toast } from "sonner";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("generale");
  
  // Sample settings data
  const [settings, setSettings] = useState({
    general: {
      schoolName: "Lycée Mimard",
      address: "5 Rue Mimard, 42000 Saint-Étienne",
      phone: "04 77 49 59 20",
      email: "contact@mimard.fr"
    },
    notifications: {
      emailNotifs: true,
      maintenanceAlerts: true,
      studentProgressUpdate: false,
      lowStockAlert: true
    },
    appearance: {
      darkMode: false,
      highContrast: false,
      compactMode: false
    },
    database: {
      backupEnabled: true,
      backupInterval: "daily",
      backupRetention: "30",
      lastBackup: "2023-05-12T14:30:00"
    }
  });

  const handleSettingsChange = (category: string, setting: string, value: any) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [setting]: value
      }
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    toast.success("Paramètres enregistrés avec succès");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24 pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tech-gradient bg-clip-text text-transparent">
            Paramètres
          </h1>
          <p className="text-muted-foreground mt-1">
            Configuration de l'application et gestion des préférences
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={handleSaveSettings} className="gap-2 bg-primary hover:bg-primary/90">
            <Save size={16} />
            <span>Enregistrer les modifications</span>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <div className="hidden md:block">
          <BlurryCard className="p-0">
            <nav className="flex flex-col">
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'generale' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('generale')}
              >
                <School size={18} />
                <span>Général</span>
                {activeTab === 'generale' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} />
                <span>Notifications</span>
                {activeTab === 'notifications' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'apparence' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('apparence')}
              >
                <Palette size={18} />
                <span>Apparence</span>
                {activeTab === 'apparence' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'securite' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('securite')}
              >
                <Lock size={18} />
                <span>Sécurité</span>
                {activeTab === 'securite' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'database' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('database')}
              >
                <Database size={18} />
                <span>Base de données</span>
                {activeTab === 'database' && <ChevronRight className="ml-auto" size={16} />}
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${activeTab === 'aide' ? 'bg-primary/10 text-primary font-medium' : ''}`}
                onClick={() => setActiveTab('aide')}
              >
                <HelpCircle size={18} />
                <span>Aide</span>
                {activeTab === 'aide' && <ChevronRight className="ml-auto" size={16} />}
              </button>
            </nav>
          </BlurryCard>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="generale" className="gap-2">
                <School size={14} />
                <span>Général</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell size={14} />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2">
                <Database size={14} />
                <span>Base de données</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Settings content */}
        <div className="space-y-6">
          {/* General Settings */}
          {activeTab === 'generale' && (
            <BlurryCard className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                Paramètres généraux
              </h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l'établissement</label>
                  <Input 
                    value={settings.general.schoolName} 
                    onChange={(e) => handleSettingsChange('general', 'schoolName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adresse</label>
                  <Input 
                    value={settings.general.address} 
                    onChange={(e) => handleSettingsChange('general', 'address', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input 
                      value={settings.general.phone} 
                      onChange={(e) => handleSettingsChange('general', 'phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      value={settings.general.email} 
                      onChange={(e) => handleSettingsChange('general', 'email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save size={16} />
                  <span>Enregistrer</span>
                </Button>
              </div>
            </BlurryCard>
          )}
          
          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <BlurryCard className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Paramètres de notifications
              </h2>
              
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="emailNotifs" 
                    checked={settings.notifications.emailNotifs}
                    onCheckedChange={(checked) => 
                      handleSettingsChange('notifications', 'emailNotifs', Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="emailNotifs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Activer les notifications par email
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="maintenanceAlerts" 
                    checked={settings.notifications.maintenanceAlerts}
                    onCheckedChange={(checked) => 
                      handleSettingsChange('notifications', 'maintenanceAlerts', Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="maintenanceAlerts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Alertes de maintenance
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="studentProgressUpdate" 
                    checked={settings.notifications.studentProgressUpdate}
                    onCheckedChange={(checked) => 
                      handleSettingsChange('notifications', 'studentProgressUpdate', Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="studentProgressUpdate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mises à jour de la progression des élèves
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="lowStockAlert" 
                    checked={settings.notifications.lowStockAlert}
                    onCheckedChange={(checked) => 
                      handleSettingsChange('notifications', 'lowStockAlert', Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="lowStockAlert"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Alertes de stock bas
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save size={16} />
                  <span>Enregistrer</span>
                </Button>
              </div>
            </BlurryCard>
          )}
          
          {/* Database Settings */}
          {activeTab === 'database' && (
            <BlurryCard className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Gestion de la base de données
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="backupEnabled" 
                    checked={settings.database.backupEnabled}
                    onCheckedChange={(checked) => 
                      handleSettingsChange('database', 'backupEnabled', Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="backupEnabled"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Activer les sauvegardes automatiques
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fréquence des sauvegardes</label>
                  <select 
                    value={settings.database.backupInterval}
                    onChange={(e) => handleSettingsChange('database', 'backupInterval', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Durée de conservation (jours)</label>
                  <Input 
                    type="number"
                    value={settings.database.backupRetention}
                    onChange={(e) => handleSettingsChange('database', 'backupRetention', e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-semibold mb-4">Opérations de la base de données</h3>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="gap-2 w-full justify-start">
                      <Save size={16} />
                      <span>Sauvegarder maintenant</span>
                    </Button>
                    
                    <Button variant="outline" className="gap-2 w-full justify-start">
                      <Database size={16} />
                      <span>Restaurer à partir d'une sauvegarde</span>
                    </Button>
                    
                    <Button variant="outline" className="gap-2 w-full justify-start text-destructive hover:text-destructive">
                      <Database size={16} />
                      <span>Réinitialiser la base de données</span>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Dernière sauvegarde:</p>
                  <p className="text-sm font-medium">12 mai 2023 à 14:30</p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save size={16} />
                  <span>Enregistrer</span>
                </Button>
              </div>
            </BlurryCard>
          )}
          
          {/* Other settings tabs would go here */}
          {(activeTab !== 'generale' && activeTab !== 'notifications' && activeTab !== 'database') && (
            <BlurryCard className="p-6">
              <h2 className="text-xl font-semibold mb-6">Paramètres {activeTab}</h2>
              <p className="text-muted-foreground">Cette section est en cours de développement.</p>
            </BlurryCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
