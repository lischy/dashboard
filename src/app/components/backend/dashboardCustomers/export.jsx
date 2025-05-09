"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Upload } from "lucide-react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExportJsonButton from "@/app/components/backend/dashboardCustomers/exportJSON";
import ExportCsvButton from "@/app/components/backend/dashboardCustomers/exportCSV";
import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
import { FileCode } from "lucide-react";
import { FileText } from "lucide-react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Export = ({ data }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickAway = () => {
    console.log("called , handleClickAway");
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Grid>
        <Tooltip title="Export data">
          <IconButton onClick={handleClick}>
            <Upload />
          </IconButton>
        </Tooltip>

        <Collapse in={open}>
          <Paper
            sx={{
              position: "absolute",
              zIndex: "99999",
              //   left: "3%",
              //   top: "30%",
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <FileText />
                </ListItemIcon>
                <ExportCsvButton data={data} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FileCode />
                </ListItemIcon>
                <ExportJsonButton data={data} />
              </ListItem>
            </List>
          </Paper>
        </Collapse>
      </Grid>
    </ClickAwayListener>
  );
};

export default Export;
