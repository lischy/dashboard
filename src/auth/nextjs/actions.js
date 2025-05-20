"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import pool from "@/app/lib/connect";
import { comparePasswords, hashPassword } from "../core/passwordHasher";
import { cookies } from "next/headers";
import {
  createUserSession,
  removeUserFromSession,
  setCookie,
} from "../core/session";
// import { getOAuthClient } from "../core/oauth/base";
import { v4 as uuidv4 } from "uuid";

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

export const signIn = async (previousState, FormData) => {
  //   const { success, data } = signInSchema.safeParse(FormData);

  //   if (!success) return "Unable to log you in";

  try {
    const query = `SELECT client_id, email, password FROM products.clients WHERE email = $1`;

    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    const { rows } = await pool.query(query, [FormData.get("email")]);

    const user = rows[0];
    // console.log(JSON.parse(JSON.stringify(rows)));
    if (!user) {
      return "Unable to log you in";
    }
    // console.log(user.password, FormData.get("password"));

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: FormData.get("password"),
    });

    if (!isCorrectPassword) return "Unable to log you in";
    const sessionId = uuidv4();
    const sessionData = {
      user_id: user.client_id,
      email: user.email,
    };

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const cookieId = await pool.query(
      "INSERT INTO products.sessions (session_id, user_id, data, expires_at) VALUES ($1, $2, $3, $4) RETURNING * ",
      [sessionId, user.client_id, sessionData, expiresAt]
    );
    // console.log(cookieId.rows);

    if (cookieId.rows.length > 0) {
      setCookie(sessionId, await cookies());
    }
  } catch (error) {
    // console.log(error);
    return { error: "Failed to fetch products", status: 500 };
  }
  redirect("/user");
};

export async function signUp(previousState, FormData) {
  //   const { success, data } = signUpSchema.safeParse(FormData);

  //   if (!success) return "Unable to create account";
  console.log(FormData.get("email"));

  try {
    const query = `SELECT client_id FROM products.clients WHERE email = $1`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    const { rows } = await pool.query(query, [FormData.get("email")]);
    console.log(rows.length > 0);
    if (rows.length > 0) {
      return { error: "Email already registered", status: 400 };
    }
    const hashedPassword = await hashPassword({
      password: FormData.get("password"),
    });

    const result = await pool.query(
      "INSERT INTO products.clients (name,email,phone,password) VALUES ($1, $2,$3,$4) RETURNING *",
      [
        FormData.get("name"),
        FormData.get("email"),
        FormData.get("phone"),
        hashedPassword,
      ]
    );

    if (result.rows.length == 0) return "Unable to create account";

    console.log(result.rows);

    // Create session
    const sessionId = uuidv4();
    const sessionData = {
      user_id: result.rows[0].client_id,
      email: result.rows[0].email,
    };

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const cookieId = await pool.query(
      "INSERT INTO products.sessions (session_id, user_id, data, expires_at) VALUES ($1, $2, $3, $4) RETURNING * ",
      [sessionId, result.rows[0].client_id, sessionData, expiresAt]
    );
    console.log(cookieId.rows);
    if (cookieId.rows.length > 0) {
      setCookie(sessionId, await cookies());
    }

    // Set cookie (optional: HTTP-only cookie or token in response)
    //  res.setHeader("Set-Cookie", `session=${sessionId}; HttpOnly; Path=/; Max-Age=86400`);

    // return { status: 200, sessionId: sessionId };
  } catch (err) {
    console.error(err);
    return { error: "Signup failed", status: 500 };
  }
  redirect("/user");
}

export async function logOut() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  try {
    const query = `WITH deleted AS (DELETE FROM products.sessions WHERE session_id = $1 RETURNING *)
    SELECT count(*) FROM deleted`;
    const isAvailable = await isPoolAvailable();
    if (!isAvailable) {
      throw new Error("Database connection is not available");
    }

    const { rows } = await pool.query(query, [sessionId]);
    console.log(sessionId, rows[0].count != 0, rows[0].count);
    if (rows[0].count != 0) {
      console.log("called");
      await cookieStore.delete(COOKIE_SESSION_KEY);
    }
  } catch (error) {
    console.log(error);
    return { error: "Logout failed", status: 500 };
  }
  redirect("/sign-in");
}

// export async function oAuthSignIn(provider) {
//   const oAuthClient = getOAuthClient(provider);
//   redirect(oAuthClient.createAuthUrl(await cookies()));
// }
