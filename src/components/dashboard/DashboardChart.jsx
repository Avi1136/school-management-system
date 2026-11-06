import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const chartData = [
  { date: "01 Jan", websiteBlog: 430, socialMedia: 24 },
  { date: "03 Jan", websiteBlog: 500, socialMedia: 42 },
  { date: "04 Jan", websiteBlog: 410, socialMedia: 35 },
  { date: "05 Jan", websiteBlog: 660, socialMedia: 27 },
  { date: "06 Jan", websiteBlog: 220, socialMedia: 43 },
  { date: "07 Jan", websiteBlog: 410, socialMedia: 22 },
  { date: "08 Jan", websiteBlog: 200, socialMedia: 17 },
  { date: "09 Jan", websiteBlog: 350, socialMedia: 31 },
  { date: "10 Jan", websiteBlog: 740, socialMedia: 22 },
  { date: "11 Jan", websiteBlog: 310, socialMedia: 22 },
  { date: "12 Jan", websiteBlog: 250, socialMedia: 12 },
];

const DashboardChart = () => {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Student Strength & Activity Trend</h3>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Comparison between website portal and social media engagement</span>
        </div>
        <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: 'white' }}>
          <option>Last 14 Days</option>
          <option>Last Month</option>
        </select>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }} />
            <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
            <Bar yAxisId="left" dataKey="websiteBlog" name="Portal Traffic" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
            <Line yAxisId="right" type="monotone" dataKey="socialMedia" name="Engagement Score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;