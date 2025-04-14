
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckItemProps {
  text: string;
  checked: boolean;
  className?: string;
}

export function CheckItem({ text, checked, className }: CheckItemProps) {
  return (
    <li className={cn("flex items-center", className)}>
      {checked ? (
        <Check className="h-5 w-5 text-green-500 mr-2" />
      ) : (
        <X className="h-5 w-5 text-gray-400 mr-2" />
      )}
      <span className={cn(checked ? "" : "text-muted-foreground")}>
        {text}
      </span>
    </li>
  );
}
