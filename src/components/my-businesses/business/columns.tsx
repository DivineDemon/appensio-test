import { type ColumnDef } from "@tanstack/react-table";
import { ArrowSwapVertical } from "iconsax-react";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button type="button" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Agent Name
        <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue<string | null>("name");
      return <span>{value ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "industry",
    header: "Agent Type/Industry",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("industry");
      return (
        <span className="rounded-lg border-2 border-[#E4E4E7] px-4 py-1.5 font-semibold text-[#71717A] text-[14px] leading-[14px]">
          {value ?? "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "contact_number",
    header: "Contact Number",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("contact_number");
      return <span>{value ?? "N/A"}</span>;
    },
  },
  // {
  //   accessorKey: "twilio",
  //   header: "Twilio Number",
  //   cell: ({ row }) => {
  //     const value = row.getValue<string | null>("twilio");
  //     return <span>{value ?? "N/A"}</span>;
  //   },
  // },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("country");
      return <span>{value ?? "N/A"}</span>;
    },
  },
];
