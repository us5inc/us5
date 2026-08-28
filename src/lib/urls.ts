import { siteConfig } from '../config/site';

export function withBase(path: string): string {
  const base = siteConfig.base === '/' ? '' : siteConfig.base;
  const suffix = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${base}${suffix}`;
}

export function absoluteUrl(path: string): string {
  return new URL(withBase(path), siteConfig.origin).toString();
}
