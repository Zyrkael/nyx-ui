import { Button } from "@nyx-ui/ui/components/button";

export function App() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,oklch(0.95_0.03_225)_0%,oklch(0.99_0.01_235)_42%,white_100%)] px-6 py-16 text-sky-950">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-[2rem] border border-sky-200/80 bg-white/88 p-8 shadow-[0_30px_90px_-36px_rgba(8,47,73,0.4)] backdrop-blur">
        <span className="w-fit rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium tracking-[0.18em] text-sky-700 uppercase">
          Nyx UI
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-sky-950">
            A sky-blue starter theme is now wired into the monorepo.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-sky-800/80">
            The shared UI package now leans on a brighter blue palette for
            primary actions, borders, focus rings, and soft surfaces.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
        </div>
      </section>
    </main>
  );
}
