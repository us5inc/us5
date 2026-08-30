/* global process, URL */
import { chromium } from '@playwright/test';
import { mkdir, rename, rm } from 'node:fs/promises';
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
const staging = `${output}.staging`;
const backup = `${output}.backup`;

await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });

try {
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      for (const [name, route] of routes) {
        await page.goto(new URL(route, baseURL).toString(), { waitUntil: 'networkidle' });
        await page.screenshot({ path: join(staging, `${name}-${width}.png`), fullPage: true });
      }
    }
  } finally {
    await browser?.close();
  }

  await rm(backup, { recursive: true, force: true });
  let previousOutput = false;
  try {
    await rename(output, backup);
    previousOutput = true;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  try {
    await rename(staging, output);
  } catch (error) {
    if (previousOutput) await rename(backup, output);
    throw error;
  }
  if (previousOutput) await rm(backup, { recursive: true, force: true });
} finally {
  await rm(staging, { recursive: true, force: true });
}
