
import { Card, CardContent } from "@/components/ui/card";
import { ReferrerType, getMedalIcon, calculateReferralScore } from "@/utils/referralUtils";

interface TopReferrersCardsProps {
  topReferrers: ReferrerType[];
  timeframe?: "monthly" | "yearly";
}

export function TopReferrersCards({ topReferrers, timeframe = "monthly" }: TopReferrersCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {topReferrers.slice(0, 3).map((referrer, index) => {
        // Colors based on timeframe
        const bgColor = timeframe === "monthly" 
          ? index === 0 ? "bg-amber-50 border-amber-200" : 
            index === 1 ? "bg-zinc-50 border-zinc-200" : 
            "bg-amber-50/50 border-amber-100"
          : index === 0 ? "bg-purple-50 border-purple-200" : 
            index === 1 ? "bg-blue-50 border-blue-200" : 
            "bg-teal-50 border-teal-100";
            
        return (
          <Card 
            key={referrer.id} 
            className={bgColor}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-background flex items-center justify-center">
                {getMedalIcon(index + 1)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{referrer.name}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm mt-1">
                  <span className="font-bold">{calculateReferralScore(referrer)} points</span>
                  <span className="text-muted-foreground">${referrer.earnings} earned</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span>{referrer.regularReferrals} regular</span>
                  <span>{referrer.premiumReferrals} premium</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
