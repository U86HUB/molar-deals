
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";

export function SubscriptionTab() {
  return (
    <TabsContent value="subscription" className="m-0">
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
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Access to regular deals
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Basic dashboard features
            </li>
            <li className="flex items-center text-muted-foreground">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Premium deals locked
            </li>
            <li className="flex items-center text-muted-foreground">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Early access to new deals
            </li>
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
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Access to all deals, including premium offers
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Early access to new deals before others
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Exclusive webinars and educational content
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Priority customer support
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                2x referral bonuses
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Premium plan starts at $19.99/month. Cancel anytime.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </TabsContent>
  );
}
