"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Round } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function RoundCard({
  id,
  title,
  description,
  image = "/images/agriculture.jpg",
  amount,
  tags = ["agriculture", "farming"],
}: Round) {
  const router = useRouter();

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <Image
        className="h-40 rounded w-full object-cover object-center mb-6 border-2 bg-white"
        width={300}
        height={160}
        src={image}
        alt="content"
      />
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
        {amount} CELO
      </h3>
      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
        {title}
      </h2>
      <p className="leading-relaxed text-base line-clamp-2">{description}</p>
      <div className="w-full flex justify-between items-center mt-2">
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <Button onClick={() => router.push(`/rounds/${id}`)}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
