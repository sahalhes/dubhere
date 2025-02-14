import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LoginButton from "@/components/LoginLogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-12">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4">
        {/* Text Logo on the Left */}
        <Link href="/" className="text-3xl font-bold" style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>
          DubHere
        </Link>

        {/* Login/Signup Button on the Right */}
        <LoginButton />
      </div>

      {/* Slogan */}
      <div>
      <h1 className="text-5xl font-semibold text-center" style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif' }}>
        Dub fair, Pay fair
      </h1>
    </div>


      {/* Features Section */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 text-center md:grid-cols-2">
        <FeatureCard
          title="Let me cook"
          description="Video go brrrrr"
          href="/dashboard"
        />  
        <FeatureCard
          title="Under Construction 🚧"
          description="Still you can sneak peek 🌠"
          href="/future"
        />
      </div>
    </main>
  );
}

// Feature Card Component
const FeatureCard = ({ title, description, href }: { title: string; description: string; href: string }) => (
  <a
    href={href}
    className="group rounded-lg border border-transparent px-6 py-4 transition hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30"
  >
    <h2 className="mb-2 text-2xl font-semibold flex items-center justify-center">
      {title}
      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
        -&gt;
      </span>
    </h2>
    <p className="text-sm opacity-80">{description}</p>
  </a>
);
