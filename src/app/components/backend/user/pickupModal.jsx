"use client";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDraftOrderContext } from "@/app/context/draftOrderProvider";
import FormHelperText from "@mui/material/FormHelperText";
import { z } from "zod";
import {
  SaveButton,
  CancelButton,
} from "@/app/components/backend/user/buttons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const zodPickupSchema = z.object({
  Country: z.string().trim().min(1, {
    message: "Country  must not be less than one char",
  }),
  City: z.string().trim().min(1, {
    message: "City  must not be less than one char",
  }),
  Region: z.string().trim().min(1, {
    message: "Region  must not be less than one char",
  }),
  pickup_station: z.string().trim().min(1, {
    message: "pickup_station  must not be less than one char",
  }),
});
const countryMap = {
  China: {
    name: "China",
    cities: {
      Beijing: {
        name: "Beijing",
        regions: [
          {
            name: "12 Tsinghua Street",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "84 Forbidden City Avenue",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "9 Temple of Heaven Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
      Shanghai: {
        name: "Shanghai",
        regions: [
          {
            name: "88 Bund Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "22 Pudong Avenue",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "100 Nanjing East Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
      Shenzhen: {
        name: "Shenzhen",
        regions: [
          {
            name: "1 Huaqiangbei Street",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "76 Futian Tech Park",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "45 Dongmen Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
    },
  },

  Kenya: {
    name: "Kenya",
    cities: {
      Baringo: {
        name: "Baringo",
      },
      Bomet: {
        name: "Bomet",
      },
      Bungoma: {
        name: "Bungoma",
      },
      Busia: {
        name: "Busia",
      },
      "Elgeyo-Marakwet": {
        name: "Elgeyo-Marakwet",
      },
      Embu: {
        name: "Embu",
      },
      Garissa: {
        name: "Garissa",
      },
      "Homa Bay": {
        name: "Homa Bay",
      },
      Isiolo: {
        name: "Isiolo",
      },
      Kajiado: {
        name: "Kajiado",
      },
      Kakamega: {
        name: "Kakamega",
      },
      Kericho: {
        name: "Kericho",
      },
      Kiambu: {
        name: "Kiambu",
      },
      Kilifi: {
        name: "Kilifi",
      },
      Kirinyaga: {
        name: "Kirinyaga",
      },
      Kisii: {
        name: "Kisii",
      },
      Kitui: {
        name: "Kitui",
      },
      Kwale: {
        name: "Kwale",
      },
      Laikipia: {
        name: "Laikipia",
      },
      Lamu: {
        name: "Lamu",
      },
      Machakos: {
        name: "Machakos",
      },
      Makueni: {
        name: "Makueni",
      },
      Marsabit: {
        name: "Marsabit",
      },
      Meru: {
        name: "Meru",
      },
      Migori: {
        name: "Migori",
      },

      "Murang'a": {
        name: "Murang'a",
      },
      Nakuru: {
        name: "Nakuru",
      },
      Nandi: {
        name: "Nandi",
      },
      Narok: {
        name: "Narok",
      },
      Nyamira: {
        name: "Nyamira",
      },
      Nyandarua: {
        name: "Nyandarua",
      },
      Nyeri: {
        name: "Nyeri",
      },
      Samburu: {
        name: "Samburu",
      },
      Siaya: {
        name: "Siaya",
      },
      "Taita-Taveta": {
        name: "Taita-Taveta",
      },
      "Tana River": {
        name: "Tana River",
      },
      "Tharaka-Nithi": {
        name: "Tharaka-Nithi",
      },
      " Trans-Nzoia": {
        name: "Trans-Nzoia",
      },
      Turkana: {
        name: "Turkana",
      },
      " Uasin Gishu": {
        name: "Uasin Gishu",
      },
      Vihiga: {
        name: "Vihiga",
      },
      Wajir: {
        name: "Wajir",
      },
      " West Pokot": {
        name: "West Pokot",
      },

      Nairobi: {
        name: "Nairobi",
        regions: [
          {
            name: "CBD",
            pickup_stations: [
              {
                name: "CBD  - 10 Kenyatta Avenue",
                cost: 310,
              },
              {
                name: "CBD - 56 Uhuru Highway",
                cost: 320,
              },
              {
                name: " CBD - GPO/City Market/Nation Centre",
                cost: 330,
              },
              {
                name: " CBD - Luthuli/Afya Centre/ R. Ngala",
                cost: 340,
              },
              {
                name: " CBD - UON/Globe/Koja/River Road",
                cost: 350,
              },
            ],
          },

          {
            name: "Westlands",
            pickup_stations: [
              {
                name: "Westlands - 99 Westlands Road",
              },
            ],
          },
          {
            name: "Dagoretti",
            pickup_stations: [
              {
                name: " Dagoretti - Adams Arcade / Dagoretti Corner",
              },
            ],
          },
          {
            name: "Embakasi",
            pickup_stations: [
              {
                name: " Fedha/Tasia",
              },
              {
                name: " Embakasi East -Cabanas stage/kyang'ombe/Southfield Mall",
              },
              {
                name: "Embakasi East-Donholm/Greenfields/Kayole/Nasra",
              },
              {
                name: " Embakasi East-GSU/Mihango/Utawala/Benedicta/Githunguri/Airways",
              },
              { name: "Embakasi East-Pipeline/Transami/Airport North Rd" },
              {
                name: "Embakasi South - Mombasa Road/Sameer Park/General Motors/ICD ",
              },
            ],
          },
          {
            name: "South B",
            pickup_stations: [
              {
                name: "Bunyala Road/Mater Hospital/ South B/Hazina Estate/Likoni Road",
              },
            ],
          },
          {
            name: "Buruburu",
            pickup_stations: [
              {
                name: "Buruburu / Hamza / Harambee",
              },
            ],
          },
          {
            name: "Thome",
            pickup_stations: [
              {
                name: "Garden Estate/Thome/Marurui",
              },
            ],
          },
          {
            name: "Githurai/Kahawa Sukari",
            pickup_stations: [
              {
                name: "Githurai/Kahawa Sukari",
              },
            ],
          },
        ],
      },
      Mombasa: {
        name: "Mombasa",
        regions: [
          {
            name: "14 Moi Avenue",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "60 Nyali Bridge Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "7 Likoni Ferry Route",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
      Kisumu: {
        name: "Kisumu",
        regions: [
          {
            name: "25 Dunga Beach Road",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "77 Oginga Odinga Street",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "33 Lakeview Lane",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
    },
  },

  Germany: {
    name: "Germany",
    cities: {
      Berlin: {
        name: "Berlin",
        regions: [
          {
            name: "1 Alexanderplatz",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "22 Unter den Linden",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "9 Potsdamer Platz",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
      Munich: {
        name: "Munich",
        regions: [
          {
            name: "16 Marienplatz",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "88 Ludwigstrasse",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
          {
            name: "42 Englischer Garten Way",
            pickup_stations: [
              {
                name: "mwebe",
              },
            ],
          },
        ],
      },
    },
  },
};

// const updateDeliveryOption = (option) => {
//   const draft = JSON.parse(localStorage.getItem("draftOrder")) || {};
//   draft.delivery_option = option;
//   localStorage.setItem("draftOrder", JSON.stringify(draft));
// };

const PickupModal = ({ open, handleClose }) => {
  const [formValues, setFormValues] = React.useState(null);
  const [errors, setErrors] = useState(null);
  const { draftOrder, handleDraftOrderChange } = useDraftOrderContext();
  const [helperText, setHelperText] = React.useState(null);

  const handleTyping = (event) => {
    const { name, value, checked } = event.target;
    console.log(name, value, checked);
    if (name === "Country") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        City: "",
        Regions: "",
      }));

      setErrors((prev) => ({
        ...prev,
        Country: undefined,
      }));

      return;
    }

    if (name === "City") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        Region: "",
      }));
      setErrors((prev) => ({
        ...prev,
        City: undefined,
      }));
      return;
    }
    if (name === "Region") {
      setErrors((prev) => ({
        ...prev,
        Region: undefined,
      }));
    }
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(draftOrder);
  const handleSubmit = (formdata) => {
    const pickup_details = {
      Country: formdata.get("delivery_option.Country"),
      City: formdata.get("delivery_option.City"),
      Region: formdata.get("delivery_option.Region"),
      pickup_station: formdata.get("delivery_option.pickup_station"),
    };

    const validate = zodPickupSchema.safeParse(pickup_details);
    console.log(validate);
    if (!validate.success) {
      setHelperText("Please  select an option.");
      setErrors(validate.error.flatten().fieldErrors);
      return;
    }

    console.log(pickup_details);
    setHelperText(" ");
    setErrors(undefined);
    handleClose();
    // Example usage
    // updateDeliveryOption(pickup_details);
    // setPickupStation(pickup_details);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>Select pickup station</Typography>
        <Form action={handleSubmit}>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              justifyContent: "space-evenly",
              width: "fill-available",
              mb: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select pickup station"
                // value={formValues?.["Country"] || ""}
                // name={"Country"}
                // onChange={handleTyping}
                value={draftOrder?.delivery_option?.Country || ""}
                name={"delivery_option.Country"}
                onChange={handleDraftOrderChange}
                error={errors?.Country ? true : false}
              >
                {Object?.keys(countryMap).map((country) => {
                  return (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select pickup station"
                // value={formValues?.["City"] || ""}
                // name={"City"}
                // onChange={handleTyping}
                value={draftOrder?.delivery_option?.City || ""}
                name="delivery_option.City"
                onChange={handleDraftOrderChange}
                error={errors?.City ? true : false}
              >
                {/* {formValues?.[`Country`] &&
                  Object?.keys(countryMap[formValues?.[`Country`]]?.cities).map(
                    (city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    )
                  )} */}
                {draftOrder?.delivery_option?.Country &&
                  Object?.keys(
                    countryMap[draftOrder?.delivery_option?.Country]?.cities
                  ).map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Region</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select pickup station"
                // value={formValues?.["Region"] || ""}
                // name={"Region"}
                // onChange={handleTyping}
                value={draftOrder?.delivery_option?.Region || ""}
                name="delivery_option.Region"
                onChange={handleDraftOrderChange}
                error={errors?.Region ? true : false}
              >
                {/* {countryMap[formValues?.[`Country`]]?.cities[
                  formValues?.[`City`]
                ]?.regions?.map((region) => (
                  <MenuItem key={region.name} value={region.name}>
                    {region.name}
                  </MenuItem>
                ))} */}

                {countryMap[draftOrder?.delivery_option?.Country]?.cities[
                  draftOrder?.delivery_option?.City
                ]?.regions?.map((region) => (
                  <MenuItem key={region.name} value={region.name}>
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <FormHelperText
            error={errors?.pickup_station}
            sx={{
              visibility: errors?.pickup_station ? "visible" : "hidden",
              minHeight: "3em",
            }}
          >
            {helperText || ""}
          </FormHelperText>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            // name="pickup_station"
            // value={formValues?.["pickup_station"] || ""}
            // onChange={handleTyping}
            name="delivery_option.pickup_station"
            value={draftOrder?.delivery_option?.pickup_station?.name || ""}
            onChange={handleDraftOrderChange}
          >
            {/* {countryMap[formValues?.[`Country`]]?.cities[
              formValues?.[`City`]
            ]?.regions
              ?.find((region) => region.name === formValues?.["Region"])
              ?.pickup_stations?.map((pickup_station) => (
                <FormControlLabel
                  key={pickup_station.name}
                  value={pickup_station.name}
                  control={<Radio />}
                  label={pickup_station.name}
                />
              ))} */}

            {countryMap[draftOrder?.delivery_option?.Country]?.cities[
              draftOrder?.delivery_option?.City
            ]?.regions
              ?.find(
                (region) => region.name === draftOrder?.delivery_option?.Region
              )
              ?.pickup_stations?.map((pickup_station) => {
                // console.log(pickup_station);
                return (
                  <FormControlLabel
                    key={pickup_station.name}
                    value={JSON.stringify(pickup_station)}
                    control={
                      <Radio
                        checked={
                          draftOrder?.delivery_option?.pickup_station
                            ? JSON.parse(
                                draftOrder?.delivery_option?.pickup_station
                              )?.name == pickup_station.name
                            : false
                        }
                      />
                    }
                    label={pickup_station.name}
                  />
                );
              })}
          </RadioGroup>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              justifyContent: "space-evenly",
              width: "fill-available",
              mb: 2,
            }}
          >
            <CancelButton handleCancel={handleClose} />
            <SaveButton label="pickup location" />
          </Stack>
        </Form>
      </Box>
    </Modal>
  );
};

export default PickupModal;
