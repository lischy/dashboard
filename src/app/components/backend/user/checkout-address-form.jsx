"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Form from "next/form";
import Checkbox from "@mui/material/Checkbox";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { SaveButton, ChangeButton, DoneChecked } from "./buttons";
import Typography from "@mui/material/Typography";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { addClientAddress, editClientAddress } from "@/app/lib/actions";
import { fetchClientDefaultAddress } from "@/app/lib/data";
import { useRouterRefreshContext } from "@/app/context/routerRefresh";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";

const countryMap = {
  China: {
    name: "China",
    cities: {
      Beijing: {
        name: "Beijing",
        delivery_address: [
          "12 Tsinghua Street",
          "84 Forbidden city Avenue",
          "9 Temple of Heaven Road",
        ],
      },
      Shanghai: {
        name: "Shanghai",
        delivery_address: [
          "88 Bund Road",
          "22 Pudong Avenue",
          "100 Nanjing East Road",
        ],
      },
      Shenzhen: {
        name: "Shenzhen",
        delivery_address: [
          "1 Huaqiangbei Street",
          "76 Futian Tech Park",
          "45 Dongmen Road",
        ],
      },
    },
  },

  Kenya: {
    name: "Kenya",
    cities: {
      Nairobi: {
        name: "Nairobi",
        delivery_address: [
          "10 Kenyatta Avenue",
          "56 Uhuru Highway",
          "99 Westlands Road",
          "Kileleshwa",
        ],
      },
      Mombasa: {
        name: "Mombasa",
        delivery_address: [
          "14 Moi Avenue",
          "60 Nyali Bridge Road",
          "7 Likoni Ferry Route",
        ],
      },
      Kisumu: {
        name: "Kisumu",
        delivery_address: [
          "25 Dunga Beach Road",
          "77 Oginga Odinga Street",
          "33 Lakeview Lane",
        ],
      },
    },
  },

  Germany: {
    name: "Germany",
    cities: {
      Berlin: {
        name: "Berlin",
        delivery_address: [
          "1 Alexanderplatz",
          "22 Unter den Linden",
          "9 Potsdamer Platz",
        ],
      },
      Munich: {
        name: "Munich",
        delivery_address: [
          "16 Marienplatz",
          "88 Ludwigstrasse",
          "42 Englischer Garten Way",
        ],
      },
    },
  },
};

const shippingAddressSchema = z.object({
  first_name: z.string().trim().min(1, {
    message: "First name must not be less than one char",
  }),
  last_name: z.string().trim().min(1, {
    message: "Last name must not be less than one char",
  }),

  email: z.string().email().trim().min(1, {
    message: "Email address can't be less than one char",
  }),
  phone: z.string().refine((value) => matchIsValidTel(value), {
    message: "Invalid phone number",
  }),
  address: z.string().trim().min(1, {
    message: "address must not be less than one char",
  }),
  country: z.string().trim().min(4, {
    message: "country must not be less than one char",
  }),
  city: z.string().trim().min(4, {
    message: "city must not be less than one char",
  }),
  region: z.string().trim().min(5, {
    message: "region must not be less than one char",
  }),
});

const CheckoutAddressForm = ({ action, address }) => {
  const { draftOrder, updateKeyValue } = useDraftOrderContext();
  const [errors, setErrors] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(
    Object.keys(draftOrder?.delivery_address).length !== 0
      ? JSON.parse(draftOrder?.delivery_address)
      : null
  );
  const pathname = usePathname();
  // const { refresh, setRefresh } = useRouterRefreshContext();
  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);
    if (name === "country") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        city: "",
        region: "",
      }));

      setErrors((prev) => ({
        ...prev,
        country: undefined,
      }));

      return;
    }

    if (name === "city") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        region: "",
      }));
      setErrors((prev) => ({
        ...prev,
        city: undefined,
      }));
      return;
    }
    if (name === "region") {
      setErrors((prev) => ({
        ...prev,
        region: undefined,
      }));
    }
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: name == "phone" ? [...prev.phone, value] : value,
      };
    });
  };

  const handleChange = (value, info) => {
    // info contains the breakdown of the phone number
    const { countryCallingCode, countryCode, nationalNumber, numberValue } =
      info;
    const isValid = matchIsValidTel(value, {
      onlyCountries: [], // optional,
      excludedCountries: [], // optional
      continents: [], // optional
    });
    console.log(isValid ? "Valid phone number" : "Invalid phone number");
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        phone: "Invalid phone number",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
    setFormValues((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const clientAction = async (formdata) => {
    //client side validation
    console.log(formdata.get("phone"));

    const address = {
      first_name: formdata.get("first_name"),
      last_name: formdata.get("last_name"),
      email: formdata.get("email"),
      phone: formdata.get("phone"),
      address: formdata.get("address"),
      country: formdata.get("country"),
      city: formdata.get("city"),
      region: formdata.get("region"),
      default_address: formdata.get("default_address"),
    };

    const validate = shippingAddressSchema.safeParse(address);
    console.log(validate, errors, !errors, !validate.success, address);
    if (!validate.success || !errors) {
      console.log(address, "called", validate.error.flatten().fieldErrors);
      setErrors(validate.error.flatten().fieldErrors);
      console.log("Validation failed:", validate.error.errors);
      validate.error.errors.forEach((err) => {
        console.log(`Field: ${err.path[0]}, Message: ${err.message}`);
      });
      return;
    } else if (validate.success) {
      if (action === "Edit") {
        const response = await editClientAddress({
          client_id: formValues?.client_id,
          address_id: formValues?.address_id,
          address,
          pathname: pathname,
        });
        if (response.status !== 200) {
          console.log(response.error);
          return;
        }
        console.log(response.data);
        // setRefresh(!refresh);
        return;
      }
      const response = await addClientAddress({ client_id: 1, address });
      if (response.status !== 200) {
        console.log(response.error);
        setErrors({
          email: response.error,
        });
        return;
      }
      console.log(response.data);
      setErrors(undefined);
      updateKeyValue("delivery_address", JSON.stringify(response.data));
    }
  };

  useEffect(() => {
    if (address) {
      console.log(address);
      setFormValues(address);
      return;
    }
  }, [address]);
  useEffect(() => {
    if (Object.keys(draftOrder?.delivery_address).length === 0) {
      const response = async () => {
        const fetchClientDefaultAddressResponse =
          await fetchClientDefaultAddress({
            client_id: 1,
          });
        if (fetchClientDefaultAddressResponse.status !== 200) {
          console.log(fetchClientDefaultAddressResponse.error);
          return;
        }
        console.log(typeof fetchClientDefaultAddressResponse.data);
        setDefaultAddress(fetchClientDefaultAddressResponse.data);
        updateKeyValue(
          "delivery_address",
          JSON.stringify(fetchClientDefaultAddressResponse.data)
        );
      };
      response();
      return;
    }
  }, []);
  return (
    <>
      {defaultAddress && !action ? (
        <>
          <Grid container>
            <Grid size={6}>
              <Stack direction="row" spacing={2}>
                <DoneChecked done={defaultAddress.address_id} />
                <Typography>Client address</Typography>
              </Stack>
            </Grid>
            <Grid size={6}>
              <ChangeButton href={`/user/my-account`} />
            </Grid>
          </Grid>
          <Grid sx={{ mb: 4 }}>
            <Typography>{`${defaultAddress?.first_name} ${defaultAddress?.last_name}`}</Typography>
            <Typography>{`${defaultAddress?.country} ${defaultAddress?.region}`}</Typography>
          </Grid>
        </>
      ) : (
        <>
          <Form action={clientAction} style={{ mt: 3 }}>
            <Typography>Personal details</Typography>

            <Grid
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "1fr  1fr",
                pl: 0,
                pt: 4,
                pb: 4,
              }}
            >
              {["first_name", "last_name", "email"].map((item) => (
                <FormControlLabel
                  key={item}
                  labelPlacement="top"
                  label={item}
                  sx={{ alignItems: "start" }}
                  control={
                    <TextField
                      error={errors?.[`${item}`] ? true : false}
                      id="outlined-basic"
                      variant="outlined"
                      name={item}
                      value={formValues?.[`${item}`] || ""}
                      helperText={errors?.[`${item}`]}
                      onChange={handleTyping}
                      fullWidth
                      slotProps={{
                        htmlInput: {
                          maxLength: 20,
                        },
                      }}
                    />
                  }
                />
              ))}

              <FormControlLabel
                labelPlacement="top"
                label="Phone"
                sx={{ alignItems: "start" }}
                control={
                  <MuiTelInput
                    value={formValues?.phone || ""}
                    name="phone"
                    onChange={handleChange}
                    defaultCountry="KE"
                    error={errors?.["phone"]}
                    helperText={errors?.["phone"]}
                    slotProps={{
                      htmlInput: {
                        maxLength: 16,
                      },
                    }}
                  />
                }
              />

              {/* <CancelButton /> */}
            </Grid>
            {/* <SaveButton /> */}
            <Typography>Location details</Typography>
            <Grid
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "1fr  1fr",
                pl: 0,
                pt: 4,
                pb: 4,
              }}
            >
              {/* {["address"].map((item) => ( */}
              <FormControlLabel
                labelPlacement="top"
                label="address"
                sx={{ alignItems: "start" }}
                control={
                  <TextField
                    error={errors?.name ? true : false}
                    id="outlined-basic"
                    variant="outlined"
                    name="address"
                    // value={formValues[`${item}`] || ""}
                    value={formValues?.address || ""}
                    helperText={errors?.["address"]}
                    onChange={handleTyping}
                    fullWidth
                  />
                }
              />
              {/* ))} */}
              {/* {["country", "city", "region"].map((item) => (
            <FormControlLabel
              key={item}
              labelPlacement="top"
              label={item}
              sx={{ alignItems: "start" }}
              control={
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formValues?.[`${item}`] || ""}
                  name={item}
                  onChange={handleTyping}
                  error={errors?.value ? true : false}
                  fullWidth
                >
                  <MenuItem value="Nairobi">Nairobi</MenuItem>
                  <MenuItem value="Kisumu">Kisumu</MenuItem>
                  <MenuItem value="Mombase">Mombasa</MenuItem>
                </Select>
              }
            />
          ))} */}

              <FormControlLabel
                labelPlacement="top"
                label="country"
                sx={{ alignItems: "start" }}
                control={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues?.[`country`] || ""}
                    name="country"
                    onChange={handleTyping}
                    error={errors?.["country"] ? true : false}
                    fullWidth
                  >
                    {Object?.keys(countryMap).map((country) => {
                      return (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />

              {/* {console.log(
            Object.values(countryMap),
            Object.keys(countryMap["Kenya"]?.cities || {}),
            countryMap["Kenya"]?.cities["Nairobi"]?.delivery_address || []
          )} */}
              <FormControlLabel
                labelPlacement="top"
                label="city"
                sx={{ alignItems: "start" }}
                control={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues?.[`city`] || ""}
                    name="city"
                    onChange={handleTyping}
                    error={errors?.["city"] ? true : false}
                    fullWidth
                    disabled={!formValues?.[`country`]}
                  >
                    {formValues?.[`country`] &&
                      Object?.keys(
                        countryMap[formValues?.[`country`]]?.cities
                      ).map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                  </Select>
                }
              />

              <FormControlLabel
                labelPlacement="top"
                label="region"
                sx={{ alignItems: "start" }}
                control={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues?.[`region`] || ""}
                    name="region"
                    onChange={handleTyping}
                    error={errors?.["region"] ? true : false}
                    fullWidth
                    disabled={!formValues?.[`city`]}
                  >
                    {countryMap[formValues?.[`country`]]?.cities[
                      formValues?.[`city`]
                    ]?.delivery_address.map((delivery_address) => (
                      <MenuItem key={delivery_address} value={delivery_address}>
                        {delivery_address}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            </Grid>
            {/* {!formValues?.default_address && ( */}
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleTyping} name="default_address" />
                }
                label="Default address"
              />
            </Grid>
            {/* )} */}
            <SaveButton label={"address"} />
          </Form>
          {errors && console.log(errors?.["first_name"], errors?.lname, errors)}
        </>
      )}
    </>
  );
};

export default CheckoutAddressForm;
