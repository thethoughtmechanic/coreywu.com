import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error: ${message}`);
    res.status(status).json({ message });
    // Don't throw the error - this crashes the server!
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
  
  // Add graceful shutdown handling
  process.on('SIGINT', () => {
    log('Received SIGINT, shutting down gracefully');
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    log('Received SIGTERM, shutting down gracefully');
    server.close(() => {
      process.exit(0);
    });
  });

  // Handle unhandled promise rejections and exceptions to prevent crashes
  process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    // Don't exit - just log the error
  });

  process.on('uncaughtException', (error) => {
    log(`Uncaught Exception: ${error.message}`);
    // Don't exit immediately - allow graceful handling
  });

  // Enhanced server startup with better error handling
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      log(`Port ${port} is already in use. Attempting to find alternative port...`);
      // Try alternative ports instead of immediately exiting
      const altPort = port + 1;
      log(`Trying port ${altPort}...`);
      server.listen({ port: altPort, host: "0.0.0.0" }, () => {
        log(`serving on port ${altPort}`);
      });
    } else {
      log(`Server error: ${err.message}`);
      // Don't throw - log and attempt recovery
      setTimeout(() => {
        log('Attempting server restart...');
        server.listen({ port, host: "0.0.0.0" }, () => {
          log(`serving on port ${port}`);
        });
      }, 2000);
    }
  });

  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: false,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
