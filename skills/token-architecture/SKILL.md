---
name: token-architecture
description: Map design values to an existing token system and plan safe token changes across themes and consumers. Use for token drift, Figma variable alignment, or cross-surface theming.
---

# Token architecture

## When to use

Use when a design value affects more than one component, theme, or platform, or when Figma/Paper values disagree with code tokens. For a single screen implementation, begin with `design-to-code-handoff`; this skill handles the token decision within that workflow. Do not introduce a new tier system merely because the current naming differs from an example.

## Establish the source of truth

1. Read the repository's design-system docs, token files, generated outputs, theme code, and any Figma variable mapping. Identify the actual source of truth and its owner; do not assume Figma or code always wins. Distinguish authored files from generated files and do not edit generated output directly.
2. Inventory consumers: CSS custom properties, Tailwind configuration, component styles, Storybook stories, native outputs, and design variables where present. Record which are in scope and which cannot be inspected.
3. Capture the exact design source and revision or timestamp, relevant mode, token name, value, and usage. A screenshot color sample is an approximation, not a verified token reference.

## Decide the smallest change

| Design use and source | Existing semantic token | Consumers and modes | Decision | Owner and unresolved difference |
| --- | --- | --- | --- | --- |

- **Reuse** an existing semantic token when the intent and supported modes match, even if a raw value differs slightly in one screenshot. Explain material visual differences.
- **Extend** an existing token or add a semantic alias when multiple consumers share a new intent. Keep primitives and component-specific values in the layers the repository already uses.
- **Add** a component token only when that component needs a distinct stable contract. Avoid one token per screenshot value and avoid bypassing the system with hardcoded values.
- **Defer** when ownership, modes, or the intended semantic meaning is unknown. Record the decision needed rather than inventing a color or propagating an unreviewed design change.

Names should describe purpose rather than current appearance where the repository convention allows it. Check foreground/background pairs, hover, focus, disabled, error, light/dark, and high-contrast modes that the product supports. A value change to a shared token may be a breaking change for consumers even without a rename; inspect actual usage before classifying it.

## Change and migration

For every changed or removed token, list affected consumers and visual risk. Preserve compatibility aliases or plan a migration when callers cannot all move at once. Document the owner, staged change, rollback, and when old names may be removed. Use the project's established versioning policy; do not assume a universal two-release deprecation period or automatic semantic-version bump.

## Verification

Run the repository's token build or validation command if one exists. Inspect generated outputs only after regeneration. Compare representative components and routes in every changed theme and viewport, including a Storybook story or component preview when available. Run relevant contrast and visual regression checks; inspect focus and state variants separately. Verify that a referenced token resolves in each required mode and that no consumer silently falls back to an unintended raw value.

## Output

Return the source-of-truth decision and owner, the mapping table, affected files and consumers, migration and rollback, commands and previews checked, plus unresolved or unavailable evidence. Do not claim design-code parity from token equality alone; component composition, typography, assets, and interaction still need independent verification.
