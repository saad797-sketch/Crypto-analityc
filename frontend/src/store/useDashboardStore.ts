import { create } from 'zustand';

interface DashboardState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedAsset: string | null;
  setSelectedAsset: (asset: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  selectedAsset: 'BTC',
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
}));
