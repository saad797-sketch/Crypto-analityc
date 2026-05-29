'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { time: '00:00', price: 62000 },
  { time: '04:00', price: 63500 },
  { time: '08:00', price: 63000 },
  { time: '12:00', price: 64800 },
  { time: '16:00', price: 64200 },
  { time: '20:00', price: 65500 },
  { time: '23:59', price: 66000 },
];

export function PriceChart() {
  return (
    <div className="w-full h-[400px] p-6 rounded-2xl bg-slate-900 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Bitcoin (BTC) Price</h3>
          <p className="text-sm text-slate-400">Real-time market performance</p>
        </div>
        <div className="flex bg-slate-800 rounded-lg p-1">
          {['1H', '1D', '1W', '1M', '1Y'].map((t) => (
            <button key={t} className="px-3 py-1 text-xs font-medium rounded-md hover:bg-slate-700 transition-colors">
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            hide 
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
