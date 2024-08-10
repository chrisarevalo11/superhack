"use client";

import { formatAddress } from "@/lib/utils";
import Clipboard from "@/components/Clipboard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function FarmerCard({
  name,
  address,
}: {
  name: string;
  address: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const distribute = () => {
    setIsLoading(true);
    try {
      // TODO: Add logic to distribute
      toast({
        description: "Farmer allocated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "The farmer could not be allocated. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="rounded bg-background p-3 flex justify-between w-full shadow-sm border items-center">
      <div className="flex gap-2">
        <Image
          className="rounded object-cover bg-white"
          src="/images/farmer.png"
          width={60}
          height={40}
          alt="farmer"
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-secondary-foreground flex gap-2 items-center opacity-60">
            {formatAddress(address)} <Clipboard text={address} />
          </p>
        </div>
      </div>
      <Button disabled={isLoading} onClick={distribute}>
        Allocate
      </Button>
    </div>
  );
}
