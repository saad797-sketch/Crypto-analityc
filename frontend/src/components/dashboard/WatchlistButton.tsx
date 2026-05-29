'use client';

import { Star } from 'lucide-react';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { clsx } from 'clsx';

export function WatchlistButton({ coinId }: { coinId: string }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlistStore();
  const active = isInWatchlist(coinId);

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        toggleWatchlist(coinId);
      }}
      className={clsx(
        "p-2 rounded-lg transition-all",
        active ? "text-yellow-500 bg-yellow-500/10" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
      )}
    >
      <Star className={clsx("w-4 h-4", active && "fill-current")} />
    </button>
  );
}
