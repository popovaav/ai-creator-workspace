"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, Users } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
];

function getCurrentPageTitle(pathname: string) {
  return (
    navItems.find((item) => isActiveRoute(pathname, item.href))?.title ??
    "Workspace"
  );
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const pathname = usePathname();
  const pageTitle = getCurrentPageTitle(pathname);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[-0.01em]"
          >
            AI Creator Workspace
          </Link>
        </div>

        <Separator />

        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground lg:hidden">
              AI Creator Workspace
            </p>
            <h1 className="truncate text-xl font-semibold tracking-[-0.02em]">
              {pageTitle}
            </h1>
          </div>

          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden max-w-60 truncate text-sm text-muted-foreground sm:block">
              {user.email ?? "Signed in"}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <div className="border-b border-border bg-card lg:hidden">
          <nav className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-8 shrink-0 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    isActive && "bg-muted text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
