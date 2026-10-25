#!/usr/bin/env node
/**
 * Assembles the shared header and footer partials into the site pages.
 *
 * A component exports its embeddable markup by wrapping it in
 *   <!-- @partial:start --> ... <!-- @partial:end -->
 * and a page asks for it with
 *   <!-- @include <name> --> ... <!-- @endinclude -->
 *
 * The region between the two page markers is regenerated on every run, which
 * makes the script idempotent. The generated markup is committed, so the site
 * still works when the HTML is opened straight from the filesystem.
 *
 * Run with:  node scripts/build.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Partial name -> component document that exports it. */
const PARTIALS = {
  header: 'components/header.html',
  'header-authenticated': 'components/header-authenticated.html',
  footer: 'components/footer.html',
  'footer-extended': 'components/footer-extended.html',
};

/**
 * Page -> the partials it embeds. Pages missing here keep their own markup:
 * the auth screens are full-height centred forms with a bespoke minimal footer.
 */
const PAGES = {
  'index.html': { header: 'header', footer: 'footer-extended' },
  'pages/welcome.html': { header: 'header', footer: 'footer-extended' },
  'pages/story-overview.html': { header: 'header', footer: 'footer' },
  'pages/story-reader.html': { header: 'header', footer: 'footer' },
  'pages/creator-profile.html': { header: 'header', footer: 'footer' },
  'pages/profile.html': { header: 'header-authenticated', footer: 'footer' },
  'pages/profile-legacy.html': { header: 'header-authenticated', footer: 'footer' },
  'pages/edit-profile.html': { header: 'header-authenticated', footer: 'footer' },
  'pages/account-settings.html': { header: 'header-authenticated', footer: 'footer' },
};

const INCLUDE_RE =
  /^([ \t]*)<!-- @include ([a-z0-9-]+) -->[ \t]*\r?\n([\s\S]*?)^[ \t]*<!-- @endinclude -->[ \t]*\r?$/gm;

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/** Markup a component exports for embedding, dedented to column 0. */
function partial(name) {
  const file = PARTIALS[name];
  if (!file) throw new Error(`unknown partial "${name}"`);
  const source = read(file).split(/\r?\n/);
  const start = source.findIndex((l) => l.includes('<!-- @partial:start -->'));
  const end = source.findIndex((l) => l.includes('<!-- @partial:end -->'));
  if (start === -1 || end === -1) throw new Error(`${file} is missing its @partial markers`);

  const body = source.slice(start + 1, end);
  const indents = body.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const base = Math.min(...indents);
  return body.map((l) => l.slice(base)).join('\n').replace(/^\n+|\s+$/g, '');
}

/** Stylesheet and script tags a page needs for the partials it embeds. */
function assets(page, use) {
  const prefix = path.dirname(page) === '.' ? 'assets/' : '../assets/';
  const names = [use.header, use.footer].filter(Boolean);
  return {
    'component-styles': names.map(
      (n) => `<link rel="stylesheet" href="${prefix}css/components/${n}.css">`,
    ),
    'component-scripts': names.map(
      (n) => `<script src="${prefix}js/components/${n}.js"></script>`,
    ),
  };
}

const indentBlock = (text, indent) =>
  text
    .split('\n')
    .map((l) => (l.trim() === '' ? '' : indent + l))
    .join('\n');

let failures = 0;

for (const [page, use] of Object.entries(PAGES)) {
  const file = path.join(ROOT, page);
  const eol = /\r\n/.test(fs.readFileSync(file, 'utf8')) ? '\r\n' : '\n';
  const before = fs.readFileSync(file, 'utf8');
  const names = assets(page, use);
  const seen = new Set();
  const assetsPrefix = path.dirname(page) === '.' ? 'assets/' : '../assets/';

  const after = before.replace(INCLUDE_RE, (match, indent, name, previous) => {
    // `header` and `footer` are placeholders: which component they pull in
    // depends on the page, so the PAGES table above decides.
    let body;
    if (name === 'header' || name === 'footer') {
      body = partial(use[name]).replaceAll('../assets/', assetsPrefix);
    } else if (name in names) {
      body = names[name].join('\n');
    } else {
      failures++;
      console.error(`  ! ${page}: no such include "${name}"`);
      return match;
    }
    seen.add(name);
    return `${indent}<!-- @include ${name} -->\n${indentBlock(body, indent)}\n${indent}<!-- @endinclude -->`;
  });

  for (const required of ['header', 'footer', 'component-styles', 'component-scripts']) {
    if (!seen.has(required)) {
      failures++;
      console.error(`  ! ${page}: missing <!-- @include ${required} --> marker`);
    }
  }

  const normalized = after.replace(/\r?\n/g, eol);
  if (normalized !== before) {
    fs.writeFileSync(file, normalized);
    console.log(`  built ${page}`);
  } else {
    console.log(`  ok    ${page}`);
  }
}

if (failures) {
  console.error(`\n${failures} problem(s) found`);
  process.exit(1);
}
console.log('\ndone');
