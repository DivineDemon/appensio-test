import { ChartCircle, DocumentText } from "iconsax-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useGetKnowledgeBaseQuery } from "@/store/services/knowledge";

import AddDocumentDialog from "./add-document-dialog";
import { columns } from "./knowledge-columns";

const KnowledgeBase = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetKnowledgeBaseQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <AddDocumentDialog open={open} setOpen={setOpen} />
      <div className="mt-5 flex h-[calc(100vh-172px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
        <div className="flex w-full items-center justify-center">
          <span className="flex-1 text-left text-[#71717A] text-sm">List of Documents</span>
          <Button type="button" onClick={() => setOpen(true)} variant="default" size="sm">
            + Add Document&nbsp;
            <DocumentText size={20} color="#0B33A4" className="fill-white text-primary" />
          </Button>
        </div>
        {isLoading ? (
          <div className="flex h-[calc(100vh-224px)] w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <div className="h-[calc(100vh-224px)] w-full overflow-y-auto">
            <DataTable data={data!} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgeBase;
