// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var Storage = class {
  experiments = /* @__PURE__ */ new Map();
  thoughts = /* @__PURE__ */ new Map();
  constructor() {
    const mockExperiments = [
      {
        id: "4",
        title: "AI-Powered Code Review",
        description: "Machine learning system for automated code quality analysis",
        status: "build",
        collaborationType: "Collaboration",
        problemType: "Horizontal",
        imageGradient: "from-hoverBrown to-warmBrown",
        timeframe: "4 months",
        collaborators: ["ML Engineer", "UX Designer"],
        isActive: false
      },
      {
        id: "5",
        title: "Blockchain Identity Verification",
        description: "Decentralized identity management for secure authentication",
        status: "build",
        collaborationType: "Individual",
        problemType: "Horizontal",
        imageGradient: "from-mutedGrey via-warmBrown to-hoverBrown",
        timeframe: "5 months",
        collaborators: null,
        isActive: false
      },
      {
        id: "6",
        title: "IoT Home Automation",
        description: "Smart home ecosystem with predictive automation",
        status: "scale",
        collaborationType: "Collaboration",
        problemType: "Vertical",
        imageGradient: "from-activeGreen/20 via-warmBrown to-hoverBrown",
        timeframe: "7 months",
        collaborators: ["IoT Specialist", "Backend Dev"],
        isActive: true
      }
    ];
    const mockThoughts = [
      {
        id: "1",
        title: "Addressing The AI x Human Gap",
        description: "Exploring 3 critical human breakdowns when AI continues to evolve...",
        tag: "Technology",
        readTime: "8 min read",
        imageGradient: "from-warmBrown to-hoverBrown"
      }
    ];
    mockExperiments.forEach((experiment) => this.experiments.set(experiment.id, experiment));
    mockThoughts.forEach((thought) => this.thoughts.set(thought.id, thought));
  }
  // Experiments
  getExperiments() {
    return Array.from(this.experiments.values());
  }
  getExperiment(id) {
    return this.experiments.get(id);
  }
  createExperiment(experiment) {
    const id = Date.now().toString();
    const newExperiment = { ...experiment, id };
    this.experiments.set(id, newExperiment);
    return newExperiment;
  }
  updateExperiment(id, experiment) {
    const existing = this.experiments.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...experiment };
    this.experiments.set(id, updated);
    return updated;
  }
  deleteExperiment(id) {
    return this.experiments.delete(id);
  }
  // Thoughts
  getThoughts() {
    return Array.from(this.thoughts.values());
  }
  getThought(id) {
    return this.thoughts.get(id);
  }
  createThought(thought) {
    const id = Date.now().toString();
    const newThought = { ...thought, id };
    this.thoughts.set(id, newThought);
    return newThought;
  }
  updateThought(id, thought) {
    const existing = this.thoughts.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...thought };
    this.thoughts.set(id, updated);
    return updated;
  }
  deleteThought(id) {
    return this.thoughts.delete(id);
  }
};
var storage = new Storage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/timeline", async (req, res) => {
    try {
      const events = await storage.getTimelineEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline events" });
    }
  });
  app2.get("/api/thoughts", async (req, res) => {
    try {
      const thoughts = await storage.getThoughts();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch thoughts" });
    }
  });
  app2.get("/api/experiments", async (req, res) => {
    try {
      const experiments = await storage.getExperiments();
      res.json(experiments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiments" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
