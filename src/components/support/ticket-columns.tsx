import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowDown2, ArrowSwapVertical, Briefcase, More, Trash } from "iconsax-react";
import { useState } from "react";
import { toast } from "sonner";

import { cn, truncateString } from "@/lib/utils";
import { useDeleteTicketMutation } from "@/store/services/ticket";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WarningModal from "../warning-modal";
import DetailSheet from "./detail-sheet";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "business_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Agent Name
          <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("business_name")}</span>;
    },
  },
  {
    accessorKey: "industry",
    header: "Agent Type/Industry",
    cell: ({ row }) => {
      return (
        <span className="rounded-lg border-2 border-[#E4E4E7] px-4 py-1.5 font-semibold text-[#71717A] text-[14px] leading-[14px]">
          {row.getValue("industry")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" type="button">
            Status
            <ArrowDown2 size={16} color="#71717A" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[
            { value: "open", label: "Open" },
            { value: "in progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
          ].map(({ value, label }) => (
            <DropdownMenuItem
              key={value}
              onSelect={() => column.setFilterValue(value)}
              className={column.getFilterValue() === value ? "font-semibold" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => column.setFilterValue(undefined)} className="text-red-500">
            Clear Filter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const raw = row.getValue<string>("status");
      const label = {
        open: "Open",
        "in progress": "In Progress",
        resolved: "Resolved",
      }[raw]!;
      return (
        <div
          className={cn(
            "w-32 rounded-lg border-2 px-4 py-1.5 text-center font-semibold text-[14px] capitalize leading-[14px]",
            {
              "border-[#EC5F5F] text-[#EC5F5F]": raw === "open",
              "border-[#CF8000] text-[#CF8000]": raw === "in progress",
              "border-[#007E35] text-[#007E35]": raw === "resolved",
            },
          )}
        >
          {label}
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      filterFn: "equals",
    },
  },
  {
    accessorKey: "problem",
    header: "Problem",
    cell: ({ row }) => <span>{truncateString(row.original.problem, 35)}</span>,
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => <span>{dayjs(row.original.created_at).format("DD MMM, YYYY")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState<boolean>(false);
      const [view, setView] = useState<boolean>(false);
      const [selected, setSelected] = useState<string>("");
      const [deleteTicket, { isLoading }] = useDeleteTicketMutation();

      const handleDelete = async () => {
        const response = await deleteTicket(selected);

        if (response.data) {
          toast.success("Ticket Deleted Successfully!");
          setOpen(false);
        } else {
          toast.error("Failed to Delete Ticket!");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" type="button">
                <More size={16} color="#71717A" className="rotate-90 fill-[#71717A]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected(row.original.ticket_id);
                    setOpen(true);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5"
                >
                  <Trash color="#000000" size={12} />
                  <span className="flex-1 text-left font-medium text-black text-sm">Delete</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected(row.original.ticket_id);
                    setView(true);
                  }}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Briefcase color="#000000" size={12} />
                  <span className="flex-1 text-left font-medium text-black text-sm">View Details</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <WarningModal
            open={open}
            title="Are you Sure?"
            text={
              <span>
                This action is irreversible, please
                <br />
                make sure before confirming.
              </span>
            }
            setOpen={setOpen}
            cta={handleDelete}
            isLoading={isLoading}
          />
          <DetailSheet open={view} setOpen={setView} id={selected} />
        </>
      );
    },
  },
];
