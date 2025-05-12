import { cookies } from "next/headers";
import { getUserFromSession } from "../core/session";
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

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const session_id = await getUserFromSession(await cookies());

  if (session_id == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  if (withFullUser) {
    try {
      const query = `select * from  products.sessions WHERE session_id=$1`;
      const isAvailable = await isPoolAvailable();
      if (!isAvailable) {
        throw new Error("Database connection is not available");
      }
      const { rows } = await pool.query(query, [session_id]);
      const fullUser = rows[0];
      if (fullUser == null) throw new Error("User not found in database");
      return fullUser;
    } catch (error) {
      return { error: "Failed to fetch user", status: 500 };
    }
  }
}

export const getCurrentUser = cache(_getCurrentUser);
