
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Clipboard, Download, Printer, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface LowStockItem {
  id: number;
  name: string;
  currentStock: number;
  threshold: number;
  unit: string;
  supplier: string;
}

interface GenerateOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  lowStockItems: LowStockItem[];
}

const GenerateOrdersModal = ({ isOpen, onClose, lowStockItems }: GenerateOrdersModalProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [orderGenerating, setOrderGenerating] = useState(false);
  const [orderGenerated, setOrderGenerated] = useState(false);
  
  const handleToggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === lowStockItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(lowStockItems.map(item => item.id));
    }
  };
  
  const handleGenerateOrders = () => {
    if (selectedItems.length === 0) {
      toast.error("Veuillez sélectionner au moins un article");
      return;
    }
    
    setOrderGenerating(true);
    
    // Simulate order generation process
    setTimeout(() => {
      setOrderGenerating(false);
      setOrderGenerated(true);
      toast.success("Commandes générées avec succès");
    }, 1500);
  };
  
  const handlePrint = () => {
    toast.success("Document envoyé à l'impression");
  };
  
  const handleDownload = () => {
    toast.success("Document téléchargé");
  };
  
  const handleReset = () => {
    setSelectedItems([]);
    setOrderGenerated(false);
  };
  
  // Group items by supplier
  const itemsBySupplier = lowStockItems.reduce((acc, item) => {
    if (!acc[item.supplier]) {
      acc[item.supplier] = [];
    }
    acc[item.supplier].push(item);
    return acc;
  }, {} as Record<string, LowStockItem[]>);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center bg-primary/10 p-3 rounded-lg">
            <ShoppingCart className="mr-3 h-6 w-6 text-primary" />
            Génération des commandes fournisseurs
          </DialogTitle>
        </DialogHeader>
        
        {!orderGenerated ? (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedItems.length === lowStockItems.length && lowStockItems.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm font-medium">
                    Sélectionner tout
                  </label>
                </div>
                <Badge variant={selectedItems.length > 0 ? "default" : "outline"} className="text-sm">
                  {selectedItems.length} articles sélectionnés
                </Badge>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary/5 border-b">
                      <th className="w-10 p-3"></th>
                      <th className="text-left p-3 font-medium">Désignation</th>
                      <th className="text-right p-3 font-medium">Stock actuel</th>
                      <th className="text-right p-3 font-medium">Seuil</th>
                      <th className="text-left p-3 font-medium">Fournisseur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`border-t hover:bg-muted/40 transition-colors ${
                          selectedItems.includes(item.id) ? "bg-primary/5" : ""
                        }`}
                      >
                        <td className="p-3 text-center">
                          <Checkbox 
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleToggleItem(item.id)}
                          />
                        </td>
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3 text-right">
                          <Badge variant="destructive" className="font-bold">{item.currentStock}</Badge>
                        </td>
                        <td className="p-3 text-right">{item.threshold}</td>
                        <td className="p-3">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button 
                onClick={handleGenerateOrders} 
                disabled={selectedItems.length === 0 || orderGenerating}
                className="bg-primary hover:bg-primary/90"
              >
                {orderGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Générer les commandes
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4 text-green-800 dark:text-green-300 flex items-center">
              <Check className="h-6 w-6 mr-3 text-green-600 dark:text-green-400" />
              <span className="text-base">Les commandes ont été générées avec succès pour {Object.keys(itemsBySupplier).length} fournisseur(s)</span>
            </div>
            
            <div className="space-y-6">
              {Object.entries(itemsBySupplier).map(([supplier, items]) => {
                const supplierItems = items.filter(item => selectedItems.includes(item.id));
                if (supplierItems.length === 0) return null;
                
                return (
                  <div key={supplier} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-primary/10 p-4 font-medium text-lg border-b flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                      Commande: {supplier}
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50 border-b">
                          <th className="text-left p-3 font-medium">Désignation</th>
                          <th className="text-right p-3 font-medium">Stock actuel</th>
                          <th className="text-right p-3 font-medium">Quantité à commander</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierItems.map((item) => (
                          <tr key={item.id} className="border-t hover:bg-muted/30">
                            <td className="p-3 font-medium">{item.name}</td>
                            <td className="p-3 text-right">{item.currentStock}</td>
                            <td className="p-3 text-right font-bold text-primary">
                              {Math.max(item.threshold - item.currentStock, 5)} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-muted/30 p-3 flex justify-end space-x-3 border-t">
                      <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center">
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimer
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Exporter PDF
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <DialogFooter className="pt-4 border-t">
              <Button variant="outline" onClick={handleReset} className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Nouvelle commande
              </Button>
              <Button onClick={onClose} className="bg-primary hover:bg-primary/90">Terminer</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenerateOrdersModal;
