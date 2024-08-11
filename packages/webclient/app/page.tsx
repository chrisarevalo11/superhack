import ProfileInfo from "@/components/ProfileInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[1200px] w-full mx-auto flex flex-col justify-center items-center">
        <ProfileInfo />
      </section>
    </main>
  );
}
