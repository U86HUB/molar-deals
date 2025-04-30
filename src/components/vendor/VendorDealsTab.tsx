
import { useState } from "react";
import { VendorDealFilters } from "./VendorDealFilters";
import { VendorDealCard } from "./VendorDealCard";
import { mockVendorDeals } from "@/data/mockVendorDeals";

export const VendorDealsTab = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredDeals = mockVendorDeals.filter(deal => {
    if (activeFilter === "all") return true;
    return deal.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">My Deals</h2>
        <VendorDealFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
      </div>
      
      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <VendorDealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};
