/* global console, process */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
const root = 'dist';
const files = [];
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).forEach((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : files.push(join(dir, entry.name)),
  );
walk(root);
const html = files.filter((file) => extname(file) === '.html');
const errors = [];
const required = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'digital-solutions/index.html',
  'contact/index.html',
  'support/index.html',
  'privacy/index.html',
  'terms/index.html',
  'data-deletion/index.html',
  'products/index.html',
  '404.html',
];
for (const file of required) if (!existsSync(join(root, file))) errors.push(`Missing ${file}`);
for (const file of html) {
  const text = readFileSync(file, 'utf8');
  if (
    /\[(?:COMPANY|PHONE|CITY|APP|GITHUB)[^\]]*\]|lorem ipsum|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/i.test(
      text,
    )
  )
    errors.push(`Unresolved or sensitive content in ${file}`);
  for (const match of text.matchAll(/(?:href|src)="(\/us5\/[^"?#]*)/g)) {
    const path = match[1];
    if (
      !path ||
      path.endsWith('.webmanifest') ||
      path.endsWith('.svg') ||
      path.includes('/_astro/')
    )
      continue;
    const relative = path.replace(/^\/us5\//, '');
    const target = relative.endsWith('/')
      ? join(root, relative, 'index.html')
      : join(root, relative);
    if (!existsSync(target)) errors.push(`Broken ${path} in ${file}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Verified ${html.length} HTML files and all local navigation targets.`);
