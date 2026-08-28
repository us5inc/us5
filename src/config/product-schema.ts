import { z } from 'zod';
const dataItem = z.object({ type: z.string().min(1), purpose: z.string().min(1) }).strict();
const provider = z
  .object({ name: z.string().min(1), role: z.string().min(1), privacyUrl: z.url() })
  .strict();
export const productSchema = z
  .object({
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    developer: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    packageName: z.string().regex(/^[a-zA-Z][\w]*(?:\.[a-zA-Z][\w]*)+$/),
    playUrl: z.url().startsWith('https://play.google.com/'),
    supportEmail: z.email(),
    effectiveDate: z.iso.date(),
    updatedDate: z.iso.date(),
    icon: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    features: z.array(z.string().min(1)).min(1),
    children: z.boolean(),
    directCollection: z.array(dataItem),
    sdkProcessing: z.array(dataItem),
    sharing: z.array(dataItem),
    advertising: z.boolean(),
    analytics: z.boolean(),
    crashReporting: z.boolean(),
    purchases: z.boolean(),
    accounts: z.boolean(),
    location: z.boolean(),
    deviceIdentifiers: z.boolean(),
    retention: z.string().min(1),
    security: z.string().min(1),
    rights: z.string().min(1),
    deletion: z.string().min(1),
    providers: z.array(provider),
  })
  .strict();
export type Product = z.infer<typeof productSchema>;
