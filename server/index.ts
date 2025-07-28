import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import path from "path";

const app = express();

// Enable gzip compression
app.use(compression());

// PRIORITY: Serve static HTML files from client/public FIRST
const publicPath = path.resolve(import.meta.dirname, "../client/public");
app.use(express.static(publicPath, {
  index: false, // Don't auto-serve index.html
  setHeaders: (res, path) => {
    if (path.endsWith('.webp') || path.endsWith('.png') || path.endsWith('.jpg')) {
      // Images: 1 year cache
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.endsWith('.css') || path.endsWith('.js')) {
      // CSS/JS: 1 month cache
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    } else if (path.endsWith('.html')) {
      // HTML: No cache during development for immediate updates
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
      res.setHeader('Vary', '*');
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Optimized request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    
    // Only log API requests and errors
    if (req.path.startsWith("/api") && (res.statusCode >= 400 || duration > 1000)) {
      const logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
      log(logLine.length > 80 ? logLine.slice(0, 79) + "…" : logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
