import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: any;
  loading?: boolean;
}

export function StatCard({ title, value, change, icon: Icon, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse">
        <div className="h-4 w-24 bg-slate-800 rounded mb-4"></div>
        <div className="h-8 w-32 bg-slate-800 rounded mb-2"></div>
        <div className="h-4 w-16 bg-slate-800 rounded"></div>
      </div>
    );
  }

  const isPositive = change >= 0;

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-blue-600/10 transition-colors">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold">{value}</h3>
          <div className={cn(
            "flex items-center gap-1 text-sm mt-1 font-medium",
            isPositive ? "text-emerald-500" : "text-rose-500"
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
      </div>
    </div>
  );
}
