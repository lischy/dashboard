import { Pool } from "pg";

let pool;
try {
  pool = new Pool({
    user: "doadmin", // Your PostgreSQL username
    host: "127.0.0.1", // Database host (localhost for local PostgreSQL) or Docker service name for container
    database: "my_db", // The database you created
    password: "schy$$dev", // Your PostgreSQL password
    port: 5432, // PostgreSQL default port
  });
} catch (error) {
  console.error("Failed to connect to the database:", error);
  throw error;
}

export default pool;
