
import React from "react";
import { cn } from "@/lib/utils";

export default function Card({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow border p-6 mb-6",
      "lg:p-8 lg:mb-8",
      className
    )}>
      {children}
    </div>
  );
}
