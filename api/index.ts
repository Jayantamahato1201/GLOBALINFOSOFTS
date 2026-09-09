import express, { Request, Response } from 'express';
import { cmsRouter } from '../server/cmsRoutes.js';

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check
app.get(['/api/health', '/health'], (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Global InfoSoft CMS Engine (Vercel Serverless Function)',
    timestamp: new Date().toISOString()
  });
});

// Mount routes on both /api and root
app.use('/api', cmsRouter);
app.use('/', cmsRouter);

export default app;
