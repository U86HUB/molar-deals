
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { CheckBadge } from "./CheckBadge";

export const BillingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Billing</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-md bg-gray-50">
          <p className="font-medium">Current Plan: Free</p>
          <p className="text-sm text-muted-foreground mb-4">Basic vendor features</p>
          <Button variant="outline" className="w-full">
            Upgrade to Premium
          </Button>
        </div>
        
        <div>
          <p className="font-medium mb-2">Premium Benefits:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <CheckBadge />
              Advanced analytics and reporting
            </li>
            <li className="flex items-center gap-2">
              <CheckBadge />
              Country-specific targeting
            </li>
            <li className="flex items-center gap-2">
              <CheckBadge />
              Featured placement in deal listings
            </li>
            <li className="flex items-center gap-2">
              <CheckBadge />
              Create unlimited deals
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
