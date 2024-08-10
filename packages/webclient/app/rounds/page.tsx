import RoundCard from "@/components/RoundCard";

export default function Rounds() {
  return (
    <section className="max-w-[1200px] mx-auto min-h-[80svh]">
      <div className="w-full mx-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RoundCard
          id={1}
          image="/images/EasyFarm.png"
          amount={12}
          title="Farmers Round"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet lacinia justo lectus gravida purus, quisque commodo litora elementum aptent eleifend fusce morbi malesuada libero congue."
          tags={["Farmers", "Farmers", "Farmers"]}
        />
        <RoundCard
          id={2}
          image="/images/EasyFarm.png"
          amount={12}
          title="Farmers Round"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet lacinia justo lectus gravida purus, quisque commodo litora elementum aptent eleifend fusce morbi malesuada libero congue."
          tags={["Farmers", "Farmers", "Farmers", "Farmers"]}
        />
        <RoundCard
          id={3}
          image="/images/EasyFarm.png"
          amount={12}
          title="Farmers Round"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet lacinia justo lectus gravida purus, quisque commodo litora elementum aptent eleifend fusce morbi malesuada libero congue."
          tags={["Farmers", "Farmers", "Farmers", "Farmers"]}
        />
      </div>
    </section>
  );
}
