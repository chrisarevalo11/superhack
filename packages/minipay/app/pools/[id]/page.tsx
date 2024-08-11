'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatAddress } from '@/utils';
import Image from 'next/image';
import Clipboard from '@/components/Clipboard';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useForm,
} from '@allo-team/kit';

const formSchema = z.object({
  image: z.string().min(1, {
    message: 'Please select an image',
  }),
  description: z.string().min(1, {
    message: 'Please enter a description',
  }),
});

export default function Round({ params }: { params: { id: number } }) {
  const tags = ['agriculture', 'farming'];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      description: '',
    },
  });

  return (
    <section className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row  gap-5 min-h-[80svh]">
      <div className="md:w-[50%]">
        <Image
          src="/images/agriculture.jpg"
          width={300}
          height={160}
          alt="content"
          className="w-[85%] mx-auto md:w-[90%] sticky top-20"
        />
      </div>
      <div className="flex flex-col md:w-[50%] mt-5 gap-5 p-2">
        <h1 className="text-5xl font-bold text-primary">
          {/* TODO: set title from contract pool */}
          Round title with id {params.id}
        </h1>
        <div>
          <h2 className="text-2xl font-bold">Round Amount:</h2>
          <h3 className="text-xl">
            {/* TODO: set amount from contract pool */}
            10 CELO
          </h3>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Description:</h2>
          <p>
            {/* TODO: set description from contract pool */}
            lorem
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Owner:</h2>
          <p className="flex items-center gap-2 md:hidden">
            {formatAddress('0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C')}
            <Clipboard text="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C" />
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Tags:</h2>
          <div className="flex gap-1 flex-wrap mt-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger>
              <Button>Submit evidence</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Evidence</DialogTitle>
                <DialogDescription>
                  Submit the milestone evidence
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Files</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          {...field}
                          type="file"
                          accept="image/*"
                        />
                      </FormControl>
                      <FormDescription>Select an image.</FormDescription>
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
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormDescription>Describe the project.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
