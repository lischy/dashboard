import { products } from "../../../products";
import { categories } from "../../../categories";
import { attributes } from "../../../attributes";

const fetchProducts = async function () {
  return products;
};

const fetchCategories = async (params) => {
  return categories;
};

const fetchtAtributes = async () => {
  return attributes;
};
const fetchtAtributeById = async (id) => {
  // console.log(attributes.find((a) => a.ID == id));
  const attribute = attributes
    .find((a) => a.ID == id)
    .VALUES.filter((val) => {
      return val.ID == id;
    });
  // console.log(attribute);
  // const values = attribute ? attribute.VALUES.filter((a) => a.ID == id) : [];
  // return values;
};
const fetchtAtributeValuesById = async (id) => {
  const values = attributes.find((a) => a.ID == id).VALUES;
  return values;
};

const fetchtAtributeValueById = async (attributeId, valueId) => {
  // console.log(attributeId, ValueId);
  const value = attributes
    .find((a) => a.ID == attributeId)
    .VALUES.filter((val) => {
      return val.ID == valueId;
    });
  return value;
};
export {
  fetchProducts,
  fetchCategories,
  fetchtAtributes,
  fetchtAtributeValuesById,
  fetchtAtributeById,
  fetchtAtributeValueById,
};
