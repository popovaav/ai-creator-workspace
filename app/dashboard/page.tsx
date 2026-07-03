import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-120">
        <CardHeader className="px-6 pt-6 pb-5">
          <CardTitle className="text-[22px] font-semibold tracking-[-0.02em] text-foreground">
            Dashboard
          </CardTitle>
          <CardDescription className="mt-0.5 text-[13.5px] leading-snug">
            Signed in as {user!.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pt-2 pb-6">
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-10 w-full text-[13.5px] font-medium tracking-[-0.01em]"
            >
              Log out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
