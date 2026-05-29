'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { TrendingSection } from '@/components/dashboard/TrendingSection';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { WatchlistButton } from '@/components/dashboard/WatchlistButton';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { cryptoApi } from '@/services/api';
import { DollarSign, Activity, TrendingUp, BarChart3, Loader2 } from 'lucide-react';

export default function MarketDashboard() {
  const { isSidebarOpen } = useDashboardStore();
  const { fetchWatchlist } = useWatchlistStore();
  const [topCoins, setTopCoins] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWatchlist();
        const [coinsData, newsData] = await Promise.all([
          cryptoApi.getTopCoins(15),
          cryptoApi.getNews()
        ]);
        setTopCoins(coinsData);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchWatchlist]);

  const gainers = [...topCoins]
    .sort((a, b) => (b.price_change_24h || 0) - (a.price_change_24h || 0))
    .slice(0, 4);

  const losers = [...topCoins]
    .sort((a, b) => (a.price_change_24h || 0) - (b.price_change_24h || 0))
    .slice(0, 4);

  const btcPrice = topCoins.find(c => c.id === 'bitcoin')?.current_price || 0;

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-50">
      <Sidebar />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"} pb-10`}>
        <Navbar />
        
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Market Intelligence</h1>
              <p className="text-slate-400 text-sm md:text-base">Real-time crypto analytics and performance tracking.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Market Data
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard 
              title="Global Market Cap" 
              value="$2.45T" 
              change={2.5} 
              icon={DollarSign} 
              loading={loading}
            />
            <StatCard 
              title="Bitcoin Price" 
              value={`$${btcPrice.toLocaleString()}`} 
              change={1.2} 
              icon={Activity} 
              loading={loading}
            />
            <StatCard 
              title="24h Volume" 
              value="$84.2B" 
              change={-5.4} 
              icon={BarChart3} 
              loading={loading}
            />
            <StatCard 
              title="BTC Dominance" 
              value="52.4%" 
              change={0.8} 
              icon={TrendingUp} 
              loading={loading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PriceChart />
              <NewsFeed news={news} />
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="h-full flex items-center justify-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : (
                <>
                  <TrendingSection title="Top Gainers" coins={gainers} type="gainers" />
                  <TrendingSection title="Top Losers" coins={losers} type="losers" />
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20">
                    <h4 className="text-lg font-bold mb-2">Alpha Insights</h4>
                    <p className="text-sm text-blue-100 mb-4 opacity-90">
                      Our sentiment engine shows a highly bullish trend for DeFi protocols today.
                    </p>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold backdrop-blur-md transition-all">
                      Unlock Full Report
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Market Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Market Assets</h3>
              <button className="text-sm text-blue-500 font-medium hover:underline">View All</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="pb-4 font-semibold"># Asset</th>
                  <th className="pb-4 font-semibold">Price</th>
                  <th className="pb-4 font-semibold">24h Change</th>
                  <th className="pb-4 font-semibold hidden md:table-cell">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topCoins.map((coin) => (
                  <tr key={coin.id} className="group hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <WatchlistButton coinId={coin.id} />
                        <span className="text-slate-500 text-xs w-4">{coin.rank}</span>
                        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                        <span className="font-bold">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 font-medium">${coin.current_price.toLocaleString()}</td>
                    <td className={`py-4 font-bold ${coin.price_change_24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {coin.price_change_24h?.toFixed(2)}%
                    </td>
                    <td className="py-4 text-slate-400 text-sm hidden md:table-cell">
                      ${(coin.market_cap / 1e9).toFixed(2)}B
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
