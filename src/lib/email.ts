export interface GmailComposeOptions {
  to: string;
  subject?: string;
  body?: string;
}

export function buildGmailComposeUrl({ to, subject, body }: GmailComposeOptions): string {
  const url = new URL('https://mail.google.com/mail/');
  url.searchParams.set('view', 'cm');
  url.searchParams.set('fs', '1');
  url.searchParams.set('to', to);
  if (subject) url.searchParams.set('su', subject);
  if (body) url.searchParams.set('body', body);
  return url.toString();
}
