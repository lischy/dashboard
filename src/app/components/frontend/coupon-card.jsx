import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import "./test.css";
import { Paper } from "@mui/material";

const CouponCard = () => {
  return (
    <Grid size={4} rowSpacing={4}>
      <Typography>Latest Super Discount Active Coupon Code</Typography>
      {[4, 5, 6].map((item) => (
        <Paper key={item}>
          <Grid container sx={{ mb: 0.5 }}>
            <Grid
              size={8}
              container
              // sx={{
              //   "&::after": {
              //     content: `""`,
              //     position: "absolute",
              //     width: "25px",
              //     height: "25px",
              //     background: "#fafafa",
              //     borderRadius: "100%",
              //   },
              // }}
            >
              <Grid size={6}>
                <img src={`/ins1.webp`} />
              </Grid>
              <Grid size={6}>
                <Stack direction="row" spacing={2}>
                  <Typography>
                    <span display="flex"> 50% </span>
                    Off
                  </Typography>
                  <Typography>Inactive</Typography>
                </Stack>
                <Typography>Summer Gift Voucher</Typography>
                <span>
                  <Stack direction="row" spacing={0.5}>
                    <span>00</span>:<span>00</span>:<span>00</span> :
                    <span>00</span>
                  </Stack>
                </span>
              </Grid>
            </Grid>
            <Grid size={4} container sx={{ position: "relative" }}>
              <Container
                sx={{
                  borderLeft: "dashed",
                  "&::before,&::after": {
                    content: '""',
                    position: "absolute",
                    width: "25px",
                    height: "25px",
                    background: "#fafafa",
                    borderRadius: "100%",
                    top: "-15px",
                    left: "-11px",
                  },
                }}
              >
                <Stack
                  sx={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "25px",
                      height: "25px",
                      background: "#fafafa",
                      borderRadius: "100%",
                      bottom: "-15px",
                      left: "-11px",
                    },
                  }}
                >
                  <Button>AUGUST24</Button>
                  <Typography>
                    * This coupon apply when shopping more than
                    <span> $ 2000</span>
                  </Typography>
                </Stack>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Grid>
  );
};

export default CouponCard;
