import { Search, Bell, User, Menu } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';

export function Navbar() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-400" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-slate-800 rounded-lg relative transition-colors text-slate-400">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>
        <button className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-800 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <span className="text-sm font-medium hidden sm:inline">John Doe</span>
        </button>
      </div>
    </header>
  );
}
