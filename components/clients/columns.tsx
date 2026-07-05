"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { Client } from "@/types/client";

function OptionalValue({ value }: { value: string | null }) {
  if (!value) {
    return <span className="select-none text-muted-foreground/35">—</span>;
  }

  return (
    <span className="block truncate text-muted-foreground" title={value}>
      {value}
    </span>
  );
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: {
      className: "w-[22%]",
    },
    cell: ({ row }) => (
      <span
        className="block truncate font-medium text-foreground"
        title={row.original.name ?? "Unnamed client"}
      >
        {row.original.name ?? "Unnamed client"}
      </span>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    meta: {
      className: "w-[20%]",
    },
    cell: ({ row }) => <OptionalValue value={row.original.company} />,
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: {
      className: "w-[36%]",
    },
    cell: ({ row }) => <OptionalValue value={row.original.email} />,
  },
  {
    accessorKey: "country",
    header: "Country",
    meta: {
      className: "w-[22%]",
    },
    cell: ({ row }) => <OptionalValue value={row.original.country} />,
  },
];
