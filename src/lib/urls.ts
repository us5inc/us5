import { siteConfig } from '../config/site';

export function withBase(path: string): string {
  const base = siteConfig.base === '/' ? '' : siteConfig.base;
  const cleaned = path.replace(/^\/+|\/+$/g, '');
  const isFile = /\.[a-z0-9]+$/i.test(cleaned);
  const suffix = path === '/' ? '/' : `/${cleaned}${isFile ? '' : '/'}`;
  return `${base}${suffix}`;
}

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), siteConfig.origin).toString();
}
