import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { attributes } from "../../../../../attributes";
import Typography from "@mui/material/Typography";
import { GenerateVariants } from "../buttons";
import VariantsTable from "./variantsTable";

const selections = new Map();
// function getCombinations(data) {
//   console.log(data.size, data);
//   // Initialize an array with one empty string (for starting combinations)
//   // let result = [""];

//   // Iterate through each key-value pair in the data
//   // for (let i = 0; i < data.length; i++) {
//   //   const key = Object.keys(data[i])[0];
//   //   const values = data[i][key];
//   //   console.log(key);
//   //   console.log(values);
//   //   // Create a temporary array to store new combinations
//   //   let temp = [];
//   //   for (let combination of result) {
//   //     for (let value of values) {
//   //       temp.push(combination ? `${combination}, ${value}` : value);
//   //     }
//   //   }

//   //   // Update the result with new combinations
//   //   result = temp;
//   // }

//   // return result;
//   const values = Array.from(data.values());
//   // Helper function to generate combinations recursively
//   const combine = (arrs, idx = 0, current = []) => {
//     if (idx === arrs.length) {
//       return [current.join(", ")];
//     }

//     let combinations = [];
//     for (const value of arrs[idx]) {
//       combinations = combinations.concat(
//         combine(arrs, idx + 1, [...current, value])
//       );
//     }

//     return combinations;
//   };

//   return combine(values);
// }

function getCombinations(data) {
  const cartesian = (...a) =>
    a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

  // const data = new Map([
  //   ["Color", ["Orange", "Brown"]],
  //   ["Size", ["Small", "Large"]],
  //   ["Material", ["Leather", "Cotton"]],
  // ]);
  const arrays = Array.from(data.values());

  let output = cartesian(...arrays);

  console.log(...arrays, output, Array.from(data.values()));
  return cartesian(...arrays);
}

const BasicSelect = () => {
  const [combination, setCombination] = React.useState([]);
  const [combinationValues, setCombinationValues] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    // value.map((v) => console.log(v.VALUES.map((r) => r.VALUE)));
    const test = value.map((v) => v.VALUES.map((r) => r.VALUE)).flat();

    if (value.length === 0) setCombinationValues([]);
    if (combinationValues.length !== 0) {
      setCombinationValues(combinationValues.filter((v) => test.includes(v)));
    }

    // const filteredSecondArray = combinationValues.filter((real) => {
    // console.log(real, test, test.includes(real));
    //   return test.includes(real);
    // });

    // console.log(filteredSecondArray);
    setCombination((prev) => {
      // console.log(prev);
      // On autofill we get a stringified value.
      return typeof value === "string" ? value.split(",") : value;
    });
  };

  const handleChangeValues = (event) => {
    // console.log(event.target.name, event.target.value);
    const {
      target: { value, name },
    } = event;
    // if (selections.has(name)) {
    //   selections.set(name, [
    //     ...new Set([...selections.get(name), value].flat()),
    //   ]);
    // } else {
    //   selections.set(name, [value]);
    // }

    // console.log(
    //   selections.get(name),
    //   selections,
    //   name,
    //   selections.has(name),
    //   value
    // );

    // let exists = combinationValues.find((item) => {
    //   console.log(item[name]);
    //   return item[name] === name;
    // });
    // const exists = combinationValues.find((obj) => Array.isArray(obj[name]));

    // if (exists) {
    //   exists[name].push(value);
    //   // console.log(value, "VALUE IS THERE", exists, combinationValues);
    //   console.log(value, "Spread", exists[name], exists);
    // } else {
    //   combinationValues.push({ [name]: value });
    //   console.log("No value", combinationValues, name);
    // }
    // setCombinationValues((prevValues) => {
    //   prevValues.map((obj) => console.log(obj, "item value"));

    //   return [
    //     ...prevValues,
    //     {
    //       [name]:
    //         prevValues[0] !== undefined
    //           ? [...prevValues[0][name], value]
    //           : value,
    //     },
    //   ];
    // });
    setCombinationValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
            // console.log(selected.map((d) => d.NAME).join(", "));
            // return selected.join(", ");
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
        // console.log(item);
        //   item.NAME,
        //   combinationValues.filter((a) =>
        //     item.VALUES.map((IT) => IT.VALUE).includes(a)
        //   )
        //   // item.VALUES.map((IT) => IT.VALUE).filter((it) => it === "Mauv")
        // );
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
                // console.log(selected);
                const grouped = selected
                  .filter((a) => item.VALUES.map((IT) => IT.VALUE).includes(a))
                  .join(", ");

                let colorsArray = grouped
                  .split(", ")
                  .map((color) => color.trim());
                selections.set(item.NAME, colorsArray);

                // const combinations = getCombinations(selections);

                // Output all the combinations
                // getCombinations(selections);
                // console.log(combinations);

                // console.log(grouped);
                return grouped;
                // return selected.color.map((d) => d?.NAME).join(", ");
              }}
              name={item.NAME}
            >
              {item.VALUES.map((value) => {
                // console.log(item.NAME, combinationValues);
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
        <GenerateVariants
          handleclick={() => {
            console.log("clicked");
            const combinations = getCombinations(selections);
            console.log(combinations);
          }}
        />
      )}
      <VariantsTable />
    </>
  );
};

export default BasicSelect;
