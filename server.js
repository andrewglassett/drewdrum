const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const RELOAD_SNIPPET = `<script>
  new EventSource('/__reload').onmessage = () => location.reload();
</script>`;

// SSE clients waiting for a reload signal
const clients = new Set();

function broadcast() {
  for (const res of clients) res.write('data: reload\n\n');
}

// Watch for file changes
fs.watch(ROOT, { recursive: true }, (_, filename) => {
  if (!filename) return;
  if (filename.startsWith('.') || filename === 'server.js') return;
  console.log(`changed: ${filename}`);
  broadcast();
});

http.createServer((req, res) => {
  // Live-reload SSE endpoint
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // Resolve file path, default to index.html
  const url = req.url.split('?')[0];
  let filePath = path.join(ROOT, url === '/' ? 'index.html' : url);

  // Guard against directory traversal
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    // Inject reload snippet before </body>
    if (ext === '.html') {
      data = Buffer.from(data.toString().replace('</body>', RELOAD_SNIPPET + '\n</body>'));
    }

    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
