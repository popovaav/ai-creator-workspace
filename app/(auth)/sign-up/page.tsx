"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthFormField } from "@/components/auth/form-field";
import { signUpSchema, type SignUpValues } from "@/lib/validations/auth";
import { signUp } from "@/app/(auth)/actions";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  async function onSubmit(values: SignUpValues) {
    const result = await signUp(values);
    if (result?.error) {
      setError("root", { message: result.error });
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="px-6 pt-6 pb-5">
          <CardTitle className="text-[22px] font-semibold tracking-[-0.02em] text-foreground">
            Create an account
          </CardTitle>
          <CardDescription className="mt-0.5 text-[13.5px] leading-snug">
            Your AI creative workspace starts here.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pt-2 pb-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <AuthFormField
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <AuthFormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <AuthFormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {errors.root && (
              <p role="alert" className="text-[13px] text-destructive">
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-2 h-10 w-full text-[13.5px] font-medium tracking-[-0.01em]"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-[13px] text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground transition-opacity hover:opacity-70"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
