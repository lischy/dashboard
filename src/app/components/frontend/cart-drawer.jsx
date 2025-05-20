"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useCartThemeContext } from "@/app/context/cartProvider";
import { usePathname } from "next/navigation";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";
import CartItemCard from "@/app/components/frontend/cart-item-card";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CartDrawer = () => {
  // const [open, setOpen] = React.useState(false);
  const { open, toggleDrawer } = useCartThemeContext();

  const { draftOrder, totalItemsInCart, updateCart } = useDraftOrderContext();
  const pathname = usePathname();
  const router = useRouter();
  // console.log(router);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };
  const handleBeforeNavigation = (e) => {
    e.preventDefault();
    if (totalItemsInCart > 0) {
      toggleDrawer(!open)(); // Close the drawer

      router.push("/user/checkout"); // Use router.push to navigate
    } else {
      toggleDrawer(!open)(); // Only close the drawer if no items in cart
    }
  };
  return (
    <>
      <Button
        onClick={toggleDrawer(!open)}
        sx={{
          position: "absolute",
          right: "0px",
          verticalAlign: "center",
          top: "50%",
          transform: "translate (-50%)",
          width: "auto",
        }}
      >
        <Container sx={{ position: "fixed" }}>
          <Stack direction="column" sx={{ alignItems: "center" }}>
            <LocalMallIcon />
            <span>{`${totalItemsInCart} items`}</span>
          </Stack>
          <div>total</div>
        </Container>
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(!open)}
        anchor="right"
        // PaperProps={{
        //   sx: { width: "auto" },
        // }}
      >
        <Grid container>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton>
              <ShoppingBasketIcon />
              <Typography>Shopping Cart</Typography>
            </IconButton>

            <IconButton
              onClick={toggleDrawer(!open)}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CloseIcon
                sx={{
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
              <Typography sx={{ "&:hover": { color: "red" } }}>
                Close
              </Typography>
            </IconButton>
          </Stack>
          {draftOrder?.cart_items.length > 0 ? (
            <CartItemCard
              cartItems={draftOrder?.cart_items}
              updateCart={updateCart}
            />
          ) : (
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50vh",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(209 250 229)",
                  // margin: "10%",
                  width: "5rem",
                  height: "5rem",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <LocalMallIcon />
              </div>
              <Typography variant="h4">Your cart is empty</Typography>

              {/* <Typography sx={{ width: "50%", textAlign: "center" , }}>
                No items added in your cart. Please add product to your cart
                list.
              </Typography> */}
            </Stack>
          )}
        </Grid>
        {pathname.includes("/checkout") ? (
          <Button onClick={toggleDrawer(!open)}> Close</Button>
        ) : (
          <Button
            variant="contained"
            sx={{ display: "flex", justifyContent: "space-between" }}
            // onClick={
            //   totalItemsInCart > 0
            //     ? () => router.push("/user/checkout")
            //     : toggleDrawer(!open)
            // }
            onClick={(e) => handleBeforeNavigation(e)}
          >
            Proceed to checkout
            <span>total</span>
          </Button>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;
