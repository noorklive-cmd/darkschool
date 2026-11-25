---
name: darkads-reference-audit
description: Audit the DarkAds destination page against an explicitly supplied visual reference, record desktop and mobile states, and wait for approval before editing. Use when Alex requests a reference audit, a mobile review, or a close visual reproduction.
---

# DarkAds Reference Audit

## Scope
- Use the reference named by Alex in the current task. Treat the reference as a visual specification only for the elements he requests.
- Inspect desktop and mobile. Capture the initial viewport, each major section, open/closed accordions, selected tabs, sticky actions, and motion states that are reproducible.
- Record what was directly observed separately from estimates and inferred implementation details. Never claim frame-by-frame timing or a library/framework without evidence.
- Preserve the approved DarkAds copy and product facts. Do not invent proof, counts, revenue claims, urgency, product contents, or guarantees.
- Keep DarkAds-owned identity assets. Do not copy another brand's logo, mascot, source code, testimonials, or exact copy.

## Approval gate
1. Produce a findings list and a change map from reference element → proposed DarkAds element.
2. Separate required changes from optional improvements.
3. Do not modify sales-page copy or code until Alex has asked for those modifications.
4. When Alex asks for implementation, change only the named items. Put any additional ideas in a clearly labeled proposal list and leave them unapplied.
5. Do not merge, deploy, publish, or broaden access until Alex approves the preview.

## Mobile review
- Use a real responsive viewport around 390 × 844 CSS pixels where available.
- Check horizontal overflow, text wrapping, CTA visibility, safe-area spacing, sticky UI overlap, keyboard focus, and reduced-motion behavior.
- Save the mobile demo beside the page as `sites/darkads/mobile-demo.html`; it should iframe the current `index.html` at a phone-sized viewport, not fork or rewrite the landing page.
- Report browser or environment restrictions accurately; a zoomed desktop is not equivalent to a device-emulated viewport.

## Deliverables
- A dated audit in `pesquisas/`.
- The live or local preview link, exact viewport used, observed issues, and approval status.
- A list of files changed. No changes outside the requested scope.
