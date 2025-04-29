
import { Card, CardContent } from "@/components/ui/card";
import { Deal, changeDealStatus, deleteDeal } from "@/services/dealService";
import { DealStats } from "./deals/DealStats";
import { DealBadges } from "./deals/DealBadges";
import { DealDescription } from "./deals/DealDescription";
import { Button } from "../ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface VendorDealCardProps {
  deal: Deal;
  onStatusChange?: () => void;
}

export const VendorDealCard = ({ deal, onStatusChange }: VendorDealCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleStatusChange = async (newStatus: "active" | "pending" | "expired") => {
    await changeDealStatus(deal.id, newStatus);
    if (onStatusChange) {
      onStatusChange();
    }
  };
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDeal(deal.id);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error deleting deal:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2 md:w-3/5">
              <DealBadges 
                isPremium={false} // We can enhance this later
                status={deal.status}
                country={deal.country || "GLOBAL"}
                expiryDate={deal.expiry_date}
              />
              
              <h3 className="text-lg font-medium">{deal.title}</h3>
              
              <DealDescription description={deal.description || ""} />
            </div>
            
            <div className="flex flex-row md:flex-col justify-between items-end gap-2 md:w-2/5">
              <DealStats 
                views={100} // Placeholder for now
                clicks={50}  // Placeholder for now
              />
              
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
                    {deal.status !== "active" && (
                      <DropdownMenuItem onClick={() => handleStatusChange("active")}>
                        Activate
                      </DropdownMenuItem>
                    )}
                    {deal.status === "active" && (
                      <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
                        Pause
                      </DropdownMenuItem>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the deal
                            "{deal.title}" and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDelete} 
                            className="bg-red-600 hover:bg-red-700"
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
