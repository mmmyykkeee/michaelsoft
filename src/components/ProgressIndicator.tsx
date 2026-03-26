"use client";

import { useEffect, useState } from "react";

const START_PROGRESS = 63.4;
const TARGET_PROGRESS = 100.0;
const START_DATE = new Date("2026-03-27T01:00:00").getTime();
const END_DATE = new Date("2026-06-27T01:00:00").getTime();

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(START_PROGRESS);

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now();
      const totalDuration = END_DATE - START_DATE;
      const elapsed = now - START_DATE;
      
      const progressRatio = Math.min(Math.max(elapsed / totalDuration, 0), 1);
      const currentPercent = START_PROGRESS + (TARGET_PROGRESS - START_PROGRESS) * progressRatio;
      
      setProgress(currentPercent);
    };

    const interval = setInterval(updateProgress, 50);
    updateProgress();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[5.5rem] max-w-[420px] w-full mx-auto text-left opacity-0 animate-fadeIn [animation-delay:1.2s] max-[768px]:max-w-[280px] max-[768px]:mt-[4.5rem]">
      <div className="flex justify-between items-end mb-3 font-headline tracking-widest_extra font-bold">
        <span className="text-[0.55rem] text-on-surface-variant opacity-70">PHASE 2: CORE FUSION</span>
        <span className="text-[0.8rem] text-primary drop-shadow-[0_0_15px_rgba(0,242,255,0.4)] animate-pulse-text max-[768px]:text-[0.7rem]">
          {progress.toFixed(4)}%
        </span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative backdrop-blur-[5px] border border-white/[0.03]">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative transition-[width] duration-500 ease-out shadow-[0_0_20px_rgba(0,242,255,0.3)]"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-progress-slide"></div>
        </div>
      </div>
    </div>
  );
}
