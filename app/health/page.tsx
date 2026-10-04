export default function HealthPage() {
  const status = {
    app: "ok",
    database: "mock",
    ai: "not configured",
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <p className="text-sm font-medium text-zinc-500">System health</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        Health check
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
        A simple status check for the Briefly application.
      </p>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-zinc-100 pb-3">
            <span className="font-medium text-zinc-700">App</span>
            <span className="text-zinc-500">{status.app}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-100 pb-3">
            <span className="font-medium text-zinc-700">Database</span>
            <span className="text-zinc-500">{status.database}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-zinc-700">AI</span>
            <span className="text-zinc-500">{status.ai}</span>
          </div>
        </div>
      </section>
    </main>
  );
}