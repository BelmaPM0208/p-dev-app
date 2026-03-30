"use client";

import { DateSelector } from "@/components/ui/DateSelector";
import { Card } from "@/components/ui/Card";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { Activity, Brain, Users, Briefcase, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const { goals } = useStore();

  const pillars = [
    {
      id: "physical",
      title: "Physical Health",
      desc: "Fitness & Wellbeing",
      progress: goals["physical"]?.progress || 0,
      icon: Activity,
      color: "text-accent",
      bgBase: "from-[#1a2e05] to-[#0d1403]",
    },
    {
      id: "mental",
      title: "Mental Strength",
      desc: "Mindfulness & Focus",
      progress: goals["mental"]?.progress || 0,
      icon: Brain,
      color: "text-purple-400",
      bgBase: "from-[#1a0b2e] to-[#0d0314]",
    },
    {
      id: "personal",
      title: "Personal Growth",
      desc: "Communication & Social",
      progress: goals["personal"]?.progress || 0,
      icon: Users,
      color: "text-blue-400",
      bgBase: "from-[#0a1b33] to-[#030d1a]",
    },
    {
      id: "professional",
      title: "Professional Skills",
      desc: "Upskilling & Career",
      progress: goals["professional"]?.progress || 0,
      icon: Briefcase,
      color: "text-amber-400",
      bgBase: "from-[#33220a] to-[#1a1103]",
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.4 }} className="p-5 overflow-x-hidden">
      <header className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-card overflow-hidden border-2 border-accent/30 shadow-[0_0_15px_rgba(216,252,53,0.15)] flex items-center justify-center">
            <span className="text-accent font-bold text-lg">AL</span>
          </div>
          <div>
            <h1 className="text-[11px] text-gray-400 tracking-wider uppercase font-bold">Alexander</h1>
            <h2 className="text-2xl font-semibold tracking-tight mt-0.5">Today's Habits</h2>
          </div>
        </div>
        <Link href="/create" passHref>
          <button className="w-10 h-10 rounded-[1.2rem] bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 transition shadow-inner drop-shadow-lg text-accent">
            <span className="text-2xl leading-none font-light mb-0.5">+</span>
          </button>
        </Link>
      </header>

      <motion.div variants={item} initial="hidden" animate="show">
        <DateSelector />
      </motion.div>

      <div className="flex items-center justify-between mb-4 mt-2 px-1">
        <h3 className="text-lg font-medium tracking-wide">Your Pillars</h3>
        <button className="text-[10px] text-gray-400 hover:text-accent transition uppercase tracking-wider font-bold">See All</button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 mb-8">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div key={pillar.id} variants={item}>
              <Link href={`/pillar/${pillar.id}`} className="block focus:outline-none">
                <Card className={`relative overflow-hidden bg-gradient-to-br ${pillar.bgBase} border-white/5 p-4 rounded-[2rem] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer`}>
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between relative z-10 w-full">
                    <div className="flex items-center gap-4">
                      <div className={`w-[3.25rem] h-[3.25rem] rounded-[1.25rem] bg-black/40 border border-white/10 flex items-center justify-center shadow-inner ${pillar.color}`}>
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white tracking-wide">{pillar.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 font-medium">{pillar.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ProgressCircle 
                        progress={pillar.progress} 
                        size={48} 
                        strokeWidth={4.5} 
                        className="mb-0" 
                        label="" 
                        showShadow={false}
                      />
                      <div className="w-8 h-8 rounded-[1rem] bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer shadow-inner">
                         <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="h-8"></div>
    </motion.div>
  );
}
