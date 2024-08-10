import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MilestoneDialog from "@/components/MilestoneDialog";

const milestones = ["Pre-Sowing", "Mid-Growth", "Pre-Harvest"];

export default function MilestoneCard({
  milestoneNumber,
  isAttested = false,
  images,
  description,
}: {
  milestoneNumber: number;
  isAttested?: boolean;
  images: string[];
  description: string;
}) {
  return (
    <div
      className={cn(
        "rounded bg-background p-3 flex justify-between w-full shadow-sm border items-center",
        isAttested && "opacity-50 border-primary"
      )}
    >
      <div className="flex gap-2">
        <Image
          className="rounded object-cover bg-white"
          src="/images/target.png"
          width={60}
          height={40}
          alt="farmer"
        />
        <div className="flex flex-col justify-center gap-">
          <h4 className="text-lg font-semibold">
            {milestones[milestoneNumber - 1]}
          </h4>
          <p className="opacity-50">Milestone {milestoneNumber}</p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={isAttested}>
            {isAttested ? "Distributed" : "View"}
          </Button>
        </DialogTrigger>
        <MilestoneDialog
          description={description}
          images={images}
          milestone={milestones[milestoneNumber - 1]}
        />
      </Dialog>
    </div>
  );
}
