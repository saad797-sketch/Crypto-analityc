'use client';

import { Gauge, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentData {
  current: {
    value: number;
    status: string;
    timestamp: number;
  };
  history: Array<{
    value: number;
    status: string;
    timestamp: number;
  }>;
}

export function FearAndGreedWidget({ data }: { data: SentimentData }) {
  const getSentimentColor = (value: number) => {
    if (value <= 25) return 'text-rose-600';
    if (value <= 45) return 'text-orange-500';
    if (value <= 55) return 'text-yellow-500';
    if (value <= 75) return 'text-emerald-500';
    return 'text-green-600';
  };

  const getSentimentBg = (value: number) => {
    if (value <= 25) return 'bg-rose-600';
    if (value <= 45) return 'bg-orange-500';
    if (value <= 55) return 'bg-yellow-500';
    if (value <= 75) return 'bg-emerald-500';
    return 'bg-green-600';
  };

  const getTrendIcon = (current: number, yesterday: number) => {
    if (current > yesterday) return <TrendingUp className="w-3 h-3 text-emerald-500" />;
    if (current < yesterday) return <TrendingDown className="w-3 h-3 text-rose-500" />;
    return <Minus className="w-3 h-3 text-slate-500" />;
  };

  const yesterdayValue = data.history[1]?.value || data.current.value;

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Gauge className="w-4 h-4 text-blue-500" />
          Market Sentiment
        </h3>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-800"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * data.current.value) / 100}
              className={`${getSentimentColor(data.current.value)} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black">{data.current.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Index</span>
          </div>
        </div>
        <div className={`mt-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${getSentimentBg(data.current.value)} text-white shadow-lg`}>
          {data.current.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Yesterday</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100">{yesterdayValue}</span>
            {getTrendIcon(data.current.value, yesterdayValue)}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Weekly Avg</p>
          <span className="font-bold text-slate-100">
            {Math.round(data.history.reduce((a, b) => a + b.value, 0) / data.history.length)}
          </span>
        </div>
      </div>
    </div>
  );
}
