
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckItem } from "@/components/settings/CheckItem";

export function SubscriptionTab() {
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Subscription Management</h2>
        <p className="text-muted-foreground">
          View and manage your subscription plan
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 rounded-lg p-6 border border-secondary">
          <h3 className="text-xl font-medium mb-2">Free Plan</h3>
          <p className="text-muted-foreground mb-4">
            Basic access to dental deals
          </p>
          <ul className="space-y-2 mb-6">
            <CheckItem text="Access to regular deals" checked={true} />
            <CheckItem text="Basic dashboard features" checked={true} />
            <CheckItem text="Premium deals locked" checked={false} />
            <CheckItem text="Early access to new deals" checked={false} />
          </ul>
          <Button variant="success" className="w-full">
            Upgrade to Premium
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-medium">Premium Plan Benefits</h3>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              <CheckItem 
                text="Access to all deals, including premium offers" 
                checked={true}
                className="text-primary"
              />
              <CheckItem 
                text="Early access to new deals before others" 
                checked={true} 
                className="text-primary"
              />
              <CheckItem 
                text="Exclusive webinars and educational content" 
                checked={true} 
                className="text-primary"
              />
              <CheckItem 
                text="Priority customer support" 
                checked={true} 
                className="text-primary"
              />
              <CheckItem 
                text="2x referral bonuses" 
                checked={true} 
                className="text-primary"
              />
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Premium plan starts at $19.99/month. Cancel anytime.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </div>
  );
}
