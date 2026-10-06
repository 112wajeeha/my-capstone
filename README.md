# Briefly — AI Meeting-to-Action Workspace

Briefly is an AI-powered meeting workspace that turns meeting notes into clear, actionable outcomes.

It uses an AI chat interface to analyze meeting notes, identify decisions and action items, extract owners and deadlines, and verify that each action item is supported by the original meeting notes.

This project is being developed as part of the **FlyRank AI Frontend AI Engineering Internship**.

## Features

* Responsive meeting workspace
* AI-powered streaming chat
* Meeting notes analysis
* Action-item extraction
* Owner and deadline identification
* Source-sentence verification
* Structured AI tool results
* Tool lifecycle states
* Designed tool error state
* Markdown and table rendering in AI responses
* Stop button for active AI responses
* Auto-scroll with support for manual scrolling
* Mobile-friendly interface
* Health-check route
* Responsive layouts for mobile and desktop

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* AI SDK
* Groq
* Zod
* React Markdown
* Remark GFM
* Node.js
* npm
* Git
* GitHub
* Vercel

## AI Architecture

Briefly uses the AI SDK to connect the chat interface with a server-side AI model.

The main flow is:

```text
Meeting Notes
     ↓
Chat Interface
     ↓
AI Model
     ↓
extractActionItems Tool
     ↓
Source Sentence Verification
     ↓
Structured Tool Result
     ↓
Action Items UI
```

The AI model is configured in:

```text
lib/ai/config.ts
```

The server-side chat route is:

```text
app/api/chat/route.ts
```

The application currently uses Groq with the `openai/gpt-oss-20b` model through the AI SDK.

## Project Structure

```text
my-capstone/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── actions/
│   │   └── page.tsx
│   ├── health/
│   │   └── route.ts
│   ├── meeting/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── new/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ActionItemsResult.tsx
│   ├── Chat.tsx
│   ├── Nav.tsx
│   └── ToolCard.tsx
│
├── lib/
│   └── ai/
│       ├── config.ts
│       └── tools.ts
│
├── public/
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
└── SPEC.md
```

## Routes

| Route           | Purpose                       |
| --------------- | ----------------------------- |
| `/`             | Dashboard                     |
| `/new`          | Create a new meeting          |
| `/meeting/[id]` | Meeting workspace and AI chat |
| `/actions`      | Action items workspace        |
| `/settings`     | Application settings          |
| `/health`       | Application health check      |
| `/api/chat`     | Streaming AI chat API         |

## AI Streaming Chat

The meeting workspace uses a streaming AI chat interface.

The client uses the AI SDK's `useChat` functionality to communicate with the server route:

```text
POST /api/chat
```

The server uses `streamText` to stream the AI response back to the browser.

The interface supports:

* User and assistant messages
* Streaming responses
* Thinking state
* Stop generation
* Markdown rendering
* Tables
* Automatic scrolling
* Manual scroll position preservation
* Tool result rendering

## Tool: extractActionItems

Briefly includes a server-side AI tool named:

```text
extractActionItems
```

Its purpose is to extract action items from meeting notes and verify that each source sentence actually exists in the original notes.

The tool is defined in:

```text
lib/ai/tools.ts
```

The tool uses a Zod schema to validate its input.

### Tool Input

```text
{
  notes: string,
  items: [
    {
      task: string,
      owner?: string,
      deadline?: string,
      sourceSentence: string
    }
  ]
}
```

### Tool Output

```text
{
  items: [
    {
      task: string,
      owner?: string,
      deadline?: string,
      sourceSentence: string,
      verified: boolean
    }
  ],
  verifiedCount: number,
  totalCount: number
}
```

### Verification

For every extracted action item, the server checks whether:

```text
sourceSentence
```

exists in:

```text
notes
```

If it exists, the result contains:

```text
verified: true
```

Otherwise:

```text
verified: false
```

This helps prevent the AI from presenting unsupported action items as confirmed meeting outcomes.

## Tool Lifecycle UI

The application renders different UI states for the `extractActionItems` tool:

### Input Streaming

Displays a loading state while tool input is being prepared.

```text
Reading your notes...
```

### Input Available

Shows that Briefly is processing the tool request and provides a human-readable summary instead of exposing raw JSON.

```text
Extracting action items
```

### Output Available

Displays the structured result as an Action Items component containing:

* Task
* Owner
* Deadline
* Source sentence
* Verification status

### Output Error

Displays a dedicated error state when tool execution fails.

The error state includes:

* Error icon
* Explanation
* Retry action

The AI SDK supports these tool lifecycle states, including input streaming, input available, output available, and output error.

## Action Items UI

Successful tool results are rendered using:

```text
components/ActionItemsResult.tsx
```

Each action item displays its supporting source sentence and a verification badge.

Example:

```text
Action items

2 of 2 source sentences verified

Sarah
Prepare the homepage copy
Deadline: Wednesday
✓ Verified source
```

This makes the structured tool output useful to the user rather than displaying raw tool JSON.

## Error Handling

The tool intentionally handles invalid input.

For example, if no meeting notes are available or no action items are found, the server-side tool throws an error.

The chat interface converts this into a dedicated error card rather than leaving the user with an unexplained failure.

This provides a clear failure path for tool execution errors.

## Environment Variables

Secrets are stored locally in `.env.local` and are never committed to Git.

A safe example file is provided:

```text
.env.example
```

The repository does not contain API keys or other secret credentials.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/112wajeeha/my-capstone.git
```

### 2. Enter the project directory

```bash
cd my-capstone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a local environment file:

```text
.env.local
```

Add the required AI provider key using the variable expected by the project.

Do not commit `.env.local`.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

The application currently builds successfully with the configured Next.js routes and AI functionality.

## Deployment

The project is connected to GitHub and deployed through Vercel.

The deployment workflow supports preview deployments for changes pushed to the repository.

## Git Workflow

This project uses Git and GitHub for version control.

Commit messages follow the Conventional Commits style.

Examples:

```text
feat: add streaming AI meeting chat

feat: add action item extraction tool

fix: improve mobile navigation

fix: handle duplicate tool errors

docs: update README

chore: update dependencies
```

## AI-Assisted Development

AI tools are used as development partners throughout the project.

AI assistance has been used for:

* Understanding technical concepts
* Exploring implementation approaches
* Debugging
* Reviewing code
* Improving UI structure
* Documentation
* Testing ideas
* Understanding AI SDK functionality

All generated suggestions are reviewed and tested before being incorporated into the project.

## Project Specification

The lightweight product and technical specification is documented in:

```text
SPEC.md
```

The specification describes the product purpose, workflow, routes, technical scope, and planned functionality.

## Current Status

**In Development**

The Briefly application currently includes:

* Core application structure
* Responsive navigation
* Meeting workspace
* Streaming AI chat
* Groq AI integration
* Server-side AI tool
* Zod tool schema
* Action-item extraction
* Source verification
* Structured tool-result UI
* Tool lifecycle states
* Error-state UI
* Responsive layouts
* Production build validation
* GitHub and Vercel deployment workflow

## Internship

**Program:** FlyRank AI Internship
**Track:** Frontend AI Engineering

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
