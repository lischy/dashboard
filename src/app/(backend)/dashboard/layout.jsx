"use client";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import React from "react";
import Sidebar from "@/app/components/backend/sidebar";
import ButtonAppBar from "@/app/components/backend/appbar";

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);

  const handledeawertoggle = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={open ? 2 : false}>
          {/* sidebar */}
          <Sidebar open={open} />
        </Grid>
        <Grid size="grow">
          {/* main */}
          {/* app/nav bar */}
          <ButtonAppBar handledeawertoggle={handledeawertoggle} open={open} />
          {/* main body */}
          <main>{children}</main>
        </Grid>
      </Grid>
    </Box>
  );
}
