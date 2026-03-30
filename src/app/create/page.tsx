"use client";

import { useState } from "react";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { useStore } from "@/store/useStore";
import { Activity, Brain, Users, Briefcase, Check, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreatePlan() {
  const { goals, updateGoalProgress } = useStore();
  const [selectedPillar, setSelectedPillar] = useState<string>("physical");
  const router = useRouter();
  
  const pillars = [
    { id: "physical", label: "Physical", icon: Activity, color: "text-accent" },
    { id: "mental", label: "Mental", icon: Brain, color: "text-purple-400" },
    { id: "personal", label: "Personal", icon: Users, color: "text-blue-400" },
    { id: "professional", label: "Career", icon: Briefcase, color: "text-amber-400" },
  ];

  const currentGoal = goals[selectedPillar];
  const totalProgress = Object.values(goals).reduce((acc, g) => acc + g.progress, 0) / 4;

  const handleAdjust = (amount: number) => {
    updateGoalProgress(selectedPillar, currentGoal.progress + amount);
  };

  const onSave = () => {
    router.push("/");
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-6 overflow-x-hidden flex flex-col h-full mt-4">
      <h1 className="text-3xl font-semibold mb-8 tracking-tight text-center">Log Progress</h1>

      <div className="flex justify-center mb-10 mt-2">
        <ProgressCircle 
          progress={totalProgress} 
          size={220} 
          strokeWidth={16} 
          label="Avg Progress" 
          className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
        />
      </div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="bg-card/60 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full pointer-events-none"></div>

        <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4 mx-2">Select Pillar</h3>
        <div className="grid grid-cols-4 gap-2 mb-8 relative z-10">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`flex flex-col items-center gap-2 p-2 rounded-[1.25rem] transition-all border border-transparent ${
                  isSelected ? "bg-white/10 shadow-inner border-white/10" : "hover:bg-white/5 opacity-60"
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shadow-inner transition-colors duration-300 ${isSelected ? p.color : "text-gray-400"}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[10px] font-bold ${isSelected ? "text-white" : "text-gray-400"}`}>{p.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between bg-black/40 rounded-full p-2 border border-white/5 mb-6 relative z-10">
          <button 
            onClick={() => handleAdjust(-5)}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition text-white/80 active:scale-95"
          >
            <Minus size={20} />
          </button>
          <div className="flex flex-col items-center">
            <AnimatePresence mode="popLayout">
               <motion.span 
                 key={currentGoal.progress}
                 initial={{ opacity: 0, scale: 0.5, y: -20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.5, y: 20 }}
                 className="text-3xl font-bold tracking-tight text-white mb-[-4px]"
               >
                 {currentGoal.progress}%
               </motion.span>
            </AnimatePresence>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Today</span>
          </div>
          <button 
             onClick={() => handleAdjust(5)}
            className="w-12 h-12 rounded-[1.2rem] bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 transition text-accent shadow-inner active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>

        <button onClick={onSave} className="w-full h-14 bg-accent text-accent-foreground rounded-[1.5rem] flex items-center justify-center gap-2 font-bold text-base shadow-[0_0_20px_rgba(216,252,53,0.25)] hover:shadow-[0_0_30px_rgba(216,252,53,0.4)] hover:bg-[#d4fa1c] transition-all relative z-10">
          <Check size={20} strokeWidth={3} />
          Save Progress
        </button>
      </motion.div>

       <div className="h-20"></div>
    </motion.div>
  );
}
