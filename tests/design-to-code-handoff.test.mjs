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

test("public workflow does not embed paid installer URLs", async () => {
  const skill = await read("skills/design-to-code-handoff/SKILL.md");
  assert.doesNotMatch(skill, /aiforui\.dev\/|interfacecraft\.dev\/api\/install-skills/);
});

test("first-party provenance points to the current organization", async () => {
  const provenance = JSON.parse(await read("provenance.json"));
  const catalog = JSON.parse(await read("catalog.json"));
  const repository = "https://github.com/memi-design/design-skills";
  assert.equal(provenance.sources["design-skills-first-party"].repository, repository);
  for (const skill of catalog.skills.filter(({ origin }) => origin === "design-skills-first-party")) {
    assert.equal(skill.source, repository, `${skill.name} has stale generated provenance`);
  }
});
