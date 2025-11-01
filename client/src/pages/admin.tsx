import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Users,
  Calendar,
  BookOpen,
  ImageIcon,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Admin() {
  const adminSections = [
    {
      title: "Faculty Management",
      description: "Add, edit, or remove faculty members",
      icon: Users,
      href: "/admin/faculty",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Events Management",
      description: "Manage upcoming events and calendar",
      icon: Calendar,
      href: "/admin/events",
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Programs Management",
      description: "Update academic programs and departments",
      icon: BookOpen,
      href: "/admin/programs",
      color: "from-green-500/20 to-green-500/5",
    },
    {
      title: "Gallery Management",
      description: "Upload and organize gallery images",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "from-orange-500/20 to-orange-500/5",
    },
    {
      title: "Contact Submissions",
      description: "View and manage contact form submissions",
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "from-pink-500/20 to-pink-500/5",
    },
    {
      title: "Announcements",
      description: "Create and manage school announcements",
      icon: Megaphone,
      href: "/admin/announcements",
      color: "from-teal-500/20 to-teal-500/5",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Admin Portal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Manage website content, events, faculty, and more from this
              central dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminSections.map((section, index) => (
              <motion.div
                key={section.title}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={section.href}>
                  <Card
                    className={`p-6 h-full hover-elevate cursor-pointer bg-gradient-to-br ${section.color}`}
                    data-testid={`card-admin-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <section.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <Button
                      variant="outline"
                      data-testid={`button-manage-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      Manage
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
