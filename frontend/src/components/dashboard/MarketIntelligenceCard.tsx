import { Shield, Zap, Target, Info } from 'lucide-react';

interface IntelMetrics {
  risk: number;
  momentum: number;
  confidence: number;
}

interface IntelData {
  overall_score: number;
  trend: string;
  metrics: IntelMetrics;
  summary: string;
}

export function MarketIntelligenceCard({ data }: { data: IntelData }) {
  const getScoreColor = (score: number) => {
    if (score > 20) return 'text-emerald-500';
    if (score < -20) return 'text-rose-500';
    return 'text-blue-500';
  };

  const getProgressColor = (val: number, inverse = false) => {
    if (inverse) {
      if (val > 70) return 'bg-rose-500';
      if (val < 30) return 'bg-emerald-500';
      return 'bg-blue-500';
    }
    if (val > 70) return 'bg-emerald-500';
    if (val < 30) return 'bg-rose-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight">AI Market Intelligence</h3>
          <p className="text-sm text-slate-500">Advanced diagnostic & trend forecasting</p>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-black ${getScoreColor(data.overall_score)}`}>
            {data.overall_score > 0 ? `+${data.overall_score}` : data.overall_score}
          </span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Diagnostic Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Metric */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-rose-500" /> Risk Level</span>
            <span>{data.metrics.risk}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${getProgressColor(data.metrics.risk, true)}`}
              style={{ width: `${data.metrics.risk}%` }}
            ></div>
          </div>
        </div>

        {/* Momentum Metric */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Momentum</span>
            <span>{data.metrics.momentum}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${getProgressColor(data.metrics.momentum)}`}
              style={{ width: `${data.metrics.momentum}%` }}
            ></div>
          </div>
        </div>

        {/* Confidence Metric */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-2"><Target className="w-4 h-4 text-blue-500" /> Confidence</span>
            <span>{data.metrics.confidence}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${getProgressColor(data.metrics.confidence)}`}
              style={{ width: `${data.metrics.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-blue-600/5 border border-blue-500/10 flex gap-4">
        <div className="p-2 bg-blue-500/10 rounded-xl h-fit">
          <Info className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-400 mb-1">AI Reasoning</h4>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{data.summary}"
          </p>
        </div>
      </div>
    </div>
  );
}
