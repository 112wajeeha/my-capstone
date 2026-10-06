"use client";

import ActionItemsResult from "./ActionItemsResult";

type ActionItem = {
  task: string;
  owner?: string;
  deadline?: string;
  sourceSentence: string;
  verified: boolean;
};

type ToolInput = {
  notes?: string;
  items?: Array<{
    task: string;
    owner?: string;
    deadline?: string;
    sourceSentence: string;
  }>;
};

type ToolOutput = {
  items: ActionItem[];
  verifiedCount: number;
  totalCount: number;
};

type ToolState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-denied"
  | "output-error";

type ToolCardProps = {
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

function isToolInput(value: unknown): value is ToolInput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const input = value as ToolInput;

  return (
    (input.notes === undefined || typeof input.notes === "string") &&
    (input.items === undefined || Array.isArray(input.items))
  );
}

function isToolOutput(value: unknown): value is ToolOutput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const output = value as ToolOutput;

  return (
    Array.isArray(output.items) &&
    typeof output.verifiedCount === "number" &&
    typeof output.totalCount === "number"
  );
}

export default function ToolCard({
  state,
  input,
  output,
  errorText,
}: ToolCardProps) {
  if (state === "input-streaming") {
    return (
      <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 animate-pulse rounded-xl bg-zinc-200" />

          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-950">
              Reading your notes...
            </p>

            <div className="mt-2 h-2 w-40 animate-pulse rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>
    );
  }

  if (state === "input-available") {
    const safeInput = isToolInput(input) ? input : undefined;
    const noteLength = safeInput?.notes?.length ?? 0;
    const itemCount = safeInput?.items?.length ?? 0;

    return (
      <div className="mt-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm">
            🔎
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-950">
              Extracting action items
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-800">
              Checking {noteLength.toLocaleString()} characters and{" "}
              {itemCount} candidate {itemCount === 1 ? "item" : "items"}.
            </p>

            <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-blue-600">
              extractActionItems
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "output-available") {
    const safeOutput = isToolOutput(output) ? output : undefined;

    if (!safeOutput) {
      return (
        <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-950">
            We couldn't read the tool result
          </p>

          <p className="mt-1 text-xs leading-5 text-red-800">
            The tool returned data in an unexpected format.
          </p>
        </div>
      );
    }

    return (
      <ActionItemsResult
        items={safeOutput.items}
        verifiedCount={safeOutput.verifiedCount}
        totalCount={safeOutput.totalCount}
      />
    );
  }

  if (state === "approval-requested") {
    return (
      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-950">
          Waiting for approval
        </p>

        <p className="mt-1 text-xs text-amber-800">
          This tool is waiting for permission to continue.
        </p>
      </div>
    );
  }

  if (state === "approval-responded") {
    return (
      <div className="mt-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-900">
          Approval response received
        </p>
      </div>
    );
  }

  if (state === "output-denied") {
    return (
      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-950">
          Tool execution was denied
        </p>

        <p className="mt-1 text-xs text-amber-800">
          The action-item extraction did not run.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
          ⚠️
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-red-950">
            We couldn't verify the action items
          </p>

          <p className="mt-1 text-xs leading-5 text-red-800">
            {errorText || "The tool could not complete successfully."}
          </p>

          <button
            type="button"
            className="mt-3 rounded-lg bg-red-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-900"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}