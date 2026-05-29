import { TrendingUp, TrendingDown } from 'lucide-react';

interface MiniCardProps {
  title: string;
  coins: any[];
  type: 'gainers' | 'losers';
}

export function TrendingSection({ title, coins, type }: MiniCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 h-full">
      <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">{title}</h3>
      <div className="space-y-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-bold leading-none">{coin.symbol}</p>
                <p className="text-[10px] text-slate-500 mt-1">{coin.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">${coin.current_price.toLocaleString()}</p>
              <div className={`flex items-center gap-1 text-[11px] font-bold mt-1 ${type === 'gainers' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {type === 'gainers' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(coin.price_change_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
