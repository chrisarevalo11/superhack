import { CreateProfileForm } from "@/components/CreateProfileForm";
import ProfileInfo from "@/components/ProfileInfo";

export default function Home() {
  const profileId = 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[1200px] w-full mx-auto flex flex-col justify-center items-center">
        {profileId ? (
          <ProfileInfo />
        ) : (
          <div className="w-full flex flex-col justify-center gap-10 mt-5">
            <h1 className="text-5xl font-bold text-center">Create Profile</h1>
            <CreateProfileForm />
          </div>
        )}
      </section>
    </main>
  );
}
