"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/components/ui/BottomNav";

const DATES = [
  { day: "Sun", date: 2 },
  { day: "Mon", date: 3 },
  { day: "Tue", date: 4 },
  { day: "Wed", date: 5 },
  { day: "Thu", date: 6 },
];

export function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(3);
  const [timeOfDay, setTimeOfDay] = useState("Morning");

  return (
    <div className="bg-card/70 backdrop-blur-md border border-white/5 rounded-[2rem] p-5 shadow-xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium tracking-wide">March 2025</h2>
        <div className="flex gap-3">
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition border border-white/5">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition border border-white/5">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        {DATES.map((item) => (
          <button
            key={item.date}
            onClick={() => setSelectedDate(item.date)}
            className={cn(
              "flex flex-col items-center justify-center w-[3.25rem] h-[4rem] rounded-2xl transition-all duration-300 pointer-events-auto",
              selectedDate === item.date
                ? "bg-accent text-accent-foreground shadow-[0_0_15px_rgba(216,252,53,0.3)]"
                : "border border-white/10 hover:border-white/30 bg-black/20"
            )}
          >
            <span className={cn("text-[10px] mb-1 font-medium", selectedDate === item.date ? "text-accent-foreground/70" : "text-gray-400")}>
              {item.day}
            </span>
            <span className={cn("text-lg font-bold", selectedDate === item.date ? "text-accent-foreground" : "text-white")}>
              {item.date}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        {["Morning", "Afternoon", "Evening"].map((time) => (
          <button
            key={time}
            onClick={() => setTimeOfDay(time)}
            className={cn(
              "flex-1 py-2.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 border",
              timeOfDay === time
                ? "bg-accent/10 border-accent/40 text-accent shadow-[inset_0_0_10px_rgba(216,252,53,0.1)]"
                : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
