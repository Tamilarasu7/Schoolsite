// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  faculty;
  events;
  programs;
  galleryImages;
  contacts;
  announcements;
  constructor() {
    this.faculty = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.programs = /* @__PURE__ */ new Map();
    this.galleryImages = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.announcements = /* @__PURE__ */ new Map();
    this.seedData();
  }
  seedData() {
    const defaultPrograms = [
      {
        name: "Mathematics & Sciences",
        description: "Advanced STEM curriculum with hands-on laboratory experiences and research opportunities.",
        icon: "STEM",
        facultyCount: 18
      },
      {
        name: "Arts & Humanities",
        description: "Comprehensive liberal arts education fostering critical thinking and creative expression.",
        icon: "ARTS",
        facultyCount: 15
      },
      {
        name: "Technology & Engineering",
        description: "Cutting-edge programs in computer science, robotics, and engineering design.",
        icon: "TECH",
        facultyCount: 12
      },
      {
        name: "World Languages",
        description: "Immersive language programs including Spanish, French, Mandarin, and Latin.",
        icon: "LANG",
        facultyCount: 10
      },
      {
        name: "Physical Education",
        description: "Comprehensive athletics and wellness programs promoting health and teamwork.",
        icon: "PE",
        facultyCount: 8
      },
      {
        name: "Social Sciences",
        description: "In-depth study of history, geography, economics, and contemporary global issues.",
        icon: "SOC",
        facultyCount: 14
      }
    ];
    defaultPrograms.forEach((program) => this.createProgram(program));
    const defaultFaculty = [
      {
        name: "Dr. Emily Chen",
        title: "Head of Science Department",
        department: "Mathematics & Sciences",
        email: "echen@excellenceacademy.edu",
        bio: "Dr. Chen has 15 years of experience teaching advanced biology and chemistry. She holds a Ph.D. in Molecular Biology from MIT."
      },
      {
        name: "Prof. Michael Rodriguez",
        title: "English Literature Professor",
        department: "Arts & Humanities",
        email: "mrodriguez@excellenceacademy.edu",
        bio: "Professor Rodriguez specializes in American literature and creative writing. He has published three novels and numerous academic papers."
      },
      {
        name: "Dr. Sarah Johnson",
        title: "Director of Technology",
        department: "Technology & Engineering",
        email: "sjohnson@excellenceacademy.edu",
        bio: "Dr. Johnson leads our computer science and robotics programs. She previously worked as a software engineer at Google."
      }
    ];
    defaultFaculty.forEach((faculty2) => this.createFaculty(faculty2));
    const defaultEvents = [
      {
        title: "Fall Open House",
        description: "Join us for a tour of our campus, meet our faculty, and learn about our academic programs.",
        date: "2024-11-15",
        time: "10:00 AM - 2:00 PM",
        location: "Main Campus",
        category: "Academic"
      },
      {
        title: "Science Fair",
        description: "Students showcase their innovative science projects and research findings.",
        date: "2024-11-22",
        time: "1:00 PM - 5:00 PM",
        location: "Science Building",
        category: "Academic"
      },
      {
        title: "Winter Concert",
        description: "Annual performance featuring our orchestra, choir, and band students.",
        date: "2024-12-10",
        time: "7:00 PM",
        location: "Performing Arts Center",
        category: "Arts"
      }
    ];
    defaultEvents.forEach((event) => this.createEvent(event));
  }
  async getFaculty() {
    return Array.from(this.faculty.values());
  }
  async getFacultyById(id) {
    return this.faculty.get(id);
  }
  async createFaculty(insertFaculty) {
    const id = randomUUID();
    const faculty2 = { ...insertFaculty, id };
    this.faculty.set(id, faculty2);
    return faculty2;
  }
  async updateFaculty(id, insertFaculty) {
    const existing = this.faculty.get(id);
    if (!existing) return void 0;
    const updated = { ...insertFaculty, id };
    this.faculty.set(id, updated);
    return updated;
  }
  async deleteFaculty(id) {
    return this.faculty.delete(id);
  }
  async getEvents() {
    return Array.from(this.events.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  async getEventById(id) {
    return this.events.get(id);
  }
  async createEvent(insertEvent) {
    const id = randomUUID();
    const event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  async updateEvent(id, insertEvent) {
    const existing = this.events.get(id);
    if (!existing) return void 0;
    const updated = { ...insertEvent, id };
    this.events.set(id, updated);
    return updated;
  }
  async deleteEvent(id) {
    return this.events.delete(id);
  }
  async getPrograms() {
    return Array.from(this.programs.values());
  }
  async getProgramById(id) {
    return this.programs.get(id);
  }
  async createProgram(insertProgram) {
    const id = randomUUID();
    const program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }
  async updateProgram(id, insertProgram) {
    const existing = this.programs.get(id);
    if (!existing) return void 0;
    const updated = { ...insertProgram, id };
    this.programs.set(id, updated);
    return updated;
  }
  async deleteProgram(id) {
    return this.programs.delete(id);
  }
  async getGalleryImages() {
    return Array.from(this.galleryImages.values());
  }
  async getGalleryImageById(id) {
    return this.galleryImages.get(id);
  }
  async createGalleryImage(insertImage) {
    const id = randomUUID();
    const image = { ...insertImage, id };
    this.galleryImages.set(id, image);
    return image;
  }
  async deleteGalleryImage(id) {
    return this.galleryImages.delete(id);
  }
  async getContacts() {
    return Array.from(this.contacts.values());
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getAnnouncements() {
    return Array.from(this.announcements.values());
  }
  async createAnnouncement(insertAnnouncement) {
    const id = randomUUID();
    const announcement = { ...insertAnnouncement, id };
    this.announcements.set(id, announcement);
    return announcement;
  }
  async deleteAnnouncement(id) {
    return this.announcements.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var faculty = pgTable("faculty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url")
});
var events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url")
});
var programs = pgTable("programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  facultyCount: integer("faculty_count").notNull().default(0)
});
var announcements = pgTable("announcements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  priority: text("priority").notNull().default("normal")
});
var galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});
var insertFacultySchema = createInsertSchema(faculty).omit({ id: true });
var insertEventSchema = createInsertSchema(events).omit({ id: true });
var insertProgramSchema = createInsertSchema(programs).omit({ id: true });
var insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true });
var insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
var insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/faculty", async (req, res) => {
    try {
      const faculty2 = await storage.getFaculty();
      res.json(faculty2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch faculty" });
    }
  });
  app2.get("/api/faculty/:id", async (req, res) => {
    try {
      const faculty2 = await storage.getFacultyById(req.params.id);
      if (!faculty2) {
        return res.status(404).json({ error: "Faculty member not found" });
      }
      res.json(faculty2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch faculty member" });
    }
  });
  app2.post("/api/faculty", async (req, res) => {
    try {
      const validatedData = insertFacultySchema.parse(req.body);
      const faculty2 = await storage.createFaculty(validatedData);
      res.status(201).json(faculty2);
    } catch (error) {
      res.status(400).json({ error: "Invalid faculty data" });
    }
  });
  app2.patch("/api/faculty/:id", async (req, res) => {
    try {
      const validatedData = insertFacultySchema.parse(req.body);
      const faculty2 = await storage.updateFaculty(req.params.id, validatedData);
      if (!faculty2) {
        return res.status(404).json({ error: "Faculty member not found" });
      }
      res.json(faculty2);
    } catch (error) {
      res.status(400).json({ error: "Invalid faculty data" });
    }
  });
  app2.delete("/api/faculty/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFaculty(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Faculty member not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete faculty member" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getEvents();
      res.json(events2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });
  app2.patch("/api/events/:id", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.updateEvent(req.params.id, validatedData);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });
  app2.delete("/api/events/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteEvent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  });
  app2.get("/api/programs", async (req, res) => {
    try {
      const programs2 = await storage.getPrograms();
      res.json(programs2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });
  app2.get("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.getProgramById(req.params.id);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });
  app2.post("/api/programs", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validatedData);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ error: "Invalid program data" });
    }
  });
  app2.patch("/api/programs/:id", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.updateProgram(req.params.id, validatedData);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(400).json({ error: "Invalid program data" });
    }
  });
  app2.delete("/api/programs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProgram(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete program" });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });
  app2.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid image data" });
    }
  });
  app2.delete("/api/gallery/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteGalleryImage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete image" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
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
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
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
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
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
  const listenOptions = {
    port,
    host: "0.0.0.0"
  };
  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }
  server.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
