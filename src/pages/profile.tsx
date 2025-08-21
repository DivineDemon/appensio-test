import { zodResolver } from "@hookform/resolvers/zod";
import { ChartCircle } from "iconsax-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileSchema } from "@/lib/form-schemas";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/services/profile";

const Profile = () => {
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { data } = useGetProfileQuery({});
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

  useEffect(() => {
    form.setValue("last_name", data?.last_name || "");
    form.setValue("first_name", data?.first_name || "");
  }, [data, form.setValue]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-5">
      <span className="w-full border-b pb-5 text-left font-bold text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
        Profile
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full grid-cols-2 gap-5">
          <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2">
            <Label className="w-full text-left">Email</Label>
            <Input type="email" value={data?.email} disabled={true} />
          </div>
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
          <div className="col-span-2 flex w-full items-center justify-end">
            <Button type="submit" variant="default" size="lg">
              {isLoading ? <ChartCircle size={20} className="animate-spin" color="#FFFFFF" /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
