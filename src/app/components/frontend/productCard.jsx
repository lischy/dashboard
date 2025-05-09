"use client";
import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ProductModal from "@/app/components/frontend/productModal";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { useCartThemeContext } from "@/app/context/cartProvider";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const ProductCard = ({ src, product }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { cartItems } = useCartThemeContext();
  const { draftOrder, totalItemsInCart, updateCart } = useDraftOrderContext();
  // const item = cartItems.filter((cartItem) => cartItem.product_id === 8);
  // console.log(draftOrder?.cart_items, totalItemsInCart);
  const renderIncrement = useMemo(
    () => () => {
      if (
        draftOrder?.cart_items?.some(
          (existingItem) => existingItem.product_id === product?.product_id
        )
      ) {
        // console.log(
        //   cartItems.some((existingItem) => existingItem.ID === product)
        // );

        return (
          <Stack
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
              border: " 1px solid rgb(209 213 219)",
              borderRadius: "4px",
            }}
            direction="row"
            spacing={1}
          >
            <Button
              variant="text"
              sx={{ minWidth: "unset" }}
              onClick={() => updateCart(product, "decrement")}
            >
              -
            </Button>
            <Typography>
              {
                draftOrder?.cart_items?.filter(
                  (cartItem) => cartItem.product_id === product?.product_id
                )[0]?.count
              }
            </Typography>
            <Button
              variant="text"
              sx={{
                minWidth: "unset", // Removes any min-width
                display: "inline-block", // Ensures it matches the size of the content
              }}
              onClick={() => updateCart(product, "increment")}
              disabled={
                draftOrder?.cart_items?.filter(
                  (cartItem) => cartItem.product_id === product?.product_id
                )[0]?.count === product?.stock
              }
            >
              +
            </Button>
          </Stack>
        );
      } else {
        // console.log(
        //   cartItems.some((existingItem) => existingItem.ID === product)
        // );

        return (
          <EnhancedEncryptionIcon
            onClick={() => updateCart(product, "increment")}
          />
        );
      }
    },
    [draftOrder?.cart_items]
  );

  return (
    <>
      <Card
        sx={{
          maxHeight: "unset",
          minHeight: "unset",
        }}
        // sx={[
        //   (theme) => ({
        //     color: "#003125",
        //   }),
        //   (theme) =>
        //     theme.applyStyles("dark", {
        //       color: "#003125",
        //     }),
        // ]}
      >
        <CardHeader
          avatar={
            <>
              <span style={{ color: "rgb(34 197 94)" }}>{`Stock : `}</span>
              <span style={{ color: "rgb(194 65 12)", marginLeft: "5px" }}>
                {product?.stock}
              </span>
            </>
          }
          action={
            <span>
              {parseFloat(product?.sale_price) < parseFloat(product?.price)
                ? `${(
                    ((parseFloat(product?.price) -
                      parseFloat(product?.sale_price)) /
                      parseFloat(product?.price)) *
                    100
                  ).toFixed(2)} % Off`
                : `  `}
            </span>
          }
        />
        {/* {product?.product_images ? (
          product.product_images.map((product_image) => (
            <CardMedia
              key={product_image}
              component="img"
              image={`/${product_image}`}
              onClick={handleOpen}
              sx={{
                height: "11rem",
                objectFit: "contain",
                "&:hover": {
                  scale: 1.1,
                },
              }}
            />
          ))
        ) : ( */}
        <CardMedia
          component="img"
          image={src}
          onClick={handleOpen}
          sx={{
            height: "11rem",
            objectFit: "contain",
            "&:hover": {
              scale: 1.1,
            },
          }}
        />
        {/* )} */}

        <CardContent>{product?.product_name}</CardContent>
        <CardActions
          sx={{ justifyContent: "space-between", maxHeight: "40px" }}
        >
          <Typography>{`$ ${product.sale_price}`}</Typography>

          {/*check if item is in cart and adjust display */}
          {
            /* {cart_items.length === 0 ? (
            <EnhancedEncryptionIcon
              onClick={() => updateCart({ ID: "5" }, "increment")}
            />
          ) : cartItems.some((existingItem) => existingItem.ID == product) ? (
            <Stack
              sx={{
                justifyContent: "space-around",
                alignItems: "center",
                border: " 1px solid rgb(209 213 219)",
                borderRadius: "4px",
              }}
              direction="row"
              spacing={1}
            >
              <Button
                variant="text"
                sx={{ minWidth: "unset" }}
                onClick={() => updateCart({ ID: "5" }, "decrement")}
              >
                -
              </Button>
              <Typography>5</Typography>
              <Button
                variant="text"
                sx={{
                  minWidth: "unset", // Removes any min-width
                  display: "inline-block", // Ensures it matches the size of the content
                }}
                onClick={() => updateCart({ ID: "5" }, "increment")}
              >
                +
              </Button>
            </Stack>
          ) : (
            <EnhancedEncryptionIcon
              onClick={() => updateCart({ ID: "5" }, "increment")}
            />
          )} */
            renderIncrement()
          }

          {/* <Button onClick={handleOpen}>Open modal</Button> */}
        </CardActions>
      </Card>
      <ProductModal open={open} handleClose={handleClose} />
    </>
  );
};

export default ProductCard;
