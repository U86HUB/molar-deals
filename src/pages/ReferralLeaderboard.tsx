
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TopReferrersCards } from "@/components/referrals/TopReferrersCards";
import { LeaderboardTable } from "@/components/referrals/LeaderboardTable";
import { LeaderboardSearchBar } from "@/components/referrals/LeaderboardSearchBar";
import { ReferralHowItWorks } from "@/components/referrals/ReferralHowItWorks";
import { generateMockReferrers } from "@/utils/referralUtils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrizeInfo } from "@/components/referrals/PrizeInfo";

const ReferralLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("monthly");
  const itemsPerPage = 10;
  
  // Generate mock data
  const mockReferrers = generateMockReferrers();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => {}} isLoggedIn={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Referral Leaderboard</h1>
            <p className="text-muted-foreground mt-1">
              See who's leading the way in our weighted referral program
            </p>
          </div>
        </div>

        {/* Prize information */}
        <PrizeInfo />

        {/* Monthly/Yearly tabs */}
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as "monthly" | "yearly")} className="mb-6">
          <TabsList className="mb-2">
            <TabsTrigger value="monthly">Monthly Rankings</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Rankings</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <h2 className="text-lg font-medium mb-4">Monthly Referral Leaders - April 2025</h2>
          </TabsContent>
          <TabsContent value="yearly">
            <h2 className="text-lg font-medium mb-4">Yearly Referral Leaders - 2025</h2>
          </TabsContent>
        </Tabs>

        {/* Top referrers showcase */}
        <TopReferrersCards topReferrers={mockReferrers} timeframe={timeframe} />

        {/* Search and filters */}
        <LeaderboardSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Leaderboard table */}
        <LeaderboardTable referrers={currentReferrers} startIndex={indexOfFirstItem} />

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
        <ReferralHowItWorks />
      </main>
    </div>
  );
};

export default ReferralLeaderboard;
