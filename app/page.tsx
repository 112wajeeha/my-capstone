export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="mb-10">
        <p className="mb-2 text-sm font-medium text-zinc-500">
          Meeting workspace
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          Turn meetings into clear next steps.
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          Paste your meeting notes and Briefly will help turn them into
          decisions, action items, owners, and deadlines.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-500">Meetings</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-950">0</p>
          <p className="mt-2 text-sm text-zinc-500">
            No meetings added yet.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-500">Action items</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-950">0</p>
          <p className="mt-2 text-sm text-zinc-500">
            Your follow-up work will appear here.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm font-medium text-zinc-500">Decisions</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-950">0</p>
          <p className="mt-2 text-sm text-zinc-500">
            Decisions will be extracted from meetings.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-950">
          Start your first meeting
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
          Add meeting notes to begin building your action list.
        </p>

        <a
          href="/new"
          className="mt-5 inline-flex rounded-lg bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Add a meeting
        </a>
      </section>
    </main>
  );
}