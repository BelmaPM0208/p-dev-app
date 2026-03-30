"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Home, Award, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: "/", label: "Today", icon: Home },
  { href: "/history", label: "History", icon: CalendarDays },
  { href: "/rewards", label: "Rewards", icon: Award },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-4 left-4 right-4 h-20 bg-card/90 backdrop-blur-xl border border-white/10 flex items-center justify-around px-2 z-50 rounded-[2.5rem] shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-full transition-all duration-300",
              isActive ? "bg-accent text-accent-foreground shadow-[0_0_15px_rgba(216,252,53,0.3)]" : "text-gray-400 hover:text-white"
            )}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && <span className="text-[10px] font-bold mt-1 tracking-wide">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
