
import { Trophy, Gift, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function PrizeInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-100 border border-blue-200">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Monthly Prize</h3>
              <p className="text-sm text-muted-foreground mt-1">
                The top referrer each month wins an iPad or €300 cash equivalent
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Winners announced on the 1st of each month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-100 border border-purple-200">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Annual Grand Prize</h3>
              <p className="text-sm text-muted-foreground mt-1">
                The top yearly referrer wins a dental chair or €5,000 cash equivalent
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Annual winner announced on January 15th
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-green-100 border border-green-200">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Referral Earnings</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Earn 50% of the premium plan payment for referrals within 30 days
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Payments processed monthly to your account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
