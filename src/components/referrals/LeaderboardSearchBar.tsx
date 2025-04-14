
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeaderboardSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function LeaderboardSearchBar({ searchTerm, setSearchTerm }: LeaderboardSearchBarProps) {
  return (
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
  );
}
