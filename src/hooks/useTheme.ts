"use client";

import { useTheme as useNextThemes } from "next-themes";
import { useCallback } from "react";

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextThemes();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return { theme, setTheme, systemTheme, isDark, toggleTheme };
}
