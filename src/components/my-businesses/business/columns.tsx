import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowRight, ArrowSwapVertical, Briefcase, ChartCircle, More } from "iconsax-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMoveToBusinessMutation } from "@/store/services/business";

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
  {
    accessorKey: "twilio",
    header: "Twilio Number",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("twilio");
      return <span>{value ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Agent Status",
    cell: () => <span>Agent Created</span>,
  },
  {
    accessorKey: "created_at",
    header: "Start Date",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("created_at");
      return <span>{dayjs(value).format("DD MMM YYYY") ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Completion Date",
    cell: ({ row }) => {
      const value = row.getValue<string | null>("updated_at");
      return <span>{dayjs(value).format("DD MMM YYYY") ?? "N/A"}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [move, { isLoading }] = useMoveToBusinessMutation();

      const handleMove = async () => {
        const response = await move(row.original.id);

        if (response.data) {
          toast.success("Switched Business Successfully!");
        } else {
          toast.error("Failed to Switch Business!");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {isLoading ? (
                <ChartCircle size={16} color="#0B33A4" className="animate-spin" />
              ) : (
                <More size={16} color="#71717A" className="rotate-90 fill-[#71717A]" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                to={`/my-agents/${row.original.id}/${row.original.assistant_id}`}
                className="flex w-full items-center justify-center gap-2.5"
              >
                <Briefcase color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">View Agent</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleMove} className="flex w-full items-center justify-center gap-2.5">
                <ArrowRight color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">Move to Business</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
