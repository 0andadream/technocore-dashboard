import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function resolveInside(dir, rel) {
  const file = path.resolve(dir, rel);
  if (file !== dir && !file.startsWith(dir + path.sep)) return null;
  return file;
}

function existing(file) {
  if (!file) return null;
  try {
    return fs.statSync(file).isFile() ? file : null;
  } catch {
    return null;
  }
}

function send(res, file) {
  const ext = path.extname(file);
  const cache =
    ext === '.json'
      ? 'public, max-age=30, must-revalidate'
      : 'public, max-age=300';
  res.writeHead(200, {
    'content-type': types[ext] || 'application/octet-stream',
    'cache-control': cache,
    'access-control-allow-origin': '*',
  });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  const rel = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const file =
    existing(resolveInside(root, rel)) ||
    existing(resolveInside(root, path.join(rel, 'index.html'))) ||
    (pathname === '/' ? null : existing(path.join(root, 'index.html')));
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  send(res, file);
});

server.listen(port, '0.0.0.0', () => {
  console.log(JSON.stringify({ technocore_dashboard: true, port, root }));
});
