"use server";

import { redirect } from "next/navigation";

import { setAdminSessionCookie } from "@/lib/admin-auth";
import {
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/admin-session";

type LoginState = {
  error?: string;
};

export async function loginAdmin(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminAuthConfigured()) {
    return {
      error:
        "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
    };
  }

  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (!verifyAdminPassword(username, password)) {
    return { error: "Invalid admin credentials." };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  const { clearAdminSessionCookie } = await import("@/lib/admin-auth");

  await clearAdminSessionCookie();
  redirect("/admin/login");
}
