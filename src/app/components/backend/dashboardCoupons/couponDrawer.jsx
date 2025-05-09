import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Form from "next/form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { fetchtCouponById } from "@/app/lib/data";
import { useRouter, usePathname } from "next/navigation";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";

import { editCoupon } from "@/app/lib/actions";
import {
  CancelButton,
  AddButton,
  UploadButton,
  SaveButton,
} from "@/app/components/backend/dashboardCoupons/buttons";
import { z } from "zod";

const zodCouponSchema = z.object({
  campaign_code: z.string().trim().min(1, {
    message: "Name must not be less than one char",
  }),
  coupon_code: z.string().trim().min(1, {
    message: "Value can't be less than one char",
  }),
  published: z.boolean(),
});

const CouponDrawer = ({ action, open, toggleDrawer, couponId, parent }) => {
  const [formValues, setFormValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);
  const router = useRouter();
  const { refresh, setRefresh } = useRouterRefreshContext();
  const pathname = usePathname();

  // const [formValues, setFormValues] = React.useState({
  //   "Coupon Banner Image": "",
  //   "Campaign Name": "",
  //   "Campaign Code": "",
  //   "Coupon Validity Time": "",
  //   "Discount Type": false,
  //   Discount: "",
  //   "Minimum Amount": "",
  //   Published: true,
  // });

  useEffect(() => {
    if (couponId === undefined) return;

    console.log("called useEffect", couponId);
    if (isSubmitting) return;
    try {
      const resposnse = async () => {
        setIsSubmitting(true);
        const response = await fetchtCouponById({
          coupon_Id: couponId,
        });
        if (response.status !== 200) {
          setIsSubmitting(false);
          throw new Error("Can not fetch coupon.");
        }
        console.log(response.data);
        setFormValues(response.data);
      };

      resposnse();
    } catch (error) {
      console.error("Database connection error:", error.stack || error.message);
      return error.stack || error.message;
    } finally {
      setIsSubmitting(false);
    }
  }, [couponId]);

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked, formValues);
    let newValue;

    if (name === "published") {
      newValue = checked;
    } else if (name === "discount_type") {
      newValue = checked ? "percentage" : "fixed";
    } else {
      newValue = value;
    }
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files[0]));

    if (imageButton && event.target.files[0]) {
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (formData) => {
    try {
      const coupon = {
        campaign_code: formData.get("campaign_code"),
        discount_type: formData.get("discount_type"),
        coupon_code: formData.get("coupon_code"),
        discount_percentage: formData.get("discount_percentage"),
        discount: formData.get("discount"),
        expiration_date: formData.get("expiration_date"),
        minimum_amount: formData.get("minimum_amount"),
        start_date: formData.get("start_date"),
        published: Boolean(formData.get("published")),
      };
      const validate = zodCouponSchema.safeParse(coupon);
      if (!validate.success) {
        setErrors(validate.error.flatten().fieldErrors);
        setIsSubmitting(false);
        return;
      }
      setErrors(undefined);
      switch (action) {
        case "Add": {
          // save to db

          // const response = async () => {
          //   const response = await addProductAttribute({
          //     attribute: attribute,
          //   });
          //   console.log(response.data, response.status, attribute);
          //   if (response.status === 200) {
          //     setRefresh(!refresh);
          //   }
          // };
          // response();

          break;
        }
        case "Edit": {
          console.log("called");
          const response = async () => {
            const editCouponResponse = await editCoupon({
              coupon: coupon,
              coupon_id: couponId,
              pathname: pathname,
            });
            const data = editCouponResponse?.data;
            // console.log(data);
            // setFormValues(data);
          };
          response();
          break;
        }
        default: {
          console.log("Empty action received.");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false); // reset lock
    }
  };
  // To display in datetime-local input
  const formatDateForInput = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return ""; // Invalid date fallback
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
  };
  const form = () => (
    <Box role="presentation" sx={{ width: "auto" }}>
      <Grid container spacing={2}>
        <Grid
          container
          size={{ sm: 12 }}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid size={{ sm: 8 }}>
            <Typography>
              {action} coupon {parent ? "values" : ""}
            </Typography>
            <p>
              {action} your Product coupon and necessary information from here
            </p>
          </Grid>
          <Grid size={{ sm: 4 }}>
            <IconButton
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                cursor: "pointer",
                backgroundColor: "#00573f", // Blue background for the button
                color: "#fff", // White icon color
                padding: "10px", // Padding inside the button
                borderRadius: "50%", // Make the button circular
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Shadow for the button
                transition: "transform 0.2s",
              }}
            >
              <CancelIcon onClick={toggleDrawer} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid size={{ sm: 12 }} sx={{ mt: 2 }}>
          {/* form container */}
          <div
            className="scrollContainer"
            style={{
              minHeight: "60vh",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                minHeight: "70vh",
                width: "100%",
              }}
            >
              <Form
                action={handleSubmit}
                style={{ display: "grid", rowGap: "8% " }}
              >
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Coupon Banner Image`.toUpperCase()}:</label>
                  </Grid>
                  <Grid
                    size={8}
                    sx={{
                      border: "white",
                      borderStyle: "dashed",
                      padding: "40px",
                    }}
                  >
                    <UploadButton
                      handleChange={handleChange}
                      name="Coupon Banner Image"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Campaign Name`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <TextField
                      error={errors?.value ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name="campaign_code"
                      value={formValues?.campaign_code || ""}
                      helperText={errors?.value}
                      onChange={handleTyping}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Campaign Code`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <TextField
                      error={errors?.name ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name="coupon_code"
                      value={formValues?.coupon_code || ""}
                      helperText={errors?.name}
                      onChange={handleTyping}
                      fullWidth
                      // sx={{ width: "50%" }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Coupon Validity Time`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <TextField
                      type="datetime-local"
                      error={errors?.value ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name="expiration_date"
                      value={
                        formatDateForInput(formValues?.expiration_date) || ""
                      }
                      helperText={errors?.value}
                      onChange={handleTyping}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Discount Type`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        onChange={handleTyping}
                        checked={
                          formValues?.discount_type === "percentage"
                            ? true
                            : false
                        }
                        value={"percentage"}
                        name="discount_type"
                      />
                      <div className="slider round">
                        <span className="on">Percentage</span>
                        <span className="off">Fixed</span>
                      </div>
                    </label>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Discount`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <TextField
                      error={errors?.value ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name="discount"
                      value={
                        formValues?.discount_type === "percentage"
                          ? formValues?.discount_percentage
                          : formValues?.discount || ""
                      }
                      helperText={errors?.value}
                      onChange={handleTyping}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {formValues?.discount_type === "percentage"
                                ? "%"
                                : "$"}
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Minimum Amount`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <TextField
                      error={errors?.name ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name="minimum_amount"
                      value={formValues?.minimum_amount || ""}
                      helperText={errors?.name}
                      onChange={handleTyping}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={4}>
                    <label>{`Published`.toUpperCase()}:</label>
                  </Grid>
                  <Grid size={8}>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="togBtn"
                        onChange={handleTyping}
                        name="published"
                        checked={formValues?.published || ""}
                        // value={formValues?.published || ""}
                      />
                      <div className="slider round">
                        <span className="on">Yes</span>
                        <span className="off">No</span>
                      </div>
                    </label>
                  </Grid>
                </Grid>

                {/* <Grid container sx={{ mb: 2 }}>
                  <Grid size={4}>
                    <label>{"Published".toUpperCase()}</label>
                  </Grid>
                  <Grid size={8}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formValues?.published || false}
                            onChange={handleTyping}
                          />
                        }
                        name="published"
                      />
                    </FormGroup>
                  </Grid>
                </Grid> */}
                {/* <TextField
                  type="hidden"
                  name="discount_percentage"
                  onChange={handleTyping}
                  value={
                    formValues?.discount_type
                      ? formValues?.discount_percentage
                      : formValues?.discount || ""
                  }
                /> */}
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{
                    justifyContent: "space-evenly",
                    position: "fixed",
                    bottom: "0px",
                    width: "fill-available",
                    mb: 2,
                  }}
                >
                  <CancelButton handleCancel={toggleDrawer} />
                  <AddButton action={action} />
                </Stack>
              </Form>
              {errors && console.log(errors?.name, errors?.value)}
            </div>
          </div>
        </Grid>
      </Grid>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 90px;
          height: 34px;
        }

        .switch input {
          display: none;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ca2222;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2ab934;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(55px);
          -ms-transform: translateX(55px);
          transform: translateX(55px);
        }

        /*------ ADDED CSS ---------*/
        .on {
          display: none;
        }

        .on,
        .off {
          color: white;
          position: absolute;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          font-size: 10px;
          font-family: Verdana, sans-serif;
        }

        input:checked + .slider .on {
          display: block;
          padding-right: 30px;
        }

        input:checked + .slider .off {
          display: none;
        }

        /*--------- END --------*/

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { width: "65%", p: 4 },
      }}
    >
      {form()}
    </Drawer>
  );
};

export default CouponDrawer;
