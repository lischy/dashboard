"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Footer = () => {
  return (
    <footer>
      <Grid
        size={12}
        sx={[
          () => ({
            gridTemplateColumns: "auto auto auto",
            display: "grid",
            spacing: 4,
            alignItems: "center",
            backgroundColor: "rgb(238 242 255)",
            position: "sticky",
            bottom: 0,
            // backgroundColor:
            //   theme.palette.mode === "dark"
            //     ? theme.colorSchemes.dark.palette.background.paper
            //     : "rgb(238 242 255)",
          }),
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: theme.palette.background.paper,
              color: "#003125",
            }),
        ]}
        container
      >
        <img src="/app-download-img-left_s5n2zf.webp" alt="Meaningful text" />
        <div>
          <Typography>
            Get Your Daily Needs From Our KachaBazar Store
          </Typography>
          <Typography>
            There are many products you will find in our shop, Choose your daily
            necessary product from our KachaBazar shop and get some special
            offers.
          </Typography>
        </div>
        <img src="/app-download-img_c7xqg4.webp" />
      </Grid>

      <Grid
        size={12}
        sx={{
          mt: 4,
          gridTemplateColumns: "auto auto auto auto",
          display: "grid",
          spacing: 4,
        }}
        container
      >
        <Typography>Free Shipping From €500.00</Typography>
        <Typography>Support 24/7 At Anytime</Typography>
        <Typography>Secure Payment Totally Safe</Typography>
        <Typography>Latest Offer Upto 20% Off</Typography>
      </Grid>

      <Divider
        sx={{
          height: "2px",
          borderWidth: 0,
          color: "gray",
          backgroundColor: "gray",
          mt: 4,
          mb: 4,
        }}
      />
      <Grid
        size={12}
        sx={{
          gridTemplateColumns: "auto auto auto auto",
          display: "grid",
          spacing: 4,
        }}
        container
      >
        {[3, 4, 5, 6].map((item) => (
          <div key={item}>
            <Typography>Latest News</Typography>
            <ul>
              <li>Fish & Meat</li>
              <li>Soft Drink</li>
              <li>Beauty & Health</li>
            </ul>
          </div>
        ))}
      </Grid>
      <Grid
        size={12}
        sx={[
          () => ({
            mt: 4,
            gridTemplateColumns: "auto auto auto",
            display: "grid",
            spacing: 4,
            p: 5,
            backgroundColor: "rgb(238 242 255)",
            // backgroundColor: "rgb(249 250 251)",
            alignItems: "center",
          }),
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: theme.palette.background.paper,
              color: "#003125",
            }),
        ]}
        container
      >
        <Typography>Social</Typography>
        <Typography>Contact</Typography>
        <Typography>Payments</Typography>
      </Grid>
      <Typography
        sx={{
          mt: 4,
          textAlign: "center",
        }}
      >
        copyright
      </Typography>
    </footer>
  );
};

export default Footer;
