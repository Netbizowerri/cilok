import { chromium } from '@playwright/test';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve as pathResolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = pathResolve(__dirname, '..', 'dist');

const routes = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/products/order',
  '/products/silk-paint',
  '/products/matt-paint',
  '/products/emulsion',
  '/products/texcoat',
  '/products/wall-putty',
  '/products/weatherproof',
  '/products/oil-paint',
  '/products/pop-materials',
  '/services',
  '/services/book',
  '/services/paint-application',
  '/services/wall-screeding',
  '/services/tyrolean',
  '/services/stucco',
  '/services/crackled-effect',
  '/services/crackos-effect',
  '/services/ottochinto',
  '/services/polystyrene-pop',
  '/services/printing-services',
  '/projects',
  '/visualizer',
  '/quote',
];

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startServer(port = 4173) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      try {
        const reqPath = req.url.split('?')[0];
        const filePath = pathResolve(distDir, '.' + (reqPath === '/' ? '/index.html' : reqPath));

        if (!filePath.startsWith(distDir)) {
          throw new Error('Invalid path');
        }
        const content = readFileSync(filePath);
        const ext = filePath.substring(filePath.lastIndexOf('.'));
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        const fallback = readFileSync(pathResolve(distDir, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      }
    });

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      resolve(() => new Promise((r) => server.close(r)));
    });
  });
}

async function prerender() {
  console.log('Starting prerender server...');
  const stopServer = await startServer();

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering: ${route}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      await page.waitForTimeout(2000);

      await page.waitForSelector('#root', { timeout: 10000 });

      const html = await page.content();

      if (route === '/') {
        writeFileSync(pathResolve(distDir, 'index.html'), html);
        console.log(`  -> dist/index.html`);
      } else {
        const dir = pathResolve(distDir, route.substring(1));
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }
        writeFileSync(pathResolve(dir, 'index.html'), html);
        console.log(`  -> dist${route}/index.html`);
      }
    } catch (err) {
      console.error(`  FAILED: ${route} - ${err.message}`);
    }
  }

  await browser.close();
  await stopServer();
  console.log('Prerendering complete!');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
