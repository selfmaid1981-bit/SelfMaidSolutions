import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, UserPlus, Calendar, Briefcase, BarChart3, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

const crmNav: NavItem[] = [
  { label: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { label: "Pipeline", href: "/crm/pipeline", icon: UserPlus },
  { label: "Contacts", href: "/crm/contacts", icon: Users },
  { label: "Appointments", href: "/crm/appointments", icon: Calendar },
  { label: "Jobs", href: "/crm/jobs", icon: Briefcase },
  { label: "Analytics", href: "/crm/analytics", icon: BarChart3 },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-gray-900 text-white flex flex-col transition-all duration-200`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <span className="font-bold text-sm">Leading Edge CRM</span>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white hover:bg-gray-800">
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 py-4">
          {crmNav.map(item => {
            const active = location === item.href || (item.href !== "/crm" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm ${active ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer text-sm">
              <ChevronLeft className="h-4 w-4" />
              {!collapsed && <span>Back to Site</span>}
            </div>
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
