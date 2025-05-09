"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

const MyGrid = styled(Grid)(({ theme }) => [
  {
    p: 5,
    backgroundColor: theme.palette.secondary.light,
  },
  theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.dark,
  }),
]);

// const MyGrid = () => {
//   return (
//     <div>myGrid</div>
//   )
// }

export default MyGrid;
