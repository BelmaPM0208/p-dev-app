import { HTMLAttributes } from "react";
import { cn } from "./BottomNav";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className, glass = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-5",
        glass ? "bg-card/70 backdrop-blur-md border border-white/5 shadow-xl" : "bg-card",
        className
      )}
      {...props}
    />
  );
}
