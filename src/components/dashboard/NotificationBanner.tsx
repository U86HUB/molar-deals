
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotificationBanner = () => {
  return (
    <div className="bg-accent rounded-lg p-4 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <Bell className="text-accent-foreground h-5 w-5 mr-3" />
        <p className="text-accent-foreground">
          <span className="font-medium">New deals available!</span> We've added 5 new deals this week.
        </p>
      </div>
      <Button variant="secondary" size="sm">
        View All
      </Button>
    </div>
  );
};
