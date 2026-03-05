
"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Task from "./Task";
import { useState } from "react";

type FilterTasks = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
};

export function Accordian({
  completedTasks,
  count,
}: {
  completedTasks: FilterTasks[];
  count: number;
}) {
  const [appearCompleted, setappearCompleted] = useState(true);

  return (
    <div className="mt-4">
      <button
        onClick={() => setappearCompleted((prev) => !prev)}
        className="group ml-1 flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 transition-all hover:bg-white/20 hover:border-white dark:border-white/10 dark:text-white/40 dark:hover:text-white shadow-sm"
      >
        {appearCompleted ? (
          <ChevronDown
            size={14}
            className="transition-transform group-hover:translate-y-0.5"
          />
        ) : (
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        )}
        Completed ({count})
      </button>

      <div
        className={`mt-3 space-y-1 transition-all duration-500 ${appearCompleted ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"}`}
      >
        {completedTasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            description={task.description ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
