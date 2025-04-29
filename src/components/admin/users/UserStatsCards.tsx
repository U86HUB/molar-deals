
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    verificationRate: number;
  };
}

export const UserStatsCards = ({ stats }: UserStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p className="text-sm text-muted-foreground mt-2">Across all roles</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
          <p className="text-sm text-muted-foreground mt-2">Currently active accounts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.newUsers}</p>
          <p className="text-sm text-muted-foreground mt-2">Joined in the last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Verification Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.verificationRate}%</p>
          <p className="text-sm text-muted-foreground mt-2">Of users have verified accounts</p>
        </CardContent>
      </Card>
    </div>
  );
};
