import { siteConfig } from '../config/site';
export interface Enquiry {
  name: string;
  email: string;
  company: string;
  service: string;
  summary: string;
}
const value = (data: FormData, key: string) => String(data.get(key) ?? '').trim();
export function validateEnquiry(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!value(data, 'name')) errors.name = 'Enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(value(data, 'email'))) errors.email = 'Enter a valid email address.';
  if (!value(data, 'service')) errors.service = 'Choose a service.';
  const summary = value(data, 'summary');
  if (summary.length < 20) errors.summary = 'Add at least 20 characters about your project.';
  if (data.get('consent') !== 'on')
    errors.consent = 'Confirm that we may use these details to respond.';
  return errors;
}
export function buildMailto(enquiry: Enquiry): string {
  const subject = encodeURIComponent(`Project enquiry — ${enquiry.service}`);
  const body = encodeURIComponent(
    `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nCompany: ${enquiry.company || 'Not provided'}\nService: ${enquiry.service}\n\nProject summary:\n${enquiry.summary}`,
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}
