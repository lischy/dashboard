import { headers, cookies } from "next/headers";

export const setRedirectTo = async ({ path = "/" } = {}) => {
  const cookieStore = await cookies();
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") || headersList.get("referer") || "";
  const pathname = new URL(fullUrl, "http://localhost").pathname; // Fallback origin

  console.log(fullUrl, pathname);
  cookieStore.set("redirectTo", pathname, {
    path: "/",
    httpOnly: true,
  });
};
