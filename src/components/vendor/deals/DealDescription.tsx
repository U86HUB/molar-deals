
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DealDescriptionProps {
  description: string;
}

export const DealDescription = ({ description }: DealDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <p className={`text-muted-foreground text-sm ${!isExpanded && 'line-clamp-2'}`}>
        {description}
      </p>
      
      {description.length > 100 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpansion}
          className="mt-2"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      )}
    </>
  );
};
