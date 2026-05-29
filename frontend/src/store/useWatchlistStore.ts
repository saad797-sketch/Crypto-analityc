import { create } from 'zustand';
import { cryptoApi } from '@/services/api';

interface WatchlistState {
  watchlistIds: string[];
  fetchWatchlist: () => Promise<void>;
  toggleWatchlist: (coinId: string) => Promise<void>;
  isInWatchlist: (coinId: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlistIds: [],
  fetchWatchlist: async () => {
    try {
      const items = await cryptoApi.getWatchlist();
      set({ watchlistIds: items.map((i: any) => i.coin_id) });
    } catch (error) {
      console.error("Failed to fetch watchlist", error);
    }
  },
  toggleWatchlist: async (coinId) => {
    const { watchlistIds } = get();
    const isPresent = watchlistIds.includes(coinId);

    try {
      if (isPresent) {
        await cryptoApi.removeFromWatchlist(coinId);
        set({ watchlistIds: watchlistIds.filter(id => id !== coinId) });
      } else {
        await cryptoApi.addToWatchlist(coinId);
        set({ watchlistIds: [...watchlistIds, coinId] });
      }
    } catch (error) {
      console.error("Failed to toggle watchlist", error);
    }
  },
  isInWatchlist: (coinId) => get().watchlistIds.includes(coinId),
}));
