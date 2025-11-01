import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Faculty } from "@shared/schema";
import { Mail } from "lucide-react";

export default function FacultyPage() {
  const { data: faculty = [], isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const departments = [
    "All",
    ...Array.from(new Set(faculty.map((f) => f.department))),
  ];

  const filteredFaculty =
    selectedDepartment === "All"
      ? faculty
      : faculty.filter((f) => f.department === selectedDepartment);

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
              Our Faculty
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet our dedicated team of educators who bring expertise, passion,
              and commitment to inspiring the next generation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-card border-b sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
                data-testid={`button-filter-${dept.toLowerCase()}`}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6 h-80 animate-pulse">
                  <div className="h-full bg-muted rounded-lg" />
                </Card>
              ))}
            </div>
          ) : filteredFaculty.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No faculty members found in this department.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFaculty.map((member, index) => (
                <motion.div
                  key={member.id}
                  {...fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="p-6 h-full hover-elevate" data-testid={`card-faculty-${member.id}`}>
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.imageUrl || undefined} />
                        <AvatarFallback className="text-2xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-1">
                        {member.title}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.department}
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="mt-auto">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                        data-testid={`link-email-${member.id}`}
                      >
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </a>
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
