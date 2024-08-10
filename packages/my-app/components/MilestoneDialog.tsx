"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function MilestoneDialog({
  images,
  description,
  milestone,
}: {
  images: string[];
  description: string;
  milestone: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const distribute = () => {
    setIsLoading(true);
    try {
      // TODO: Add logic to distribute
      toast({
        description: "Funds distributed successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "The funds could not be distributed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{milestone}</DialogTitle>
        <DialogDescription>
          These is the evidence of the {milestone} milestone.
        </DialogDescription>
      </DialogHeader>
      <div className="mx-auto space-y-3">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    className="rounded bg-white"
                    src={image}
                    alt="image"
                    width={300}
                    height={300}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p>{description}</p>
      </div>
      <DialogFooter className="flex w-full !justify-between">
        <Button variant={"destructive"} disabled={isLoading}>
          Reject
        </Button>
        <Button onClick={distribute} disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            "Distribute"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
