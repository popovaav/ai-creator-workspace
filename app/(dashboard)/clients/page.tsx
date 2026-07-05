import { Plus, Users } from "lucide-react";

import { ClientsTable } from "@/components/clients/clients-table";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/client";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name, company, email, country")
    .order("created_at", { ascending: false })
    .returns<Client[]>();

  if (error) {
    return (
      <div className="max-w-3xl rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <h2 className="text-sm font-medium text-foreground">
          Unable to load clients
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  const isEmpty = !clients?.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Clients</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage your clients
          </p>
        </div>
        <Button className="h-9.5 px-4">
          <Plus className="mr-1.5 size-4" />
          New Client
        </Button>
      </div>

      {isEmpty ? (
        <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-card px-6 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Users className="size-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              No clients yet
            </p>
            <p className="text-sm text-muted-foreground">
              Add your first client to get started.
            </p>
          </div>
          <Button variant="outline" className="h-9.5 px-4">
            <Plus className="mr-1.5 size-4" />
            New Client
          </Button>
        </div>
      ) : (
        <ClientsTable data={clients} />
      )}
    </div>
  );
}
