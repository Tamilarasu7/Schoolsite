import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import type { Program } from "@shared/schema";
import { Users } from "lucide-react";

export default function Academics() {
  const { data: programs = [], isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

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
              Academic Programs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive curriculum is designed to challenge students,
              foster critical thinking, and prepare them for success in college
              and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6 h-64 animate-pulse">
                  <div className="h-full bg-muted rounded-lg" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  {...fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="p-6 h-full hover-elevate" data-testid={`card-program-${program.id}`}>
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 mb-4 flex items-center justify-center">
                      <div className="text-6xl">{program.icon}</div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{program.facultyCount} faculty members</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
