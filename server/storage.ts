import {
  type Faculty,
  type InsertFaculty,
  type Event,
  type InsertEvent,
  type Program,
  type InsertProgram,
  type GalleryImage,
  type InsertGalleryImage,
  type Contact,
  type InsertContact,
  type Announcement,
  type InsertAnnouncement,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFaculty(): Promise<Faculty[]>;
  getFacultyById(id: string): Promise<Faculty | undefined>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  updateFaculty(id: string, faculty: InsertFaculty): Promise<Faculty | undefined>;
  deleteFaculty(id: string): Promise<boolean>;

  getEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: InsertEvent): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  getPrograms(): Promise<Program[]>;
  getProgramById(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: InsertProgram): Promise<Program | undefined>;
  deleteProgram(id: string): Promise<boolean>;

  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImageById(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<boolean>;

  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private faculty: Map<string, Faculty>;
  private events: Map<string, Event>;
  private programs: Map<string, Program>;
  private galleryImages: Map<string, GalleryImage>;
  private contacts: Map<string, Contact>;
  private announcements: Map<string, Announcement>;

  constructor() {
    this.faculty = new Map();
    this.events = new Map();
    this.programs = new Map();
    this.galleryImages = new Map();
    this.contacts = new Map();
    this.announcements = new Map();

    this.seedData();
  }

  private seedData() {
    const defaultPrograms: InsertProgram[] = [
      {
        name: "Mathematics & Sciences",
        description: "Advanced STEM curriculum with hands-on laboratory experiences and research opportunities.",
        icon: "STEM",
        facultyCount: 18,
      },
      {
        name: "Arts & Humanities",
        description: "Comprehensive liberal arts education fostering critical thinking and creative expression.",
        icon: "ARTS",
        facultyCount: 15,
      },
      {
        name: "Technology & Engineering",
        description: "Cutting-edge programs in computer science, robotics, and engineering design.",
        icon: "TECH",
        facultyCount: 12,
      },
      {
        name: "World Languages",
        description: "Immersive language programs including Spanish, French, Mandarin, and Latin.",
        icon: "LANG",
        facultyCount: 10,
      },
      {
        name: "Physical Education",
        description: "Comprehensive athletics and wellness programs promoting health and teamwork.",
        icon: "PE",
        facultyCount: 8,
      },
      {
        name: "Social Sciences",
        description: "In-depth study of history, geography, economics, and contemporary global issues.",
        icon: "SOC",
        facultyCount: 14,
      },
    ];

    defaultPrograms.forEach((program) => this.createProgram(program));

    const defaultFaculty: InsertFaculty[] = [
      {
        name: "Dr. Emily Chen",
        title: "Head of Science Department",
        department: "Mathematics & Sciences",
        email: "echen@excellenceacademy.edu",
        bio: "Dr. Chen has 15 years of experience teaching advanced biology and chemistry. She holds a Ph.D. in Molecular Biology from MIT.",
      },
      {
        name: "Prof. Michael Rodriguez",
        title: "English Literature Professor",
        department: "Arts & Humanities",
        email: "mrodriguez@excellenceacademy.edu",
        bio: "Professor Rodriguez specializes in American literature and creative writing. He has published three novels and numerous academic papers.",
      },
      {
        name: "Dr. Sarah Johnson",
        title: "Director of Technology",
        department: "Technology & Engineering",
        email: "sjohnson@excellenceacademy.edu",
        bio: "Dr. Johnson leads our computer science and robotics programs. She previously worked as a software engineer at Google.",
      },
    ];

    defaultFaculty.forEach((faculty) => this.createFaculty(faculty));

    const defaultEvents: InsertEvent[] = [
      {
        title: "Fall Open House",
        description: "Join us for a tour of our campus, meet our faculty, and learn about our academic programs.",
        date: "2024-11-15",
        time: "10:00 AM - 2:00 PM",
        location: "Main Campus",
        category: "Academic",
      },
      {
        title: "Science Fair",
        description: "Students showcase their innovative science projects and research findings.",
        date: "2024-11-22",
        time: "1:00 PM - 5:00 PM",
        location: "Science Building",
        category: "Academic",
      },
      {
        title: "Winter Concert",
        description: "Annual performance featuring our orchestra, choir, and band students.",
        date: "2024-12-10",
        time: "7:00 PM",
        location: "Performing Arts Center",
        category: "Arts",
      },
    ];

    defaultEvents.forEach((event) => this.createEvent(event));
  }

  async getFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values());
  }

  async getFacultyById(id: string): Promise<Faculty | undefined> {
    return this.faculty.get(id);
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const id = randomUUID();
    const faculty: Faculty = { ...insertFaculty, id };
    this.faculty.set(id, faculty);
    return faculty;
  }

  async updateFaculty(id: string, insertFaculty: InsertFaculty): Promise<Faculty | undefined> {
    const existing = this.faculty.get(id);
    if (!existing) return undefined;
    const updated: Faculty = { ...insertFaculty, id };
    this.faculty.set(id, updated);
    return updated;
  }

  async deleteFaculty(id: string): Promise<boolean> {
    return this.faculty.delete(id);
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  async getEventById(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, insertEvent: InsertEvent): Promise<Event | undefined> {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    const updated: Event = { ...insertEvent, id };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  async getPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramById(id: string): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = randomUUID();
    const program: Program = { ...insertProgram, id };
    this.programs.set(id, program);
    return program;
  }

  async updateProgram(id: string, insertProgram: InsertProgram): Promise<Program | undefined> {
    const existing = this.programs.get(id);
    if (!existing) return undefined;
    const updated: Program = { ...insertProgram, id };
    this.programs.set(id, updated);
    return updated;
  }

  async deleteProgram(id: string): Promise<boolean> {
    return this.programs.delete(id);
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async getGalleryImageById(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = { ...insertImage, id };
    this.galleryImages.set(id, image);
    return image;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values());
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = { ...insertAnnouncement, id };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    return this.announcements.delete(id);
  }
}

export const storage = new MemStorage();
