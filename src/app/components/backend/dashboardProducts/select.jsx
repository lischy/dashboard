import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { attributes } from "../../../../../attributes";
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
  const [combination, setCombination] = React.useState([]);
  const [displayTable, setDisplayTable] = React.useState(false);
  const [combinationValues, setCombinationValues] = React.useState([]);
  const [cartesianCombination, setCartesianCombination] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const test = value.map((v) => v.VALUES.map((r) => r.VALUE)).flat();
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
  React.useEffect(() => {
    console.log("CALLEDEDDEEEE - select");
    selections.clear();
  }, [selections]);
  const handleChangeValues = (event) => {
    const {
      target: { value, name },
    } = event;
    console.log(value);
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
            return selected.map((d) => d.NAME).join(", ");
          }}
        >
          {attributes.map((attribute) => {
            return (
              <MenuItem key={attribute.NAME} value={attribute}>
                <Checkbox checked={combination.includes(attribute)} />
                <ListItemText primary={attribute.NAME} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {combination.map((item) => {
        return (
          <FormControl sx={{ m: 1, width: 300 }} key={item.ID}>
            <InputLabel id="demo-simple-select-label">{`Select ${item.NAME}`}</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={combinationValues}
              onChange={handleChangeValues}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                const grouped = selected
                  .filter((a) => item.VALUES.map((IT) => IT.VALUE).includes(a))
                  .join(", ");

                let colorsArray = grouped
                  .split(", ")
                  .map((color) => color.trim());
                selections.set(item.NAME, colorsArray);
                return grouped;
              }}
              name={item.NAME}
            >
              {item.VALUES.map((value) => {
                return (
                  <MenuItem key={value.ID} value={value["VALUE"]}>
                    <Checkbox
                      checked={combinationValues.includes(
                        value["DISPLAY NAME"]
                      )}
                    />
                    <ListItemText primary={value["DISPLAY NAME"]} />
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
        setVariantRows={setVariantRows}
        // variants={response()}
      />
    </>
  );
};

export default BasicSelect;
