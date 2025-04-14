
import { Card, CardContent } from "@/components/ui/card";
import type { VendorDeal } from "@/data/mockVendorDeals";
import { DealStats } from "./deals/DealStats";
import { DealActions } from "./deals/DealActions";
import { DealBadges } from "./deals/DealBadges";
import { DealDescription } from "./deals/DealDescription";

interface VendorDealCardProps {
  deal: VendorDeal;
}

export const VendorDealCard = ({ deal }: VendorDealCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2 md:w-3/5">
              <DealBadges 
                isPremium={deal.isPremium}
                status={deal.status}
                country={deal.country}
                expiryDate={deal.expiryDate}
              />
              
              <h3 className="text-lg font-medium">{deal.title}</h3>
              
              <DealDescription description={deal.description} />
            </div>
            
            <div className="flex flex-row md:flex-col justify-between items-end gap-2 md:w-2/5">
              <DealStats views={deal.views} clicks={deal.clicks} />
              <DealActions status={deal.status} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
