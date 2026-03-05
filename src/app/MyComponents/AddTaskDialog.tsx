"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, X, CheckCircle, PencilLine, AlignLeft } from "lucide-react";
import { useState } from "react";
import { addTask } from "../../action/task.action";
import toast from "react-hot-toast";

export function AddTaskDialog() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    setTitle("");
    setDescription("");

    await addTask({title , description})
    toast.success("Task Created succesfully")
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <AlertDialog>
      {/* Trigger Button - Glass CTA */}
      <AlertDialogTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-slate-900 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/60 active:scale-95 dark:border-white/10 dark:text-white dark:hover:bg-white/20"
          aria-label="Add Task"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </AlertDialogTrigger>

      {/* Dialog Content - Heavy Blur Glass */}
      <AlertDialogContent className="max-w-[400px] rounded-3xl border-white/30 bg-white/10 backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-black/20 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            Create New Task
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 dark:text-white/40 font-medium">
            Organize your day. Fill in the details below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Form Fields */}
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-white/30">
              <PencilLine size={12} /> Title
            </label>
            <input
              className="w-full rounded-xl border border-white/40 bg-white/10 p-3 text-sm font-medium text-slate-900 outline-none backdrop-blur-md transition-all 
                         placeholder:text-slate-400 focus:bg-white/30 focus:border-white focus:ring-4 focus:ring-white/5
                         dark:border-white/5 dark:bg-white/5 dark:text-white dark:placeholder:text-white/20 dark:focus:bg-white/10"
              placeholder="e.g. Design new landing page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-white/30">
              <AlignLeft size={12} /> Description
            </label>
            <textarea
              className="w-full rounded-xl border border-white/40 bg-white/10 p-3 text-sm font-medium text-slate-900 outline-none backdrop-blur-md transition-all 
                         placeholder:text-slate-400 focus:bg-white/30 focus:border-white focus:ring-4 focus:ring-white/5
                         dark:border-white/5 dark:bg-white/5 dark:text-white dark:placeholder:text-white/20 dark:focus:bg-white/10"
              placeholder="Add some details..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
            />
          </div>
        </div>

        <AlertDialogFooter className="gap-2 space-x-2 sm:gap-0">
          <AlertDialogCancel
            onClick={handleCancel}
            className="rounded-xl border-none bg-transparent font-bold text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={16} className="mr-2" />
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleAddTask}
            disabled={!title.trim()}
            className="rounded-xl border border-white/50 bg-white/20 font-bold text-slate-900 transition-all hover:bg-white/40 disabled:opacity-30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            <CheckCircle size={16} className="mr-2" />
            Add Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddTaskDialog;
