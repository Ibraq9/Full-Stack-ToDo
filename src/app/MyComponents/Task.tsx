"use client";

import React from "react";
import { Trash, Edit3, Calendar, CheckCircle2, Circle } from "lucide-react";
import { getTasks, completedTask, deleteTask } from "../../action/task.action";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import EditTaskDialog from "./EditTaskDialog";
import toast from "react-hot-toast";

const Task = ({
  id,
  title,
  description,
  completed,
  createdAt,
}: {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTask(id);
    router.refresh();

    toast.success("Task deleted succesfully");
  };

  const handleCompleteTask = async () => {
    const newStatus = !completed;
    await completedTask(id, newStatus);
    if (newStatus) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#cbd5e1"],
      });
      toast.success("Task marked as completed successfully");
    }
    router.refresh();
  };

  return (
    <div
      className={`
            group relative flex items-center w-full gap-4 my-3 p-5 rounded-2xl transition-all duration-300
            border border-white/40 bg-white/10 backdrop-blur-xl shadow-lg
            dark:border-white/10 dark:bg-white/5
            ${completed ? "opacity-60 grayscale-[0.5]" : "hover:bg-white/20 hover:scale-[1.01] hover:shadow-white/5"}
        `}
    >
      {/* Custom Glass Checkbox */}
      <button
        onClick={handleCompleteTask}
        className="relative flex items-center justify-center transition-transform active:scale-90"
      >
        {completed ? (
          <CheckCircle2
            size={24}
            className="text-slate-900 dark:text-white"
            strokeWidth={2.5}
          />
        ) : (
          <Circle
            size={24}
            className="text-slate-400 dark:text-white/30 hover:text-slate-600"
            strokeWidth={2}
          />
        )}
      </button>

      {/* Task Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <h1
          className={`text-lg font-bold truncate text-slate-900 dark:text-white transition-all ${completed ? "line-through decoration-2" : ""}`}
        >
          {title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-white/50 line-clamp-2">
          {description}
        </p>

        {/* Meta Info Line */}
        <div className="flex items-center gap-3 mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {createdAt.toLocaleDateString("en-GB")}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full border ${completed ? "border-slate-900/20 bg-slate-900/10" : "border-white/40 bg-white/20"}`}
          >
            {completed ? "Finished" : "In Progress"}
          </span>
        </div>
      </div>

      {/* Glass Actions */}
      <div className="flex items-center gap-2">
        <EditTaskDialog
          taskId={id}
          titleProp={title}
          descriptionProp={description}
        />
        <button
          className="p-2 rounded-xl border border-white/40 bg-white/10 text-red-400 transition-all hover:bg-red-500/20 hover:text-red-600 dark:border-white/10 shadow-sm"
          onClick={handleDelete}
          title="Delete Task"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default Task;
