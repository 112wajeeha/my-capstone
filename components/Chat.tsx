"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isWorking = status === "submitted" || status === "streaming";

  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container || isUserScrolling) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isUserScrolling]);

  function handleScroll() {
    const container = chatContainerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setIsUserScrolling(distanceFromBottom > 100);
  }

  function scrollToLatest() {
    const container = chatContainerRef.current;

    if (!container) {
      return;
    }

    setIsUserScrolling(false);

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input.trim() || isWorking) {
      return;
    }

    const message = input.trim();

    setInput("");

    await sendMessage({
      text: message,
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="relative h-[60vh] min-h-[350px] max-h-[600px] space-y-4 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6"
      >
        {messages.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center text-center">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">
                Ask Briefly about your meeting
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Paste meeting notes or ask a question about the conversation.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-auto max-w-[85%]"
                  : "mr-auto max-w-[85%]"
              }
            >
              <p className="mb-1 text-xs font-medium text-zinc-500">
                {message.role === "user" ? "You" : "Briefly"}
              </p>

              <div
                className={
                  message.role === "user"
                    ? "rounded-2xl bg-zinc-950 px-4 py-3 text-sm leading-6 text-white"
                    : "rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-900"
                }
              >
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <div
                      key={index}
                      className="prose prose-sm max-w-none prose-zinc"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {part.text}
                      </ReactMarkdown>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))
        )}

        {status === "submitted" && (
          <div className="mr-auto max-w-[85%]">
            <p className="mb-1 text-xs font-medium text-zinc-500">Briefly</p>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
              Thinking...
            </div>
          </div>
        )}

        {isUserScrolling && (
          <button
            type="button"
            onClick={scrollToLatest}
            className="sticky bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
          >
            ↓ Jump to latest
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={isWorking}
          className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:bg-zinc-100"
        />

        {isWorking ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}