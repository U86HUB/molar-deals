
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { calculateReferralScore } from "@/utils/referralUtils";

// Import mock data from utils
import { generateMockReferrers, ReferrerType } from "@/utils/referralUtils";

const ReferralManagementTab = () => {
  const mockReferrers = generateMockReferrers();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const referralsPerPage = 10;
  
  // Filter referrers based on search term
  const filteredReferrers = mockReferrers.filter(referrer => 
    referrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referrer.id.toString().includes(searchTerm)
  );
  
  // Paginate referrers
  const indexOfLastReferrer = currentPage * referralsPerPage;
  const indexOfFirstReferrer = indexOfLastReferrer - referralsPerPage;
  const currentReferrers = filteredReferrers.slice(indexOfFirstReferrer, indexOfLastReferrer);
  const totalPages = Math.ceil(filteredReferrers.length / referralsPerPage);

  const approveReferral = (id: number) => {
    console.log(`Approving referral ${id}`);
    // In a real app, this would update the database
  };

  const rejectReferral = (id: number) => {
    console.log(`Rejecting referral ${id}`);
    // In a real app, this would update the database
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Referral Management</h1>
        <Button variant="outline" className="sm:w-auto">
          Export Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockReferrers.reduce((acc, referrer) => acc + referrer.regularReferrals + referrer.premiumReferrals, 0)}</p>
            <p className="text-sm text-muted-foreground mt-2">Across all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Premium Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockReferrers.reduce((acc, referrer) => acc + referrer.premiumReferrals, 0)}</p>
            <p className="text-sm text-muted-foreground mt-2">Premium referrals made</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Rewards Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${mockReferrers.reduce((acc, referrer) => acc + referrer.earnings, 0).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Paid to referrers</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Referral Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search referrers..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Regular Referrals</TableHead>
                  <TableHead>Premium Referrals</TableHead>
                  <TableHead>Bonus Points</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentReferrers.map((referrer, index) => (
                  <TableRow key={referrer.id}>
                    <TableCell className="font-medium">{indexOfFirstReferrer + index + 1}</TableCell>
                    <TableCell>{referrer.name}</TableCell>
                    <TableCell>{referrer.regularReferrals}</TableCell>
                    <TableCell>{referrer.premiumReferrals}</TableCell>
                    <TableCell>{referrer.bonusPoints}</TableCell>
                    <TableCell>{calculateReferralScore(referrer)}</TableCell>
                    <TableCell>${referrer.earnings}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => approveReferral(referrer.id)}
                        >
                          Verify
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => rejectReferral(referrer.id)}
                        >
                          Flag
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      isActive={currentPage === pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagementTab;
