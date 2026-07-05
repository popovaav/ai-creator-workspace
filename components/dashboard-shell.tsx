"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, Users } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
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
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-border bg-card lg:flex lg:flex-col">
        <div className="flex h-12 items-center border-b border-border px-5">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[-0.01em]"
          >
            AI Creator Workspace
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-px px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-border",
                  isActive
                    ? "bg-muted text-foreground"
                    : "font-normal"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-10 flex h-12 items-center border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <div className="min-w-0 flex-1 lg:hidden">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              AI Creator Workspace
            </p>
            <h1 className="truncate text-sm font-semibold tracking-tight">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:ml-auto">
            <span className="hidden max-w-60 truncate text-sm text-muted-foreground sm:block">
              {user.email ?? "Signed in"}
            </span>
            <div className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <div className="border-b border-border bg-card lg:hidden">
          <nav className="flex gap-0.5 overflow-x-auto px-4 py-1.5 sm:px-6">
            {navItems.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-8 shrink-0 items-center rounded-md px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-1 focus-visible:ring-border",
                    isActive
                      ? "bg-muted text-foreground"
                      : "font-normal"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="min-h-[calc(100vh-3rem)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
