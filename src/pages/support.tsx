import { ChartCircle, Messages } from "iconsax-react";
import { useState } from "react";

import DataTable from "@/components/data-table";
import AddTicket from "@/components/support/add-ticket-sheet";
import { columns } from "@/components/support/ticket-columns";
import { Button } from "@/components/ui/button";
import { useGetTicketsQuery } from "@/store/services/ticket";

const Support = () => {
  const [add, setAdd] = useState<boolean>(false);
  const { data, isLoading } = useGetTicketsQuery({});

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start md:overflow-hidden">
        <div className="flex w-full items-center justify-center">
          <span className="flex-1 text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
            Tickets
          </span>
          <Button onClick={() => setAdd(true)} variant="default" size="sm" type="button">
            Report Issue&nbsp;
            <Messages size={20} color="#0B33A4" className="fill-white" />
          </Button>
        </div>
        {isLoading ? (
          <div className="mt-3.5 flex w-full items-center justify-center md:h-[calc(100vh-318px)] md:overflow-y-auto">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <div className="mt-3.5 w-full md:h-[calc(100vh-140px)] md:overflow-y-auto">
            <DataTable data={data!} columns={columns} />
          </div>
        )}
      </div>
      <AddTicket open={add} setOpen={setAdd} />
    </>
  );
};

export default Support;
