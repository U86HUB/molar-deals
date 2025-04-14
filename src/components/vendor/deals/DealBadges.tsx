
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DealStatusBadge } from "./DealStatusBadge";

interface DealBadgesProps {
  isPremium: boolean;
  status: "active" | "pending" | "expired";
  country: string;
  expiryDate: string;
}

export const DealBadges = ({ 
  isPremium, 
  status, 
  country, 
  expiryDate 
}: DealBadgesProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {isPremium && (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          Premium
        </Badge>
      )}
      
      <DealStatusBadge status={status} />
      
      <Badge variant="outline" className="flex gap-1.5 items-center">
        <Globe className="h-3 w-3" />
        {country === "GLOBAL" ? "Global" : country}
      </Badge>
      
      <span className="text-xs text-muted-foreground">
        Expires: {new Date(expiryDate).toLocaleDateString()}
      </span>
    </div>
  );
};
