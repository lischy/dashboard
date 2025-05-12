"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const { mode, setMode, systemMode } = useColorScheme();
  const toggleTheme = React.useCallback(() => {
    if (!mode) {
      return null;
    }
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode, systemMode]);

  return (
    <Grid container spacing={2} sx={{ position: "sticky" }}>
      <Grid size={12} container>
        <Grid size={4}>
          We are available 24/7, Need help? +965 505 31291
          <div>size=4</div>
        </Grid>
        <Grid size={6}>
          About Us| Contact Us| My Account | Login
          <div>size=6</div>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {/* <select
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
              // For TypeScript, cast `event.target.value as 'light' | 'dark' | 'system'`:
            }}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select> */}
        </Grid>
      </Grid>
      <Grid
        container
        size={12}
        // sx={{
        //   display: "flex",
        //   width: 1,
        //   justifyContent: "space-between",
        //   alignItems: "center",
        // }}
      >
        <Grid size={3}>logo</Grid>
        <Grid size={6}>Search</Grid>
        <Grid size={3}>Icons</Grid>
      </Grid>
      <Grid size={12} container sx={{ justifyContent: "space-between" }}>
        <Grid size={4}> menu items</Grid>
        <Grid size={4}>Priacy S</Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
