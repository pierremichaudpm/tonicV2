import type { Express } from "express";
import { createServer, type Server } from "http";
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

  // CMS Admin Interface (removed duplicate - using proper admin route below)
  
  // Legal pages routes
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

  app.get("/admin/edit-cms.html", (req, res) => {
    res.sendFile(path.join(publicPath, "admin", "edit-cms.html"));
  });



  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
