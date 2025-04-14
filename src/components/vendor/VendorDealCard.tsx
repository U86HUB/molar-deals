
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Edit, 
  Globe, 
  MoreHorizontal, 
  Trash
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { VendorDeal } from "@/data/mockVendorDeals";

interface VendorDealCardProps {
  deal: VendorDeal;
}

export const VendorDealCard = ({ deal }: VendorDealCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2 md:w-3/5">
              <div className="flex items-center gap-2 flex-wrap">
                {deal.isPremium && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                    Premium
                  </Badge>
                )}
                
                <Badge className={
                  deal.status === "active" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : deal.status === "pending" 
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {deal.status === "active" && <Check className="h-3 w-3 mr-1" />}
                  {deal.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                  {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                </Badge>
                
                <Badge variant="outline" className="flex gap-1.5 items-center">
                  <Globe className="h-3 w-3" />
                  {deal.country === "GLOBAL" ? "Global" : deal.country}
                </Badge>
                
                <span className="text-xs text-muted-foreground">
                  Expires: {new Date(deal.expiryDate).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-medium">{deal.title}</h3>
              
              <p className={`text-muted-foreground text-sm ${!isExpanded && 'line-clamp-2'}`}>
                {deal.description}
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col justify-between items-end gap-2 md:w-2/5">
              <DealStats views={deal.views} clicks={deal.clicks} />
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>
                      {deal.status === "active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {deal.description.length > 100 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleExpansion}
              className="mt-2"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
              ) : (
                <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DealStatsProps {
  views: number;
  clicks: number;
}

const DealStats = ({ views, clicks }: DealStatsProps) => {
  return (
    <div className="flex gap-4 md:gap-8 text-center">
      <div>
        <p className="text-2xl font-bold">{views}</p>
        <p className="text-xs text-muted-foreground">Views</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{clicks}</p>
        <p className="text-xs text-muted-foreground">Clicks</p>
      </div>
      <div>
        <p className="text-2xl font-bold">
          {clicks > 0 
            ? `${Math.round((clicks / views) * 100)}%` 
            : '0%'}
        </p>
        <p className="text-xs text-muted-foreground">CTR</p>
      </div>
    </div>
  );
};
