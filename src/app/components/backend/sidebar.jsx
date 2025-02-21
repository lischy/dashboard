"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

// TODO: use pathname to determine active link

const links = [
  {
    label: "Dashboard",
    icon: "Icon",
    href: "/dashboard",
  },

  {
    label: "Catalog",
    icon: "Icon",
    items: [
      {
        label: "Products",
        icon: "Icon",
        href: "/dashboard/products",
      },
      {
        label: "Categories",
        icon: "Icon",
        href: "/dashboard/categories",
      },
      {
        label: "Attributes",
        icon: "Icon",
        href: "/dashboard/attributes",
      },
      {
        label: "Coupons",
        icon: "Icon",
        href: "/dashboard/coupons",
      },
    ],
  },
  {
    label: "Customers",
    icon: "Icon",
    href: "/dashboard/customers",
  },
  {
    label: "Orders",
    icon: "Icon",
    href: "/dashboard/orders",
  },
  {
    label: "International",
    icon: "Icon",
    items: [
      {
        label: "Langages",
        icon: "Icon",
        href: "/dashboard/langages",
      },
      {
        label: "Currencies",
        icon: "Icon",
        href: "/dashboard/currencies",
      },
    ],
  },
];

export default function Sidebar(props) {
  // const [open, setOpen] = React.useState(true);
  const [open, setOpen] = React.useState([]);

  const handleClick = (clickedItem) => {
    console.log(clickedItem);

    // setOpen([...open, clickedItem]);
    // console.log(open.includes(clickedItem), open);
    if (open.includes(clickedItem)) {
      const openCopy = open.filter((element) => element !== clickedItem);
      setOpen(openCopy);
    } else {
      setOpen([...open, clickedItem]);
    }
    // console.log(open);
    // setOpen(!open);
  };

  const DrawerList = (
    <Box>
      {/* <List>
        {[1, 2, 3].map((item) => {
          return (
            <div key={item}>
              <ListItemButton onClick={() => handleClick(item)} key={item}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open.includes(item) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open.includes(item)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          );
        })}
        {["dashboard", "attributes", "Send email", "Drafts"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <Link
                  href={
                    text.localeCompare("dashboard")
                      ? `/dashboard/${text}`
                      : `/dashboard`
                  }
                >
                  <ListItemText primary={text} />
                </Link>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider /> */}
      <List>
        {links.map((link, index) => [
          link.items ? (
            <div key={index}>
              <ListItemButton
                onClick={() => handleClick(link.label)}
                key={link.item}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={link.label} />
                {open.includes(link.label) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse
                in={open.includes(link.label)}
                timeout="auto"
                unmountOnExit
              >
                {link.items.map((item, index) => {
                  return (
                    <List component="div" disablePadding key={index}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <Link href={item.href}>
                          <ListItemText primary={item.label} />
                        </Link>
                      </ListItemButton>
                    </List>
                  );
                })}
              </Collapse>
            </div>
          ) : (
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
          ),
        ])}
      </List>
    </Box>
  );
  return (
    <Drawer variant="persistent" anchor="left" open={props.open}>
      {DrawerList}
    </Drawer>
  );
}
