export default function ActionsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <p className="text-sm font-medium text-zinc-500">Action items</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        Your action items
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
        Tasks extracted from your meetings will appear here.
      </p>

      <section className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-zinc-950">
          No action items yet
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Add a meeting to start building your follow-up list.
        </p>
      </section>
    </main>
  );
}