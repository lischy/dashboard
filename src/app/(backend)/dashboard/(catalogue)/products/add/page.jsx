"use client";
import React, { useState } from "react";
// import { useRouter, useParams } from "next/navigation";
import CreateProductForm from "@/app/components/backend/dashboardProducts/edit-product-form";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import BasicSelect from "@/app/components/backend/dashboardProducts/select";

const page = () => {
  // const params = useParams();
  // const router = useRouter();
  // console.log(params.id);

  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(true);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const handleSwitchChange = (event) => {
    console.log(event.target.checked);
    if (value === 2) {
      setValue(1);
    }
    setChecked(event.target.checked);
  };
  return (
    <>
      <Typography variant="h4">Add Product.</Typography>
      <Typography>Add product info, combinations and extras.</Typography>
      <Stack direction="row" spacing={2}>
        <Typography>Does this product have variants?</Typography>
        <Switch
          checked={checked}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Basic info" value={1} />
            {checked && <Tab label="Combination" value={2} hidden={checked} />}
            <Tab label="Item Three" value={3} />
          </Tabs>
        </Box>
      </Box>
      {value === 1 && <CreateProductForm />}
      {value === 2 && <BasicSelect />}
    </>
  );
};

export default page;
