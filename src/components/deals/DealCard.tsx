import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, ExternalLink, Heart, Lock, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DealProps {
  id: string;
  title: string;
  description: string;
  brandName: string;
  brandLogo: string;
  discountValue: string;
  category: string;
  expiryDate: string;
  isPremium: boolean;
  isNew?: boolean;
  url: string;
  country?: string; // Country code or "GLOBAL"
}

interface DealCardProps {
  deal: DealProps;
  userIsPremium?: boolean;
}

export const DealCard = ({ deal, userIsPremium = false }: DealCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  
  const isLocked = deal.isPremium && !userIsPremium;
  const daysRemaining = calculateDaysRemaining(deal.expiryDate);
  const isGlobal = !deal.country || deal.country === "GLOBAL";
  
  function calculateDaysRemaining(dateString: string): number {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const differenceInTime = expiryDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  }
  
  const handleSaveDeal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  
  const handleClickDeal = () => {
    if (isLocked) {
      return;
    }
    
    window.open(deal.url, "_blank");
  };

  return (
    <Card className={cn(
      "relative h-full overflow-hidden transition duration-300 hover:shadow-lg border",
      isLocked ? "opacity-90" : "",
    )}>
      {deal.isPremium && (
        <div className="absolute top-0 right-0 bg-black/50 text-white px-3 py-1 text-xs font-medium z-10">
          PREMIUM
        </div>
      )}
      
      {deal.isNew && (
        <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-xs font-medium z-10">
          NEW
        </div>
      )}
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden mr-3">
              {deal.brandLogo ? (
                <img src={deal.brandLogo} alt={deal.brandName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-semibold text-lg">{deal.brandName.charAt(0)}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{deal.brandName}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="secondary">{deal.category}</Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  {isGlobal ? (
                    <><Globe className="h-3 w-3" /> Global</>
                  ) : (
                    <><MapPin className="h-3 w-3" /> {deal.country}</>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleSaveDeal}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label={isSaved ? "Unsave deal" : "Save deal"}
          >
            <Heart className={cn(
              "h-5 w-5",
              isSaved ? "fill-red-500 text-red-500" : ""
            )} />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        <h3 className="text-lg font-medium line-clamp-2 mb-2">{deal.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{deal.description}</p>
        
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{daysRemaining === 0 ? "Expires today" : `${daysRemaining} days remaining`}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col space-y-3">
        <div className="flex justify-between items-center w-full">
          <Badge variant="outline" className="bg-accent text-accent-foreground border-0 text-sm px-2 py-1">
            {deal.discountValue} Off
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Expires {new Date(deal.expiryDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Button 
          variant="primary"
          className="w-full"
          onClick={handleClickDeal}
          disabled={isLocked}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Upgrade to Unlock
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Claim Deal
            </>
          )}
        </Button>
      </CardFooter>
      
      {isLocked && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-4">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="font-semibold">Premium Deal</p>
            <p className="text-sm text-muted-foreground mb-3">Upgrade to access exclusive offers</p>
            <Button variant="success" size="sm">Upgrade Now</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
