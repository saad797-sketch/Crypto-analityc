import { ExternalLink, Clock, Tag } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  published: string;
  summary: string;
  source: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  category: string;
}

export function NewsFeed({ news }: { news: NewsItem[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Latest Intelligence</h3>
        <div className="flex gap-2">
          {['All', 'Bitcoin', 'DeFi', 'Regulation'].map(cat => (
            <button key={cat} className="px-3 py-1 text-xs bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {news.map((item, index) => (
          <div key={index} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.sentiment === 'bullish' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.sentiment === 'bearish' ? 'bg-rose-500/10 text-rose-500' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {item.sentiment}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.published.split(' ').slice(0, 4).join(' ')}
                  </span>
                  <span className="font-medium text-slate-400">
                    Source: {item.source}
                  </span>
                </div>
              </div>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors text-slate-400 hover:text-white shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
