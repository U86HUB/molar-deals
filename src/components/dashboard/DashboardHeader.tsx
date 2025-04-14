
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userIsPremium: boolean;
}

export const DashboardHeader = ({ userIsPremium }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Your Deals Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Discover exclusive offers and savings for dental professionals
        </p>
      </div>
      
      {!userIsPremium && (
        <Button variant="success" className="md:self-end">
          <Star className="mr-2 h-4 w-4" />
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
};
