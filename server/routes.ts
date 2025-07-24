import type { Express } from "express";
import { createServer, type Server } from "http";
import { AICodeAssistant } from "./ai-assistant";
import path from "path";
import express from "express";
import cmsRoutes from "./cms-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // CMS Routes
  app.use('/api/cms', cmsRoutes);
  
  // Serve static files from the public directory
  const publicPath = path.join(process.cwd(), "client", "public");
  
  // Serve CSS, JS, and images as static files
  app.use("/css", express.static(path.join(publicPath, "css")));
  app.use("/js", express.static(path.join(publicPath, "js")));
  app.use("/images", express.static(path.join(publicPath, "images")));
  
  // Routes for all HTML pages - maintaining the multilingual structure
  app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
  
  app.get("/en", (req, res) => {
    res.sendFile(path.join(publicPath, "index-en.html"));
  });
  
  app.get("/about", (req, res) => {
    res.sendFile(path.join(publicPath, "about.html"));
  });
  
  app.get("/a-propos", (req, res) => {
    res.sendFile(path.join(publicPath, "a-propos.html"));
  });
  
  app.get("/communiques", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques.html"));
  });
  
  app.get("/communiques-en", (req, res) => {
    res.sendFile(path.join(publicPath, "communiques-en.html"));
  });
  
  app.get("/emplois", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois.html"));
  });
  
  app.get("/emplois-en", (req, res) => {
    res.sendFile(path.join(publicPath, "emplois-en.html"));
  });
  
  app.get("/nous-joindre", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre.html"));
  });
  
  app.get("/nous-joindre-en", (req, res) => {
    res.sendFile(path.join(publicPath, "nous-joindre-en.html"));
  });

  // CMS Admin Interface  
  app.get("/admin", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "simple-cms.html"));
  });
  
  app.get("/ai-helper", (req, res) => {
    res.sendFile(path.join(publicPath, "ai-helper.html"));
  });
  
  // Add legal pages routes
  app.get("/politique-de-confidentialite", (req, res) => {
    res.sendFile(path.join(publicPath, "politique-de-confidentialite.html"));
  });
  
  app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(publicPath, "privacy-policy.html"));
  });
  
  app.get("/conditions-utilisation", (req, res) => {
    res.sendFile(path.join(publicPath, "conditions-utilisation.html"));
  });
  
  app.get("/terms-of-use", (req, res) => {
    res.sendFile(path.join(publicPath, "terms-of-use.html"));
  });
  
  // CMS access test page
  app.get("/test-strapi-access.html", (req, res) => {
    res.sendFile(path.join(process.cwd(), "test-strapi-access.html"));
  });
  
  app.get("/cms-access.html", (req, res) => {
    res.sendFile(path.join(publicPath, "cms-access.html"));
  });
  
  // Handle legacy .html routes for compatibility  
  app.get("/index.html", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
  
  app.get("/index-en.html", (req, res) => {
    res.sendFile(path.join(publicPath, "index-en.html"));
  });

  // Admin routes
  app.get("/admin", (req, res) => {
    res.sendFile(path.join(publicPath, "admin", "index.html"));
  });

  app.get("/admin/", (req, res) => {
    res.sendFile(path.join(publicPath, "admin", "index.html"));
  });

  const aiAssistant = new AICodeAssistant();
  
  // AI Code Assistant endpoint for grid changes
  app.post("/api/ai/grid-change", async (req, res) => {
    try {
      const { changeDescription } = req.body;
      
      if (!changeDescription) {
        return res.status(400).json({ error: "changeDescription is required" });
      }
      
      const result = await aiAssistant.applyGridChange(changeDescription);
      res.json(result);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ 
        error: "Failed to process AI request",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // AI Code Suggestions endpoint
  app.post("/api/ai/suggest", async (req, res) => {
    try {
      const { code, context } = req.body;
      
      if (!code) {
        return res.status(400).json({ error: "code is required" });
      }
      
      const suggestion = await aiAssistant.suggestCodeImprovement(code, context || "");
      res.json({ suggestion });
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      res.status(500).json({ 
        error: "Failed to get AI suggestions",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API route to show migration status
  app.get("/api/migration-status", (req, res) => {
    res.json({ 
      status: "complete",
      pages: [
        "index.html", "index-en.html", "about.html", "a-propos.html",
        "communiques.html", "communiques-en.html", "emplois.html", 
        "emplois-en.html", "nous-joindre.html", "nous-joindre-en.html"
      ],
      assets: {
        css: ["shared.css"],
        js: ["communiques-data.js", "communiques-data-en.js", "emplois-data.js", "shared.js"],
        images: "16+ image files"
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
