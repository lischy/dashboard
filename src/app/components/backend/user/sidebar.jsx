"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { Paper } from "@mui/material";

// TODO: use pathname to determine active link

const links = [
  {
    label: "Dashboard",
    icon: "Icon",
    href: "/user",
  },

  {
    label: "My orders",
    icon: "Icon",
    href: "/user/my-orders",
  },
  {
    label: "My account",
    icon: "Icon",
    href: "/user/my-account",
  },
  {
    label: "Update Profile",
    icon: "Icon",
    href: "/user/update-profile",
  },
  {
    label: "Change Password",
    icon: "Icon",
    href: "/user/change-password",
  },
  {
    label: "Logout",
    icon: "Icon",
    href: "/user/Logout",
  },
];

export default function Sidebar() {
  return (
    <Paper>
      <List>
        {links.map((link, index) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link href={link.href}>
                <ListItemText primary={link.label} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
