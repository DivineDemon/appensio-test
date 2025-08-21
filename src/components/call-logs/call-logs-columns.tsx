import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { InfoCircle } from "iconsax-react";
import { useState } from "react";

import { Button } from "../ui/button";
import LogDetailSheet from "./log-detail-sheet";

export const columns: ColumnDef<PhoneCallData>[] = [
  {
    accessorKey: "startedAt",
    header: "Call Date & Time",
    cell: ({ row }) => (
      <span>{row.original.startedAt ? dayjs(row.original.startedAt).format("MMMM DD, YYYY | HH:mm") : "N/A"}</span>
    ),
  },
  {
    accessorKey: "customerNumber",
    header: "To",
    cell: ({ row }) => {
      return <span>{row.original.customerNumber || "N/A"}</span>;
    },
  },
  {
    accessorKey: "endedReason",
    header: "Ended Reason",
    cell: ({ row }) => {
      return <span>{row.original?.endedReason || "N/A"}</span>;
    },
  },
  {
    id: "duration",
    header: "Call Duration",
    cell: ({ row }) => {
      const startedAt = row.original?.startedAt;
      const endedAt = row.original?.endedAt;

      if (!startedAt || !endedAt) return <span>N/A</span>;

      try {
        const startedAtTime = new Date(startedAt).getTime();
        const endedAtTime = new Date(endedAt).getTime();

        if (isNaN(startedAtTime) || isNaN(endedAtTime)) {
          return <span>Invalid date</span>;
        }

        const durationInSeconds = Math.floor((endedAtTime - startedAtTime) / 1000);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        const callDuration = `${minutes} min ${seconds.toString().padStart(2, "0")} sec`;

        return <span>{callDuration}</span>;
      } catch (error) {
        return <span>{(error as Error).message}</span>;
      }
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <span>{row.original?.type || "N/A"}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState<boolean>(false);

      return (
        <>
          <Button onClick={() => setOpen(true)} type="button" variant="secondary">
            <InfoCircle size={20} color="#000000" />
          </Button>
          <LogDetailSheet open={open} setOpen={setOpen} id={row.original.vapi_call_id} />
        </>
      );
    },
  },
];
