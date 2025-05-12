"use client";
import React from "react";
import { useAppThemeContext } from "@/app/theme/appTheme";
import { ToggleTheme } from "@/app/components/frontend/buttons";

const Mode = () => {
  const { mode, colorMode } = useAppThemeContext();

  const toggleTheme = React.useCallback(() => {
    if (!mode) {
      return null;
    }
    colorMode();
  }, [mode]);
  return <ToggleTheme toggleTheme={toggleTheme} mode={mode} />;
};

export default Mode;
