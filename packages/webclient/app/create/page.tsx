import { CreateRoundForm } from "@/components/CreateRoundForm";

export default function NewRound() {
  return (
    <section className="max-w-[1200px] min-h-[80svh] w-full mx-auto flex flex-col justify-center items-center gap-10 mt-5">
      <h1 className="text-5xl font-bold text-center">Create New Round</h1>
      <CreateRoundForm />
    </section>
  );
}
