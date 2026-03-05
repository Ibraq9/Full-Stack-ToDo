"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2, Command } from "lucide-react";

const SearchBar = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  // useEffect(() => {
  //   setValue(searchParams.get("search") ?? "");
  // }, [searchParams]);


  const commit = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (term.trim()) {
        params.set("search", term.trim());
      } else {
        params.delete("search");
      }
      router.push(`/?${params.toString()}`);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commit(value);
  };

  return (
    <div className="group  relative flex w-full max-w-2xl items-center transition-all px-2 ">
      {/* Search Icon / Loader - Pure monochromatic */}
      <div className="absolute bg-white/30 left-6 z-10 flex items-center justify-center text-slate-500 group-focus-within:text-slate-900 dark:text-white/40 dark:group-focus-within:text-white transition-colors">
        {isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Search size={18} strokeWidth={2} />
        )}
      </div>

      {/* Main Input - Liquid Glass Aesthetic */}
      <input
        className="border shadow-lg dark:border-white/30 border-white bg-white/9 h-14 w-full rounded-2xl pl-12 pr-32 text-sm font-medium outline-none backdrop-blur-2xl transition-all 
                   placeholder:text-slate-500/60
                   hover:bg-white/20 hover:border-white/60 hover:shadow-lg
                   focus:bg-white/30 focus:border-white focus:ring-4 focus:ring-white/10
                   dark:bg-white/5 dark:text-white dark:placeholder:text-white/20
                   dark:hover:bg-white/10 dark:focus:bg-black/20 dark:focus:border-white/30"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by title or description..."
        autoComplete="off"
        spellCheck={false}
      />

      {/* Action Buttons Container */}
      <div className="absolute right-5 flex items-center gap-2">
        {value && (
          <button
            onClick={() => { setValue(""); commit(""); }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            type="button"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}
        
        {/* The Primary Search Button - Pure Glass CTA */}
        <button
          onClick={() => commit(value)}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-xl border border-white/50 bg-white/20 px-4 py-2 text-xs font-bold text-slate-900 shadow-sm transition-all 
                     hover:bg-white/40 hover:shadow-white/10 active:scale-95 
                     disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          {isPending ? "..." : <span className="hidden sm:inline">Search</span>}
          {!isPending && <Command size={14} className="opacity-70" />}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;