import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BlurryCard } from "@/components/ui/blurry-card";
import { PageHeader } from "@/components/ui/page-header";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [schoolName, setSchoolName] = useState("Lycée Professionnel Gustave Eiffel");
  const [academyName, setAcademyName] = useState("Académie de Bordeaux");
  const [currentYear, setCurrentYear] = useState("2023-2024");
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSaveGeneral = () => {
    toast.success("Paramètres généraux enregistrés");
  };

  const handleSaveNotifications = () => {
    toast.success("Paramètres de notifications enregistrés");
  };

  const handleSaveAppearance = () => {
    toast.success("Paramètres d'apparence enregistrés");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        description="Gérez les paramètres de l'application"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <BlurryCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Informations de l'établissement</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="schoolName">Nom de l'établissement</Label>
                <Input
                  id="schoolName"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="academyName">Académie</Label>
                <Input
                  id="academyName"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveGeneral}>Enregistrer</Button>
            </div>
          </BlurryCard>

          <BlurryCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Année scolaire</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentYear">Année scolaire en cours</Label>
                <Select value={currentYear} onValueChange={setCurrentYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une année" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveGeneral}>Enregistrer</Button>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>
                Configurez comment et quand vous recevez des notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Activer les notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications pour les événements importants
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir également les notifications par email
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Enregistrer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <BlurryCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Paramètres système</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer le thème sombre pour l'interface
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Sauvegarde automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Sauvegarder automatiquement les modifications
                  </p>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
              <Button onClick={handleSaveAppearance}>Enregistrer</Button>
            </div>
          </BlurryCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
