import { describe, expect, it } from 'vitest';
import { absoluteUrl, withBase } from './urls';

describe('site URLs', () => {
  it('prefixes internal paths with the project base', () => {
    expect(withBase('/services/')).toBe('/us5/services/');
    expect(withBase('/')).toBe('/us5/');
  });

  it('preserves file asset paths without a trailing slash', () => {
    expect(withBase('/favicon.svg')).toBe('/us5/favicon.svg');
  });

  it('creates canonical production URLs', () => {
    expect(absoluteUrl('/privacy/')).toBe('https://usfiveincorporation.github.io/us5/privacy/');
  });
});
