
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

// Mock vendor deals
const mockDeals = [
  {
    id: "v1",
    title: "50% Off Professional Teeth Whitening Kit",
    description: "Get our professional-grade teeth whitening kit at half price. Includes LED accelerator and 3 whitening gel syringes.",
    status: "active",
    views: 486,
    clicks: 58,
    category: "Patient Care Products",
    expiryDate: "2025-06-15",
    isPremium: false,
    isNew: true,
    country: "USA"
  },
  {
    id: "v2",
    title: "Buy One Get One Free: Premium Dental Impression Material",
    description: "Purchase our premium alginate impression material and get a second package free. Ideal for precise and detailed impressions.",
    status: "active",
    views: 324,
    clicks: 41,
    category: "Dental Materials",
    expiryDate: "2025-05-20",
    isPremium: false,
    country: "GLOBAL"
  },
  {
    id: "v3",
    title: "Exclusive: 35% Off Advanced Dental Laser System",
    description: "Take advantage of this limited-time offer on our state-of-the-art dental laser system. Includes free installation and 2-day training.",
    status: "pending",
    views: 0,
    clicks: 0,
    category: "Equipment",
    expiryDate: "2025-05-30",
    isPremium: true,
    country: "UK"
  },
  {
    id: "v4",
    title: "Free Trial: Cloud-Based Practice Management Software",
    description: "Try our comprehensive dental practice management software free for 3 months. Includes patient records, billing, and appointment scheduling.",
    status: "active",
    views: 438,
    clicks: 72,
    category: "Software",
    expiryDate: "2025-07-01",
    isPremium: false,
    country: "GLOBAL"
  }
];

export const VendorDealsTab = () => {
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);
  
  const toggleDealExpansion = (dealId: string) => {
    setExpandedDeal(expandedDeal === dealId ? null : dealId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">My Deals</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            All Deals
          </Button>
          <Button variant="outline" size="sm">
            Active
          </Button>
          <Button variant="outline" size="sm">
            Pending
          </Button>
          <Button variant="outline" size="sm">
            Expired
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
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
                    
                    <p className={`text-muted-foreground text-sm ${expandedDeal !== deal.id && 'line-clamp-2'}`}>
                      {deal.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col justify-between items-end gap-2 md:w-2/5">
                    <div className="flex gap-4 md:gap-8 text-center">
                      <div>
                        <p className="text-2xl font-bold">{deal.views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{deal.clicks}</p>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {deal.clicks > 0 
                            ? `${Math.round((deal.clicks / deal.views) * 100)}%` 
                            : '0%'}
                        </p>
                        <p className="text-xs text-muted-foreground">CTR</p>
                      </div>
                    </div>
                    
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
                    onClick={() => toggleDealExpansion(deal.id)}
                    className="mt-2"
                  >
                    {expandedDeal === deal.id ? (
                      <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
