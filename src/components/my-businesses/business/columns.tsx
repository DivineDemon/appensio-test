import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowDown2, ArrowRight, ArrowSwapVertical, Box2, Briefcase, ChartCircle, More } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMoveToBusinessMutation, useStartTestingMutation } from "@/store/services/business";

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
    accessorKey: "dev_agent_status",
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
            { value: "TESTING_IN_PROGRESS", label: "Testing in Progress" },
            { value: "READY_FOR_TESTING", label: "Ready for Testing" },
            { value: "REVISION_REQUEST", label: "Revision Request" },
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
      const raw = row.getValue<string>("dev_agent_status");

      return (
        <div
          className={cn(
            "w-fit rounded-md border px-4 py-1.5 text-center font-medium text-[14px] text-muted-foreground capitalize leading-[14px]",
            {
              "border-red-500": raw === "AGENT_CREATED",
              "border-yellow-500": raw === "TESTING_IN_PROGRESS",
              "border-blue-500": raw === "READY_FOR_TESTING",
              "border-purple-500": raw === "REVISION_REQUEST",
              "border-green-500": raw === "DONE",
            },
          )}
        >
          {raw === "AGENT_CREATED"
            ? "Agent Created"
            : raw === "TESTING_IN_PROGRESS"
              ? "Testing in Progress"
              : raw === "READY_FOR_TESTING"
                ? "Ready for Testing"
                : raw === "REVISION_REQUEST"
                  ? "Revision Request"
                  : raw === "DONE"
                    ? "Move to Business"
                    : "N/A"}
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      filterFn: "equals",
    },
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
      const navigate = useNavigate();
      const [move, { isLoading }] = useStartTestingMutation();
      const [done, { isLoading: isCompleting }] = useMoveToBusinessMutation();

      const handleMove = async () => {
        const response = await move(row.original.id);

        if (response.data) {
          toast.success("Started Testing Successfully!");
        } else {
          toast.error("Failed to Start Testing!");
        }
      };

      const handleComplete = async () => {
        if (row.original.dev_agent_status !== "TESTING_IN_PROGRESS") {
          toast.error("Agent Testing must be in Progress to move to Business.");
          return;
        }

        const response = await done({
          status: "DONE",
          business_id: row.original.id,
          owner_email: row.original.owner_email,
        });

        if (response.data) {
          toast.success("Testing Completed Successfully!");
        } else {
          toast.error("Failed to Completed Testing!");
        }
      };

      const handleRevision = async () => {
        if (row.original.dev_agent_status !== "TESTING_IN_PROGRESS") {
          toast.error("Agent Testing must be in Progress to request revision.");
          return;
        }

        const response = await done({
          status: "REVISION_REQUEST",
          business_id: row.original.id,
          owner_email: row.original.owner_email,
        });

        if (response.data) {
          toast.success("Requested Revision Successfully!");
        } else {
          toast.error("Failed to Request Revision!");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {isLoading || isCompleting ? (
                <ChartCircle size={16} color="#0B33A4" className="animate-spin" />
              ) : (
                <More size={16} color="#71717A" className="rotate-90 fill-[#71717A]" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <div
                onClick={() => {
                  if (row.original.dev_agent_status === "READY_FOR_TESTING") {
                    toast.error("Please Start Testing to View the Agent.");
                    return;
                  } else {
                    navigate(`/my-agents/${row.original.id}/${row.original.assistant_id}?name=${row.original.name}`);
                  }
                }}
                className="flex w-full items-center justify-center gap-2.5"
              >
                <Briefcase color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">View Agent</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleMove} className="flex w-full items-center justify-center gap-2.5">
                <Box2 color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">Start Testing</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleComplete} className="flex w-full items-center justify-center gap-2.5">
                <ArrowRight color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">Move to Business</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={handleRevision} className="flex w-full items-center justify-center gap-2.5">
                <ArrowRight color="#000000" size={12} />
                <span className="flex-1 text-left font-medium text-black text-sm">Request Revision</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
