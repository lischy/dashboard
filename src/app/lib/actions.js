"use server";
// import { signIn } from "@/auth";
import { writeFile } from "node:fs/promises";
import path from "path";
import fs from "fs";
import pool from "@/app/lib/connect";
import { revalidatePath } from "next/cache";

// ...

// export async function authenticate(prevState, formData) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

const isPoolAvailable = async () => {
  try {
    const client = await pool.connect();
    client.release();
    return true; // Connection is available
  } catch (error) {
    console.error("Database connection error:", error.stack || error.message);
    return false; // Connection is unavailable
  }
};

const addProduct = async ({ product = null } = {}) => {
  if (!product) throw new Error("No product details provided");
  const price = parseFloat(product.price);
  const salePrice = parseFloat(product.salePrice);
  const categories = [product.category][0].split(",").map((c) => c.trim());

  if (isNaN(price) || isNaN(salePrice)) {
    throw new Error("Invalid price format");
  }
  try {
    const query = `
  INSERT INTO products.products_info
(product_name, category, price, sale_price, stock, published, product_images, product_description)
VALUES($1,$2,$3,$4,$5,$6,$7,$8);
  `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    console.log([product.category][0].split(",").map((c) => c.trim()));

    const { rows, errors } = await pool.query(query, [
      product.name,
      categories,
      price,
      salePrice,
      product.stock,
      product.published,
      product.product_images || [],
      product.product_description,
    ]);
    console.log(rows, product, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    console.log(error);
    return { error: "Failed to add products", status: 500 };
  }
};
const addProductCategory = async ({
  category = null,
  category_image = "default.jpg",
} = {}) => {
  if (!category) throw new Error("No category details provided");
  console.log(category, category_image);

  try {
    const query = `INSERT INTO products.categories
(category_image, "name", description, published)
VALUES($1,$2,$3,$4);`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    // console.log(attribute.name, attribute.display_name, attribute.published);
    const { rows, errors } = await pool.query(query, [
      category_image,
      category.name,
      category.description,
      category.published,
    ]);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const updateProductCategory = async ({
  category = null,
  category_image = "default.jpg",
  category_id = null,
} = {}) => {
  if (!category) throw new Error("No category details provided");
  console.log(category, category_image);

  try {
    const query = `UPDATE products.categories
SET category_image = $2, 
"name"= $3, 
description = $4, 
published = $5
WHERE category_id=$1`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    // console.log(attribute.name, attribute.display_name, attribute.published);
    const { rows, errors } = await pool.query(query, [
      category_id,
      category_image,
      category.name,
      category.description,
      category.published,
    ]);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    console.log(error);
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
export async function updateProduct(params, product_id) {
  // console.log(params, product_id);
  const images = [...params.product_images];
  // .join(",");       product_images=array_cat(product_images,ARRAY [$1]::varchar[])

  // console.log(images);
  const query = `UPDATE products.products_info 
  SET  product_name ='${params.name}', 
       product_description = '${params.product_description}',
       category=ARRAY['${params.category}'],
       price =${params.price},
       sale_price=${params.salePrice},
       stock=${params.stock},
       published=${params.published},
       product_images=product_images || $1::varchar[]
  where product_id=${product_id} 
  RETURNING *`;
  const isAvailable = await isPoolAvailable();
  if (!isAvailable) {
    throw new Error("Database connection is not available");
  }
  const { rows, errors } = await pool.query(query, [images]);
  // console.log(rows, errors);
  return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
}

export async function updateCart(product) {}

const uploadFile = async ({ file = "", modifiedFileName = "" } = {}) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  try {
    console.log(modifiedFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", modifiedFileName);
    await writeFile(filePath, buffer);
    return { message: "File uploaded successfully!", status: 200 };
  } catch (error) {
    return {
      error: `Error uploading file: ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const deleteFile = async (file_name, product_id) => {
  //   const fs = require('fs');
  // const path = require('path');
  console.log(file_name, product_id);
  // Define the file path to be removed
  const filePath = path.join(process.cwd(), "public", file_name);

  try {
    const query = `
  UPDATE products.products_info 
  SET product_images = array_remove(product_images, '${file_name}') 
  WHERE product_id =${product_id} RETURNING *
  `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows, error } = await pool.query(query);
    console.log(rows);
    if (rows) {
      // Remove the file from the file system
      fs.unlink(filePath, (err) => {
        if (err) {
          // Handle the error if the file doesn't exist or there is an issue
          console.error("Error deleting file:", err);
          return;
        }

        // If file is deleted successfully
        console.log("File deleted successfully");
      });
      return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
    } else if (error) {
      throw new Error("Can't delete the imae:", error.stack || error.message);
    }
  } catch (error) {
    return { error: "Failed to delete imae", status: 500 };
  }
};
const deleteCategoryFile = async (file_name, category_id) => {
  //   const fs = require('fs');
  // const path = require('path');
  console.log(file_name, category_id);
  // Define the file path to be removed
  const filePath = path.join(process.cwd(), "public", file_name);

  try {
    const query = `
  UPDATE products.categories
SET category_image = NULL
WHERE category_id =$1 RETURNING *
  `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows, error } = await pool.query(query, [category_id]);
    console.log(rows);
    if (rows) {
      // Remove the file from the file system
      fs.unlink(filePath, (err) => {
        if (err) {
          // Handle the error if the file doesn't exist or there is an issue
          console.error("Error deleting file:", err);
          return;
        }

        // If file is deleted successfully
        console.log("File deleted successfully");
      });
      return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
    } else if (error) {
      throw new Error("Can't delete the image:", error.stack || error.message);
    }
  } catch (error) {
    return { error: "Failed to delete image", status: 500 };
  }
};

const updateProductVariants = async ({ variants, product_id }) => {
  // Serialize the `variants` array into a JSON string
  const variantsJson = JSON.stringify(variants);
  console.log(variants, product_id);
  try {
    // const query = `UPDATE products.products_info SET variants = {
    //   "Barcode": '${variants.Barcode}',
    //   "Combination":'${variants.Barcode}',
    //   "Sub_Id":'${variants.Barcode}',
    //   "Image": '${variants.Barcode}',
    //   "Sub_Price":'${variants.Barcode}',
    //   "Sub_Quantity":'${variants.Barcode}',
    //   "Sub_SalePrice":'${variants.Barcode}',
    //   "Sku":'${variants.Barcode}'
    //   } WHERE product_id=1`;

    //    const update_and_append_function = `
    //    CREATE OR REPLACE FUNCTION update_variants(
    //       p_product_id INT
    //   )
    //   RETURNS VOID AS $$
    //     WITH updated as (
    //     SELECT
    //     product_id,
    //     jsonb_agg(
    //       CASE
    //         WHEN elem->>'Combination' = 'Green, Small'
    //         THEN jsonb_set(elem, '{Sub_Price}', '"9"')  -- update Sub_Price
    //         ELSE elem
    //       END
    //     ) AS new_variants
    //   FROM products.products_info,
    //   jsonb_array_elements(variants) AS elem
    //   WHERE product_id = p_product_id
    //   GROUP BY product_id;
    //   ),
    //   final AS (
    //   SELECT
    //     product_id,
    //     CASE
    //       WHEN NOT EXISTS (
    //         SELECT 1 FROM jsonb_array_elements(new_variants) e
    //         WHERE e->>'Combination' = 'Blue, Medium'
    //       )
    //       THEN new_variants || '[{"Sku": "889", "Image": "", "Sub_Id": 2, "Barcode": "2", "Sub_Price": "120", "Combination": "Blue, Medium", "Sub_Quantity": "15", "Sub_SalePrice": "100"}]'::jsonb
    //       ELSE new_variants
    //     END AS final_variants
    //   FROM updated
    // )
    //   UPDATE products.products_info
    // SET variants = final.final_variants
    // FROM final
    // WHERE products.products_info.product_id = final.product_id;
    // $$ LANGUAGE plpgsql;
    // `

    //   const update_and_append_function = `
    //   CREATE OR REPLACE FUNCTION update_variants(
    //      p_product_id INT,
    //      p_variants jsonb
    //  )
    //  RETURNS VOID AS $$
    //    WITH updated as (
    //    SELECT
    //    product_id,
    //    jsonb_agg(
    //      CASE
    //       -- For each item in p_variants, check if its Combination exists in variants
    //        WHEN elem->>'Combination' IN (SELECT value->>'Combination' FROM jsonb_array_elements(p_variants) AS value)
    //        THEN jsonb_set(
    //                     jsonb_set(
    //                         jsonb_set(elem, '{Sub_Price}', COALESCE((p_variants->>elem->>'Combination'->>'Sub_Price')::jsonb, elem->>'Sub_Price')),
    //                         '{Sub_SalePrice}', COALESCE((p_variants->>elem->>'Combination'->>'Sub_SalePrice')::jsonb, elem->>'Sub_SalePrice'),
    //                         '{Sub_Quantity}', COALESCE((p_variants->>elem->>'Combination'->>'Sub_Quantity')::jsonb, elem->>'Sub_Quantity')
    //                     )
    //                 )
    //                 ELSE elem
    //      END
    //    ) AS new_variants
    //  FROM products.products_info,
    //  jsonb_array_elements(variants) AS elem
    //  WHERE product_id = p_product_id
    //  GROUP BY product_id;
    //  ),
    //  final AS (
    //  SELECT
    //    product_id,
    //    -- Add new items if they don't already exist in the existing array
    //    CASE
    //      WHEN NOT EXISTS (
    //        SELECT 1 FROM jsonb_array_elements(new_variants) e
    //        WHERE e->>'Combination' IN (SELECT value->>'Combination' FROM jsonb_array_elements(p_variants) AS value)
    //      )
    //      THEN new_variants || p_variants
    //      ELSE new_variants
    //    END AS final_variants
    //  FROM updated
    // )
    //  UPDATE products.products_info
    // SET variants = final.final_variants
    // FROM final
    // WHERE products.products_info.product_id = final.product_id;
    // $$ LANGUAGE plpgsql;
    // `;

    //     `
    //    CREATE OR REPLACE FUNCTION update_variants(
    //        p_product_id INT,
    //        p_variants jsonb
    //    ) RETURNS VOID AS $$
    // BEGIN
    //      WITH updated as (
    //      SELECT
    //      product_id,
    //      jsonb_agg(
    //        CASE
    //         -- For each item in p_variants, check if its Combination exists in variants
    //          WHEN elem->>'Combination' IN (SELECT value->>'Combination' FROM jsonb_array_elements(p_variants) AS value)
    //          THEN jsonb_set(
    //                         jsonb_set(
    //                             jsonb_set(
    //                                 elem,
    //                                 '{Sub_Price}',
    //                                 COALESCE(
    //                                     (value->>'Sub_Price')::jsonb,  -- Convert the text to jsonb
    //                                     to_jsonb(elem->>'Sub_Price')  -- Convert text to jsonb
    //                                 )
    //                             ),
    //                             '{Sub_SalePrice}',
    //                             COALESCE(
    //                                 (value->>'Sub_SalePrice')::jsonb,  -- Convert the text to jsonb
    //                                 to_jsonb(elem->>'Sub_SalePrice')  -- Convert text to jsonb
    //                             )
    //                         ),
    //                         '{Sub_Quantity}',
    //                         COALESCE(
    //                             (value->>'Sub_Quantity')::jsonb,  -- Convert the text to jsonb
    //                             to_jsonb(elem->>'Sub_Quantity')  -- Convert text to jsonb
    //                         )
    //                     )
    //                   ELSE elem
    //        END
    //      ) AS new_variants
    //    FROM products.products_info,
    //    jsonb_array_elements(variants) AS elem
    //    WHERE product_id = p_product_id
    //    GROUP BY product_id
    //    ),
    //    final AS (
    //    SELECT
    //      product_id,
    //      -- Add new items if they don't already exist in the existing array
    //      CASE
    //        WHEN NOT EXISTS (
    //          SELECT 1 FROM jsonb_array_elements(new_variants) e
    //          WHERE e->>'Combination' IN (SELECT value->>'Combination' FROM jsonb_array_elements(p_variants) AS value)
    //        )
    //        THEN new_variants || p_variants
    //        ELSE new_variants
    //      END AS final_variants
    //    FROM updated
    //   )
    //    UPDATE products.products_info
    //   SET variants = final.final_variants
    //   FROM final
    //   WHERE products.products_info.product_id = final.product_id;
    // END;
    //   $$ LANGUAGE plpgsql;

    // `;
    //     `
    //     CREATE OR REPLACE FUNCTION update_variants(
    //     p_product_id INT,
    //     p_variants jsonb
    // )
    // RETURNS SETOF products.products_info AS $$
    // BEGIN
    //     -- Check if variants is NULL or empty for the specific product
    //     IF EXISTS (
    //         SELECT 1
    //         FROM products.products_info
    //         WHERE product_id = p_product_id
    //           AND (variants IS NULL OR variants = '[]'::jsonb)
    //     ) THEN
    //         -- If variants is NULL or empty, directly set it to p_variants
    //         UPDATE products.products_info
    //         SET variants = p_variants  -- Set variants to p_variants directly
    //         WHERE product_id = p_product_id;

    //         RAISE NOTICE 'Variants was NULL or empty for product_id: %, setting variants to p_variants: %', p_product_id, p_variants;
    //     ELSE
    //         -- If variants is not NULL or empty, proceed with merging or updating the variants
    //         WITH updated AS (
    //             SELECT
    //                 product_id,
    //                 jsonb_agg(
    //                     CASE
    //                         -- For each item in p_variants, check if its Combination exists in variants
    //                         WHEN elem->>'Combination' IN (
    //                             SELECT value->>'Combination'
    //                             FROM jsonb_array_elements(p_variants) AS value
    //                         )
    //                         THEN jsonb_set(
    //                             jsonb_set(
    //                                 jsonb_set(
    //                                     elem,
    //                                     '{Sub_Price}',
    //                                     COALESCE(
    //                                         (value->>'Sub_Price')::jsonb,  -- Convert the text to jsonb
    //                                         to_jsonb(elem->>'Sub_Price')  -- Convert text to jsonb
    //                                     )
    //                                 ),
    //                                 '{Sub_SalePrice}',
    //                                 COALESCE(
    //                                     (value->>'Sub_SalePrice')::jsonb,  -- Convert the text to jsonb
    //                                     to_jsonb(elem->>'Sub_SalePrice')  -- Convert text to jsonb
    //                                 )
    //                             ),
    //                             '{Sub_Quantity}',
    //                             COALESCE(
    //                                 (value->>'Sub_Quantity')::jsonb,  -- Convert the text to jsonb
    //                                 to_jsonb(elem->>'Sub_Quantity')  -- Convert text to jsonb
    //                             )
    //                         )
    //                         ELSE elem
    //                     END
    //                 ) AS new_variants
    //             FROM products.products_info,
    //                  jsonb_array_elements(variants) AS elem
    //             WHERE product_id = p_product_id
    //             GROUP BY product_id
    //         ),
    //         final AS (
    //             SELECT
    //                 product_id,
    //                 -- Add new items if they don't already exist in the existing array
    //                 CASE
    //                     WHEN NOT EXISTS (
    //                         SELECT 1
    //                         FROM jsonb_array_elements(new_variants) e
    //                         WHERE e->>'Combination' IN (
    //                             SELECT value->>'Combination'
    //                             FROM jsonb_array_elements(p_variants) AS value
    //                         )
    //                     )
    //                     THEN new_variants || p_variants  -- Concatenate p_variants if they don't already exist
    //                     ELSE new_variants
    //                 END AS final_variants
    //             FROM updated
    //         )
    //         UPDATE products.products_info
    //         SET variants = final.final_variants
    //         FROM final
    //         WHERE products.products_info.product_id = final.product_id;
    //     END IF;

    //     -- Return the updated row(s)
    //     RETURN QUERY
    //     SELECT *
    //     FROM products.products_info
    //     WHERE product_id = p_product_id;
    // END;
    // $$ LANGUAGE plpgsql;

    //     `;
    const update_and_append_function = `
    CREATE OR REPLACE FUNCTION update_variants(
    p_product_id INT,
    p_variants jsonb
)
RETURNS SETOF products.products_info AS $$
BEGIN
    -- Check if variants is NULL or empty for the specific product
    IF EXISTS (
        SELECT 1
        FROM products.products_info
        WHERE product_id = p_product_id
          AND (variants IS NULL OR variants = '[]'::jsonb)
    ) THEN
        -- If variants is NULL or empty, directly set it to p_variants
        UPDATE products.products_info
        SET variants = p_variants  -- Set variants to p_variants directly
        WHERE product_id = p_product_id;
        
        RAISE NOTICE 'Variants was NULL or empty for product_id: %, setting variants to p_variants: %', p_product_id, p_variants;
    ELSE
        -- If variants is not NULL or empty, proceed with merging or updating the variants
        WITH updated AS (
            SELECT
                product_id,
                jsonb_agg(
                    CASE
                        -- Only include elements that are not NULL or empty objects
                        WHEN elem IS NOT NULL AND jsonb_typeof(elem) = 'object' THEN
                            -- Check if any field needs to be updated
                            jsonb_set(
                                jsonb_set(
                                    jsonb_set(
                                        elem,
                                        '{Sub_Price}',
                                        COALESCE(
                                            (value->>'Sub_Price')::jsonb,  -- Convert the text to jsonb
                                            to_jsonb(elem->>'Sub_Price')  -- Convert text to jsonb
                                        )
                                    ),
                                    '{Sub_SalePrice}',
                                    COALESCE(
                                        (value->>'Sub_SalePrice')::jsonb,  -- Convert the text to jsonb
                                        to_jsonb(elem->>'Sub_SalePrice')  -- Convert text to jsonb
                                    )
                                ),
                                '{Sub_Quantity}',
                                COALESCE(
                                    (value->>'Sub_Quantity')::jsonb,  -- Convert the text to jsonb
                                    to_jsonb(elem->>'Sub_Quantity')  -- Convert text to jsonb
                                )
                            )
                        ELSE NULL  -- Do nothing if no update is needed
                    END
                ) FILTER (WHERE CASE
                                -- Only aggregate non-null values
                                WHEN elem IS NOT NULL AND jsonb_typeof(elem) = 'object' THEN true
                                ELSE false
                            END) AS new_variants  -- Add FILTER to exclude null values during aggregation
            FROM products.products_info,
                 jsonb_array_elements(variants) AS elem
            WHERE product_id = p_product_id
            GROUP BY product_id
        ),
        final AS (
            SELECT
                product_id,
                -- Add new items if they don't already exist in the existing array
                CASE
                    WHEN NOT EXISTS (
                        SELECT 1
                        FROM jsonb_array_elements(new_variants) e
                        WHERE e->>'Combination' IN (
                            SELECT value->>'Combination'
                            FROM jsonb_array_elements(p_variants) AS value
                        )
                    )
                    THEN new_variants || p_variants  -- Concatenate p_variants if they don't already exist
                    ELSE new_variants
                END AS final_variants
            FROM updated
        )
        UPDATE products.products_info
        SET variants = final.final_variants
        FROM final
        WHERE products.products_info.product_id = final.product_id;
    END IF;

    -- Return the updated row(s)
    RETURN QUERY
    SELECT * 
    FROM products.products_info
    WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;


    `;

    const query = `UPDATE products.products_info SET variants = $1 WHERE product_id= $2`;

    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    // await pool.query(`DROP FUNCTION update_variants(integer,jsonb)`);
    // First, create the function if not already created
    // await pool.query(update_and_append_function);

    // const { rows, errors } = await pool.query(
    //   "SELECT update_variants($1, $2)",
    //   [product_id, variantsJson]
    // );
    const { rows, errors } = await pool.query(query, [
      variantsJson,
      product_id,
    ]);
    console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    console.error("Error executing query", error.stack);

    return { error: "Failed to update product variants", status: 500 };
  }
};
const updateProductPublishedStatus = async (status, product_id) => {
  // console.log(status, product_id);

  try {
    if (!product_id) {
      throw new Error("No  product to be updated.");
    }

    const query = `UPDATE products.products_info SET published =$1 where product_id=$2 RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows, errors } = await pool.query(query, [status, product_id]);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch product published status", status: 500 };
  }
};

const addProductAttribute = async ({ attribute = "" } = {}) => {
  if (!attribute) throw new Error("No attribute provided");

  try {
    const query = `INSERT INTO products.attributes(name, display_name,published) VALUES ($1,$2, $3) 
      ON CONFLICT (name,display_name) DO NOTHING

       RETURNING *;`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    // console.log(attribute.name, attribute.display_name, attribute.published);
    const { rows, errors } = await pool.query(query, [
      attribute.name,
      attribute.display_name,
      attribute.published,
    ]);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const editProductAttribute = async ({
  attribute = "",
  attribute_id = "",
} = {}) => {
  if (!attribute || !attribute_id) throw new Error("No attribute provided");

  try {
    const query = `UPDATE products.attributes SET
    name = $1, 
    display_name = $2,
    published = $3
    WHERE attribute_id = $4
    RETURNING *;`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    console.log(attribute.name, attribute.display_name, attribute.published);
    const { rows, errors } = await pool.query(query, [
      attribute.name,
      attribute.display_name,
      attribute.published,
      attribute_id,
    ]);
    console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const deleteProductAttribute = async ({ attribute_id_array = null } = {}) => {
  if (!attribute_id_array) throw new Error("No attribute_value provided");
  // Generate placeholders for the IN clause, starting from $2
  const idPlaceholders = attribute_id_array
    .map((_, i) => `$${i + 1}`)
    .join(",");

  try {
    const query = `DELETE FROM products.attributes WHERE attribute_id IN (${idPlaceholders})
       RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const params = [...attribute_id_array];
    console.log(
      ...attribute_id_array,
      idPlaceholders,
      params,
      attribute_id_array
    );

    const { rows, errors } = await pool.query(query, params);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error deleting attribute value : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const addProductAttributeValue = async ({
  attribute_id = "",
  attribute_value = "",
} = {}) => {
  if (!attribute_value || !attribute_id)
    throw new Error("No attribute_value provided");

  try {
    const query = `INSERT INTO products.attribute_values(attribute_id,value,display_name,published) VALUES ($1,$2, $3,$4) 
      ON CONFLICT (attribute_id,value,display_name) DO NOTHING
       RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows, errors } = await pool.query(query, [
      attribute_id,
      attribute_value.name,
      attribute_value.display_name,
      attribute_value.published,
    ]);

    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};

const editProductAttributeValue = async ({
  attribute_id = "",
  attribute_value = "",
} = {}) => {
  if (!attribute_value || !attribute_id)
    throw new Error("No attribute_value provided");

  try {
    const query = `UPDATE products.attribute_values SET
    value =$1,
    display_name = $2,
    published = $3
    WHERE attribute_value_id = $4 AND attribute_id = $5
    RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    console.log(`${path}`);
    const { rows, errors } = await pool.query(query, [
      attribute_value.value,
      attribute_value.display_name,
      attribute_value.published,
      attribute_value.attribute_value_id,
      attribute_id,
    ]);
    // console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};

const deleteProductAttributeValue = async ({
  attribute_id = "",
  attribute_value_id_array = "",
} = {}) => {
  // Generate placeholders for the IN clause, starting from $2
  const idPlaceholders = attribute_value_id_array
    .map((_, i) => `$${i + 2}`)
    .join(",");

  try {
    const query = `DELETE FROM products.attribute_values WHERE attribute_value_id IN (${idPlaceholders}) and attribute_id=$1
       RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const params = [attribute_id, ...attribute_value_id_array];
    // console.log(...attribute_value_array, idPlaceholders, params);

    const { rows, errors } = await pool.query(query, params);
    console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error deleting attribute value : ${error.stack || error.message}`,
      status: 500,
    };
  }
};

// coupons
const editCoupon = async ({
  coupon = "",
  coupon_id = "",
  pathname = "/dashboard/coupons",
} = {}) => {
  if (!coupon || !coupon_id) throw new Error("No coupon provided");

  try {
    const query = `UPDATE products.coupons SET
    campaign_code=$1,
    discount_type=$2,
    coupon_code=$3,
    discount_percentage=$4,
    discount=$5,
    expiration_date=$6,
    minimum_amount=$7,
    start_date=$8,
    published=$9,
    active=$10
    WHERE coupon_id=$11
    RETURNING *;`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    console.log(
      "called, editCoupon",
      new Date(coupon.expiration_date) > new Date(),
      coupon
    );

    const { rows, errors } = await pool.query(query, [
      coupon.campaign_code,
      coupon.discount_type,
      coupon.coupon_code,
      coupon.discount_percentage ? coupon.discount_percentage : 3.5,
      coupon.discount,
      coupon.expiration_date,
      coupon.minimum_amount,
      coupon.start_date,
      coupon.published,
      new Date(coupon.expiration_date) > new Date(),
      coupon_id,
    ]);
    console.log(rows, errors);
    revalidatePath(pathname);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding attribute : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
const deleteProductCoupon = async ({
  coupon_value_id_array = "",
  pathname = "/dashboard/coupons",
} = {}) => {
  // Generate placeholders for the IN clause, starting from $2
  if (!coupon_value_id_array) throw new Error("No attribute_value provided");

  const idPlaceholders = coupon_value_id_array
    .map((_, i) => `$${i + 1}`)
    .join(",");

  try {
    const query = `DELETE FROM products.coupons WHERE coupon_id IN (${idPlaceholders})
       RETURNING *;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const params = [...coupon_value_id_array];

    const { rows, errors } = await pool.query(query, params);
    console.log(rows, errors);
    revalidatePath(pathname);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error deleting coupon : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
// clients
const editClient = async ({
  client = "",
  client_id = "",
  pathname = "/dashboard/customers",
} = {}) => {
  if (!client || !client_id) throw new Error("No client provided");

  try {
    const query = `UPDATE products.clients SET
    name=$2,
    email=$3,
    phone=$4
    WHERE client_id=$1
    RETURNING *;`;
    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    // console.log("called, editclient", client);

    const { rows, errors } = await pool.query(query, [
      client_id,
      client.name,
      client.email,
      client.phone,
    ]);
    console.log(rows, errors);
    revalidatePath(pathname);
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return {
      error: `Error editing client : ${error.stack || error.message}`,
      status: 500,
    };
  }
};

const addClientAddress = async ({ client_id = 1, address = null } = {}) => {
  // console.log(address);
  if (!address) throw new Error("No address provided");
  try {
    const addressCount = `SELECT COUNT(*) FROM products.client_addresses WHERE client_id=$1;
`;
    const query = `INSERT INTO products.client_addresses( 
    client_id, first_name, last_name, phone,email, address,country, city, region,default_address) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`;

    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    await pool.query("BEGIN");

    const { rows } = await pool.query(addressCount, [client_id]);
    const { count } = rows[0];
    let default_address = false;
    if (count == 0) {
      default_address = true;
    } else if (address.default_address) {
      console.log("address default is on ");
      default_address = true;
      await pool.query(
        `UPDATE products.client_addresses SET default_address = false WHERE client_id = $1 AND default_address = true`,
        [client_id]
      );
    }

    // console.log(JSON.parse(count), "count", count, typeof count);
    const results = await pool.query(query, [
      client_id,
      address?.["first_name"],
      address?.["last_name"],
      address?.["phone"],
      address?.["email"],
      address.address,
      address.country,
      address.city,
      address.region,
      default_address,
    ]);

    console.log(count == 0, results.rows);
    await pool.query("COMMIT");
    revalidatePath("/user/checkout");
    return { data: JSON.parse(JSON.stringify(results.rows[0])), status: 200 };

    // return { data: JSON.parse(JSON.stringify(count)), status: 200 };
  } catch (error) {
    await pool.query("ROLLBACK");

    if (error.code === "23505") {
      // Unique violation (e.g., duplicate email)
      console.error("Duplicate entry:", error.detail);
      return {
        error: "Email already exists.",
        status: 400,
      };
    } else {
      return {
        error: `Error adding client address: ${error.stack || error.message}`,
        status: 500,
      };
    }
  }
};

const editClientAddress = async ({
  client_id = 1,
  address = null,
  address_id = 1,
  pathname = "",
} = {}) => {
  console.log(pathname);
  if (!address) throw new Error("No address provided");
  try {
    const query = `UPDATE products.client_addresses SET
    first_name = $3, 
    last_name=$4,
     phone= $5,
     email=$6, 
     address= $7,
     country=$8, 
     city=$9, 
     region=$10
     WHERE   client_id = $1 AND address_id=$2
     RETURNING *;`;

    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    const { rows, errors } = await pool.query(query, [
      client_id,
      address_id,
      address?.["first_name"],
      address?.["last_name"],
      address?.["phone"],
      address?.["email"],
      address.address,
      address.country,
      address.city,
      address.region,
    ]);
    console.log(errors);
    revalidatePath(pathname);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    if (error.code === "23505") {
      // Unique violation (e.g., duplicate email)
      console.error("Duplicate entry:", error.detail);
      return {
        error: "Email already exists.",
        status: 400,
      };
    } else {
      return {
        error: `Error adding client address: ${error.stack || error.message}`,
        status: 500,
      };
    }
  }
};

const confirmOrder = async ({ draftItem = null, total = 2000 } = {}) => {
  if (!draftItem) throw new Error("No item provided");
  const client_id = draftItem?.delivery_address?.client_id;
  const shipping_address =
    draftItem?.delivery_option == "Door delivery"
      ? draftItem?.delivery_address
      : draftItem?.delivery_option;
  const phone = draftItem.delivery_address?.phone;
  const payment_method = draftItem?.payment_method;
  const total_amount = total;
  const action = "pending";

  const cart_items = draftItem.cart_items;

  const valuesSql = cart_items
    .map(
      (item) =>
        `('${item.product_name.replace(/'/g, "''")}', ${item.count}, ${
          item.sale_price
        })`
    )
    .join(",\n");

  console.log(valuesSql);

  try {
    const query = `WITH inserted_order AS (
      INSERT INTO products.clients_orders (
          client_id,
          shipping_address,
          phone,
          payment_method,
          total_amount,
          action
      )
      VALUES (
        $1,$2, $3,$4, $5, $6
      )
      RETURNING order_id
      ),
     inserted_invoice AS (
      INSERT INTO products.invoices (
          user_id,
          status,
          total_amount,
          issued_at,
          due_date,
          order_id
      )
      VALUES (
          $1,                       
          'pending',
          $5,
          NOW(),
          NOW() + INTERVAL '14 days',
          (SELECT order_id FROM inserted_order)
      )
      RETURNING invoice_id
  )
  INSERT INTO products.invoice_items (
      invoice_id, description, quantity, unit_price
  )
  SELECT
      (SELECT invoice_id FROM inserted_invoice),
      description,
      quantity,
      unit_price
  FROM (VALUES
       ${valuesSql}
  ) AS items(description, quantity, unit_price)
   RETURNING *;
   `;

    const isAvailable = await isPoolAvailable();

    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    const { rows, errors } = await pool.query(query, [
      client_id,
      shipping_address,
      phone,
      payment_method,
      total_amount,
      action,
    ]);
    console.log(rows, errors);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return {
      error: `Error adding order : ${error.stack || error.message}`,
      status: 500,
    };
  }
};
export {
  uploadFile,
  deleteFile,
  addProductCategory,
  updateProductCategory,
  deleteCategoryFile,
  updateProductVariants,
  updateProductPublishedStatus,
  addProduct,
  addProductAttribute,
  editProductAttribute,
  deleteProductAttribute,
  addProductAttributeValue,
  editProductAttributeValue,
  deleteProductAttributeValue,
  editCoupon,
  deleteProductCoupon,
  editClient,
  addClientAddress,
  editClientAddress,
  confirmOrder,
};
