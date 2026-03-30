"use client";

import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { ChevronLeft, Activity, Brain, Users, Briefcase, TrendingUp, Calendar, Zap, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { motion } from "framer-motion";

const PILLAR_CONFIG = {
  physical: {
    title: "Physical Health",
    desc: "Fitness & Wellbeing",
    icon: Activity,
    color: "text-accent",
    bgBase: "from-[#1a2e05] to-[#0d1403]",
    metrics: [
      { label: "Workouts", value: "4/5", unit: "this week" },
      { label: "Active Calories", value: "3,200", unit: "kcal" }
    ]
  },
  mental: {
    title: "Mental Strength",
    desc: "Mindfulness & Focus",
    icon: Brain,
    color: "text-purple-400",
    bgBase: "from-[#1a0b2e] to-[#0d0314]",
    metrics: [
      { label: "Meditation", value: "120", unit: "minutes" },
      { label: "Deep Work", value: "14", unit: "hours" }
    ]
  },
  personal: {
    title: "Personal Growth",
    desc: "Communication & Social",
    icon: Users,
    color: "text-blue-400",
    bgBase: "from-[#0a1b33] to-[#030d1a]",
    metrics: [
      { label: "Books Read", value: "2", unit: "this month" },
      { label: "Networking", value: "3", unit: "events" }
    ]
  },
  professional: {
    title: "Professional Skills",
    desc: "Upskilling & Career",
    icon: Briefcase,
    color: "text-amber-400",
    bgBase: "from-[#33220a] to-[#1a1103]",
    metrics: [
      { label: "Courses Completed", value: "1", unit: "this month" },
      { label: "Project Hours", value: "45", unit: "hours" }
    ]
  }
};

export default function PillarDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { goals } = useStore();
  
  const config = PILLAR_CONFIG[id as keyof typeof PILLAR_CONFIG];
  const progress = goals[id]?.progress || 0;

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center p-6 h-full min-h-[100dvh] text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pillar Not Found</h1>
        <button onClick={() => router.push('/')} className="text-accent underline font-semibold mt-4">Return to Dashboard</button>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="p-6 overflow-x-hidden flex flex-col min-h-[100dvh] pb-32">
      <header className="flex items-center justify-between mb-8 pt-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition backdrop-blur-md">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-white/90">Pillar Details</h1>
        <div className="w-10 h-10"></div> {/* Spacer for centering */}
      </header>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring" }}>
        <Card className={`relative overflow-hidden bg-gradient-to-br ${config.bgBase} border-white/5 p-6 rounded-[2.5rem] mb-8 shadow-2xl`}>
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="flex flex-col items-center relative z-10 w-full mb-6">
            <div className={`w-16 h-16 rounded-[1.5rem] bg-black/40 border border-white/10 flex items-center justify-center shadow-inner mb-4 ${config.color}`}>
              <Icon size={32} strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight text-center">{config.title}</h2>
            <p className="text-sm text-gray-400 mt-1.5 font-medium">{config.desc}</p>
          </div>

          <div className="flex justify-center mb-4 relative z-10 w-full">
            <ProgressCircle 
              progress={progress} 
              size={180} 
              strokeWidth={14} 
              label="Completed" 
              className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]" 
            />
          </div>
        </Card>
      </motion.div>

      <h3 className="text-lg font-medium tracking-wide mb-4 px-2 flex items-center gap-2">
        <TrendingUp size={18} className="text-accent"/> Key Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {config.metrics.map((metric, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (idx + 1) }}>
            <Card className="flex flex-col p-5 rounded-[2rem] bg-card/60 relative overflow-hidden border border-white/5 h-full justify-center">
               <span className="text-[10px] text-gray-400 font-bold mb-1 tracking-wider uppercase">{metric.label}</span>
               <div className="flex flex-col mt-1">
                 <span className={`text-2xl font-bold tracking-tight ${config.color} drop-shadow-md`}>{metric.value}</span>
                 <span className="text-xs text-gray-500 font-medium">{metric.unit}</span>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <h3 className="text-lg font-medium tracking-wide mb-4 px-2 flex items-center gap-2 mt-4">
        <Calendar size={18} className="text-accent"/> Weekly Schedule
      </h3>
      
      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full flex items-center justify-between bg-card/40 backdrop-blur-md border border-white/5 p-5 rounded-[2rem] hover:bg-white/5 transition-all focus:outline-none">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-black/40 border border-white/5 flex items-center justify-center shadow-inner ${config.color}`}>
              <Zap size={20}/>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white tracking-wide">Daily Target</h4>
              <p className="text-xs text-gray-400 mt-0.5">Focus for 1 hour</p>
            </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <ChevronLeft size={16} className="rotate-180" />
        </div>
      </motion.button>
    </motion.div>
  );
}
