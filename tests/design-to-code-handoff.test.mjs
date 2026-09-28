import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFile(path.join(root, file), "utf8");

test("design-to-code handoff is a discoverable, attributed workflow", async () => {
  const skill = await read("skills/design-to-code-handoff/SKILL.md");
  const registry = JSON.parse(await read("registry/skills.json"));
  const provenance = JSON.parse(await read("provenance.json"));
  const implementation = JSON.parse(await read("registry/collections/implementation.json"));
  const entry = registry.skills.find(({ name }) => name === "design-to-code-handoff");

  assert.match(skill, /^---\nname: design-to-code-handoff\ndescription: [^\n]+\n---/);
  for (const evidence of ["Figma", "Paper", "Storybook", "source", "confidence", "unresolved", "component", "token", "browser", "receipt"]) {
    assert.match(skill, new RegExp(evidence, "i"), `${evidence} must be explicit in the workflow`);
  }
  assert.equal(entry.status, "canonical");
  assert.equal(entry.routing.role, "primary");
  assert.equal(entry.runtime.portability, "portable");
  assert.ok(implementation.include.includes(entry.name));
  assert.ok(provenance.sources["design-skills-first-party"].skills.includes(entry.name));
});

test("paid source text stays excluded from the public skill", async () => {
  const skill = await read("skills/design-to-code-handoff/SKILL.md");
  assert.doesNotMatch(skill, /aiforui\.dev\/|interfacecraft\.dev\/api\/install-skills/);
});
