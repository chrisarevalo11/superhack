"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfileInfo() {
  const { address } = useAccount();
  const router = useRouter();

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center gap-3">
          <h1 className="title-font lg:text-6xl text-4xl mb-4 font-bold text-primary">
            Welcome to EasyFarm!
          </h1>
          <h2 className="text-2xl mb-10 font-semibold">
            Empowering Farmers with Transparent, Milestone-Based Funding
          </h2>
          <div>
            <p className="flex gap-2 whitespace-nowrap">
              <span className="font-bold">Connected wallet:</span> {address}
            </p>
          </div>
          <p className="mb-8 leading-relaxed">
            <span className="font-bold">EasyFarm</span> transforms{" "}
            <span className="font-bold">agricultural financing</span> for small
            and medium-sized farmers by using a Milestone-based strategy to
            provide decentralized,{" "}
            <span className="font-bold">milestone-based funding</span>.
            PoolManagers create funding pools and distribute funds based on
            verified milestone achievements, with transparent records ensuring
            accountability. This approach enhances risk management and
            traceability, offering financial solutions tailored to farmers’
            unique needs.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => router.push("/create")}>
              Create New Round
            </Button>
            <Button variant={"outline"} onClick={() => router.push("/rounds")}>
              See rounds
            </Button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded"
            width={500}
            height={500}
            alt="hero"
            src="/images/EasyFarm.png"
          />
        </div>
      </div>
    </section>
  );
}
