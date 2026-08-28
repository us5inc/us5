import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('home navigation and mobile menu work', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Games that entertain');
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).not.toBeVisible();
});
test('contact explains and validates email fallback', async ({ page }) => {
  await page.goto('./contact/');
  await expect(page.getByText('Nothing is stored by this website.')).toBeVisible();
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByText('Please correct the highlighted fields.')).toBeVisible();
});
test('key pages have no serious accessibility violations', async ({ page }) => {
  for (const route of ['./', './services/', './contact/', './privacy/']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? '')),
    ).toEqual([]);
  }
});
