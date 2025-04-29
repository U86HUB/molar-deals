
import { Button } from "@/components/ui/button";
import { FileSearch, User } from "lucide-react";

interface UserActionButtonsProps {
  onExportUsers?: () => void;
  onAddNewUser?: () => void;
}

export const UserActionButtons = ({ 
  onExportUsers, 
  onAddNewUser 
}: UserActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="sm:w-auto" onClick={onExportUsers}>
        <FileSearch className="mr-2 h-4 w-4" /> Export Users
      </Button>
      <Button className="sm:w-auto" onClick={onAddNewUser}>
        <User className="mr-2 h-4 w-4" /> Add New User
      </Button>
    </div>
  );
};
