import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { useGetProductQuery, usePostProductMutation, useUpdateProductMutation } from "@/store/services/product";

import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Textarea } from "../../ui/textarea";

interface AddProductDialogProps {
  id?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const productSchema = z.object({
  product_name: z
    .string()
    .min(1, { message: "Product Name is required" })
    .max(100, { message: "Product Name must be 100 characters or fewer" }),
  product_type: z.string(),
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a number" })
    .int({ message: "Quantity must be an integer" })
    .min(0, { message: "Quantity cannot be negative" })
    .max(99999, "Quantity must not exceed 99999"),
  price: z.string().min(1, { message: "Price is required" }),
  product_description: z.string().max(500, { message: "Description can be at most 500 characters" }),
  technical_specification: z.string().max(500, {
    message: "Technical Description can be at most 500 characters",
  }),
});

const AddProductDialog = ({ id, open, setOpen }: AddProductDialogProps) => {
  const { id: business_id } = useParams();
  const [addProduct, { isLoading: adding }] = usePostProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const { data } = useGetProductQuery(`${id}`, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    let response = null;

    if (!id) {
      response = await addProduct({
        business_id: `${business_id}`,
        data: {
          price: values.price,
          product_name: values.product_name,
          product_type: values.product_type,
          quantity: `${values.quantity}`,
          product_description: values.product_description,
          technical_specification: values.technical_specification,
        },
      });
    } else {
      response = await updateProduct({
        business_id: `${business_id}`,
        product_id: `${id}`,
        data: {
          price: values.price,
          product_description: "",
          product_name: values.product_name,
          product_type: values.product_type,
          quantity: `${values.quantity}`,
          technical_specification: "",
        },
      });
    }

    if (response.data) {
      toast.success(`Product ${id ? "Updated" : "Added"} Successfully!`);
      setOpen(false);
    } else {
      toast.error(`Failed to ${id ? "Update" : "Add"} Product!`);
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("price", data?.price);
      form.setValue("product_description", data?.product_description);
      form.setValue("product_name", data?.product_name);
      form.setValue("quantity", data?.quantity);
      form.setValue("technical_specification", data?.technical_specification);
      form.setValue("product_type", data?.product_type);
    }
  }, [data, form.setValue]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="rounded-l-3xl sm:min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            {id ? "Edit" : "Add"} Product
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-full w-full flex-col items-start justify-start"
          >
            <div className="flex w-full flex-col items-start justify-start gap-5 p-5">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Product Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Healthcare", "Food", "Electronics", "Real Estate"].map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technical_specification"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Technical Specifications</FormLabel>
                    <FormControl className="w-full">
                      <Textarea placeholder="Enter Technical Specifications" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Description</FormLabel>
                    <FormControl className="w-full">
                      <Textarea placeholder="Enter Product Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-auto flex w-full items-center justify-end gap-2 p-5">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" disabled={adding || updating} variant="default">
                {adding || updating ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProductDialog;
