---
name: component-catalog
description: Decide which interface components to reuse, extend, or add from observed product patterns and the existing codebase. Use for component-library coverage or design-to-code planning.
---

# Component catalog

## When to use

Use for a bounded product surface with repeated patterns, or when a supplied design does not clearly map to existing components. For implementation of one Figma or Paper selection, use `design-to-code-handoff` first. Do not use a universal inventory as a build list.

## Workflow

1. Inventory actual routes, workflows, states, and repeated patterns. Read local instructions, component APIs, tokens, existing stories or component previews, and consumers. Record where each candidate appears.
2. Use [the component catalog](references/catalog.md) as a vocabulary check. Identify the smallest semantic component that covers observed behavior. Do not assume Atomic Design or shadcn/ui is installed; use either only when the repository follows it.
3. For each candidate choose **reuse**, **extend**, or **new**. Reuse when semantics, interaction, accessibility, and states fit. Extend when the API can support a missing state without breaking current callers. Add only when the needed behavior has a distinct contract. Record the alternative considered and why it fails.
4. Specify the public API, supported variants, states, composition, keyboard behavior, focus management, responsive behavior, and token dependencies. Keep visual variants separate from semantic behavior.
5. Verify the decision with representative callers and a Storybook story or existing component preview. Test keyboard and touch interaction for controls. Check that the proposed API covers observed states without one-off overrides.

## Output

| Pattern and evidence | Existing component | Decision and reason | Required states and contract | Verification | Unresolved |
| --- | --- | --- | --- | --- | --- |

Name missing source evidence or unavailable previews. A component count is not evidence of coverage; report the observed workflows and states that are covered instead.
