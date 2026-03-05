"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";

const ToDo_Rank = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sortType = searchParams.get("sort") ?? "relevant";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="group relative flex items-center">
      {/* Left Icon - Monochromatic and semi-transparent */}
      <div className="absolute left-4 z-10 flex items-center justify-center text-slate-500 group-focus-within:text-slate-900 dark:text-white/40 dark:group-focus-within:text-white transition-colors pointer-events-none">
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ArrowUpDown size={16} strokeWidth={2} />
        )}
      </div>

      {/* The Select Element - Liquid Glass styling */}
      <select
        value={sortType}
        onChange={handleChange}
        disabled={isPending}
        className="h-12 shadow-lg w-full min-w-[160px] cursor-pointer appearance-none rounded-2xl border border-white/40 bg-white/10 pl-11 pr-10 text-sm font-semibold text-slate-900 outline-none backdrop-blur-2xl transition-all
                   hover:bg-white/20 hover:border-white/60 hover:shadow-lg
                   focus:bg-white/30 focus:border-white focus:ring-4 focus:ring-white/10
                   dark:border-white/10 dark:bg-white/5 dark:text-white
                   dark:hover:bg-white/10 dark:focus:bg-black/20"
        aria-label="Sort order"
      >
        {/* Note: Standard <option> tags have limited styling, so we keep them simple */}
        <option value="relevant" className="bg-white dark:bg-slate-900">Relevant</option>
        <option value="latest" className="bg-white dark:bg-slate-900">Latest</option>
        <option value="oldest" className="bg-white dark:bg-slate-900">Oldest</option>
      </select>

      {/* Right Icon - Custom Chevron */}
      <div className="absolute right-4 z-10 pointer-events-none text-slate-400 dark:text-white/30">
        <ChevronDown size={16} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default ToDo_Rank;