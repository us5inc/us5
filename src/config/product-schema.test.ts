import { describe, expect, it } from 'vitest';
import { productSchema } from './product-schema';
const valid = {
  name: 'Sample',
  slug: 'sample',
  developer: 'US5 Incorporation',
  description: 'A verified description.',
  category: 'Game',
  packageName: 'com.us5.sample',
  playUrl: 'https://play.google.com/store/apps/details?id=com.us5.sample',
  supportEmail: 'usfiveincorporation@gmail.com',
  effectiveDate: '2026-08-28',
  updatedDate: '2026-08-28',
  features: ['Verified feature'],
  children: false,
  directCollection: [],
  sdkProcessing: [],
  sharing: [],
  advertising: false,
  analytics: false,
  crashReporting: false,
  purchases: false,
  accounts: false,
  location: false,
  deviceIdentifiers: false,
  retention: 'Retained only as needed.',
  security: 'Reasonable safeguards are used.',
  rights: 'Contact support.',
  deletion: 'Email support to request deletion.',
  providers: [],
};
describe('product privacy configuration', () => {
  it('accepts a complete explicit product record', () =>
    expect(productSchema.parse(valid).slug).toBe('sample'));
  it('rejects an incomplete privacy record', () =>
    expect(() => productSchema.parse({ name: 'Incomplete' })).toThrow());
  it('rejects non-Play Store release links', () =>
    expect(() => productSchema.parse({ ...valid, playUrl: 'https://example.com' })).toThrow());
});
