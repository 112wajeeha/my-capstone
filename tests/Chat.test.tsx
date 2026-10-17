
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chat from "../components/Chat";

const mocks = vi.hoisted(() => ({
  messages: [] as any[],
  status: "ready",
  error: undefined as any,
  sendMessage: vi.fn(),
  stop: vi.fn(),
  regenerate: vi.fn(),
  isApiCallError: vi.fn(),
}));

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: mocks.messages,
    status: mocks.status,
    error: mocks.error,
    sendMessage: mocks.sendMessage,
    stop: mocks.stop,
    regenerate: mocks.regenerate,
  }),
}));

vi.mock("ai", () => ({
  DefaultChatTransport: class {
    constructor(_options: { api: string }) {}
  },
  APICallError: {
    isInstance: mocks.isApiCallError,
  },
}));

describe("Chat", () => {
  beforeEach(() => {
    mocks.messages = [];
    mocks.status = "ready";
    mocks.error = undefined;

    mocks.sendMessage.mockReset().mockResolvedValue(undefined);
    mocks.stop.mockReset();
    mocks.regenerate.mockReset().mockResolvedValue(undefined);
    mocks.isApiCallError.mockReset().mockReturnValue(false);
  });

  it("shows the empty chat state", () => {
    render(<Chat />);

    expect(
      screen.getByRole("heading", {
        name: "Ask Briefly about your meeting",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Paste meeting notes or ask a question/)
    ).toBeInTheDocument();
  });

  it("renders user and assistant text messages with Markdown", () => {
    mocks.messages = [
      {
        id: "user-1",
        role: "user",
        parts: [{ type: "text", text: "Summarize these notes" }],
      },
      {
        id: "assistant-1",
        role: "assistant",
        parts: [
          { type: "text", text: "**Meeting summary**" },
        ],
      },
    ];

    render(<Chat />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Briefly")).toBeInTheDocument();
    expect(screen.getByText("Summarize these notes")).toBeInTheDocument();
expect(screen.getByText("Meeting summary").tagName).toBe("STRONG");
  });

  it("renders action-item tool results", () => {
    mocks.messages = [
      {
        id: "assistant-2",
        role: "assistant",
        parts: [
          {
            type: "tool-extractActionItems",
            state: "output-available",
            output: {
  items: [
    {
      task: "Send the project plan",
      owner: "Ayesha",
      deadline: "Friday",
      sourceSentence: "Ayesha will send the project plan by Friday.",
      verified: true,
    },
  ],
  verifiedCount: 1,
  totalCount: 1,
},
          },
        ],
      },
    ];

    render(<Chat />);

    expect(screen.getByText("Send the project plan")).toBeInTheDocument();
expect(screen.getByText(/Owner:\s*Ayesha/)).toBeInTheDocument();
expect(screen.getByText(/Deadline:\s*Friday/)).toBeInTheDocument();
  });

  it("ignores unsupported message parts without crashing", () => {
    mocks.messages = [
      {
        id: "assistant-3",
        role: "assistant",
        parts: [
          { type: "unknown-part", data: "ignored" },
          { type: "text", text: "The supported text still appears" },
        ],
      },
    ];

    render(<Chat />);

    expect(
      screen.getByText("The supported text still appears")
    ).toBeInTheDocument();

    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });

  it("disables Send for blank input and trims submitted text", async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByPlaceholderText(
      "Ask a follow-up question..."
    );
    const sendButton = screen.getByRole("button", { name: "Send" });

    expect(sendButton).toBeDisabled();

    await user.type(input, "   ");
    expect(sendButton).toBeDisabled();

    await user.clear(input);
    await user.type(input, "  Summarize the meeting  ");

    expect(sendButton).toBeEnabled();
    await user.click(sendButton);

    expect(mocks.sendMessage).toHaveBeenCalledWith({
      text: "Summarize the meeting",
    });
  });

  it("shows Thinking while a message is submitted", () => {
    mocks.status = "submitted";

    render(<Chat />);

    expect(screen.getByText("Thinking...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask a follow-up question...")
    ).toBeDisabled();
  });

  it("shows Stop during streaming and calls stop when clicked", async () => {
    const user = userEvent.setup();
    mocks.status = "streaming";

    render(<Chat />);

    const stopButton = screen.getByRole("button", { name: "Stop" });

    expect(stopButton).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ask a follow-up question...")
    ).toBeDisabled();

    await user.click(stopButton);

    expect(mocks.stop).toHaveBeenCalledTimes(1);
  });

  it("shows a general error and retries the failed assistant message", async () => {
    const user = userEvent.setup();

    mocks.messages = [
      {
        id: "assistant-failed",
        role: "assistant",
        parts: [{ type: "text", text: "Previous response" }],
      },
    ];
    mocks.error = new Error("Request failed");

    render(<Chat />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong while sending your message."
    );

    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(mocks.regenerate).toHaveBeenCalledWith({
      messageId: "assistant-failed",
    });
  });

  it("shows the rate-limit message for a 429 API error", () => {
    mocks.error = { statusCode: 429 };
    mocks.isApiCallError.mockReturnValue(true);

    render(<Chat />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Briefly is busy. Try again in a moment."
    );
  });
});
