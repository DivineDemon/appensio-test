import { ChartCircle } from "iconsax-react";
import type { Dispatch, SetStateAction } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetFileQuery } from "@/store/services/knowledge";

interface KnowledgeSheetProps {
  open: boolean;
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const KnowledgeSheet = ({ id, open, setOpen }: KnowledgeSheetProps) => {
  const { data, isLoading } = useGetFileQuery(id, {
    skip: !open,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="p-1.5 font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            Chat Formatter
          </SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="mb-5 flex h-[calc(100vh-100px)] w-full items-center justify-center overflow-y-auto">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <div className="mb-5 flex h-[calc(100vh-100px)] w-full items-start justify-start overflow-y-auto px-5 text-[#71717A] text-sm">
            {data?.file_content}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default KnowledgeSheet;
