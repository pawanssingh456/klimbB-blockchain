import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import transactionRoutes from './routes/transactionRoutes';
import balanceRoutes from './routes/balanceRoutes';

const app: Express = express();

app.use(bodyParser.json());

/**
 * Error Handling Middleware
 * This middleware catches any unhandled errors and sends a standardized error response.
 * @param err The error object
 * @param req The Express Request object
 * @param res The Express Response object
 * @param next The Express NextFunction
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.use('/transaction', transactionRoutes);
app.use('/balance', balanceRoutes);

// Catch-all route for non-existent routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (must be defined after all other routes/middleware)
app.use(errorHandler);

export default app;
