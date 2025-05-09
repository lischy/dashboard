"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useAppThemeContext } from "@/app/theme/appTheme";
import Search from "@/app/components/reusable/search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";

import { useCartThemeContext } from "@/app/context/cartProvider";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

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
  { label: "My account", href: "/account" },
  { label: "Login", href: "/login" },
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

const links4 = [
  {
    label: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms and conditions",
    href: "/terms-and-conditions",
  },
];

const Header = () => {
  const { mode, colorMode } = useAppThemeContext();
  const { toggleDrawer } = useCartThemeContext();
  const { totalItemsInCart } = useDraftOrderContext();

  // console.log(totalItemsInCart);

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

  const toggleTheme = React.useCallback(() => {
    if (!mode) {
      return null;
    }
    colorMode();
  }, [mode]);

  return (
    <Grid container spacing={0.5} sx={{ position: "sticky", zIndex: 90 }}>
      <Grid
        size={12}
        container
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={4}>We are available 24/7, Need help? +965 505 31291</Grid>
        <Grid size={8}>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {links.map((link) => [
              link.items ? (
                <React.Fragment key={link.label}></React.Fragment>
              ) : (
                <Link href={link?.href} key={link.label}>
                  {link.label}
                </Link>
              ),
              // console.log(link),
            ])}
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Stack>
          {/* <div>size=6</div>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton> */}
        </Grid>
      </Grid>
      <Grid
        container
        size={12}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        // sx={{
        //   display: "flex",
        //   width: 1,
        //   justifyContent: "space-between",
        //   alignItems: "center",
        // }}
      >
        <Grid size={3}>logo</Grid>
        <Grid size={6}>
          <Search
            placeholder="Search for products (e.g. fish, apple, oil)"
            redirectTo="search"
          />
        </Grid>
        <Grid size={3}>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleNotificationsIcon />
            <IconButton onClick={toggleDrawer(true)}>
              <Badge badgeContent={totalItemsInCart} color="primary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <AccountCircleIcon />
          </Stack>
        </Grid>
      </Grid>
      <Grid
        size={12}
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
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
                    {open.includes(link.label) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
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
        <Grid size={4}>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {links4.map((link) => (
              <Link href={link?.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
