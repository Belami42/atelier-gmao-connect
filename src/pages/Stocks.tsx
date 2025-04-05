import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import BlurryCard from "@/components/ui/BlurryCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import GenerateOrdersModal from "@/components/stocks/GenerateOrdersModal";
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
  Plus,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Printer,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  Check,
  Clipboard,
} from "lucide-react";

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Sample data for demonstration
  const lowStockItems = [
    { id: 1, name: "Vis M6x30", currentStock: 15, threshold: 20, unit: "pcs", supplier: "Boulonerie Pro" },
    { id: 2, name: "Huile hydraulique", currentStock: 2, threshold: 5, unit: "L", supplier: "TotalEnergies" },
    { id: 3, name: "Filtre à air", currentStock: 3, threshold: 10, unit: "pcs", supplier: "Filtration Expert" },
    { id: 4, name: "Courroie trapézoïdale", currentStock: 5, threshold: 8, unit: "pcs", supplier: "Transmissions Inc." },
  ];

  const stockMovements = [
    { id: 1, date: "2025-03-30", product: "Vis M6x30", quantity: -10, type: "Sortie", operator: "Jean Dupont", destination: "Atelier A" },
    { id: 2, date: "2025-03-28", product: "Huile hydraulique", quantity: +20, type: "Entrée", operator: "Marie Martin", source: "Livraison TotalEnergies" },
    { id: 3, date: "2025-03-25", product: "Filtre à air", quantity: -2, type: "Sortie", operator: "Lucas Bernard", destination: "Maintenance préventive" },
    { id: 4, date: "2025-03-23", product: "Courroie trapézoïdale", quantity: +15, type: "Entrée", operator: "Sophie Petit", source: "Livraison Transmissions Inc." },
  ];

  const suppliers = [
    { id: 1, name: "Boulonerie Pro", contact: "Thomas Leroy", email: "t.leroy@bouloneriepro.fr", phone: "01 23 45 67 89", deliveryTime: "3-5 jours" },
    { id: 2, name: "TotalEnergies", contact: "Claire Dubois", email: "claire.dubois@totalenergies.com", phone: "01 98 76 54 32", deliveryTime: "1-2 jours" },
    { id: 3, name: "Filtration Expert", contact: "Paul Martin", email: "p.martin@filtrationexpert.fr", phone: "01 45 67 89 01", deliveryTime: "4-7 jours" },
    { id: 4, name: "Transmissions Inc.", contact: "Julie Blanc", email: "j.blanc@transmissions.fr", phone: "01 54 32 10 98", deliveryTime: "2-4 jours" },
  ];

  const warehouses = [
    { id: 1, name: "Magasin Principal", location: "Bâtiment A", manager: "Robert Dupont", items: 1245 },
    { id: 2, name: "Stock Atelier", location: "Bâtiment B", manager: "Camille Martin", items: 348 },
    { id: 3, name: "Réserve Consommables", location: "Bâtiment A, Sous-sol", manager: "Philippe Legrand", items: 127 },
  ];

  const hazardousItems = [
    { id: 1, name: "Acétone", category: "Inflammable", stockLevel: 5, location: "Armoire sécurisée #1", symbols: ["GHS02", "GHS07"] },
    { id: 2, name: "Huile de coupe", category: "Irritant", stockLevel: 12, location: "Zone spéciale fluides", symbols: ["GHS07"] },
    { id: 3, name: "Peinture epoxy", category: "Inflammable/Toxique", stockLevel: 8, location: "Armoire sécurisée #2", symbols: ["GHS02", "GHS08"] },
  ];

  const technicalItems = [
    { id: 1, name: "Moteur électrique 1.5kW", reference: "ME-1500-T", specs: "1500W, 380V, 2800tr/min", location: "Magasin Principal" },
    { id: 2, name: "Capteur de pression", reference: "CP-250-B", specs: "0-250 bars, sortie 4-20mA", location: "Stock Atelier" },
    { id: 3, name: "Variateur de fréquence", reference: "VF-7.5-3", specs: "7.5kW, triphasé, IP54", location: "Magasin Principal" },
  ];

  const inventoryStats = {
    totalItems: 1720,
    totalValue: 87650,
    avgRotation: 4.2,
    slowMovers: 127,
    fastMovers: 245,
  };

  const valuationData = [
    { category: "Pièces mécaniques", value: 35840, percentage: 41 },
    { category: "Électronique", value: 22350, percentage: 25 },
    { category: "Consommables", value: 15320, percentage: 18 },
    { category: "Fluides", value: 8740, percentage: 10 },
    { category: "Outillage", value: 5400, percentage: 6 },
  ];

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des Stocks</h1>
      
      <Tabs defaultValue="reapprovisionnements" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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

        <TabsContent value="reapprovisionnements">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Articles sous le seuil d'alerte</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualiser
                  </Button>
                  <Button onClick={openOrderModal}>
                    <Clipboard className="w-4 h-4 mr-2" />
                    Générer commandes
                  </Button>
                </div>
              </div>

              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  {lowStockItems.length} articles sont en dessous du seuil minimal. Une commande est recommandée.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">Désignation</th>
                      <th className="text-right p-3 font-medium">Stock actuel</th>
                      <th className="text-right p-3 font-medium">Seuil</th>
                      <th className="text-left p-3 font-medium">Unité</th>
                      <th className="text-left p-3 font-medium">Fournisseur</th>
                      <th className="text-center p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-right">
                          <Badge variant="destructive">{item.currentStock}</Badge>
                        </td>
                        <td className="p-3 text-right">{item.threshold}</td>
                        <td className="p-3">{item.unit}</td>
                        <td className="p-3">{item.supplier}</td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="mouvements">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Édition des mouvements de stock</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Période
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau mouvement
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Entrée de stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Article</label>
                        <Input placeholder="Rechercher un article..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Quantité</label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date</label>
                          <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Source</label>
                        <Input placeholder="Ex: Livraison fournisseur" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Commentaire</label>
                        <Textarea placeholder="Détails du mouvement..." />
                      </div>
                      <Button className="w-full">Enregistrer l'entrée</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sortie de stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Article</label>
                        <Input placeholder="Rechercher un article..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Quantité</label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date</label>
                          <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Destination</label>
                        <Input placeholder="Ex: Réparation machine #2" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Commentaire</label>
                        <Textarea placeholder="Détails du mouvement..." />
                      </div>
                      <Button className="w-full" variant="secondary">Enregistrer la sortie</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mb-4">Derniers mouvements</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Article</th>
                      <th className="text-right p-3 font-medium">Quantité</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Opérateur</th>
                      <th className="text-left p-3 font-medium">Détail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="border-t">
                        <td className="p-3">{movement.date}</td>
                        <td className="p-3">{movement.product}</td>
                        <td className="p-3 text-right">
                          <Badge variant={movement.quantity > 0 ? "default" : "secondary"}>
                            {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                          </Badge>
                        </td>
                        <td className="p-3">{movement.type}</td>
                        <td className="p-3">{movement.operator}</td>
                        <td className="p-3">
                          {movement.source || movement.destination}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="inventaires">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Analyse d'inventaire</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Période
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel inventaire
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Total articles</p>
                      <p className="text-3xl font-bold">{inventoryStats.totalItems}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Valeur totale</p>
                      <p className="text-3xl font-bold">{inventoryStats.totalValue} €</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Rotation moyenne</p>
                      <p className="text-3xl font-bold">{inventoryStats.avgRotation}/an</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Faible rotation</p>
                      <p className="text-3xl font-bold">{inventoryStats.slowMovers}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Forte rotation</p>
                      <p className="text-3xl font-bold">{inventoryStats.fastMovers}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Historique des inventaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">Inventaire annuel</p>
                          <p className="text-sm text-muted-foreground">28/12/2024</p>
                        </div>
                        <Badge>Complet</Badge>
                        <Button variant="ghost" size="sm">Voir</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">Inventaire partiel - Consommables</p>
                          <p className="text-sm text-muted-foreground">15/09/2024</p>
                        </div>
                        <Badge variant="secondary">Partiel</Badge>
                        <Button variant="ghost" size="sm">Voir</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium">Inventaire partiel - Électronique</p>
                          <p className="text-sm text-muted-foreground">02/06/2024</p>
                        </div>
                        <Badge variant="secondary">Partiel</Badge>
                        <Button variant="ghost" size="sm">Voir</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Écarts d'inventaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total des écarts</span>
                        <span className="font-bold">2.7%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '2.7%' }}></div>
                      </div>
                      
                      <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <p className="font-medium">Vis M6x30</p>
                          <div className="flex items-center">
                            <p className="text-destructive font-medium">-45 pcs</p>
                            <Button variant="ghost" size="sm">Corriger</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <p className="font-medium">Huile hydraulique</p>
                          <div className="flex items-center">
                            <p className="text-primary font-medium">+2 L</p>
                            <Button variant="ghost" size="sm">Corriger</Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <p className="font-medium">Filtre à air</p>
                          <div className="flex items-center">
                            <p className="text-destructive font-medium">-1 pc</p>
                            <Button variant="ghost" size="sm">Corriger</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </Button>
              </div>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="valorisation">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Valorisation des stocks (PMP)</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Trier
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Valeur totale du stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">{inventoryStats.totalValue} €</span>
                  </div>
                  
                  <div className="space-y-4">
                    {valuationData.map((category) => (
                      <div key={category.category}>
                        <div className="flex justify-between items-center mb-1">
                          <span>{category.category}</span>
                          <span>{category.value} € ({category.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 bg-primary rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prix Moyen Pondéré (PMP)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Article</th>
                          <th className="text-right p-3 font-medium">Stock</th>
                          <th className="text-right p-3 font-medium">PMP</th>
                          <th className="text-right p-3 font-medium">Valeur</th>
                          <th className="text-left p-3 font-medium">Dernier achat</th>
                          <th className="text-right p-3 font-medium">Évolution</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">Vis M6x30</td>
                          <td className="p-3 text-right">243 pcs</td>
                          <td className="p-3 text-right">0,12 €</td>
                          <td className="p-3 text-right">29,16 €</td>
                          <td className="p-3">15/03/2025</td>
                          <td className="p-3 text-right text-green-600">-2,5%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Huile hydraulique</td>
                          <td className="p-3 text-right">22 L</td>
                          <td className="p-3 text-right">5,45 €</td>
                          <td className="p-3 text-right">119,90 €</td>
                          <td className="p-3">28/03/2025</td>
                          <td className="p-3 text-right text-red-600">+4,8%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Filtre à air</td>
                          <td className="p-3 text-right">8 pcs</td>
                          <td className="p-3 text-right">18,75 €</td>
                          <td className="p-3 text-right">150,00 €</td>
                          <td className="p-3">22/02/2025</td>
                          <td className="p-3 text-right text-green-600">-1,3%</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Courroie trapézoïdale</td>
                          <td className="p-3 text-right">15 pcs</td>
                          <td className="p-3 text-right">12,30 €</td>
                          <td className="p-3 text-right">184,50 €</td>
                          <td className="p-3">23/03/2025</td>
                          <td className="p-3 text-right text-red-600">+6,2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="fournisseurs">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion des fournisseurs</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau fournisseur
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {suppliers.map((supplier) => (
                  <Card key={supplier.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{supplier.name}</CardTitle>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Contact:</span>
                          <span>{supplier.contact}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Email:</span>
                          <span>{supplier.email}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Téléphone:</span>
                          <span>{supplier.phone}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Délai livraison:</span>
                          <span>{supplier.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Catalogue</Button>
                        <Button size="sm">Commander</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="historique">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Historique des mouvements</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Filtrer par dates
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Article</th>
                          <th className="text-right p-3 font-medium">Quantité</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Opérateur</th>
                          <th className="text-left p-3 font-medium">Détail</th>
                          <th className="text-right p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...stockMovements, 
                          { id: 5, date: "2025-03-20", product: "Vis M6x30", quantity: +100, type: "Entrée", operator: "Jean Dupont", source: "Livraison Boulonerie Pro" },
                          { id: 6, date: "2025-03-18", product: "Courroie trapézoïdale", quantity: -3, type: "Sortie", operator: "Lucas Bernard", destination: "Réparation Machine #4" },
                          { id: 7, date: "2025-03-15", product: "Huile hydraulique", quantity: -5, type: "Sortie", operator: "Marie Martin", destination: "Maintenance Presse P1" },
                          { id: 8, date: "2025-03-10", product: "Filtre à air", quantity: +20, type: "Entrée", operator: "Sophie Petit", source: "Livraison Filtration Expert" },
                          { id: 9, date: "2025-03-05", product: "Vis M6x30", quantity: -25, type: "Sortie", operator: "Jean Dupont", destination: "Atelier B" },
                          { id: 10, date: "2025-03-01", product: "Courroie trapézoïdale", quantity: +5, type: "Entrée", operator: "Marie Martin", source: "Retour non utilisé" },
                        ].map((movement) => (
                          <tr key={movement.id} className="border-t">
                            <td className="p-3">{movement.date}</td>
                            <td className="p-3">{movement.product}</td>
                            <td className="p-3 text-right">
                              <Badge variant={movement.quantity > 0 ? "default" : "secondary"}>
                                {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                              </Badge>
                            </td>
                            <td className="p-3">{movement.type}</td>
                            <td className="p-3">{movement.operator}</td>
                            <td className="p-3">
                              {movement.source || movement.destination}
                            </td>
                            <td className="p-3 text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" disabled>Précédent</Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Suivant</Button>
                </div>
              </div>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="magasins">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion multi-magasins</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un magasin
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {warehouses.map((warehouse) => (
                  <Card key={warehouse.id}>
                    <CardHeader className="pb-2">
                      <CardTitle>{warehouse.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Emplacement:</span>
                          <span>{warehouse.location}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Gestionnaire:</span>
                          <span>{warehouse.manager}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Articles:</span>
                          <span>{warehouse.items}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Inventaire</Button>
                        <Button size="sm">Gérer</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transferts entre magasins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Article</label>
                      <Input placeholder="Rechercher un article..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Magasin source</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Magasin Principal</option>
                          <option>Stock Atelier</option>
                          <option>Réserve Consommables</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Magasin destination</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Stock Atelier</option>
                          <option>Magasin Principal</option>
                          <option>Réserve Consommables</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Quantité</label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date</label>
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Commentaire</label>
                      <Textarea placeholder="Motif du transfert..." />
                    </div>
                    <Button className="w-full">Effectuer le transfert</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="dangerosite">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Produits dangereux</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <Alert className="mb-6" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  Ces produits nécessitent une manipulation selon les procédures de sécurité établies.
                  Consultez les fiches de sécurité avant utilisation.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {hazardousItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{item.name}</CardTitle>
                        <Badge variant="destructive">{item.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center justify-center p-2">
                        <div className="flex gap-2">
                          {item.symbols.includes("GHS02") && (
                            <div className="p-2 bg-orange-100 rounded-full">
                              <AlertTriangle className="h-8 w-8 text-orange-500" />
                            </div>
                          )}
                          {item.symbols.includes("GHS07") && (
                            <div className="p-2 bg-yellow-100 rounded-full">
                              <AlertOctagon className="h-8 w-8 text-yellow-500" />
                            </div>
                          )}
                          {item.symbols.includes("GHS08") && (
                            <div className="p-2 bg-red-100 rounded-full">
                              <AlertOctagon className="h-8 w-8 text-red-500" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Stock:</span>
                          <span>{item.stockLevel} unités</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Localisation:</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Fiche sécurité</Button>
                        <Button size="sm">Gérer</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Procédures de sécurité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-2 bg-muted/50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <p>Port des EPI obligatoire (gants, lunettes, masque selon produit)</p>
                    </div>
                    <div className="flex items-center p-2 bg-muted/50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <p>Stockage dans les armoires ou zones dédiées uniquement</p>
                    </div>
                    <div className="flex items-center p-2 bg-muted/50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <p>Consultation de la FDS avant toute manipulation</p>
                    </div>
                    <div className="flex items-center p-2 bg-muted/50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <p>Formation obligatoire pour les utilisateurs</p>
                    </div>
                    <div className="flex items-center p-2 bg-muted/50 rounded">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <p>Signalement immédiat de tout incident ou déversement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="techniques">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Données techniques</h2>
                <div className="flex space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {technicalItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{item.name}</CardTitle>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Référence:</span>
                          <span className="font-mono">{item.reference}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Spécifications:</span>
                          <span>{item.specs}</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3 text-muted-foreground">Localisation:</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Documents associés</p>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="cursor-pointer">Fiche technique</Badge>
                            <Badge variant="outline" className="cursor-pointer">Schéma</Badge>
                          </div>
                        </div>
                        <div className="flex justify-end items-end">
                          <Button size="sm">Détails</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ajouter des données techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Désignation</label>
                      <Input placeholder="Nom de l'article..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Référence</label>
                        <Input placeholder="Référence..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Localisation</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Magasin Principal</option>
                          <option>Stock Atelier</option>
                          <option>Réserve Consommables</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Spécifications techniques</label>
                      <Textarea placeholder="Détails techniques..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Documents</label>
                      <Input type="file" />
                    </div>
                    <Button className="w-full">Enregistrer</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurryCard>
        </TabsContent>

        <TabsContent value="localisation">
          <BlurryCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Localisation des stocks</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Définir emplacement
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Plan des zones de stockage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border border-muted rounded-md bg-muted/10">
                      <AspectRatio ratio={16 / 9}>
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="grid grid-cols-4 grid-rows-3 gap-2 p-8 w-full h-full">
                            {/* Simplified warehouse layout */}
                            <div className="bg-green-100 border border-green-300 rounded flex items-center justify-center">
                              <span className="font-medium text-green-800">A1</span>
                            </div>
                            <div className="bg-green-100 border border-green-300 rounded flex items-center justify-center">
                              <span className="font-medium text-green-800">A2</span>
                            </div>
                            <div className="bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="font-medium text-blue-800">A3</span>
                            </div>
                            <div className="bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="font-medium text-blue-800">A4</span>
                            </div>

                            <div className="bg-green-100 border border-green-300 rounded flex items-center justify-center">
                              <span className="font-medium text-green-800">B1</span>
                            </div>
                            <div className="bg-green-100 border border-green-300 rounded flex items-center justify-center">
                              <span className="font-medium text-green-800">B2</span>
                            </div>
                            <div className="bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="font-medium text-blue-800">B3</span>
                            </div>
                            <div className="bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                              <span className="font-medium text-blue-800">B4</span>
                            </div>

                            <div className="bg-red-100 border border-red-300 rounded flex items-center justify-center">
                              <span className="font-medium text-red-800">C1</span>
                            </div>
                            <div className="bg-red-100 border border-red-300 rounded flex items-center justify-center">
                              <span className="font-medium text-red-800">C2</span>
                            </div>
                            <div className="bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center">
                              <span className="font-medium text-yellow-800">C3</span>
                            </div>
                            <div className="bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center">
                              <span className="font-medium text-yellow-800">C4</span>
                            </div>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
                        <span className="text-sm">Mécanique</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
                        <span className="text-sm">Électronique</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                        <span className="text-sm">Produits dangereux</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
                        <span className="text-sm">Consommables</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Liste des emplacements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-64 mb-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Article</th>
                          <th className="text-left p-3 font-medium">Emplacement</th>
                          <th className="text-left p-3 font-medium">Magasin</th>
                          <th className="text-left p-3 font-medium">Zone</th>
                          <th className="text-right p-3 font-medium">Stock</th>
                          <th className="text-center p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3">Vis M6x30</td>
                          <td className="p-3">A1-03-B</td>
                          <td className="p-3">Magasin Principal</td>
                          <td className="p-3">Mécanique</td>
                          <td className="p-3 text-right">243 pcs</td>
                          <td className="p-3 text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Huile hydraulique</td>
                          <td className="p-3">C1-05-A</td>
                          <td className="p-3">Magasin Principal</td>
                          <td className="p-3">Produits dangereux</td>
                          <td className="p-3 text-right">22 L</td>
                          <td className="p-3 text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Filtre à air</td>
                          <td className="p-3">C4-02-C</td>
                          <td className="p-3">Stock Atelier</td>
                          <td className="p-3">Consommables</td>
                          <td className="p-3 text-right">8 pcs</td>
                          <td className="p-3 text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Courroie trapézoïdale</td>
                          <td className="p-3">A2-08-D</td>
                          <td className="p-3">Magasin Principal</td>
                          <td className="p-3">Mécanique</td>
                          <td className="p-3 text-right">15 pcs</td>
                          <td className="p-3 text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3">Capteur de pression</td>
                          <td className="p-3">B3-01-A</td>
                          <td className="p-3">Stock Atelier</td>
                          <td className="p-3">Électronique</td>
                          <td className="p-3 text-right">3 pcs</td>
                          <td className="p-3 text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </BlurryCard>
        </TabsContent>
      </Tabs>
      
      <GenerateOrdersModal 
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        lowStockItems={lowStockItems}
      />
    </div>
  );
};

export default Stocks;
