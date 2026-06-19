import { Button } from "@nyx-ui/ui/components/button";

export function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,oklch(0.97_0.01_240),white_55%)] px-6 py-16 text-slate-950">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
        <span className="w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
          Nyx UI
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            shadcn/ui and Tailwind CSS are wired into the monorepo.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Start adding components from the playground app and the shared UI
            package will receive the generated files.
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
