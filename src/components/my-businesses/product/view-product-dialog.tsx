import { ChartCircle } from "iconsax-react";
import { type Dispatch, type SetStateAction } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetProductQuery } from "@/store/services/product";

interface ViewProductDialogProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ViewProductDialog = ({ id, open, setOpen }: ViewProductDialogProps) => {
  const { data, isLoading } = useGetProductQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="rounded-l-3xl sm:min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            View Product
          </SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
          </div>
        ) : (
          <div className="w-full px-5">
            <div className="grid w-full grid-cols-2 divide-x border-x border-t">
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left font-semibold">Product Name</p>
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left">{data?.product_name}</p>
              <p className="col-span-1 w-full border-b p-2.5 text-left font-semibold">Product Type</p>
              <p className="col-span-1 w-full border-b p-2.5 text-left">{data?.product_type}</p>
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left font-semibold">Product Quantity</p>
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left">{data?.quantity}</p>
              <p className="col-span-1 w-full border-b p-2.5 text-left font-semibold">Product Description</p>
              <p className="col-span-1 w-full border-b p-2.5 text-left">
                {data?.product_description !== "" ? data?.product_description : "N/A"}
              </p>
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left font-semibold">
                Technical Specification
              </p>
              <p className="col-span-1 w-full border-b bg-gray-100 p-2.5 text-left">
                {data?.technical_specification !== "" ? data?.technical_specification : "N/A"}
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ViewProductDialog;
