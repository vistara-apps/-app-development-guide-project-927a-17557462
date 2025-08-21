
"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressChartProps {
  data: Array<{ date: string; value: number }>;
  type: 'line' | 'bar';
}

export function ProgressChart({ data, type }: ProgressChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  if (type === 'line') {
    return (
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="formattedDate"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="text-text-muted"
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="text-text-muted"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(200, 80%, 50%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(200, 80%, 50%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(200, 80%, 50%)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="formattedDate"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-text-muted"
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-text-muted"
          />
          <Bar dataKey="value" fill="hsl(160, 70%, 45%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
