import Clipboard from "@/components/Clipboard";
import FarmerCard from "@/components/FarmerCard";
import MilestoneCard from "@/components/MilestoneCard";
import { Badge } from "@/components/ui/badge";
import { formatAddress } from "@/lib/utils";
import Image from "next/image";

export default function Round({ params }: { params: { id: number } }) {
  return (
    <section className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row mt-10 gap-5 min-h-[80svh]">
      <div className="md:w-[50%]">
        <Image
          src="/images/EasyFarm.png"
          width={300}
          height={160}
          alt="content"
          className="w-[85%] mx-auto md:w-[90%] sticky top-20"
        />
      </div>
      <div className="flex flex-col md:w-[50%] mt-5 gap-5 p-2">
        <h1 className="text-5xl font-bold text-primary">
          Round title with id {params.id}
        </h1>
        <div>
          <h2 className="text-2xl font-bold">Round Amount:</h2>
          <h3 className="text-xl">10 CELO</h3>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Description:</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            illum, accusantium adipisci vero expedita, accusamus non iste
            excepturi placeat repellat hic odio animi dicta! Nobis optio autem
            explicabo dignissimos dolores facilis tenetur iure laborum vitae,
            praesentium voluptatum, atque perspiciatis omnis!
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Owner:</h2>
          <p className="flex items-center gap-2 md:hidden">
            {formatAddress("0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C")}
            <Clipboard text="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C" />
          </p>
          <p className=" items-center gap-2 hidden md:flex">
            0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C
            <Clipboard text="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C" />
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Tags:</h2>
          <div className="flex gap-1 flex-wrap mt-2">
            <Badge>Farmers</Badge>
            <Badge>Farmers</Badge>
            <Badge>Farmers</Badge>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Registered farmers:</h2>
          <div className="mt-2 flex flex-col gap-2">
            <FarmerCard
              name="Juan Vargas"
              address="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C"
            />
            <FarmerCard
              name="Juan Vargas"
              address="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C"
            />
            <FarmerCard
              name="Juan Vargas"
              address="0xDdC94BFde7C64117F35803AeA4FA4F98A7b4f57C"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Milestone submissions:</h2>
          <div className="mt-2 flex flex-col gap-2">
            <MilestoneCard
              milestoneNumber={1}
              images={[
                "/images/farmer.png",
                "/images/farmer.png",
                "/images/farmer.png",
              ]}
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit arcu auctor, feugiat magnis fames commodo urna neque potenti quam luctus, augue justo nascetur elementum id condimentum viverra placerat. Primis dignissim nunc in mauris facilisi mollis tempor, blandit curae rutrum tortor ante."
            />
            <MilestoneCard
              milestoneNumber={2}
              images={[
                "/images/farmer.png",
                "/images/farmer.png",
                "/images/farmer.png",
              ]}
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit arcu auctor, feugiat magnis fames commodo urna neque potenti quam luctus, augue justo nascetur elementum id condimentum viverra placerat. Primis dignissim nunc in mauris facilisi mollis tempor, blandit curae rutrum tortor ante."
            />
            <MilestoneCard
              milestoneNumber={3}
              images={[
                "/images/farmer.png",
                "/images/farmer.png",
                "/images/farmer.png",
              ]}
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit arcu auctor, feugiat magnis fames commodo urna neque potenti quam luctus, augue justo nascetur elementum id condimentum viverra placerat. Primis dignissim nunc in mauris facilisi mollis tempor, blandit curae rutrum tortor ante."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
