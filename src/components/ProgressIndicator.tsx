"use client";

import { useEffect, useState } from "react";

const START_PROGRESS = 63.4;
const TARGET_PROGRESS = 100.0;
const START_DATE = new Date("2026-03-27T01:00:00").getTime();
const END_DATE = new Date("2026-08-27T01:00:00").getTime();

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(START_PROGRESS);

  useEffect(() => {
    const updateProgress = () => {
      const now = Date.now();
      const totalDuration = END_DATE - START_DATE;
      const elapsed = now - START_DATE;

      const progressRatio = Math.min(
        Math.max(elapsed / totalDuration, 0),
        1
      );
      const currentPercent =
        START_PROGRESS +
        (TARGET_PROGRESS - START_PROGRESS) * progressRatio;

      setProgress(currentPercent);
    };

    const interval = setInterval(updateProgress, 50);
    updateProgress();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 max-w-sm w-full text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Phase 2: Core Fusion
        </span>
        <span className="text-xs font-mono text-neutral-900 dark:text-neutral-100">
          {progress.toFixed(1)}%
        </span>
      </div>
      <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
