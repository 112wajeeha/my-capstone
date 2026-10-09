import {
streamText,
convertToModelMessages,
type UIMessage,
} from "ai";

import { model, systemPrompt } from "@/lib/ai/config";
import { extractActionItems } from "@/lib/ai/tools";

export async function POST(req: Request) {


const { messages }: { messages: UIMessage[] } = await req.json();

const result = streamText({
model,
system: systemPrompt,
messages: await convertToModelMessages(messages),
tools: {
extractActionItems,
},
stopWhen: ({ steps }) => steps.length >= 3,
maxOutputTokens: 800,
});

return result.toUIMessageStreamResponse();
}
