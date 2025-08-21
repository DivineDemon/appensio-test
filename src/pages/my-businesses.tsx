import { ArrowLeft2, ChartCircle } from "iconsax-react";
import { Link } from "react-router-dom";

import DataTable from "@/components/data-table";
import { columns } from "@/components/my-businesses/business/columns";
import { useGetMyBusinessesQuery } from "@/store/services/business";

const MyBusinesses = () => {
  const { data, isLoading } = useGetMyBusinessesQuery({});

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
      <div className="flex w-full items-center justify-start gap-2.5">
        <Link to="/my-business" className="flex md:hidden">
          <ArrowLeft2 size={26} color="#000000" />
        </Link>
        <span className="flex-1 text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
          Agents
        </span>
      </div>
      {isLoading ? (
        <div className="flex h-[calc(100vh-160px)] w-full items-center justify-center">
          <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
        </div>
      ) : (
        <div className="h-[calc(100vh-160px)] w-full">
          <DataTable data={data!} columns={columns} type="agents" />
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;
