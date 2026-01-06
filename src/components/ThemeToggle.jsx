import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-transparent hover:bg-gray-500/20 transition-all duration-300"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#eff1f5]" />
      ) : (
        <Moon className="w-5 h-5 text-[#101214]" />
      )}
    </button>
  );
};

export default ThemeToggle;
