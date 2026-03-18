export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
}

const CX = 60;
const CY = 60;
const R = 45;
const STROKE_WIDTH = 15;
const GAP = 0;
const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 282.74

export default function DonutChart({ segments, centerLabel = "Total" }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let cumulativeOffset = 0;
  const arcs = segments.map((seg) => {
    const fraction = seg.value / total;
    const arcLength = fraction * CIRCUMFERENCE - GAP;
    const dashOffset = arcLength + CIRCUMFERENCE - cumulativeOffset;
    cumulativeOffset += fraction * CIRCUMFERENCE;
    return { ...seg, arcLength, dashOffset };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      {/* SVG Donut */}
      <div className="relative">
        <svg width={120} height={120} viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#1f2937"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Segments */}
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={arc.color}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${arc.arcLength} ${CIRCUMFERENCE}`}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          ))}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{total}</span>
          <span className="text-xs text-gray-400">{centerLabel}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full space-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-gray-300">{seg.label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}