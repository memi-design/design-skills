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

test("implementation skills carry evidence through reuse and verification without assuming a stack", async () => {
  const [handoff, components, tokens, systems] = await Promise.all([
    read("skills/design-to-code-handoff/SKILL.md"),
    read("skills/component-catalog/SKILL.md"),
    read("skills/token-architecture/SKILL.md"),
    read("skills/design-systems/SKILL.md"),
  ]);

  for (const skill of [handoff, components, tokens, systems]) {
    assert.match(skill, /when to use/i);
    assert.match(skill, /verification|verify/i);
    assert.match(skill, /unresolved|unknown|unavailable/i);
  }
  assert.match(handoff, /source revision|source timestamp/i);
  assert.match(handoff, /acceptance criteria/i);
  assert.match(components, /reuse|extend|new/i);
  assert.match(components, /Storybook|component preview/i);
  assert.match(tokens, /source of truth/i);
  assert.match(tokens, /breaking change|migration/i);
  assert.doesNotMatch(tokens, /memi tokens (pull|push|diff)/);
  assert.doesNotMatch(tokens, /Figma wins for visual design decisions/);
  assert.match(systems, /owner|ownership/i);
  assert.match(systems, /adoption/i);
});

test("rewritten inherited workflows keep immutable origin but advertise current portable source", async () => {
  const registry = JSON.parse(await read("registry/skills.json"));
  const catalog = JSON.parse(await read("catalog.json"));
  const provenance = JSON.parse(await read("provenance.json"));
  const original = provenance.sources.memoire;
  const current = provenance.sources["design-skills-first-party"];
  assert.match(original.commit, /^[a-f0-9]{40}$/);
  assert.equal(current.revision, "repository-local");

  for (const name of ["component-catalog", "design-systems", "token-architecture"]) {
    const entry = registry.skills.find((skill) => skill.name === name);
    const generated = catalog.skills.find((skill) => skill.name === name);
    assert.ok(original.skills.includes(name), `${name} preserves inherited attribution`);
    assert.equal(generated.source, original.repository);
    assert.equal(generated.sourceRevision, original.commit);
    assert.ok(entry.sourceUrls.includes(current.repository), `${name} links to the maintained workflow`);
    assert.deepEqual(entry.engines, {}, `${name} has no Memi runtime requirement`);
    assert.equal(entry.runtime.portability, "portable");
  }
});
