
import { Button } from "@/components/ui/button";

interface VendorDealFiltersProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const VendorDealFilters = ({ 
  activeFilter = "all",
  onFilterChange 
}: VendorDealFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onFilterChange?.("all")}
        className={activeFilter === "all" ? "bg-accent" : ""}
      >
        All Deals
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onFilterChange?.("active")}
        className={activeFilter === "active" ? "bg-accent" : ""}
      >
        Active
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onFilterChange?.("pending")}
        className={activeFilter === "pending" ? "bg-accent" : ""}
      >
        Pending
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onFilterChange?.("expired")}
        className={activeFilter === "expired" ? "bg-accent" : ""}
      >
        Expired
      </Button>
    </div>
  );
};
