import { Card } from "@/components/ui/Card";
import { Share2, Target, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/components/ui/BottomNav";

export default function History() {
  const tabs = ["Calendar", "All habits", "Rewards"];
  
  // Create a mock calendar grid for March 2025 (starts on Saturday = index 6)
  const daysInMonth = 31;
  const startDayOffset = 6; 
  const calendarCells = Array.from({ length: 42 }); // 6 rows of 7

  return (
    <div className="p-6 overflow-x-hidden min-h-screen flex flex-col">
      <header className="flex items-center justify-between mb-8 pt-4">
        <h1 className="text-3xl font-semibold tracking-tight">History</h1>
        <button className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:bg-white/10 transition backdrop-blur-md shadow-lg">
          <Share2 size={20} className="text-gray-300" />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="flex flex-col p-5 rounded-[2rem] bg-gradient-to-br from-[#1a2e05]/60 to-[#0d1403]/80 border-accent/20 relative overflow-hidden text-left">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-accent/20 rounded-full blur-[30px] pointer-events-none"></div>
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
            <Target size={18} className="text-accent" />
          </div>
          <span className="text-[13px] text-gray-400 font-medium mb-1 tracking-wide">Total Progress</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">52</span>
            <span className="text-lg text-gray-500 font-medium">%</span>
          </div>
        </Card>
        
        <Card className="flex flex-col p-5 rounded-[2rem] relative overflow-hidden bg-card/60">
          <div className="w-10 h-10 rounded-[1.2rem] bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
            <Flame size={18} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
          </div>
          <span className="text-[13px] text-gray-400 font-medium mb-1 tracking-wide">Current Streak</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">12</span>
            <span className="text-xs text-gray-500 font-semibold pb-1 uppercase tracking-wider">Days</span>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={cn(
              "flex-1 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-xl border tracking-wide",
              idx === 0
                ? "bg-accent border-accent text-accent-foreground drop-shadow-[0_0_15px_rgba(216,252,53,0.3)]"
                : "bg-card/80 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Calendar Component */}
      <Card className="p-6 rounded-[2.5rem] bg-card/60 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-white/5 pb-8 mb-8">
        <div className="absolute left-1/2 top-[-20%] -translate-x-1/2 w-[80%] h-[70%] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="flex items-center justify-between mb-8 relative z-10 px-2">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-3">
             <span className="text-xl opacity-90">📅</span> March 2025
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition shadow-inner">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition shadow-inner">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-6 text-center mb-6 text-[10px] text-gray-500 font-bold uppercase tracking-wider border-b border-white/5 pb-4 px-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm relative z-10 px-1">
          {calendarCells.map((_, i) => {
            const dateStr = i - startDayOffset + 1;
            const isInvalid = dateStr <= 0 || dateStr > daysInMonth;
            const isToday = dateStr === 9; // Static example selected date
            const isPast = !isInvalid && dateStr < 9;

            return (
              <div key={i} className="flex justify-center items-center h-12 w-full">
                {isInvalid ? (
                   <div className="w-full flex justify-center">
                     <span className="text-white/5 font-semibold text-lg border-2 border-dashed border-white/5 w-10 h-10 rounded-2xl flex items-center justify-center"></span>
                   </div>
                ) : (
                  <button
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center transition-all font-semibold",
                      isToday
                        ? "bg-accent text-accent-foreground drop-shadow-[0_0_12px_rgba(216,252,53,0.5)] text-lg"
                        : isPast
                        ? "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
                        : "text-gray-500 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {dateStr}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>
      
    </div>
  );
}
