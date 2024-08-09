import { formatAddress } from "@/lib/utils";
import Clipboard from "@/components/Clipboard";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FarmerCard({
  name,
  address,
}: {
  name: string;
  address: string;
}) {
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
      <Button>Allocate</Button>
    </div>
  );
}
