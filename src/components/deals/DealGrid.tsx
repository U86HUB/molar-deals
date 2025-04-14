
import { useState, useEffect } from "react";
import { DealCard, DealProps } from "./DealCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, X, Globe, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DealGridProps {
  deals: DealProps[];
  userIsPremium?: boolean;
}

export const DealGrid = ({ deals, userIsPremium = false }: DealGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [userCountry, setUserCountry] = useState<string>("");
  
  // Get unique categories from deals
  const categories = Array.from(new Set(deals.map(deal => deal.category)));
  
  // Load user's country preference
  useEffect(() => {
    const savedCountry = localStorage.getItem("userCountry");
    setUserCountry(savedCountry || "");
  }, []);
  
  // Filter deals based on search, category, and country
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? deal.category === selectedCategory : true;
    
    // Filter by country: show if deal is global or matches user country
    const matchesCountry = !userCountry || 
                          userCountry === "GLOBAL" || 
                          !deal.country || 
                          deal.country === "GLOBAL" || 
                          deal.country === userCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <div className="space-y-6">
      {/* Country alert when no country is set */}
      {!userCountry && (
        <Alert className="bg-amber-50 border-amber-200">
          <MapPin className="h-4 w-4 text-amber-500" />
          <AlertTitle>Location Not Set</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Please set your country in Settings to see deals specific to your location.</p>
            <Button variant="outline" size="sm" asChild className="w-fit">
              <a href="/settings">Go to Settings</a>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals by name, brand, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className={`md:flex items-center gap-2 ${showFilters ? 'flex' : 'hidden'}`}>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedCategory && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCategory("")}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Location indicator */}
      {userCountry && (
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Location:</span>
          <span className="flex items-center gap-1 font-medium">
            {userCountry === "GLOBAL" ? (
              <><Globe className="inline h-4 w-4" /> Global (All deals)</>
            ) : (
              <><MapPin className="inline h-4 w-4" /> {userCountry}</>
            )}
          </span>
        </div>
      )}
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'}
        {selectedCategory && ` in ${selectedCategory}`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
      
      {/* Grid of deals */}
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} userIsPremium={userIsPremium} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">No deals found matching your criteria.</p>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
};
