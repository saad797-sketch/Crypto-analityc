import { Activity, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

interface AnalysisData {
  rsi: number;
  macd: number;
  trend: string;
  score: number;
  signals: string[];
}

export function TechnicalAnalysis({ data }: { data: AnalysisData }) {
  const getTrendColor = (trend: string) => {
    if (trend.includes('Bullish')) return 'text-emerald-500';
    if (trend.includes('Bearish')) return 'text-rose-500';
    return 'text-slate-400';
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Technical Signals</h3>
        <span className={`text-sm font-bold px-3 py-1 rounded-full bg-slate-800 ${getTrendColor(data.trend)}`}>
          {data.trend}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-xs text-slate-500 mb-1">RSI (14)</p>
          <p className={`text-xl font-bold ${data.rsi > 70 ? 'text-rose-500' : data.rsi < 30 ? 'text-emerald-500' : 'text-slate-100'}`}>
            {data.rsi}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-xs text-slate-500 mb-1">Market Score</p>
          <p className="text-xl font-bold text-blue-500">{data.score}/100</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Signals</p>
        {data.signals.map((signal, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            {signal.includes('Bullish') ? (
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ) : signal.includes('Bearish') ? (
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            ) : (
              <Zap className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-sm font-medium">{signal}</span>
          </div>
        ))}
        {data.signals.length === 0 && (
          <p className="text-sm text-slate-500 italic">No strong signals at the moment.</p>
        )}
      </div>
    </div>
  );
}
