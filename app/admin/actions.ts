"use server";

import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password")?.toString();

  if (!process.env.ADMIN_PASSWORD) {
    return {
      success: false,
      message: "Admin password is not configured.",
    };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return {
      success: false,
      message: "Incorrect password.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("nifty_admin", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return {
    success: true,
    message: "Logged in.",
  };
}