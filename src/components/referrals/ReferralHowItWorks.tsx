
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function ReferralHowItWorks() {
  return (
    <Card className="mt-8 bg-gradient-to-r from-primary/10 to-purple-100 border-none">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Star className="mr-2 h-5 w-5 text-amber-500" />
                How points are calculated
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Score = (Regular Referrals × 1) + (Premium Referrals × 2) + Bonus Points
              </p>
            </div>
            <Link to="/settings?tab=referrals">
              <Button className="md:self-start">
                View My Referrals
              </Button>
            </Link>
          </div>

          <div className="mt-2">
            <h4 className="text-sm font-medium mb-1">Bonus Points Structure:</h4>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
              <li>Premium user status: +5 bonus points each month</li>
              <li>Every 10 referrals: +10 bonus points</li>
              <li>Every 50 referrals: +50 bonus points</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
