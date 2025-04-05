
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
          <DialogTitle className="text-xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Génération des commandes fournisseurs
          </DialogTitle>
        </DialogHeader>
        
        {!orderGenerated ? (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
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
                <Badge variant="outline">
                  {selectedItems.length} articles sélectionnés
                </Badge>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="w-10 p-3"></th>
                      <th className="text-left p-3 font-medium">Désignation</th>
                      <th className="text-right p-3 font-medium">Stock actuel</th>
                      <th className="text-right p-3 font-medium">Seuil</th>
                      <th className="text-left p-3 font-medium">Fournisseur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-3 text-center">
                          <Checkbox 
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleToggleItem(item.id)}
                          />
                        </td>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-right">
                          <Badge variant="destructive">{item.currentStock}</Badge>
                        </td>
                        <td className="p-3 text-right">{item.threshold}</td>
                        <td className="p-3">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button 
                onClick={handleGenerateOrders} 
                disabled={selectedItems.length === 0 || orderGenerating}
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
              <Check className="h-5 w-5 mr-2" />
              <span>Les commandes ont été générées avec succès pour {Object.keys(itemsBySupplier).length} fournisseur(s)</span>
            </div>
            
            <div className="space-y-4">
              {Object.entries(itemsBySupplier).map(([supplier, items]) => {
                const supplierItems = items.filter(item => selectedItems.includes(item.id));
                if (supplierItems.length === 0) return null;
                
                return (
                  <div key={supplier} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3 font-medium">
                      Commande: {supplier}
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30">
                          <th className="text-left p-3 font-medium">Désignation</th>
                          <th className="text-right p-3 font-medium">Stock actuel</th>
                          <th className="text-right p-3 font-medium">Quantité à commander</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierItems.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="p-3">{item.name}</td>
                            <td className="p-3 text-right">{item.currentStock}</td>
                            <td className="p-3 text-right font-medium">
                              {Math.max(item.threshold - item.currentStock, 5)} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-muted/30 p-3 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimer
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Exporter PDF
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleReset}>Nouvelle commande</Button>
              <Button onClick={onClose}>Terminer</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenerateOrdersModal;
