#!/usr/bin/env node
// Pre-renders the skills grid and the core expertise list into docs/index.html
// so crawlers without JavaScript see the same content as visitors.
//
// Sources of truth:
//   - skills:      skillsDatabase / categoryLabels in docs/js/scripts.js
//   - experiences: docs/data/experiences.txt (one item per line)
//
// Usage: node scripts/prerender.mjs          (rewrite docs/index.html)
//        node scripts/prerender.mjs --check  (exit 1 if index.html is stale)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');
const indexPath = join(docs, 'index.html');

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function extractConst(source, name) {
    const match = source.match(new RegExp(`const ${name} = ([\\[{][\\s\\S]*?\\n[\\]}]);`));
    if (!match) throw new Error(`Could not find "const ${name}" in scripts.js`);
    return vm.runInNewContext(`(${match[1]})`);
}

const scripts = readFileSync(join(docs, 'js', 'scripts.js'), 'utf8');
const skills = extractConst(scripts, 'skillsDatabase');
const labels = extractConst(scripts, 'categoryLabels');
const experiences = readFileSync(join(docs, 'data', 'experiences.txt'), 'utf8')
    .split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

// Keep this markup in sync with renderSkillCards() in docs/js/scripts.js.
const skillsHtml = skills.map((skill) => [
    `<div class="skill-card" data-category="${escapeHtml(skill.category)}">`,
    `    <div class="skill-category">${escapeHtml(labels[skill.category] || skill.category)}</div>`,
    '    <div class="skill-header">',
    `        <h3 class="skill-name">${escapeHtml(skill.name)}</h3>`,
    `        <i class="${escapeHtml(skill.icon)} skill-icon" aria-hidden="true"></i>`,
    '    </div>',
    `    <p class="skill-description">${escapeHtml(skill.description)}</p>`,
    '</div>',
].join('\n')).join('\n');

const experiencesHtml = experiences
    .map((line) => `<li><span class="fa-li"><i class="fas fa-check" aria-hidden="true"></i></span>${escapeHtml(line)}</li>`)
    .join('\n');

function fill(html, name, content) {
    const re = new RegExp(`([ \\t]*)<!-- prerender:${name}:start -->[\\s\\S]*?<!-- prerender:${name}:end -->`);
    const match = html.match(re);
    if (!match) throw new Error(`Missing prerender:${name} markers in index.html`);
    const indent = match[1];
    const body = content.split('\n').map((line) => indent + line).join('\n');
    return html.replace(re, () =>
        `${indent}<!-- prerender:${name}:start -->\n${body}\n${indent}<!-- prerender:${name}:end -->`);
}

const original = readFileSync(indexPath, 'utf8');
let html = fill(original, 'skills', skillsHtml);
html = fill(html, 'experiences', experiencesHtml);
// Technologies stat counts the skills so the static number matches the grid.
html = html.replace(
    /(<div class="stat-value" data-stat="technologies" data-target=")\d+(">)\d+(<\/div>)/,
    `$1${skills.length}$2${skills.length}$3`);

if (process.argv.includes('--check')) {
    if (html !== original) {
        console.error('docs/index.html is out of date. Run: node scripts/prerender.mjs');
        process.exit(1);
    }
    console.log('docs/index.html is up to date.');
} else {
    writeFileSync(indexPath, html);
    console.log(`Pre-rendered ${skills.length} skills and ${experiences.length} expertise items.`);
}
