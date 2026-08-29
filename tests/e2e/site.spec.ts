import { expect, test, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const renderedContrast = (locator: Locator) =>
  locator.evaluate((element) => {
    const parseColor = (value: string) => {
      const channels = value.match(/[\d.]+/g)?.map(Number);
      if (!channels || channels.length < 3) throw new Error(`Unsupported color: ${value}`);
      const [red = 0, green = 0, blue = 0, alpha = 1] = channels;
      return [red, green, blue, alpha] as const;
    };
    const style = getComputedStyle(element);
    const foreground = parseColor(style.color);
    const background = parseColor(getComputedStyle(document.body).backgroundColor);
    const alpha = foreground[3] * Number(style.opacity);
    const composite = (index: 0 | 1 | 2) =>
      foreground[index] * alpha + background[index] * (1 - alpha);
    const composited: [number, number, number] = [composite(0), composite(1), composite(2)];
    const backgroundChannels: [number, number, number] = [
      background[0],
      background[1],
      background[2],
    ];
    const luminance = ([red, green, blue]: [number, number, number]) => {
      const linearize = (channel: number) => {
        const normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
    };
    const foregroundLuminance = luminance(composited);
    const backgroundLuminance = luminance(backgroundChannels);
    return (
      (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
      (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
    );
  });

test('home navigation and mobile menu work', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Games that entertain');
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).not.toBeVisible();
});
test('focused buttons retain a dual high-contrast ring', async ({ page }) => {
  await page.goto(process.env.TASK1_BASE_URL ?? './');
  const button = page.getByRole('link', { name: 'Explore our games' });

  await button.focus();

  const focusStyle = await button.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  expect(focusStyle).toEqual({
    outlineColor: 'rgb(244, 245, 247)',
    outlineStyle: 'solid',
    outlineWidth: '3px',
    boxShadow: 'rgb(10, 14, 26) 0px 0px 0px 6px',
  });
});
test('focused secondary buttons retain the dual ring on light surfaces', async ({ page }) => {
  await page.goto(`${process.env.TASK1_BASE_URL ?? './'}404.html`);
  const button = page.getByRole('link', { name: 'Contact US5' });

  await button.focus();

  const focusStyle = await button.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      boxShadow: style.boxShadow,
    };
  });
  expect(focusStyle).toEqual({
    outlineColor: 'rgb(244, 245, 247)',
    outlineStyle: 'solid',
    outlineWidth: '3px',
    boxShadow: 'rgb(10, 14, 26) 0px 0px 0px 6px',
  });
});
test('header navigation hover keeps normal-text contrast', async ({ page }) => {
  await page.goto(process.env.TASK1_BASE_URL ?? './');
  const link = page.getByRole('navigation').getByRole('link', { name: 'About' });

  await link.hover();

  expect(await renderedContrast(link)).toBeGreaterThanOrEqual(4.5);
  await expect(link).toHaveCSS('text-decoration-line', 'underline');
});
test('form instructions meet normal-text contrast', async ({ page }) => {
  await page.goto(`${process.env.TASK1_BASE_URL ?? './'}contact/`);
  const note = page.locator('#form-status');

  const contrast = await renderedContrast(note);

  expect(contrast).toBeGreaterThanOrEqual(4.5);
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
