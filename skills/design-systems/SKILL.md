---
name: design-systems
description: Plan design-system architecture and governance from existing components, tokens, ownership, and product adoption. Use for system-level changes rather than one component implementation.
---

# Design systems

## When to use

Use when several products or components need a shared contract, migration, or ownership decision. For one selected design moving into code, use `design-to-code-handoff`; for a token-only change, use `token-architecture`.

## Workflow

1. Read [the architecture guide](references/guide.md), then inventory actual products, component consumers, token sources, story or preview coverage, accessibility checks, and release channels. Name the owner of each source and mark unknown ownership.
2. Identify the smallest shared contract supported by repeated evidence. Separate semantic tokens, component APIs, platform adapters, and product-specific composition. Record where one product legitimately differs.
3. For each proposed change, state affected consumers, owner, compatibility policy, migration path, and rollback. Avoid replacing a working component merely to make taxonomy uniform.
4. Pilot on representative products and states before expanding. Verify theme, responsive, keyboard, and assistive-technology behavior where relevant, and compare stories or previews with product routes that use them.
5. Measure adoption by actual consumers and supported states, plus regressions and exceptions. A growing component count or token count alone does not establish adoption or quality.

## Decision record

Return evidence sources, owners, proposed contracts, alternatives, affected consumers, migration and rollback, verification results, and unresolved differences. Mark unavailable runtime or consumer evidence as unverified. Do not claim cross-platform consistency until each named platform has been checked.
