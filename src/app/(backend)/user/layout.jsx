"use client";
import React from "react";
import Footer from "@/app/(frontend)/footer";
import Grid from "@mui/material/Grid2";
import Header from "@/app/(frontend)/header";
import Sidebar from "@/app/components/backend/user/sidebar";
import CartDrawer from "@/app/components/frontend/cart-drawer";

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);

  const handledeawertoggle = () => {
    setOpen(!open);
  };
  return (
    <Grid
      sx={{
        minHeight: "100vh",
        display: "grid",
        gap: 6,
        gridTemplateRows: "auto 1fr auto",
        p: 4,
        pt: 0,
      }}
    >
      <div style={{ display: "none" }}>
        <CartDrawer />
      </div>

      <Header />

      <Grid size={8} sx={{ gridRow: "2" }}>
        <Grid container spacing={4}>
          <Grid size={2}>
            <Sidebar />
          </Grid>
          <Grid size={10}>{children}</Grid>
        </Grid>
      </Grid>

      <Grid size={8} sx={{ gridRow: "3" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
