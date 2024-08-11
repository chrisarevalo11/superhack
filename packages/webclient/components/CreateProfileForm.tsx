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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { abi } from "@/assets/abi/registryAbi";
import { REGISTRY_CONTRACT } from "@/lib/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/Providers";
import { uploadFileToIPFS, uploadJSONToIPFS } from "@/lib/ipfsService";

export function CreateProfileForm() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const publicClient = usePublicClient();
  const { toast } = useToast();

  const { writeContractAsync } = useWriteContract();

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
      profilePhoto: "",
      bio: "",
      wallet: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createProfileSchema>) {
    console.log(values);
    setIsLoading(true);
    if (!isConnected || !address || !publicClient) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet.",
      });
      return;
    }

    if (!image) {
      toast({
        variant: "destructive",
        description: "Please upload an image.",
      });
      return;
    }

    try {
      const imgHash = await uploadFileToIPFS(image);

      const metadata = {
        name: values.name,
        bio: values.bio,
        profilePhoto: imgHash,
        wallet: values.wallet,
      };
      const metadataHash = await uploadJSONToIPFS(metadata);

      console.log(metadataHash);

      const nonce = await publicClient.getTransactionCount({
        address,
      });

      const components = {
        protocol: 1,
        pointer: metadataHash,
      };

      const txHash = await writeContractAsync({
        abi,
        address: REGISTRY_CONTRACT,
        functionName: "createProfile",
        args: [nonce, values.name, components, address, [values.wallet]],
      });

      await waitForTransactionReceipt(config, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        description: "Profile created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "The profile could not be created. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                    }
                  }}
                  type="file"
                />
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

        {isConnected ? (
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Create Round"
            )}
          </Button>
        ) : (
          <ConnectButton />
        )}
      </form>
    </Form>
  );
}
