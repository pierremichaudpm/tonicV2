import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
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
