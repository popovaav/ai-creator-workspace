import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 text-primary"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <CardTitle className="text-[22px] font-semibold tracking-[-0.02em] text-foreground">
            Check your inbox
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pt-0 pb-6">
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">
            We sent a confirmation link to{" "}
            {email ? (
              <span className="font-medium text-foreground">{email}</span>
            ) : (
              "your email address"
            )}
            . Click the link to activate your account and sign in.
          </p>

          <p className="mt-3 text-[12.5px] text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <Link
              href="/sign-up"
              className="font-medium text-foreground transition-opacity hover:opacity-70"
            >
              try again
            </Link>
            .
          </p>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-6 h-10 w-full text-[13.5px] font-medium tracking-[-0.01em]"
          >
            <Link href="/sign-in">Back to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
