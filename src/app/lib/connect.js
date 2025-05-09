import { Pool } from "pg";

let pool;
try {
  pool = new Pool({
    user: "doadmin", // Your PostgreSQL username
    host: "localhost", // Database host (localhost for local PostgreSQL)
    database: "my_db", // The database you created
    password: "schy$$dev", // Your PostgreSQL password
    port: 5432, // PostgreSQL default port
  });
} catch (error) {
  console.error("Failed to connect to the database:", error);
  throw error;
}

export default pool;
