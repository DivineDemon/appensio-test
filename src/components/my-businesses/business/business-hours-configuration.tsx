import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetBusinessHoursQuery, usePostBusinessHoursMutation } from "@/store/services/business";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";

const daySchema = z.object({
  dayName: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
  status: z.enum(["open", "closed"]),
  opensAt: z.string().optional(),
  closesAt: z.string().optional(),
});

const businessHoursSchema = z.object({
  operatingDays: z.coerce.boolean().optional(),
  days: z.array(daySchema).length(7),
  timezone: z.string().optional(),
});

const weekDays: z.infer<typeof businessHoursSchema>["days"][number]["dayName"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const BusinessHoursConfiguration = () => {
  const { id } = useParams();
  const { data } = useGetBusinessHoursQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const form = useForm<z.infer<typeof businessHoursSchema>>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      operatingDays: true,
      timezone: "Asia/Karachi",
      days: weekDays.map((day) => ({ dayName: day, status: "closed" })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "days",
  });

  const [postHours, { isLoading }] = usePostBusinessHoursMutation();

  const isTemporarilyClosed = String(form.watch("operatingDays")) === "false";

  const to24HourFormat = useCallback((time12h?: string): string => {
    if (!time12h) {
      return "";
    }

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map((t) => parseInt(t, 10));

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }, []);

  const to12HourFormat = (time: string | undefined): string => {
    if (!time) return "";
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const onSubmit = async (values: z.infer<typeof businessHoursSchema>) => {
    const response = await postHours({
      business_id: id!,
      data: {
        business_status: values.operatingDays!,
        data: values.days.map((day) => ({
          status: day.status === "open" ? "open" : "temporarily_closed",
          open: to12HourFormat(day.opensAt),
          close: to12HourFormat(day.closesAt),
          day: day.dayName,
        })),
        timezone: values.timezone ?? "Asia/Karachi",
      },
    });

    if (response.data) {
      toast.success("Successfully Updated Business Hours!");
    } else {
      toast.error("Failed to Update Business Hours!");
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("operatingDays", data.business_status);
      form.setValue(
        "days",
        data.data.map((day) => ({
          dayName: day.day as z.infer<typeof daySchema>["dayName"],
          status: day.status === "open" ? "open" : "closed",
          opensAt: to24HourFormat(day.open),
          closesAt: to24HourFormat(day.close),
        })),
      );
    }
  }, [data, form.setValue, to24HourFormat]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex h-[calc(100vh-172px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto md:gap-5"
      >
        <div className="flex w-full items-center justify-center gap-5 border-[#D9D9D9] border-b pb-5">
          <span className="flex-1 text-left font-bold text-[24px] leading-[24px]">Operating Days</span>
        </div>
        <div className="grid w-full grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="operatingDays"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full rounded-lg border px-5">
                <FormControl className="flex w-full items-center justify-between">
                  <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                    <FormItem className="flex items-center space-x-3">
                      <RadioGroupItem value="true" />
                      <FormLabel>Open with main hours</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <RadioGroupItem value="false" />
                      <FormLabel>Temporarily closed</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Timezone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asia/Karachi">Asia/Karachi</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <fieldset disabled={isTemporarilyClosed} className="w-full">
          <div className="grid w-full grid-cols-2 items-start justify-start gap-5">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md border p-4">
                <FormLabel>{field.dayName}</FormLabel>
                <FormField
                  control={form.control}
                  name={`days.${index}.status` as const}
                  render={({ field }) => (
                    <FormItem className="pt-5">
                      <FormControl className="flex w-full items-center justify-start gap-5">
                        <RadioGroup onValueChange={field.onChange} value={field.value}>
                          <FormItem className="flex items-center space-x-3">
                            <RadioGroupItem value="open" />
                            <FormLabel>Open</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3">
                            <RadioGroupItem value="closed" />
                            <FormLabel>Closed</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 items-start justify-start gap-4 pt-5">
                  <FormField
                    control={form.control}
                    name={`days.${index}.opensAt` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opens At</FormLabel>
                        <FormControl>
                          <Input disabled={form.watch(`days.${index}.status`) === "closed"} type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`days.${index}.closesAt` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closes At</FormLabel>
                        <FormControl>
                          <Input disabled={form.watch(`days.${index}.status`) === "closed"} type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="mt-auto flex w-full items-center justify-end gap-2.5">
          <Button type="button" variant="secondary" size="sm">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit" variant="default" size="sm">
            {isLoading ? <ChartCircle size={20} color="#FFFFFF" className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessHoursConfiguration;
