
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface DealActionsProps {
  status: "active" | "pending" | "expired";
}

export const DealActions = ({ status }: DealActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Edit className="h-4 w-4 mr-1" /> Edit
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>
            {status === "active" ? "Pause" : "Activate"}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <Trash className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
