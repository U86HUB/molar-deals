
import { useState } from "react";
import { DealGrid } from "@/components/deals/DealGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import type { DealProps } from "@/components/deals/DealCard";

interface DealsTabsProps {
  deals: DealProps[];
  userIsPremium: boolean;
}

export const DealsTabs = ({ deals, userIsPremium }: DealsTabsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter deals based on active tab
  const filteredDeals = deals.filter(deal => {
    if (activeTab === "premium") return deal.isPremium;
    if (activeTab === "regular") return !deal.isPremium;
    return true; // "all" tab
  });

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Current Deals</h2>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full md:w-auto"
        >
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="premium">
              <Star className="mr-1 h-4 w-4" /> Premium
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <DealGrid deals={filteredDeals} userIsPremium={userIsPremium} />
          </TabsContent>
          <TabsContent value="regular" className="mt-6">
            <DealGrid deals={filteredDeals} userIsPremium={userIsPremium} />
          </TabsContent>
          <TabsContent value="premium" className="mt-6">
            <DealGrid deals={filteredDeals} userIsPremium={userIsPremium} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
