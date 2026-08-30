import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { afterEach, describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const script = resolve('scripts/capture-visuals.mjs');
const widths = [320, 390, 800, 1440];
const routes = ['home', 'products', 'contact', 'privacy'];
const completedMatrix = widths.flatMap((width) => routes.map((route) => `${route}-${width}.png`));
const workspaces: string[] = [];

const seedCompletedMatrix = async () => {
  const workspace = await mkdtemp(join(tmpdir(), 'us5-capture-'));
  workspaces.push(workspace);
  const output = join(workspace, 'artifacts', 'visual-review');
  const sentinel = Buffer.from('completed-matrix');
  await mkdir(output, { recursive: true });
  await Promise.all(completedMatrix.map((file) => writeFile(join(output, file), sentinel)));
  return { workspace, output, sentinel };
};

const expectCompletedMatrix = async (workspace: string, output: string, sentinel: Buffer) => {
  expect((await readdir(output)).sort()).toEqual([...completedMatrix].sort());
  for (const file of completedMatrix) {
    expect(await readFile(join(output, file)), file).toEqual(sentinel);
  }
  await expect(readdir(join(workspace, 'artifacts', 'visual-review.staging'))).rejects.toThrow();
};

afterEach(async () => {
  await Promise.all(workspaces.splice(0).map((workspace) => rm(workspace, { recursive: true })));
});

describe('visual capture transaction', () => {
  it('preserves the completed matrix when a later route fails', async () => {
    const { workspace, output, sentinel } = await seedCompletedMatrix();

    const server = createServer((request, response) => {
      if (request.url === '/us5/') {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end('<!doctype html><title>Home</title><main>Ready</main>');
        return;
      }
      request.socket.destroy();
    });
    await new Promise<void>((resolveListening) => server.listen(0, '127.0.0.1', resolveListening));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected an assigned TCP port');

    try {
      await expect(
        execFileAsync(process.execPath, [script, `http://127.0.0.1:${address.port}/us5/`], {
          cwd: workspace,
          timeout: 20_000,
        }),
      ).rejects.toThrow();
    } finally {
      await new Promise<void>((resolveClosed, rejectClosed) =>
        server.close((error) => (error ? rejectClosed(error) : resolveClosed())),
      );
    }

    await expectCompletedMatrix(workspace, output, sentinel);
  }, 30_000);

  it('cleans staging and preserves the completed matrix for an invalid base URL', async () => {
    const { workspace, output, sentinel } = await seedCompletedMatrix();

    await expect(
      execFileAsync(process.execPath, [script, 'not a valid base URL'], {
        cwd: workspace,
        timeout: 20_000,
      }),
    ).rejects.toThrow();

    await expectCompletedMatrix(workspace, output, sentinel);
  }, 30_000);
});
