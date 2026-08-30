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
    const ownBackground = parseColor(style.backgroundColor);
    const background =
      ownBackground[3] > 0
        ? ownBackground
        : parseColor(getComputedStyle(document.body).backgroundColor);
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
  const productsLink = page.getByRole('link', { name: 'Products' });
  await productsLink.focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Toggle navigation' })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
test('home keeps one page heading and the featured product visible across breakpoints', async ({
  page,
}) => {
  const pageHeading = page.getByRole('heading', { level: 1 });
  const productHeading = page.getByRole('heading', { level: 2, name: 'Neon Bubble Galaxy' });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('./');
  await expect(pageHeading).toHaveCount(1);
  await expect(productHeading).toBeVisible();

  await page.setViewportSize({ width: 320, height: 700 });
  await expect(pageHeading).toHaveCount(1);
  await expect(productHeading).toBeVisible();
});
test('home diagram settles immediately for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const trace = page.locator('.hero-mark-trace');
  await expect(trace).toHaveCSS('animation-name', 'none');
  await expect(trace).toHaveCSS('stroke-dashoffset', '0px');
  await expect(page.getByRole('heading', { name: 'Neon Bubble Galaxy' })).toBeVisible();
});
test('key routes do not overflow at 320 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of ['./', './products/', './contact/', './privacy/']) {
    await page.goto(route);
    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content, `${route} should fit the viewport`).toBeLessThanOrEqual(widths.viewport);
  }
});
test('navigation exposes the current route', async ({ page }) => {
  await page.goto('./services/');
  await expect(page.getByRole('link', { name: 'Services' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
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
test('404 actions remain visible and accessible on the light hero', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(`${process.env.TASK1_BASE_URL ?? './'}404.html`);

  const returnHome = page.getByRole('link', { name: 'Return home' });
  const contact = page.getByRole('link', { name: 'Contact US5' });
  await expect(returnHome).toBeVisible();
  await expect(contact).toBeVisible();
  await expect(returnHome).toHaveText('Return home');
  await expect(contact).toHaveText('Contact US5');
  expect(await renderedContrast(returnHome)).toBeGreaterThanOrEqual(4.5);
  expect(await renderedContrast(contact)).toBeGreaterThanOrEqual(4.5);

  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations.filter((item) => item.id === 'color-contrast')).toEqual([]);
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
test('contact briefing and form panel reflow without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('./contact/');
  const brief = page.locator('.contact-brief');
  const panel = page.locator('.contact-form-panel');
  const directEmail = brief.getByRole('link', { name: 'usfiveincorporation@gmail.com' });

  await expect(brief).toContainText('Your email application will open with a prepared message.');
  await expect(brief).toContainText('Nothing is stored by this website.');
  await expect(directEmail).toHaveAttribute('href', 'mailto:usfiveincorporation@gmail.com');
  const desktopBrief = await brief.boundingBox();
  const desktopPanel = await panel.boundingBox();
  expect(desktopBrief).not.toBeNull();
  expect(desktopPanel).not.toBeNull();
  expect(desktopBrief!.x).toBeLessThan(desktopPanel!.x);

  await page.setViewportSize({ width: 320, height: 700 });
  const mobileBrief = await brief.boundingBox();
  const mobilePanel = await panel.boundingBox();
  expect(mobileBrief).not.toBeNull();
  expect(mobilePanel).not.toBeNull();
  expect(mobileBrief!.y).toBeLessThan(mobilePanel!.y);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test('contact explains and validates email fallback', async ({ page }) => {
  await page.goto('./contact/');
  await expect(page.getByText('Nothing is stored by this website.')).toBeVisible();
  const name = page.getByLabel('Name');
  const email = page.getByLabel('Email');
  const service = page.getByLabel('Service required');
  const summary = page.getByLabel('Project summary');
  const consent = page.getByLabel(/I agree that US5 Incorporation/);
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByText('Please correct the highlighted fields.')).toBeVisible();
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAttribute('aria-describedby', 'name-error');
  await expect(page.locator('#name-error')).not.toBeEmpty();
  await expect(page.locator('#name-error')).not.toHaveAttribute('style', /color/i);
  await expect(name).toHaveCSS('border-left-width', '2px');
  await expect(page.locator('#name-error')).toHaveCSS('border-left-width', '2px');
  await expect(consent).toHaveCSS('outline-width', '2px');
  for (const [control, errorId] of [
    [email, 'email-error'],
    [service, 'service-error'],
    [summary, 'summary-error'],
    [consent, 'consent-error'],
  ] as const) {
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', errorId);
    await expect(page.locator(`#${errorId}`)).not.toBeEmpty();
  }

  await name.fill('Ada Lovelace');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(name).toHaveAttribute('aria-invalid', 'false');
  await expect(email).toBeFocused();

  await email.fill('ada@example.com');
  await service.selectOption('UI/UX design');
  await summary.fill('Please help us improve a focused mobile product experience.');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();

  for (const control of [name, email, service, summary]) {
    await expect(control).toHaveAttribute('aria-invalid', 'false');
  }
  await expect(consent).toBeFocused();
  await expect(consent).toHaveAttribute('aria-invalid', 'true');
  await expect(consent).toHaveAttribute('aria-describedby', 'consent-error');
  await expect(page.locator('#consent-error')).not.toBeEmpty();

  await consent.check();
  await summary.fill('');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(summary).toBeFocused();
  await expect(summary).toHaveAttribute('aria-invalid', 'true');
  await expect(consent).toHaveAttribute('aria-invalid', 'false');
});
test('key pages and the open mobile menu have no serious accessibility violations', async ({
  page,
}) => {
  for (const route of [
    './',
    './products/',
    './products/neon-bubble-galaxy/',
    './services/',
    './contact/',
    './privacy/',
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? '')),
      `${route} should have no serious or critical violations`,
    ).toEqual([]);
  }

  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('./');
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  const menuResult = await new AxeBuilder({ page }).analyze();
  expect(
    menuResult.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? '')),
    'open mobile menu should have no serious or critical violations',
  ).toEqual([]);
});
