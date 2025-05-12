"use server";
import { products } from "../../../products";
import { categories } from "../../../categories";
import { attributes } from "../../../attributes";
import { coupons } from "../../../coupons";
import { orders } from "../../../orders";
import pool from "@/app/lib/connect";

// Function to check if pool is available
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

const fetchProducts = async ({
  search = "test",
  page_number = 1,
  page_size = 5,
} = {}) => {
  // we need to pass page to use on OFFSET (OFFSET (page_number - 1) * page_size;)
  // Where:page_number is the page the user is requesting (1, 2, 3, ...).
  // page_size is the number of items to be displayed per page (e.g., 10).

  // SELECT CEIL(COUNT(*) / 10.0) AS total_pages FROM your_table;
  // This will give you the total number of pages based on a page size of 10.

  // console.log(search, page_number);

  try {
    // "SELECT * FROM products.products_info ORDER BY product_id LIMIT 10 OFFSET 20"

    const statement = `SELECT * FROM products.products_info ORDER BY product_id LIMIT $1 OFFSET $2;`;
    const query = `
    WITH paginated_results AS (
      SELECT * 
      FROM products.products_info
      ORDER BY product_id
      LIMIT $1 OFFSET $2 
    )
   SELECT *, 
          (SELECT CEIL(COUNT(*) / $1) FROM products.products_info) AS total_pages
   FROM paginated_results;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [
      page_size,
      (page_number - 1) * page_size,
    ]);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (err) {
    // res.status(500).json({ error: "Failed to fetch users" });
    return { error: "Failed to fetch products", status: 500 };
  }
  // finally {
  //   // Close the pool connection (this is important for long-running connections, not always needed in serverless)
  //   await pool.end();
  // }
};

const fetchProductById = async ({ product_id = 1 } = {}) => {
  try {
    const query = `SELECT * FROM products.products_info WHERE product_id=$1`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [product_id]);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch product", status: 500 };
  }
};

// const fetchtCoupons = async () => {
//   console.log("called, fetchtCoupons on revalidate ");
//   return coupons;
// };
// const fetchtOrders = async () => {
//   return orders;
// };
// const fetchtAtributeById = async (id) => {
//   // console.log(attributes.find((a) => a.ID == id));
//   const attribute = attributes
//     .find((a) => a.ID == id)
//     .VALUES.filter((val) => {
//       return val.ID == id;
//     });
//   // console.log(attribute);
//   // const values = attribute ? attribute.VALUES.filter((a) => a.ID == id) : [];
//   // return values;
// };

// const fetchtAtributeValueById = async (attributeId, valueId) => {
//   // console.log(attributeId, ValueId);
//   const value = attributes
//     .find((a) => a.ID == attributeId)
//     .VALUES.filter((val) => {
//       return val.ID == valueId;
//     });
//   return value;
// };

const fetchtProductVariants = async ({ product_id = null } = {}) => {
  // console.log(product_id);
  try {
    if (!product_id) {
      throw new Error("No  product to be updated.");
    }
    const query = `SELECT variants FROM products.products_info WHERE product_id=$1`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [product_id]);
    // console.log(rows[0].variants);
    return { data: JSON.parse(JSON.stringify(rows[0].variants)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch product variants", status: 500 };
  }
};
const fetchtProductImages = async ({ product_id = null } = {}) => {
  // console.log(product_id);
  try {
    if (!product_id) {
      throw new Error("No  product to be updated.");
    }
    const query = `SELECT product_images FROM products.products_info WHERE product_id=$1`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [product_id]);
    // console.log(rows[0].product_images);
    return {
      data: JSON.parse(JSON.stringify(rows[0].product_images)),
      status: 200,
    };
  } catch (error) {
    return { error: "Failed to fetch product variants", status: 500 };
  }
};

// cateories
const fetchCategories = async () => {
  try {
    const query = `SELECT *  FROM products.categories; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};
const fetchCategoryById = async ({ category_Id = null } = {}) => {
  console.log(category_Id);
  try {
    if (!category_Id) {
      throw new Error("No  category to be fetched.");
    }

    const query = `SELECT *  FROM products.categories where category_id=$1;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [category_Id]);
    console.log(rows[0]);
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch category", status: 500 };
  }
};

// Attributes
const fetchtAtributes = async () => {
  try {
    const query = `SELECT *  FROM products.attributes ORDER BY attribute_id; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};
const fetchtAtributeById = async ({ attribute_id = null } = {}) => {
  console.log(attribute_id);
  if (!attribute_id) {
    throw new Error("No  attribute to be fetched.");
  }
  try {
    const query = `SELECT *  FROM products.attributes WHERE attribute_id=$1; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [attribute_id]);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};

const fetchtAtributeValuesById = async (attribute_id) => {
  try {
    if (!attribute_id) {
      throw new Error("No  category to be fetched.");
    }

    const query = `SELECT *  FROM products.attribute_values where attribute_id=$1;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [attribute_id]);
    console.log(rows);
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch category", status: 500 };
  }
};
const fetchtAtributeValueById = async ({ valueId = null } = {}) => {
  console.log(valueId);
  try {
    if (!valueId) {
      throw new Error("No  category to be fetched.");
    }

    const query = `SELECT *  FROM products.attribute_values where attribute_value_id=$1;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [valueId]);
    console.log(rows);
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch category", status: 500 };
  }
};

//coupons
const fetchtCoupons = async () => {
  try {
    const query = `SELECT *  FROM products.coupons ORDER BY coupon_id; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};
const fetchtCouponById = async ({ coupon_Id = "" } = {}) => {
  try {
    const query = `SELECT *  FROM products.coupons WHERE coupon_id =$1;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [coupon_Id]);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};

// clients
const fetchClients = async () => {
  try {
    const query = `SELECT *  FROM products.clients ORDER BY client_id; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch clients", status: 500 };
  }
};
const fetchClientById = async ({ client_id }) => {
  if (!client_id) throw new Error("No client id provided");

  try {
    const query = `SELECT *  FROM products.clients WHERE client_id =$1; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [client_id]);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch client", status: 500 };
  }
};
const fetchClientOrders = async ({ client_id = "" } = {}) => {
  if (!client_id) throw new Error("No client id provided");

  try {
    const query = `SELECT *  FROM products.clients_orders WHERE client_id =$1;`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    // console.log(client_id);
    const { rows } = await pool.query(query, [client_id]);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to categories products", status: 500 };
  }
};

const fetchClientDefaultAddress = async ({ client_id = null } = {}) => {
  if (!client_id) throw new Error("No client id provided");

  try {
    const query = `SELECT *  FROM products.client_addresses WHERE client_id =$1 AND default_address=true; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [client_id]);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch client", status: 500 };
  }
};
const fetchClientAddresses = async ({ client_id = null } = {}) => {
  if (!client_id) throw new Error("No client id provided");

  try {
    const query = `SELECT *  FROM products.client_addresses WHERE client_id =$1; `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [client_id]);
    // console.log(
    //   JSON.parse(JSON.stringify(rows)),
    //   "Called fetchClientAddresses"
    // );
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch client", status: 500 };
  }
};

// fetch orders

const fetchOrders = async () => {
  try {
    const query = `SELECT 
    co.order_id,
    co.client_id,
    co.order_date,
    co.shipping_address,
    co.payment_method,
    co.total_amount,
    co.status,
    co.action,
    co.created_at,
    co.updated_at,
    c.name AS client_name,
    c.email AS client_email,
    c.phone AS client_phone,
    i.invoice_id
FROM 
    products.clients_orders co
JOIN 
    products.clients c
    ON co.client_id = c.client_id
LEFT JOIN 
    products.invoices i
    ON co.order_id = i.order_id;
 `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch orders", status: 500 };
  }
};

const fetchOrdersByClientId = async ({ client_id = 1 } = {}) => {
  if (!client_id) throw new Error("No client id provided");
  try {
    const query = `SELECT 
    co.order_id,
    co.client_id,
    co.order_date,
    co.shipping_address,
    co.payment_method,
    co.total_amount,
    co.status,
    co.action,
    co.created_at,
    co.updated_at,
    c.name AS client_name,
    c.email AS client_email,
    c.phone AS client_phone,
    i.invoice_id
FROM 
    products.clients_orders co
JOIN 
    products.clients c
    ON co.client_id = c.client_id
LEFT JOIN 
    products.invoices i
    ON co.order_id = i.order_id
WHERE 
    co.client_id = $1;
 `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [client_id]);
    // console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch orders", status: 500 };
  }
};

const fetchInvoiceItems = async ({ invoice_id = "" } = {}) => {
  if (!invoice_id) throw new Error("No invoice id provided");
  try {
    //     const query = `
    //     SELECT
    //     i.invoice_id,
    //     i.user_id,
    //     i.status,
    //     i.total_amount,
    //     i.issued_at,
    //     i.due_date,
    //     i.order_id,
    //     array_agg(
    //         jsonb_build_object(
    //             'id', ii.id,
    //             'description', ii.description,
    //             'quantity', ii.quantity,
    //             'unit_price', ii.unit_price,
    //             'total_price', ii.total_price
    //         )
    //     ) AS invoice_items
    // FROM
    //     products.invoices i
    // JOIN
    //     products.invoice_items ii
    //     ON i.invoice_id = ii.invoice_id
    // WHERE
    //     i.invoice_id = $1
    // GROUP BY
    //     i.invoice_id;

    //     `;
    // const query = `
    //   SELECT
    //       i.invoice_id,
    //       i.user_id,
    //       i.status,
    //       i.total_amount,
    //       i.issued_at,
    //       i.due_date,
    //       i.order_id,
    //       array_agg(
    //       DISTINCT jsonb_build_object(
    //           'name',c.name,
    //           'email',c.email,
    //           'phone',c.phone
    //         )
    //       ) AS client_details,
    //       array_agg(
    //           jsonb_build_object(
    //               'id', ii.id,
    //               'description', ii.description,
    //               'quantity', ii.quantity,
    //               'unit_price', ii.unit_price,
    //               'total_price', ii.total_price
    //           )
    //       ) AS invoice_items
    //   FROM
    //       products.invoices i
    //   JOIN
    //       products.invoice_items ii
    //       ON i.invoice_id = ii.invoice_id
    //   JOIN
    //     products.clients c
    //     ON i.user_id = c.client_id
    //   WHERE
    //       i.invoice_id = $1
    //   GROUP BY
    //       i.invoice_id;
    //  `;
    const query = `
     WITH client_info AS (
    SELECT 
        client_id,
        jsonb_build_object(
            'name', name,
            'email', email,
            'phone', phone
        ) AS client_details
    FROM products.clients
),
invoice_items_agg AS (
    SELECT 
        invoice_id,
        jsonb_agg(
            jsonb_build_object(
                'id', id,
                'description', description,
                'quantity', quantity,
                'unit_price', unit_price,
                'total_price', total_price
            )
        ) AS invoice_items
    FROM products.invoice_items
    GROUP BY invoice_id
),
order_shipping_details AS(
select 
     order_id,
json_build_object(
    'shipping_address',shipping_address,
    'payment_method',payment_method
    ) as shipping_payment_details
    from products.clients_orders
 )
SELECT 
    i.invoice_id,
    i.user_id,
    i.status,
    i.total_amount,
    i.issued_at,
    i.due_date,
    i.order_id,
    ci.client_details,
    COALESCE(ii.invoice_items, '[]'::jsonb) AS invoice_items,
    osd.shipping_payment_details
FROM 
    products.invoices i
JOIN client_info ci 
    ON i.user_id = ci.client_id
LEFT JOIN invoice_items_agg ii 
    ON i.invoice_id = ii.invoice_id
LEFT JOIN order_shipping_details osd
    ON i.order_id = osd.order_id
WHERE 
    i.invoice_id = $1;

     `;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [invoice_id]);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows[0])), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch clients", status: 500 };
  }
};

const fetchClientOrdersCount = async ({ client_id = null } = {}) => {
  if (!client_id) throw new Error("No client id provided");

  try {
    const query = `SELECT 
    client_id,
    LOWER(status) AS normalized_status,
    COUNT(*) AS total_orders
FROM 
    products.clients_orders
WHERE 
    LOWER(status) IN ('delivered', 'pending', 'shipped', 'cancelled') AND client_id = $1
GROUP BY 
    client_id, LOWER(status)
ORDER BY 
    client_id, normalized_status;`;

    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }
    const { rows } = await pool.query(query, [client_id]);
    console.log(JSON.parse(JSON.stringify(rows)));
    return { data: JSON.parse(JSON.stringify(rows)), status: 200 };
  } catch (error) {
    return { error: "Failed to fetch orders", status: 500 };
  }
};
export {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchtAtributes,
  fetchtCoupons,
  fetchOrders,
  fetchtAtributeValuesById,
  fetchtAtributeById,
  fetchtAtributeValueById,
  fetchtProductVariants,
  fetchtProductImages,
  fetchCategoryById,
  fetchtCouponById,
  fetchClients,
  fetchClientOrders,
  fetchOrdersByClientId,
  fetchClientById,
  fetchClientDefaultAddress,
  fetchClientAddresses,
  fetchInvoiceItems,
  fetchClientOrdersCount,
};
