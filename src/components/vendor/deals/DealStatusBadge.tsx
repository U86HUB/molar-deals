
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DealStatusBadgeProps {
  status: "active" | "pending" | "expired";
}

export const DealStatusBadge = ({ status }: DealStatusBadgeProps) => {
  return (
    <Badge className={
      status === "active" 
        ? "bg-green-100 text-green-800 hover:bg-green-200" 
        : status === "pending" 
        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
        : "bg-red-100 text-red-800 hover:bg-red-200"
    }>
      {status === "active" && <Check className="h-3 w-3 mr-1" />}
      {status === "pending" && <Clock className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
