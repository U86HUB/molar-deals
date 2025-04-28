
import { Link } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 p-4">
      <div className="flex items-center justify-between">
        <div className="md:hidden flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">DD</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
        </div>
        
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};
