
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Trophy,
  Search,
  ArrowUpDown,
  Medal,
  Star,
  Filter
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for referrers
const mockReferrers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Dr. ${['Sarah', 'John', 'Michael', 'Emma', 'Robert', 'Lisa', 'David', 'Jessica', 'Thomas', 'Maria'][i % 10]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'][i % 10]}`,
  referrals: Math.floor(Math.random() * 50) + 1,
  conversionRate: Math.floor(Math.random() * 100) + 1,
  joinedDate: new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 30) + 1).toLocaleDateString(),
  earnings: Math.floor(Math.random() * 500) + 10
})).sort((a, b) => b.referrals - a.referrals);

const ReferralLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter referrers based on search term
  const filteredReferrers = mockReferrers.filter(referrer => 
    referrer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReferrers = filteredReferrers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReferrers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Get medal component based on rank
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-amber-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-zinc-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-700" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Referral Leaderboard</h1>
            <p className="text-muted-foreground mt-1">
              See who's leading the way in our referral program
            </p>
          </div>
        </div>

        {/* Top referrers showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mockReferrers.slice(0, 3).map((referrer, index) => (
            <Card key={referrer.id} className={
              index === 0 ? "bg-amber-50 border-amber-200" : 
              index === 1 ? "bg-zinc-50 border-zinc-200" : 
              "bg-amber-50/50 border-amber-100"
            }>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-background flex items-center justify-center">
                  {getMedalIcon(index + 1)}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{referrer.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold">{referrer.referrals} referrals</span>
                    <span className="text-muted-foreground">${referrer.earnings} earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>

        {/* Leaderboard table */}
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
                  <TableHead className="text-right">Referrals</TableHead>
                  <TableHead className="text-right">Conversion Rate</TableHead>
                  <TableHead className="text-right">Earnings</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentReferrers.map((referrer, index) => {
                  const globalRank = indexOfFirstItem + index + 1;
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
                        {referrer.referrals}
                      </TableCell>
                      <TableCell className="text-right">
                        {referrer.conversionRate}%
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

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              // Show the first page, last page, current page and pages around current
              let pageNum = idx + 1;
              
              if (currentPage > 3 && totalPages > 5) {
                if (idx === 0) pageNum = 1;
                else if (idx === 1) return <PaginationItem key={idx}>...</PaginationItem>;
                else if (idx === 4) pageNum = totalPages;
                else pageNum = currentPage + idx - 2;
              }
              
              if (currentPage > totalPages - 2 && totalPages > 5) {
                if (idx === 0) pageNum = 1;
                else if (idx === 1) return <PaginationItem key={idx}>...</PaginationItem>;
                else pageNum = totalPages - (4 - idx);
              }
              
              return (
                <PaginationItem key={idx}>
                  <PaginationLink 
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        {/* How it works */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-purple-100 border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Star className="mr-2 h-5 w-5 text-amber-500" />
                  How to climb the leaderboard
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Invite colleagues to join DentalDeals and earn rewards for each successful referral.
                </p>
              </div>
              <Button className="md:self-start">
                View My Referrals
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReferralLeaderboard;
