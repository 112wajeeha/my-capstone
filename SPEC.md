\# Briefly — Project Specification



\## Product



Briefly is an AI meeting-to-action workspace. Users paste meeting notes, and the future AI workflow will turn them into decisions, action items, owners, and deadlines.



\## Problem



Meeting notes are scattered and next steps are unclear. Existing summarizers don't show where each action item came from, so people don't trust them.



\## Users



Small agency teams (3–15 people) and individuals who need to turn meeting notes into clear follow-up tasks.



\## Core Workflow



1\. Add meeting notes.

2\. AI analyzes the notes.

3\. Briefly identifies decisions, action items, owners, and deadlines.

4\. Each action item links back to its source sentence.

5\. Users review and manage the resulting action items.



The app will verify that each quoted source sentence actually exists in the meeting notes.



\## Routes



\* `/` — Meeting dashboard

\* `/new` — Add a meeting

\* `/meeting/\[id]` — Meeting workspace

\* `/actions` — Action-item board

\* `/settings` — User settings

\* `/health` — Application health check



\## AI



AI will be added in a later assignment. The AI will transform pasted meeting notes into structured meeting information and link action items to their source sentences.



\## Technical Scope



\* Next.js App Router

\* TypeScript

\* Tailwind CSS

\* Server Components by default

\* Client Components only when interaction requires them

\* Next.js API routes where needed

\* Simple persistence is acceptable

\* No complex backend



\## Out of Scope



\* Live audio recording

\* Calendar integrations

\* Multi-user accounts



\## Current Status



Skeleton phase (FE-04): routed placeholder pages, root layout, navigation, Tailwind design tokens, a mock-data health check, environment variable structure, and deployment on Vercel. No AI or persistence yet.



