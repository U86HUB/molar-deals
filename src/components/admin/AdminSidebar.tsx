
import { Link } from "react-router-dom";
import { 
  PackageOpen, Users, TrendingUp, ChartBar, Settings, User,
  FileSearch, BriefcaseBusiness
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const menuCategories = [
    {
      title: "Core Management",
      items: [
        { id: "deals", label: "Deals Management", icon: PackageOpen },
        { id: "vendors", label: "Vendor Management", icon: BriefcaseBusiness },
        { id: "users", label: "User Management", icon: User, badge: "Enhanced" }
      ]
    },
    {
      title: "Platform",
      items: [
        { id: "referrals", label: "Referral Management", icon: Users },
        { id: "analytics", label: "Analytics & Insights", icon: ChartBar },
      ]
    },
    {
      title: "Administration",
      items: [
        { id: "content", label: "Content Management", icon: FileSearch },
        { id: "settings", label: "Admin Settings", icon: Settings },
      ]
    }
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
      
      <nav className="flex-1 pt-4 overflow-y-auto">
        {menuCategories.map((category, idx) => (
          <div key={category.title} className={cn(idx > 0 && "mt-6")}>
            <h3 className="px-4 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">{category.title}</h3>
            <ul className="space-y-1 px-2">
              {category.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => !item.disabled && onTabChange(item.id)}
                    disabled={item.disabled}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-md",
                      activeTab === item.id
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100",
                      item.disabled && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge variant={item.badge === "Enhanced" ? "secondary" : "outline"} className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
