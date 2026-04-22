import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = Number(process.env.PORT ?? '6010');
const root = path.resolve('storybook-static');
const assetDir = path.join(root, 'assets');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getContentType(filePath) {
  return MIME[path.extname(filePath)] ?? 'application/octet-stream';
}

function getHashlessPrefix(fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const marker = base.lastIndexOf('-');

  if (marker === -1) {
    return null;
  }

  return `${base.slice(0, marker + 1)}`;
}

async function resolveAssetFallback(filePath) {
  const assetFileName = path.basename(filePath);
  const prefix = getHashlessPrefix(assetFileName);
  const ext = path.extname(assetFileName);

  if (!prefix) {
    return null;
  }

  const files = await fs.readdir(assetDir);
  const candidates = files.filter((name) => name.startsWith(prefix) && name.endsWith(ext));

  if (candidates.length === 0) {
    return null;
  }

  const sorted = await Promise.all(
    candidates.map(async (name) => {
      const candidatePath = path.join(assetDir, name);
      const stat = await fs.stat(candidatePath);

      return { name, mtimeMs: stat.mtimeMs, path: candidatePath };
    }),
  );

  sorted.sort((left, right) => right.mtimeMs - left.mtimeMs);
  return sorted[0]?.path ?? null;
}

async function sendFile(filePath, res) {
  const data = await fs.readFile(filePath);

  res.writeHead(200, {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Content-Type': getContentType(filePath),
    Expires: '0',
    Pragma: 'no-cache',
    'Surrogate-Control': 'no-store',
  });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
    const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
    let filePath = path.join(root, relativePath);

    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      await sendFile(filePath, res);
      return;
    } catch {
      // Continue to fallback resolution.
    }

    if (relativePath.startsWith('assets/')) {
      const fallbackPath = await resolveAssetFallback(filePath);
      if (fallbackPath) {
        await sendFile(fallbackPath, res);
        return;
      }
    }

    await sendFile(path.join(root, 'index.html'), res);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Storybook static server error: ${String(error)}`);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Storybook preview: http://${HOST}:${PORT}`);
});
