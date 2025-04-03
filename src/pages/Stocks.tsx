
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  FileText,
  ChartBar,
  EuroIcon,
  Users,
  History,
  Building2,
  AlertOctagon,
  Settings2,
  MapPin,
} from "lucide-react";

const Stocks = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des Stocks</h1>
      
      <Tabs defaultValue="reapprovisionnements" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <TabsTrigger value="reapprovisionnements" className="w-full">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Réapprovisionnements
          </TabsTrigger>
          <TabsTrigger value="mouvements" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Mouvements
          </TabsTrigger>
          <TabsTrigger value="inventaires" className="w-full">
            <ChartBar className="w-4 h-4 mr-2" />
            Inventaires
          </TabsTrigger>
          <TabsTrigger value="valorisation" className="w-full">
            <EuroIcon className="w-4 h-4 mr-2" />
            Valorisation
          </TabsTrigger>
          <TabsTrigger value="fournisseurs" className="w-full">
            <Users className="w-4 h-4 mr-2" />
            Fournisseurs
          </TabsTrigger>
          <TabsTrigger value="historique" className="w-full">
            <History className="w-4 h-4 mr-2" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="magasins" className="w-full">
            <Building2 className="w-4 h-4 mr-2" />
            Multi-magasins
          </TabsTrigger>
          <TabsTrigger value="dangerosite" className="w-full">
            <AlertOctagon className="w-4 h-4 mr-2" />
            Dangerosité
          </TabsTrigger>
          <TabsTrigger value="techniques" className="w-full">
            <Settings2 className="w-4 h-4 mr-2" />
            Données techniques
          </TabsTrigger>
          <TabsTrigger value="localisation" className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Localisation
          </TabsTrigger>
        </TabsList>

        {["reapprovisionnements", "mouvements", "inventaires", "valorisation", 
          "fournisseurs", "historique", "magasins", "dangerosite", "techniques", 
          "localisation"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{tab}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contenu de l'onglet {tab} à implémenter
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Stocks;
