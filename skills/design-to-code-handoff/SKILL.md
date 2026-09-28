---
name: design-to-code-handoff
description: Carry Figma or Paper design evidence into an existing web codebase, design system, Storybook, and browser verification. Use when an agent must implement a supplied design without losing source context or inventing components.
---

# Design-to-code handoff

## When to use

Use this workflow for a bounded screen or component when a Figma selection, Paper canvas, or exported design must become code in an existing web product. Use `component-catalog` to plan a library without a supplied design and `token-architecture` for a cross-surface token change. A link alone is not a specification: the codebase is the implementation authority and the design is evidence for the intended result.

## 1. Capture the source

Record the exact Figma file and node, Paper canvas and selection, export hash, or screenshot URL; include the source revision or source timestamp. Capture dimensions, variants, interaction states, responsive constraints, text, assets, and linked tokens. Establish acceptance criteria for the requested screen and states with the user or task before coding. If access is unavailable, use supplied exports and mark missing states as unresolved. Do not infer measurements or behavior from a static screenshot.

## 2. Map to the existing system

Read local instructions, tokens, components, Storybook stories, routes, and test conventions before editing. Make a short mapping table for each significant element:

| Design element and source | Existing component/token | Decision | Confidence and open difference |
| --- | --- | --- | --- |

Mark a decision as **reuse**, **extend**, or **new**. Reuse only when semantics, behavior, and supported states fit; a visual resemblance alone is insufficient. Before extending or adding, check the component API, callers, stories, and accessibility contract. If the design conflicts with an existing token or component, record the conflict and resolve it against the system owner or task requirements; do not quietly fork the system. Give confidence as high, medium, or low and name the supporting evidence.

## 3. Implement a thin slice

Start with the smallest representative state and use the repository's component API, token names, accessibility conventions, and test setup. Add or update Storybook stories for applicable default, interactive, empty, loading, error, and disabled states; omit inapplicable states explicitly. If the project has no Storybook, use its existing component preview or test fixture and record that substitution. Keep source assets traceable and check their use rights. Stop and surface a decision when interaction, asset rights, or responsive behavior is unknown and would change the implementation contract.

## 4. Verify the result

Run relevant unit and interaction tests, then inspect the rendered page in a browser at the design viewport and at a narrow viewport. Compare layout, type, color, spacing, assets, focus, keyboard behavior, and responsive behavior. Exercise each applicable story or preview state, not just the default screen. Use screenshot comparison only with repeatable viewport, browser, font, and data settings. Fix material differences against the acceptance criteria; list any unresolved difference with its reason and owner. A passing build or single screenshot does not prove visual or interaction parity.

## Handoff receipt

Return the source links or export hashes, design timestamp, component/token mapping, files and stories changed, commands and browser viewports checked, links or paths to visual evidence, confidence for ambiguous mappings, and unresolved differences. State explicitly when the design source, Storybook, or browser was unavailable. Route Figma-specific extraction through `figma-implement-design`; use `memoire-design-tooling` when a Memi installation is available for the local brief and audit.
