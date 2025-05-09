import React from "react";
import Footer from "@/app/(frontend)/footer";
import Grid from "@mui/material/Grid2";
import Header from "@/app/(frontend)/header";
import CartDrawer from "@/app/components/frontend/cart-drawer";

export default function Layout({ children }) {
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
      <CartDrawer />

      <Header />
      {/* place the item at the second grid item at row 2 */}
      <Grid size={8} sx={{ gridRow: "2" }}>
        {children}
      </Grid>

      <Grid size={8} sx={{ gridRow: "3" }}>
        <Footer />
      </Grid>
    </Grid>
  );
}
