---
name: design-to-code-handoff
description: Carry Figma or Paper design evidence into an existing web codebase, design system, Storybook, and browser verification. Use when an agent must implement a supplied design without losing source context or inventing components.
---

# Design-to-code handoff

Use this workflow for a bounded screen or component. The codebase is the implementation authority; the design is evidence for the intended result. A link alone is not a specification.

## 1. Capture the source

Record the exact Figma selection, Paper canvas, export, or screenshot URL and the time it was read. Capture dimensions, variants, interaction states, responsive constraints, text, assets, and any linked tokens. If access is unavailable, use supplied exports and mark the missing states as unresolved. Do not invent a value from a screenshot when it cannot be measured.

## 2. Map to the existing system

Read local instructions, tokens, components, Storybook stories, routes, and test conventions before editing. Make a short mapping table for each significant element:

| Design element and source | Existing component/token | Decision | Confidence and open difference |
| --- | --- | --- | --- |

Mark a decision as **reuse**, **extend**, or **new**. Prefer reuse when behavior and semantics fit. If the design conflicts with an existing token or component, record the conflict and resolve it against the system owner or task requirements; do not quietly fork the system. Give confidence as high, medium, or low and say what evidence supports it.

## 3. Implement a thin slice

Start with the smallest representative state. Use the repository's component API, token names, accessibility conventions, and test setup. Add or update a Storybook story for default, interactive, empty, loading, error, and disabled states that apply. If the project has no Storybook, use its existing component preview or test fixture and record that substitution. Keep source assets traceable and check their use rights.

## 4. Verify the result

Run relevant unit and interaction tests, then inspect the rendered page in a browser at the design viewport and at a narrow viewport. Compare layout, type, color, spacing, assets, focus, keyboard behavior, and responsive behavior. Use screenshot comparison only when repeatable capture settings exist. Fix material differences; list any unresolved difference with its reason and owner. Do not claim pixel parity from a single screenshot.

## Handoff receipt

Return the source links or export hashes, design timestamp, component/token mapping, files and stories changed, commands and browser viewports checked, links or paths to visual evidence, confidence for ambiguous mappings, and unresolved differences. State explicitly when the design source, Storybook, or browser was unavailable. Route Figma-specific extraction through `figma-implement-design`; use `memoire-design-tooling` when a Memi installation is available for the local brief and audit.
