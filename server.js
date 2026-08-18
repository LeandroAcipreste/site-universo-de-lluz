// Servidor estático para o desenvolvimento local.
// O site usa módulos ES e caminhos a partir da raiz, então não roda em file:// —
// precisa de uma origem. Rodar: node server.js 8177
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 8080);

/* As rotas saem do vercel.json, não de uma cópia aqui. Se as duas listas
   existissem, uma ia envelhecer sem ninguém perceber e um link que funciona no
   ar deixaria de funcionar na máquina — ou o contrário, que é pior. */
const ROTAS = new Map();
try {
  const { rewrites = [] } = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  for (const { source, destination } of rewrites) ROTAS.set(source, destination);
} catch (e) {
  console.warn('vercel.json não lido, seguindo sem rotas:', e.message);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.ktx2': 'image/ktx2',
  '.wasm': 'application/wasm',
};

http.createServer((req, res) => {
  // Drop the query string: /_payload.json?<buildId> is a real request here.
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad Request');
    return;
  }
  if (ROTAS.has(pathname)) pathname = ROTAS.get(pathname);
  else if (pathname.endsWith('/')) pathname += 'index.html';

  const file = path.join(ROOT, pathname.split('/').join(path.sep));
  // Keep the server inside ROOT.
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      console.warn('404', pathname);
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
      return;
    }
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    // Range support so the browser can seek in the audio tracks.
    const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Number(range[2]) : stat.size - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes',
      /* `no-store`, não `no-cache`. Os dois parecem sinônimos e não são:
         `no-cache` deixa o navegador guardar e reusar depois de revalidar, e
         este servidor não manda `ETag` nem `Last-Modified` — sem validador, a
         revalidação vira loteria e um módulo editado pode continuar rodando
         velho na aba. `no-store` proíbe guardar, ponto. Num servidor de
         desenvolvimento isso é o que se quer: o que está no disco é o que roda. */
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => {
  console.log(`Quadplex 80 running at http://localhost:${PORT}/`);
});
