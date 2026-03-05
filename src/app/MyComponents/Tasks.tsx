
import React from "react";
import { SearchX } from "lucide-react";
import Task from "./Task";
import { Accordian } from "./Accordian";

type FilterTasks = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
};

type TasksProps = {
  tasks: FilterTasks[];
  searchParams: { search?: string; sort?:"relevant" | "latest" | "oldest" };
};

export default function Tasks({ tasks, searchParams }: TasksProps) {

  // Extract search and sort from searchParams
  const searchTerm = searchParams.search ?? "";
  const sortType = searchParams.sort ?? "latest";

  // Filter tasks based on search term
  let processedTasks = tasks.filter(
    (task: FilterTasks) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description?.toLowerCase() ?? "").includes(
        searchTerm.toLowerCase(),
      ),
  );

  // Sort tasks based on sortType
  if (sortType === "latest") {
    processedTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (sortType === "oldest") {
    processedTasks.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }

  // Count completed tasks
  const completedCount = processedTasks.filter((t) => t.completed).length;
  const activeTasks = processedTasks.filter((t) => !t.completed);
  const completedTasks = processedTasks.filter((t) => t.completed);

  return (
    <div className="w-full space-y-4">
      {processedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/5 py-12 px-6 backdrop-blur-xl dark:border-white/5">
          <SearchX
            size={40}
            className="mb-4 text-slate-300 dark:text-white/20"
          />
          <p className="text-sm font-medium text-slate-500 dark:text-white/40">
            {searchTerm && `No matches for "${searchTerm}"`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Active Tasks Group */}
          <div className="space-y-1">
            {activeTasks.map((task) => (
              <Task
                key={task.id}
                {...task}
                description={task.description ?? ""}
              />
            ))}
          </div>

          {/* Completed Tasks Accordion */}
          {completedCount > 0 && (
            <Accordian completedTasks={completedTasks} count={completedCount} />
          )}
        </div>
      )}
    </div>
  );
}
