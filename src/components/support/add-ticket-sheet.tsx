import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { useGetMyBusinessesQuery } from "@/store/services/business";
import { usePostTicketMutation } from "@/store/services/ticket";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Textarea } from "../ui/textarea";

const ticketSchema = z.object({
  business_id: z.string().nonempty("Please select a business"),
  problem: z.string().min(5, "Problem description must be at least 5 characters"),
});

interface AddTicketProps {
  open: boolean;
  problem?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTicket = ({ open, setOpen, problem }: AddTicketProps) => {
  const { id: routeId } = useParams<{ id: string }>();
  const { data: businesses } = useGetMyBusinessesQuery({});
  const [postTicket, { isLoading }] = usePostTicketMutation();

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      business_id: routeId ?? "",
      problem: problem ?? "",
    },
  });

  const selectedBusiness = businesses?.find((b) => b.id === form.watch("business_id"));

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    const response = await postTicket({
      business_id: values.business_id,
      problem: values.problem,
    });

    if ("data" in response) {
      toast.success("Ticket submitted successfully!");
      setOpen(false);
      form.reset();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const deduplicateBusinesses = () => {
    if (!businesses) return [];
    const seen = new Set<string>();

    return businesses?.filter((b) => {
      if (seen.has(b.id)) return false;
      seen.add(b.id);
      return true;
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="rounded-l-3xl sm:min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="p-1.5 font-bold text-[28px] text-primary leading-[28px] md:text-[36px] md:leading-[36px]">
            Report Issue
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 p-5">
            <FormField
              control={form.control}
              name="business_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a business" />
                      </SelectTrigger>
                      <SelectContent>
                        {deduplicateBusinesses()?.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Label htmlFor="type" className="w-full text-left">
                Business Type/Industry
              </Label>
              <Input disabled value={selectedBusiness?.industry ?? ""} placeholder="Industry" className="w-full" />
            </div>
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="w-full" rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2.5">
              <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm" disabled={isLoading}>
                {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTicket;
