import React from 'react';
import { motion } from 'framer-motion';
import { DashboardCard } from './DashboardCard';
import { CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

export const ChartCard: React.FC = () => {
  // Weekly points: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  // Values representing number of analyses
  const data = [12, 19, 15, 25, 22, 30, 28];
  const maxVal = 35;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // SVG parameters
  const width = 500;
  const height = 180;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Calculate coordinates for the line chart
  const points = data.map((val, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
    return { x, y };
  });

  // Construct SVG path string
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Construct area path under the line
  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <DashboardCard className="bg-white dark:bg-zinc-950 flex flex-col h-full">
      <CardHeader className="pb-3 border-b-0">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Weekly Performance</CardTitle>
        <CardDescription className="text-zinc-900 dark:text-zinc-50 font-bold text-lg font-mono">
          151 Runs <span className="text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-full ml-1.5">+14% Quality</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-end min-h-[200px]">
        {/* Responsive Chart Container */}
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height="100%"
            className="overflow-visible"
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = paddingTop + chartHeight * ratio;
              const value = Math.round(maxVal * (1 - ratio));
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    className="stroke-zinc-100 dark:stroke-zinc-900 stroke-1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-zinc-400 font-mono text-[9px] font-medium"
                  >
                    {value}
                  </text>
                </g>
              );
            })}

            {/* Area path */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              d={areaD}
              fill="url(#areaGrad)"
            />

            {/* Line path */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              d={pathD}
              fill="none"
              className="stroke-violet-500 dark:stroke-violet-400 stroke-2"
            />

            {/* Data Points / Dot markers */}
            {points.map((p, idx) => (
              <g key={idx} className="group/dot cursor-pointer">
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="3.5"
                  className="fill-white stroke-violet-500 dark:stroke-violet-400 stroke-2 transition-all group-hover/dot:r-5"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  className="fill-transparent group-hover/dot:fill-violet-500/10"
                />
              </g>
            ))}

            {/* X Axis Labels */}
            {labels.map((label, idx) => {
              const x = paddingLeft + (idx / (labels.length - 1)) * chartWidth;
              return (
                <text
                  key={idx}
                  x={x}
                  y={height - paddingBottom + 16}
                  textAnchor="middle"
                  className="fill-zinc-400 dark:fill-zinc-500 font-sans text-[10px] font-semibold"
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </DashboardCard>
  );
};
