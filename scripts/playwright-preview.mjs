import { preview } from 'astro';
import { cwd } from 'node:process';

const server = await preview({
  root: cwd(),
  server: { host: '127.0.0.1', port: 4321 },
});

await server.closed();
