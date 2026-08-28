import { describe, expect, it } from 'vitest';
import { buildMailto, validateEnquiry } from './enquiry';

describe('enquiry email flow', () => {
  it('rejects missing required fields and an invalid email', () => {
    const data = new FormData();
    data.set('email', 'invalid');
    expect(validateEnquiry(data)).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      service: expect.any(String),
      summary: expect.any(String),
      consent: expect.any(String),
    });
  });
  it('builds an encoded email draft', () => {
    const url = buildMailto({
      name: 'Ada',
      email: 'ada@example.com',
      company: 'Example',
      service: 'Mobile application',
      summary: 'A useful project summary that is long enough.',
    });
    expect(url).toContain('mailto:usfiveincorporation@gmail.com');
    expect(url).toContain('subject=Project%20enquiry');
    expect(url).toContain('Ada');
  });
});
