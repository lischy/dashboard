"use client";
import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Grid from "@mui/material/Grid2";

const links = [
  {
    label: "Categories",
    items: [
      {
        label: "Cooking essentials",
        icon: "Icon",
        href: "/dashboard/products",
        subItems: [
          {
            label: "Oil",
            href: "/oil",
          },
        ],
      },
      {
        label: "Cooking essentials5",
        icon: "Icon",
        href: "/dashboard/products",
        subItems: [
          {
            label: "Oil",
            href: "/oil",
          },
        ],
      },
      {
        label: "Cooking essentials6",
        icon: "Icon",
        href: "/dashboard/products",
        subItems: [
          {
            label: "Oil",
            href: "/oil",
          },
        ],
      },
      {
        label: "biscuits and cakes ",
        icon: "Icon",
        href: "/dashboard/categories",
        subItems: [
          {
            label: "biscuits",
            href: "/biscuits",
          },
          {
            label: "cakes",
            href: "/cakes",
          },
        ],
      },
    ],
  },

  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: " Contact us",
    href: "/contact-us",
  },
  {
    label: "Pages",
    items: [
      {
        label: "About us",
        href: "/about-us",
        icon: "Icon",
      },
      {
        label: " Contact us",
        href: "/contact-us",
        icon: "Icon",
      },
    ],
  },
];
const ExpandMenu = () => {
  const [open, setOpen] = React.useState([]);

  const handleClick = (clickedItem) => {
    console.log(clickedItem);
    // setOpen(!open);
    if (open.includes(clickedItem)) {
      const openCopy = open.filter((element) => element !== clickedItem);
      setOpen(openCopy);
    } else {
      setOpen([...open, clickedItem]);
    }
  };

  return (
    <Grid size={5}>
      <Stack
        direction={"row"}
        // spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {links.map((link) => [
          link.items ? (
            <List sx={{ position: "relative" }} key={link.label}>
              <ListItemButton onClick={() => handleClick(link.label)}>
                <ListItemText primary={link.label} />
                {open.includes(link.label) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={open.includes(link.label)}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component={Paper}
                  disablePadding
                  sx={{ position: "absolute" }}
                >
                  {link.items.map((sublink) => [
                    sublink.subItems ? (
                      <React.Fragment key={sublink.label}>
                        <ListItemButton
                          key={sublink.label}
                          onClick={() => handleClick(sublink.label)}
                        >
                          <ListItemText primary={sublink.label} />
                          {open.includes(sublink.label) ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse in={open.includes(sublink.label)}>
                          <List>
                            {sublink?.subItems?.map((subItem) => (
                              <ListItemText key={subItem.label}>
                                <span> - </span>
                                {subItem.label}
                              </ListItemText>
                            ))}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    ) : (
                      <ListItemText key={sublink.label}>
                        <span> - </span>
                        <Link href={sublink.href}>{sublink.label}</Link>
                      </ListItemText>
                    ),
                  ])}
                </List>
              </Collapse>
            </List>
          ) : (
            <Link href={link?.href} key={link.label}>
              {link.label}
            </Link>
          ),
          // console.log(link),
        ])}
      </Stack>
    </Grid>
  );
};

export default ExpandMenu;
