import { AddCircle, ChartCircle } from "iconsax-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DataTable from "@/components/data-table";
import { products } from "@/lib/constants";
import { useGetAllProductsQuery } from "@/store/services/product";

import { Button } from "../../ui/button";
import AddProductDialog from "./add-product-dialog";
import { columns } from "./product-columns";

const ProductCatalog = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllProductsQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <div className="mt-5 flex h-[calc(100vh-172px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5">
        <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
          <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Product Catalog</span>
          {products.length !== 0 && (
            <Button onClick={() => setOpen(true)} type="button" variant="default">
              <AddCircle size={20} color="#FFFFFF" /> Add Product
            </Button>
          )}
        </div>
        <div className="min-h-0 w-full flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <ChartCircle size={40} color="#0B33A4" className="animate-spin" />
            </div>
          ) : data && data.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex aspect-video w-1/2 flex-col items-center justify-center gap-7 rounded-3xl bg-[#F4F4F5]">
                <span className="w-full text-center font-bold text-[48px] leading-[48px]">Create Product</span>
                <span className="w-full text-center text-[#71717A] text-[16px] leading-[18px]">
                  Your product catalog is empty click&nbsp;
                  <span className="font-semibold text-[#09090B]">"Add Product"</span>
                  <br />
                  to get started!
                </span>
                <Button onClick={() => setOpen(true)} type="button" variant="default" size="lg">
                  <AddCircle size={20} color="#FFFFFF" /> Add First Product
                </Button>
              </div>
            </div>
          ) : (
            <DataTable data={data!} columns={columns} />
          )}
        </div>
      </div>
      <AddProductDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductCatalog;
