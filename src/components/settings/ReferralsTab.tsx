
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Link as LinkIcon, Trophy } from "lucide-react";
import { toast } from "sonner";

export function ReferralsTab() {
  const handleGenerateLink = () => {
    navigator.clipboard.writeText("https://dentaldeal.com/invite/ABC123");
    toast.success("Referral link copied to clipboard!");
  };
  
  return (
    <div className="space-y-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Referral Program</h2>
        <p className="text-muted-foreground">
          Invite colleagues and earn rewards when they sign up
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 border-none rounded-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Your Referrals</h3>
                <p className="text-muted-foreground">
                  You've invited 3 colleagues so far
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Invites Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Signed Up</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">$20</p>
                  <p className="text-sm text-muted-foreground">Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Share Your Referral Link</h3>
          <div className="flex items-center gap-2">
            <Input 
              value="https://dentaldeal.com/invite/ABC123"
              readOnly
              className="font-mono text-sm"
            />
            <Button variant="outline" onClick={handleGenerateLink}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            For each successful referral, both you and your colleague will receive a $10 credit.
          </p>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Trophy className="h-5 w-5 text-amber-500 mr-2" />
            How Points Are Calculated
          </h3>
          <p className="text-sm mb-2">
            Your leaderboard score is calculated using our weighted algorithm:
          </p>
          <p className="text-sm font-mono bg-white p-2 rounded border mb-2">
            Score = (Regular × 1) + (Premium × 2) + Bonus
          </p>
          <ul className="text-sm list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Regular referrals: Free-tier users you refer (1 point each)</li>
            <li>Premium referrals: Premium users you refer (2 points each)</li>
            <li>Bonus points: Special achievements and milestones</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Referral Statistics</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Name</th>
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-left py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">Dr. Robert Smith</td>
                <td className="py-3">Apr 5, 2025</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="py-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Premium
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Dr. Maria Garcia</td>
                <td className="py-3">Apr 2, 2025</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Regular
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Dr. James Wilson</td>
                <td className="py-3">Mar 28, 2025</td>
                <td className="py-3">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="py-3">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    Unknown
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </div>
  );
}
