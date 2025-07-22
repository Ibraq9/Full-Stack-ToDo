"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer w-auto h-auto bg-transparent rounded-lg flex items-center justify-center pt-px px-0 mx-0 text-gray-500",
        className
      )}
      onClick={handleToggle}
    >
      {isLight ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
    </button>
  );
};