import { tool } from "ai";
import { z } from "zod";

export const extractActionItems = tool({
  description:
    "Extract action items from meeting notes and verify that each source sentence exists in the notes.",

  inputSchema: z.object({
    notes: z
      .string()
      .describe("The full meeting notes to analyze."),

    items: z
      .array(
        z.object({
          task: z
            .string()
            .describe("What needs to be done."),

          owner: z
            .string()
            .optional()
            .describe("The person responsible, if stated in the notes."),

          deadline: z
            .string()
            .optional()
            .describe("The deadline, if stated in the notes."),

          sourceSentence: z
            .string()
            .describe(
              "The exact sentence from the meeting notes supporting this action item."
            ),
        })
      )
      .describe("Candidate action items extracted from the meeting notes."),
  }),

  execute: async ({ notes, items }) => {
    if (!notes.trim()) {
      throw new Error("Meeting notes are empty.");
    }

    if (items.length === 0) {
      throw new Error("No action items were found.");
    }

    const verifiedItems = items.map((item) => ({
      ...item,
      verified: notes.includes(item.sourceSentence),
    }));

    return {
      items: verifiedItems,
      verifiedCount: verifiedItems.filter((item) => item.verified).length,
      totalCount: verifiedItems.length,
    };
  },
});