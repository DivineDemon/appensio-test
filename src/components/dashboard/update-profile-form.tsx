import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfileSchema } from "@/lib/form-schemas";
import { useUpdateProfileMutation } from "@/store/services/profile";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const UpdateProfileForm = () => {
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const response = await updateProfile({
      body: data,
    });

    if (response.data) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <div className="flex h-[325px] w-1/4 flex-col items-center justify-center rounded-xl bg-white">
        <div className="flex w-full flex-col items-center justify-center gap-2 border-b p-5">
          <span className="w-full text-left font-semibold text-[24px] leading-[24px]">Profile Details</span>
          <span className="w-full text-left font-medium text-[12px] text-muted-foreground leading-[12px]">
            Please provide the following information to get started.
          </span>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col items-center justify-center gap-5 p-5"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-end">
            <Button type="submit" variant="default" size="sm">
              {isLoading ? <ChartCircle size={20} className="animate-spin" color="#FFFFFF" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UpdateProfileForm;
