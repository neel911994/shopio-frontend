"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";

interface LoginState {
  error: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  let token: string;

  try {
    const response = await authService.login({ email, password });
    console.log("Login response:", response);
    token = response.token;
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Invalid email or password.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}