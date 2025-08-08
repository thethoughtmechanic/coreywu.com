import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Timeline Events API
  app.get("/api/timeline", async (req, res) => {
    try {
      const events = await storage.getTimelineEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline events" });
    }
  });

  // Thoughts API
  app.get("/api/thoughts", async (req, res) => {
    try {
      const thoughts = await storage.getThoughts();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch thoughts" });
    }
  });

  // Experiments API
  app.get("/api/experiments", async (req, res) => {
    try {
      const experiments = await storage.getExperiments();
      res.json(experiments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
