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
          <h1 className="title-font sm:text-5xl text-3xl mb-4 font-semibold text-gray-900">
            Welcome, profile1!
          </h1>
          <div>
            <p>Address: {address}</p>
          </div>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => router.push("/create")}>
              Create New Round
            </Button>
            <Button onClick={() => router.push("/rounds")}>See rounds</Button>
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
