import React from "react";
import Grid from "@mui/material/Grid2";
import Search from "@/app/components/reusable/search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Mode from "@/app/components/frontend/mode";
import CartBasket from "@/app/components/frontend/cartBasket";
import ExpandMenu from "@/app/components/frontend/expandMenu";
import { LogIn, LogOut, MyAccount } from "@/app/components/frontend/buttons";
import { getCurrentUser } from "@/auth/nextjs/data";
import { logOut, signIn } from "@/auth/nextjs/actions";
const links = [
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: " Contact us",
    href: "/contact-us",
  },
  { label: "My account", href: "/account" },
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

const Header = async () => {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: false,
  });
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
              <Link href={link?.href} key={link.label}>
                {link.label}
              </Link>,
            ])}
            {!user ? <LogIn LogIn={signIn} /> : <LogOut LogOut={logOut} />}
            <Mode />
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
        <Grid size={3}>
          <Link href="/">logo</Link>
        </Grid>
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
            <CartBasket />
            <MyAccount authenticated={user ? true : false} />
          </Stack>
        </Grid>
      </Grid>
      <Grid
        size={12}
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <ExpandMenu />
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
