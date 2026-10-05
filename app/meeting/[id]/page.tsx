import Chat from "@/components/Chat";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
     <div className="mb-4">
  <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
    Meeting {id}
  </h1>

  <p className="mt-1 text-sm text-zinc-600">
    Ask Briefly about your meeting notes.
  </p>
</div>

      <Chat />
    </main>
  );
}