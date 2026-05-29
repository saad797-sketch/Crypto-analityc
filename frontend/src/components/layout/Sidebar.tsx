import { LayoutDashboard, TrendingUp, Wallet, BarChart3, Settings, HelpCircle, Menu } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: TrendingUp, label: 'Market', id: 'market' },
  { icon: Wallet, label: 'Portfolio', id: 'portfolio' },
  { icon: BarChart3, label: 'Analysis', id: 'analysis' },
];

export function Sidebar() {
  const { isSidebarOpen } = useDashboardStore();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        {isSidebarOpen && <span className="font-bold text-xl tracking-tight">CryptoIntel</span>}
      </div>

      <nav className="mt-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-colors text-slate-400 hover:text-white hover:bg-slate-800",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <item.icon className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 px-3 w-full space-y-2">
        <button className={cn("w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:text-white", !isSidebarOpen && "justify-center px-0")}>
          <Settings className="w-5 h-5" />
          {isSidebarOpen && <span className="font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
