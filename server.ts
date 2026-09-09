import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { cmsRouter } from './server/cmsRoutes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded body parser with generous limit for media uploads
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Static uploads directory for media assets
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Mount CMS API routes FIRST before any Vite or fallback handlers
  app.use('/api', cmsRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Global InfoSoft CMS Engine', timestamp: new Date().toISOString() });
  });

  // Explicit JSON 404 handler for all unhandled /api routes - strictly prevent HTML fallthrough
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.path}` });
  });

  // Vite middleware for development / static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Global InfoSoft CMS] Server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Global InfoSoft CMS] Fatal server startup error:', err);
});
