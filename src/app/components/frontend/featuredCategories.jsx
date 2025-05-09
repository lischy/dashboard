"use client";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { useAppThemeContext } from "@/app/theme/appTheme";

const FeaturedCategories = () => {
  const { colors } = useAppThemeContext();
  return (
    <Grid
      size={12}
      container
      spacing={4}
      sx={{ backgroundColor: colors.lightGrey, mb: 2 }}
    >
      <Grid
        size={12}
        sx={[
          (theme) => ({
            justifyItems: "center",
            color: theme.palette.text.dark,
          }),
        ]}
      >
        <Typography>Featured Categories</Typography>
        <Typography>
          Choose your necessary products from this feature categories.
        </Typography>
      </Grid>
      <Grid
        size={12}
        sx={{
          gridTemplateColumns: "auto auto auto auto auto auto",
          display: "grid",
        }}
      >
        {[2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Box
            key={item}
            sx={[
              (theme) => ({
                m: 0.2,
                p: 4,
                backgroundColor: theme.palette.background.paper,
              }),
              (theme) =>
                theme.applyStyles("dark", {
                  backgroundColor: theme.palette.background.paper,
                  color: "#003125",
                }),
            ]}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: "center" }}
              spacing={2}
            >
              <img src={`/8.jpg`} alt="image8" />
              <Box>
                <Typography>Fish & Meat</Typography>

                <MenuList sx={{ p: 0 }}>
                  <MenuItem
                    sx={{
                      p: 0,
                      "&:hover": {
                        ml: 0.9,
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <span style={{ marginRight: "5px" }}> &gt; </span>
                    Fish
                  </MenuItem>
                </MenuList>
              </Box>
            </Stack>
          </Box>
        ))}
        {/* <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div> */}
      </Grid>
    </Grid>
  );
};

export default FeaturedCategories;
