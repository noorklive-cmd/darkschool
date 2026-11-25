---
name: base44-darkads-landing
description: Use the official Base44 skills and builder workflow to prepare or build DarkAds destination pages, keeping proposals separate from user-approved changes.
---

# Base44 workflow for DarkAds

## Official references
Use Base44's maintained skill source: https://github.com/base44/skills

- `base44-platform-frontend`: frontend routes, components, styling, design tokens, and responsive implementation.
- `base44-platform-backend-functions`: server-side functions, secrets, authentication, webhooks, and privileged operations. Use only when the approved scope needs backend behavior.
- `base44-platform-agents`: in-app AI agents and their tools. Use only when Alex asks for a conversational or programmable agent inside the app.
- `base44-cli`: initialize/manage a Base44 project and deploy it.
- `base44-sdk`: build features in an existing Base44 app.

Do not copy the vendor's generated skill files into DarkSchool. Link to the upstream source so it remains current. The official repo lists the supported installation flow; install only the specific skills required for the task.

## Project selection
- First inspect the target directory for `base44/config.jsonc`.
- If absent, do not initialize a Base44 project as a side effect. Ask for or wait for explicit authorization to create a separate Base44 project.
- The current DarkAds destination is a static Sites page, not a Base44 app. Do not add Base44 SDK, auth, database, agents, payment processing, or backend to it automatically.
- If Alex approves a Base44 implementation, inspect the app profile/framework and read the matching official frontend reference before editing.

## Build loop
1. Read DarkSchool `AGENTS.md`, the latest approved DarkAds scope, and the current page.
2. Produce a small, concrete implementation plan and a separate list of optional improvements.
3. Implement only the approved plan. Preserve the supplied copy, price, offer limits, and privacy state.
4. Prepare a desktop and mobile preview. Check real CSS viewport dimensions, links, keyboard access, overflow, and reduced-motion behavior.
5. Stop at the review branch/preview and wait for Alex's approval before merging or publishing.

## Approval behavior
- Suggestions are proposals, not permission to implement.
- Do not change copy unless Alex explicitly supplies or approves the replacement text.
- Do not merge, publish, connect accounts, expose private pages, or set up payment/authentication without explicit approval for that action.
