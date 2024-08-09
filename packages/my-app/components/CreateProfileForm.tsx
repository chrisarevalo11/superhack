"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProfileSchema } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";

export function CreateProfileForm() {
  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
      profilePhoto: "",
      bio: "",
      wallet: "",
    },
  });

  function onSubmit(values: z.infer<typeof createProfileSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full p-4 max-w-[550px] mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                The name that will be displayed in your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <Input {...field} type="file" />
              </FormControl>
              <FormDescription>Upload your profile photo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." {...field} />
              </FormControl>
              <FormDescription>Your short bio.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wallet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet/Multisig Address</FormLabel>
              <FormControl>
                <Input placeholder="0x2a4...5eF" {...field} />
              </FormControl>
              <FormDescription>Your wallet address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Profile</Button>
      </form>
    </Form>
  );
}
