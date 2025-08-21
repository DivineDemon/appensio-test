import { type ColumnDef } from "@tanstack/react-table";
import { ArrowSwapVertical, Briefcase, Edit, More, Trash } from "iconsax-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useDeleteProductMutation } from "@/store/services/product";

import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import WarningModal from "../../warning-modal";
import AddProductDialog from "./add-product-dialog";
import ViewProductDialog from "./view-product-dialog";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" type="button" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowSwapVertical size={16} color="#71717A" className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "product_type",
    header: "Product Type",
    cell: ({ row }) => {
      return (
        <span className="rounded-lg border-2 border-[#E4E4E7] px-4 py-1.5 font-semibold text-[#71717A] text-[14px] leading-[14px]">
          {row.getValue("product_type")}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>${row.getValue("price")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = useParams();
      const [add, setAdd] = useState<boolean>(false);
      const [open, setOpen] = useState<boolean>(false);
      const [view, setView] = useState<boolean>(false);
      const [selected, setSelected] = useState<string>("");
      const [deleteBusiness, { isLoading }] = useDeleteProductMutation();

      const handleDelete = async () => {
        const response = await deleteBusiness({
          product_id: selected,
          business_id: id ?? "",
        });

        if (response.data) {
          toast.success("Business Deleted Successfully!");
          setOpen(false);
        } else {
          toast.error("Failed to Delete Business!");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <More size={16} color="#71717A" className="rotate-90 fill-[#71717A]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected(row.original.product_id);
                    setAdd(true);
                  }}
                  className="flex w-full items-center justify-center gap-2.5"
                >
                  <Edit color="#000000" size={12} />
                  <span className="flex-1 text-left font-medium text-black text-sm">Edit</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    setSelected(row.original.product_id);
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
                    setSelected(row.original.product_id);
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
          <AddProductDialog id={selected} open={add} setOpen={setAdd} />
          <ViewProductDialog id={selected} open={view} setOpen={setView} />
        </>
      );
    },
  },
];
