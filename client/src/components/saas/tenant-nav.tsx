import { Link, useLocation } from "wouter";
import { LayoutDashboard, Search, CreditCard, Settings, LogOut, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const saasNav = [
  { label: "Dashboard", href: "/saas", icon: LayoutDashboard },
  { label: "Lead Discovery", href: "/saas/lead-discovery", icon: Search },
  { label: "Billing", href: "/saas/billing", icon: CreditCard },
  { label: "Settings", href: "/saas/settings", icon: Settings },
];

export function TenantNav({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-indigo-900 text-white flex flex-col transition-all duration-200`}>
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          {!collapsed && <span className="font-bold text-sm">Deluxe.biz</span>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-indigo-300 hover:text-white hover:bg-indigo-800">
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 py-4">
          {saasNav.map(item => {
            const active = location === item.href || (item.href !== "/saas" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm ${active ? "bg-indigo-600 text-white" : "text-indigo-200 hover:bg-indigo-800 hover:text-white"}`}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-indigo-700">
          <Link href="/">
            <div className="flex items-center gap-2 text-indigo-300 hover:text-white cursor-pointer text-sm">
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
