
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReferrerType, getMedalIcon, calculateReferralScore } from "@/utils/referralUtils";

interface LeaderboardTableProps {
  referrers: ReferrerType[];
  startIndex: number;
}

export function LeaderboardTable({ referrers, startIndex }: LeaderboardTableProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-0">
        <h2 className="text-xl font-medium">Leaderboard Rankings</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Regular</TableHead>
              <TableHead className="text-right">Premium</TableHead>
              <TableHead className="text-right">Bonus</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {referrers.map((referrer, index) => {
              const globalRank = startIndex + index + 1;
              return (
                <TableRow key={referrer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(globalRank)}
                      <span>{globalRank}</span>
                    </div>
                  </TableCell>
                  <TableCell>{referrer.name}</TableCell>
                  <TableCell className="text-right font-medium">
                    {calculateReferralScore(referrer)}
                  </TableCell>
                  <TableCell className="text-right">
                    {referrer.regularReferrals}
                  </TableCell>
                  <TableCell className="text-right">
                    {referrer.premiumReferrals}
                  </TableCell>
                  <TableCell className="text-right">
                    {referrer.bonusPoints}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${referrer.earnings}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {referrer.joinedDate}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
