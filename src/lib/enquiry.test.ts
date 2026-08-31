import { describe, expect, it } from 'vitest';
import { buildEnquiryComposeUrl, validateEnquiry } from './enquiry';

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
  it('builds a Gmail compose draft with decoded recipient, subject, and body values', () => {
    const url = buildEnquiryComposeUrl({
      name: 'Ada & Grace',
      email: 'ada@example.com',
      company: 'Example + Co.',
      service: 'UI/UX design',
      summary: 'Please preserve & symbols, + signs, and this newline.\nSecond line.',
    });
    const compose = new URL(url);

    expect(compose.origin).toBe('https://mail.google.com');
    expect(compose.pathname).toBe('/mail/');
    expect(compose.searchParams.get('view')).toBe('cm');
    expect(compose.searchParams.get('fs')).toBe('1');
    expect(compose.searchParams.get('to')).toBe('usfiveincorporation@gmail.com');
    expect(compose.searchParams.get('su')).toBe('Project enquiry — UI/UX design');
    expect(compose.searchParams.get('body')).toBe(
      'Name: Ada & Grace\nEmail: ada@example.com\nCompany: Example + Co.\nService: UI/UX design\n\nProject summary:\nPlease preserve & symbols, + signs, and this newline.\nSecond line.',
    );
  });
});
