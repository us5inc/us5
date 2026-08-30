/* global process, URL */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const baseURL = process.argv[2] ?? 'http://127.0.0.1:4321/us5/';
const widths = [320, 390, 800, 1440];
const routes = [
  ['home', ''],
  ['products', 'products/'],
  ['contact', 'contact/'],
  ['privacy', 'privacy/'],
];
const output = 'artifacts/visual-review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of widths) {
  await page.setViewportSize({ width, height: 1000 });
  for (const [name, route] of routes) {
    await page.goto(new URL(route, baseURL).toString(), { waitUntil: 'networkidle' });
    await page.screenshot({ path: join(output, `${name}-${width}.png`), fullPage: true });
  }
}
await browser.close();
