import { cn } from "@/components/ui/BottomNav";

interface ProgressCircleProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  showShadow?: boolean;
}

export function ProgressCircle({
  progress,
  size = 120,
  strokeWidth = 10,
  className,
  label = "Goal",
  showShadow = true
}: ProgressCircleProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center auto-cols-auto", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={cn("transform -rotate-90", showShadow && "drop-shadow-lg")}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={showShadow ? { filter: "drop-shadow(0px 0px 4px rgba(216, 252, 53, 0.4))" } : {}}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("font-bold tracking-tight", size > 80 ? "text-3xl" : "text-[11px] mt-0.5")}>{Math.round(clampedProgress)}%</span>
        {size > 80 && label && <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">{label}</span>}
      </div>
    </div>
  );
}
