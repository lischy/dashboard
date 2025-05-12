import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconLabelButtons from "../reusable/IconButtonLable";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ToggleTheme = ({ toggleTheme, mode }) => {
  return (
    <IconButton onClick={toggleTheme}>
      {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export const ToggleCartDrawer = ({ toggleDrawer, totalItemsInCart }) => {
  return (
    <IconButton onClick={toggleDrawer(true)}>
      <Badge badgeContent={totalItemsInCart} color="primary">
        <ShoppingBasketIcon />
      </Badge>
    </IconButton>
  );
};

export const LogIn = ({ LogIn }) => {
  return (
    <Button variant="text" onClick={LogIn}>
      Login
    </Button>
  );
};

export const LogOut = ({ LogOut }) => {
  return (
    <Button variant="text" onClick={LogOut}>
      Logout
    </Button>
  );
};

export const MyAccount = ({ authenticated }) => {
  return (
    <Tooltip title="My account">
      {authenticated ? (
        <Link href="/user">o</Link>
      ) : (
        <Link href="/sign-in">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Link>
      )}
    </Tooltip>
  );
};
