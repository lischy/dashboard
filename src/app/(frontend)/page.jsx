import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Slider from "@/app/components/frontend/swiper";
// import { useSearchParams } from "next/navigation";
import SearchProduct from "@/app/(frontend)/search-product";
import CouponCard from "@/app/components/frontend/coupon-card";
import Paper from "@mui/material/Paper";
import MyGrid from "@/app/components/frontend/myGrid";
import BreadCrumbs from "@/app/components/frontend/breadcrumbs";
import FeaturedCategories from "@/app/components/frontend/featuredCategories";
import { fetchProducts } from "@/app/lib/data";
// import InfiniteScrolling from "@/app/components/frontend/InfiniteScrolling";
import ProductCard from "@/app/components/frontend/productCard";
import PaginationControls from "@/app/components/frontend/paginationControls";
import Image from "next/image";

// const MyGrid = styled(Grid)(({ theme }) => [
//   {
//     p: 5,
//     backgroundColor: theme.palette.secondary.light,
//   },
//   theme.applyStyles("dark", {
//     backgroundColor: theme.palette.background.paper,
//     color: theme.palette.text.dark,
//   }),
// ]);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;
const MAX_PER_PAGE = 5;
const MAX_PAGE = 10;

const Page = async ({ searchParams }) => {
  let { query, page = 1, per_page = 3 } = await searchParams;
  // const start = (Number(page) - 1) * Number(per_page);
  // const end = start + Number(per_page);

  let products;
  // Validate and clamp
  if (isNaN(page) || page < 1) {
    page = DEFAULT_PAGE;
  } else if (page > MAX_PAGE) {
    page = MAX_PAGE;
  }

  if (isNaN(per_page) || per_page < 1) {
    per_page = DEFAULT_PER_PAGE;
  } else if (per_page > MAX_PER_PAGE) {
    per_page = MAX_PER_PAGE;
  }

  try {
    const response = await fetchProducts({
      page_number: page,
      page_size: per_page,
    });
    // console.log(response.error);
    if (response.status !== 200) {
      // If the response is not 2xx, throw an error
      const errorData = response.error;
      throw new Error(`Error: ${errorData}`);
    }
    products = response?.data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
    return (
      <div>
        <p>{error.message || "Unknown error occurred"}</p>
      </div>
    );
  }
  // const products = await response.json();

  // console.log(products);

  // const search = searchParams.get("query");
  if (query) {
    return <SearchProduct />;
  }
  return (
    <Grid container>
      <BreadCrumbs />
      <Grid size={12} container spacing={4}>
        <Grid size={8}>
          <Slider />
        </Grid>
        <CouponCard />
        <MyGrid
          size={12}
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            p: 4,
            mb: 4,
          }}
          component={Paper}
          // sx={[
          //   (theme) => ({

          //     backgroundColor:
          //       theme.colorSchemes.light.palette.background.default,
          //   }),
          //   (theme) =>
          //     theme.applyStyles("dark", {
          //       backgroundColor:
          //         theme.colorSchemes.dark.palette.background.default,
          //     }),
          // ]}
        >
          <Grid size={8}>
            <Typography>100% Natural Quality Organic Product</Typography>
            <Typography>
              See Our latest discounted products from here and get a special
              discount product
            </Typography>
          </Grid>
          <Grid size={4}> shop now </Grid>
        </MyGrid>
      </Grid>

      <FeaturedCategories />
      <Grid size={12} container spacing={4} marginBottom={4}>
        <Grid size={12} sx={{ justifyItems: "center" }}>
          <Typography>Popular Products for Daily Shopping</Typography>
          <Typography>
            See all our popular products in this week. You can choose your daily
            needs products from this list and get some special offer with free
            shipping.
          </Typography>
        </Grid>
        <Grid
          size={12}
          sx={{
            gridTemplateColumns: "auto auto auto auto auto auto",
            display: "grid",
            spacing: 4,
          }}
          container
        >
          {products.map((product) => {
            // console.log(products, products.slice(start, end));
            return (
              <ProductCard
                key={product.product_id}
                src={`mint.jpg`}
                product={product}
              />
            );
          })}
          {/* <InfiniteScrolling
            initialProducts={products ? products : []}
            search={query ? query : ""}
            /> */}
        </Grid>
        <PaginationControls total_pages={products[0]?.total_pages} />
      </Grid>
      <Grid
        size={12}
        sx={{ backgroundColor: "rgb(16 185 129)", p: 7, alignItems: "center" }}
      >
        <MyGrid
          container
          sx={{
            alignItems: "center",
            pl: 4,
          }}
          // sx={[
          //   (theme) => ({
          //     backgroundColor:
          //       theme.colorSchemes.light.palette.background.default,
          //   }),
          //   (theme) =>
          //     theme.applyStyles("dark", {
          //       backgroundColor:
          //         theme.colorSchemes.dark.palette.background.default,
          //     }),
          // ]}
          // component={Paper}
        >
          <Grid size={8}>
            <span>Organic Products and Food</span>
            <Typography>Quick Delivery to Your Home</Typography>
            <Typography>
              There are many products you will find in our shop, Choose your
              daily necessary product from our KachaBazar shop and get some
              special offers. See Our latest discounted products from here and
              get a special discount.
            </Typography>
          </Grid>
          <Grid size={4}>
            <img src="/delivery-boy_rluuoq.webp" alt="deliery" width="auto" />
          </Grid>
        </MyGrid>
      </Grid>
    </Grid>
  );
};

export default Page;
