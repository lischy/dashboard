import { headers, cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import pool from "@/app/lib/connect";

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
const COOKIE_SESSION_KEY = "session-id";

const _getCurrentUser = async ({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) => {
  const cookieStore = await cookies();
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") || headersList.get("referer") || "";
  const pathname = new URL(fullUrl, "http://localhost").pathname; // Fallback origin

  console.log(fullUrl, pathname, headersList.get("x-url"));

  const session_id = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (session_id == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  try {
    const query = `select * from  products.sessions WHERE session_id=$1`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    if (withFullUser) {
      const { rows } = await pool.query(query, [session_id]);
      const fullUser = rows[0];

      // This should never happen
      if (fullUser == null) throw new Error("User not found in database");
      return fullUser;
    }
  } catch (error) {
    return { error: "Failed to fetch user", status: 500 };
  }
};

export const getCurrentUser = cache(_getCurrentUser);
