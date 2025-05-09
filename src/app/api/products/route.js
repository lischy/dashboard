import pool from "../../lib/connect";

async function fetchProducts(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM products.products_info"); // Query example
    // res.status(200).json(rows); // Send the results as a JSON response
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    // res.status(500).json({ error: "Failed to fetch users" });
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  } finally {
    // Close the pool connection (this is important for long-running connections, not always needed in serverless)
    await pool.end();
  }
}

// Handle GET request
export async function GET(req) {
  return fetchProducts();
}
