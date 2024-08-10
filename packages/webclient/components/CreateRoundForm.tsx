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
import { Textarea } from "@/components/ui/textarea";
import { createRoundSchema } from "@/lib/schema";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";

export function CreateRoundForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createRoundSchema>>({
    resolver: zodResolver(createRoundSchema),
    defaultValues: {
      roundName: "",
      image: "",
      description: "",
      amount: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof createRoundSchema>) {
    console.log(values);
    setIsLoading(true);
    try {
      // TODO: Add logic to distribute
      toast({
        description: "Round created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "The round could not be created. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-[550px] p-4"
      >
        <FormField
          control={form.control}
          name="roundName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Round Name</FormLabel>
              <FormControl>
                <Input placeholder="New Round" {...field} />
              </FormControl>
              <FormDescription>The name of the round.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>Upload an image for the round.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="input"
                  placeholder="Describe the round..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of the round.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  min={0}
                  step="any"
                />
              </FormControl>
              <FormDescription>
                The amount allocated for the round.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Textarea
                  className="input"
                  placeholder="tag1, tag2, tag3"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter up to 5 tags, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Create Round"
          )}
        </Button>
      </form>
    </Form>
  );
}
