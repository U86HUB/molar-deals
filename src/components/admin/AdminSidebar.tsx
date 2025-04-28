
import { Link } from "react-router-dom";
import { PackageOpen, Users, TrendingUp, ChartBar, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: "deals", label: "Deals Management", icon: PackageOpen },
    { id: "vendors", label: "Vendor Management", icon: Users },
    { id: "users", label: "User Management", icon: User },
    { id: "referrals", label: "Referral Management", icon: Users },
    { id: "analytics", label: "Analytics & Insights", icon: ChartBar },
    { id: "settings", label: "Admin Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <Link to="/admin" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">DD</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex w-full items-center px-4 py-3 text-sm font-medium rounded-md",
                  activeTab === item.id
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link 
          to="/"
          className="flex items-center text-sm text-gray-700 hover:text-primary"
        >
          <span>← Return to Main Site</span>
        </Link>
      </div>
    </aside>
  );
};
