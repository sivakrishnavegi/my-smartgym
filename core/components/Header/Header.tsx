"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/core/providers/AppThemeProvider";
import useAppThemeHook from "@/hooks/useThemeHook";
import { Moon, Sun } from "lucide-react";
import React from "react";

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="text-gray-500 hover:text-green-600 dark:hover:text-green-500"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default Header;
