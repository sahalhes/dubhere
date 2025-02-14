import Link from "next/link";

export default function Future() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      {/* Home Button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="rounded-lg border border-transparent px-5 py-2 text-lg font-semibold transition-colors 
          hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30"
        >
          ← Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Still work to do</h1>
        <div className="text-center">
  <p className="text-muted-foreground mb-4 text-lg opacity-80">
    There are a lot of things to work on like:
  </p>
  <ul className="list-disc list-inside text-muted-foreground text-lg inline-block text-left">
    <li>GPUs</li>
    <li>Backend infrastructure as a whole</li>
    <li>Credit system</li>
    <li>Voice cloning and more voices to choose from</li>
    <li>Better hosting</li>
    <li>and many more...</li>
  </ul>
  <p className="text-m opacity-75 mt-4">
    Feel free to use, improvements are coming soon ⏰
  </p>
</div>

      </div>
    </main>
  );
}
