
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as Recharts, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Star, Lock } from "lucide-react";

const mockDealViews = [
  { date: "2025-03-01", views: 52 },
  { date: "2025-03-02", views: 86 },
  { date: "2025-03-03", views: 123 },
  { date: "2025-03-04", views: 94 },
  { date: "2025-03-05", views: 112 },
  { date: "2025-03-06", views: 158 },
  { date: "2025-03-07", views: 176 },
  { date: "2025-03-08", views: 184 },
  { date: "2025-03-09", views: 201 },
  { date: "2025-03-10", views: 187 },
  { date: "2025-03-11", views: 213 },
  { date: "2025-03-12", views: 242 },
  { date: "2025-03-13", views: 229 },
  { date: "2025-03-14", views: 251 }
];

const mockConversionData = [
  { name: "Teeth Whitening Kit", value: 58 },
  { name: "Impression Material", value: 41 },
  { name: "Laser System", value: 0 },
  { name: "Practice Management", value: 72 }
];

interface VendorAnalyticsTabProps {
  isPremium: boolean;
}

export const VendorAnalyticsTab = ({ isPremium }: VendorAnalyticsTabProps) => {
  const formattedViewData = mockDealViews.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Views: item.views
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="7days">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="14days">Last 14 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Deal Views Over Time</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={formattedViewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className={!isPremium ? "relative" : ""}>
          {!isPremium && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade to access detailed conversion analytics and more insights
              </p>
              <Button variant="success">
                <Star className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          )}
          
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Deal Conversions</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Recharts data={mockConversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </Recharts>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className={!isPremium ? "relative md:col-span-2" : "md:col-span-2"}>
          {!isPremium && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade to access audience demographics and targeting insights
              </p>
              <Button variant="success">
                <Star className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
          )}
          
          <CardHeader className="pb-2">
            <h3 className="text-lg font-medium">Audience Demographics</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Audience demographic data visualization would appear here for premium users
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
