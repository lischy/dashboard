import React, { useEffect, useState, use } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { fetchtAtributes } from "@/app/lib/data";
import { GenerateVariants } from "../buttons";
import VariantsTable from "./variantsTable";
// import { fetchtProductVariants } from "@/app/lib/data";

const selections = new Map();
// let cartesianCombination = [];

function getCombinations(data) {
  const cartesian = (...a) =>
    a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
  const arrays = Array.from(data.values());
  let output = cartesian(...arrays);
  return cartesian(...arrays);
}

const BasicSelect = ({ setVariantRows }) => {
  const [combination, setCombination] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [combinationValues, setCombinationValues] = useState([]);
  const [cartesianCombination, setCartesianCombination] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const response = async () => {
      const fetchtAtributesResponse = await fetchtAtributes();
      if (fetchtAtributesResponse.status !== 200) {
        return;
      }
      console.log(fetchtAtributesResponse.data);
      setAttributes(fetchtAtributesResponse.data);
    };

    response();
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    const test = value
      .map((attribute) =>
        attribute.attribute_values.map(
          (attribute_value) => attribute_value.value
        )
      )
      .flat();
    console.log(test);
    // console.log(test); ['Teal', 'Khaki', 'Orange', 'Green', 'Mauv']
    // (7) ['Teal', 'Khaki', 'Orange', 'Green', 'Mauv', 'Small', 'Large']
    // https://www.tutorialspoint.com/filter-array-with-filter-and-includes-in-javascript
    if (value.length === 0) setCombinationValues([]);
    // we want to filter array1 to include only the elements that are present in array2.

    if (combinationValues.length !== 0) {
      setCombinationValues(combinationValues.filter((v) => test.includes(v)));
    }
    setCombination((prev) => {
      return typeof value === "string" ? value.split(",") : value;
    });
  };
  useEffect(() => {
    selections.clear();
  }, [selections]);
  const handleChangeValues = (event) => {
    const {
      target: { value, name },
    } = event;
    setCombinationValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const generateVariants = () => {
    setCartesianCombination(getCombinations(selections));
    if (cartesianCombination.length > 0) {
      console.log(cartesianCombination.length, cartesianCombination);
      setDisplayTable(true);
    }
  };
  // const response = async () => {
  //   const response = await fetchtProductVariants({ product_id: product_id });
  //   const variants = await response.data;
  //   return variants;
  // };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">Select...</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={combination}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => {
            return selected.map((d) => d.name).join(", ");
          }}
        >
          {attributes?.map((attribute) => {
            return (
              <MenuItem key={attribute.name} value={attribute}>
                <Checkbox checked={combination.includes(attribute)} />
                <ListItemText primary={attribute.name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {combination.map((item) => {
        return (
          <FormControl sx={{ m: 1, width: 300 }} key={item.attribute_id}>
            <InputLabel>{`Select ${item.name}`}</InputLabel>
            <Select
              multiple
              value={combinationValues}
              onChange={handleChangeValues}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                const grouped = selected
                  .filter((a) =>
                    item.attribute_values.map((IT) => IT.value).includes(a)
                  )
                  .join(", ");

                let colorsArray = grouped
                  .split(", ")
                  .map((color) => color.trim());
                selections.set(item.name, colorsArray);
                return grouped;
              }}
              name={item.name}
            >
              {item.attribute_values.map((value, index) => {
                return (
                  <MenuItem
                    key={value.attribute_value_id}
                    value={value["value"]}
                  >
                    <Checkbox
                      checked={combinationValues.includes(
                        value["display_name"]
                      )}
                    />
                    <ListItemText primary={value["display_name"]} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      })}
      {combinationValues.length !== 0 && (
        <GenerateVariants handleclick={generateVariants} />
      )}
      {/* {displayTable && (
        <VariantsTable
          cartesianCombination={cartesianCombination}
          selections={selections}
          product_id={product_id}
        />
      )} */}

      <VariantsTable
        cartesianCombination={cartesianCombination}
        selections={selections}
        setVariantRows={setVariantRows ? setVariantRows : null}
        // variants={response()}
      />
    </>
  );
};

export default BasicSelect;
