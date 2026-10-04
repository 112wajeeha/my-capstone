export default function NewMeetingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <p className="text-sm font-medium text-zinc-500">New meeting</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
        Add a meeting
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
        This is where you&apos;ll paste meeting notes for Briefly to analyze.
      </p>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-950">
          Meeting notes
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          The meeting input form will be added in a later step.
        </p>
      </section>
    </main>
  );
}