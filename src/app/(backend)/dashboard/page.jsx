"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Heading from "@/app/components/backend/heading";
import LargeCard from "@/app/components/backend/dashboardHome/LargeCard";
import SmallCard from "@/app/components/backend/dashboardHome/SmallCard";
import Piechart from "@/app/components/backend/dashboardHome/Piechart";
import Linechart from "@/app/components/backend/dashboardHome/Linechart";
import OrdersTable from "@/app/components/backend/dashboardHome/OrdersTable";
import Grid from "@mui/material/Grid2";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const Tableau10 = [
  "#bab0ab",
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
];

export default function DashboardHome() {
  const scrollContainerRef = React.useRef(null);

  const [value, setValue] = React.useState(1);
  const [color, setColor] = React.useState("#f28e2c");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setColor(Tableau10[newValue]);
    console.log(color);
  };

  const handleWheel = (event) => {
    console.log("OnWheel");
    // event.preventDefault();
    // Scroll horizontally by the delta of the wheel event
    if (scrollContainerRef.current) {
      // $(this).scrollLeft($(this).scrollLeft() + e.originalEvent.deltaY);
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  return (
    <React.Fragment>
      <Heading title="Dashboard title" />
      <Box
        className={"scrollContainer"}
        ref={scrollContainerRef}
        onWheel={handleWheel}
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "inline-flex",
            alignContent: "space-around",
            rowGap: 3,
            columnGap: 3,
            justifyContent: "start",
            alignContent: "space-around",
          }}
        >
          {[...Array(6).keys()].map((item) => {
            return <LargeCard key={item} sx={{ p: 2 }} />;
          })}
        </Box>
      </Box>
      <SmallCard />
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, md: 6 }}>
          <Tabs
            onChange={handleChange}
            value={value}
            sx={{
              ".Mui-selected": {
                color: { color },
              },
            }}
            indicatorColor="secondary"
            TabIndicatorProps={{
              style: {
                backgroundColor: color,
              },
            }}
          >
            <Tab label="Sales" value={1} />
            <Tab label="Orders" value={2} />
          </Tabs>

          {value === 1 && <Linechart />}

          {value === 2 && <Linechart />}
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <Piechart />
        </Grid>
      </Grid>
      <OrdersTable />
    </React.Fragment>
  );
}
