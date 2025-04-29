
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { VendorDealFilters } from "./VendorDealFilters";
import { VendorDealCard } from "./VendorDealCard";
import { Deal, getVendorDeals } from "@/services/dealService";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VendorCreateDealForm } from "./VendorCreateDealForm";

export const VendorDealsTab = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const fetchDeals = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const vendorDeals = await getVendorDeals(user.id);
      setDeals(vendorDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (user?.id) {
      fetchDeals();
    }
  }, [user?.id]);
  
  const filteredDeals = deals.filter(deal => {
    if (activeFilter === "all") return true;
    return deal.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">My Deals</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <VendorDealFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
          <Button 
            className="w-full md:w-auto"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Deal
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-muted/10">
            <p className="text-muted-foreground mb-4">
              {activeFilter === "all" 
                ? "You haven't created any deals yet." 
                : `You don't have any ${activeFilter} deals.`}
            </p>
            {activeFilter === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Deal
              </Button>
            )}
          </div>
        ) : (
          filteredDeals.map((deal) => (
            <VendorDealCard 
              key={deal.id} 
              deal={deal} 
              onStatusChange={fetchDeals}
            />
          ))
        )}
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <VendorCreateDealForm 
            onClose={() => setIsCreateDialogOpen(false)} 
            onSuccess={fetchDeals}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
