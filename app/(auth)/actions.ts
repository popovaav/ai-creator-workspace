"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signInSchema,
  signUpSchema,
  type SignInValues,
  type SignUpValues,
} from "@/lib/validations/auth";

export type ActionResult = { error: string } | undefined;

// Error codes are set when the Supabase server responds with
// X-Supabase-Api-Version >= 2024-01-01 (all current Supabase Cloud projects).
const ERRORS_BY_CODE: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_not_confirmed: "Please confirm your email before signing in.",
  user_already_exists: "An account with this email already exists.",
  weak_password: "Password is too weak. Please choose a stronger password.",
  over_email_send_rate_limit: "Too many attempts. Please try again later.",
  over_request_rate_limit: "Too many requests. Please slow down.",
  signup_disabled: "Account registration is currently disabled.",
  email_address_invalid: "Please enter a valid email address.",
  email_address_not_authorized:
    "This email address is not authorized to sign up.",
};

// Fallback for older / self-hosted GoTrue instances that don't include a code.
const ERRORS_BY_MESSAGE: Record<string, string> = {
  "Invalid login credentials": "Incorrect email or password.",
  "Email not confirmed": "Please confirm your email before signing in.",
  "User already registered": "An account with this email already exists.",
  "Password should be at least 6 characters":
    "Password must be at least 6 characters.",
  "email rate limit exceeded": "Too many attempts. Please try again later.",
  "signup is disabled": "Account registration is currently disabled.",
};

function friendlyError(error: { code?: string; message: string }): string {
  return (
    (error.code && ERRORS_BY_CODE[error.code]) ??
    ERRORS_BY_MESSAGE[error.message] ??
    "Something went wrong. Please try again."
  );
}

export async function signIn(values: SignInValues): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid email or password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: friendlyError(error) };
  }

  redirect("/");
}

export async function signUp(values: SignUpValues): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: friendlyError(error) };
  }

  // Email confirmation is enabled — redirect to dedicated page instead of
  // surfacing an inline message that competes with the form.
  if (!data.session) {
    redirect(
      `/verify-email?email=${encodeURIComponent(parsed.data.email)}`
    );
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}
