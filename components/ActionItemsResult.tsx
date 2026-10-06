"use client";

type ActionItem = {
  task: string;
  owner?: string;
  deadline?: string;
  sourceSentence: string;
  verified: boolean;
};

type ActionItemsResultProps = {
  items: ActionItem[];
  verifiedCount: number;
  totalCount: number;
};

export default function ActionItemsResult({
  items,
  verifiedCount,
  totalCount,
}: ActionItemsResultProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-zinc-950">
              Action items
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              {verifiedCount} of {totalCount} source sentences verified
            </p>
          </div>

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      <div className="divide-y divide-zinc-200">
        {items.map((item, index) => (
          <div key={`${item.task}-${index}`} className="space-y-3 p-4">
            <div>
              <p className="text-sm font-medium text-zinc-950">
                {item.task}
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
                  Owner: {item.owner || "Not stated"}
                </span>

                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
                  Deadline: {item.deadline || "Not stated"}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-zinc-500">
                  Source sentence
                </p>

                {item.verified ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    ✓ Verified source
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    ⚠ Not verified
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-700">
                “{item.sourceSentence}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}