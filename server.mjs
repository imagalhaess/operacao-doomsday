import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
  try {
    const raw = decodeURIComponent((req.url || '/').split('?')[0]);
    const requested = raw === '/' ? '/index.html' : raw;
    const safePath = normalize(requested).replace(/^([.][.][\\/])+/, '');
    let filePath = join(root, safePath);
    try { await stat(filePath); } catch { filePath = join(root, 'index.html'); }
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro interno de Preview');
  }
});

server.listen(port, '0.0.0.0', () => console.log(`Operação Doomsday ouvindo em http://0.0.0.0:${port}`));
