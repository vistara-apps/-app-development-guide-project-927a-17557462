"use client";

interface ProgressChartProps {
  variant: "line" | "bar";
  data: Array<{ date: string; value: number; label?: string }>;
  title: string;
}

export function ProgressChart({ variant, data, title }: ProgressChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  if (variant === "line") {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="hsl(200, 80%, 50%)"
              strokeWidth="2"
              points={points}
              vectorEffect="non-scaling-stroke"
            />
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((item.value - minValue) / range) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="hsl(200, 80%, 50%)"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-end justify-between text-xs text-text/60 px-2 pb-2">
            {data.map((item, index) => (
              <span key={index} className="transform -rotate-45 origin-bottom-left">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-sm text-text/60 w-16 flex-shrink-0">
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <div className="flex-1 bg-surface rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text">
                {item.value} {item.label || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
