import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Users,
  Award,
  BookOpen,
  Lightbulb,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { Event, Program } from "@shared/schema";
import scienceImage from "@assets/generated_images/Science_education_classroom_scene_3058539a.png";
import sportsImage from "@assets/generated_images/Sports_and_athletics_scene_782b913e.png";
import artsImage from "@assets/generated_images/Science_education_classroom_scene_3058539a.png"; // Temporarily using science image

export default function Home() {
  const { data: programs = [] } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
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
      <HeroSection />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Welcome to Excellence Academy
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                For over 50 years, Excellence Academy has been a beacon of
                educational excellence, nurturing curious minds and developing
                future leaders. Our commitment to academic rigor, combined with
                a focus on character development, creates an environment where
                students thrive.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Under the guidance of our dedicated faculty and staff, we
                provide a transformative educational experience that prepares
                students not just for college, but for life.
              </p>
              <Link href="/contact">
                <Button size="lg" data-testid="button-schedule-tour">
                  Schedule a Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 hover-elevate" data-testid="card-stat-students">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-students-value">
                    1,200+
                  </div>
                  <div className="text-muted-foreground" data-testid="text-stat-students-label">Students Enrolled</div>
                </Card>
                <Card className="p-6 hover-elevate" data-testid="card-stat-acceptance">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-acceptance-value">
                    98%
                  </div>
                  <div className="text-muted-foreground" data-testid="text-stat-acceptance-label">
                    College Acceptance
                  </div>
                </Card>
                <Card className="p-6 hover-elevate" data-testid="card-stat-faculty">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-faculty-value">
                    120+
                  </div>
                  <div className="text-muted-foreground" data-testid="text-stat-faculty-label">
                    Expert Faculty
                  </div>
                </Card>
                <Card className="p-6 hover-elevate" data-testid="card-stat-ratio">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-ratio-value">
                    8:1
                  </div>
                  <div className="text-muted-foreground" data-testid="text-stat-ratio-label">
                    Student-Teacher Ratio
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose Excellence Academy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive education that goes beyond academics to
              develop well-rounded individuals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Academic Excellence",
                description:
                  "Rigorous curriculum designed to challenge and inspire students to reach their full potential.",
              },
              {
                icon: Users,
                title: "Expert Faculty",
                description:
                  "Dedicated educators with advanced degrees and a passion for student success.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "State-of-the-art facilities and cutting-edge technology enhance the learning experience.",
              },
              {
                icon: Award,
                title: "Holistic Development",
                description:
                  "Comprehensive programs in arts, athletics, and community service build character.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-elevate" data-testid={`card-feature-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <item.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3" data-testid={`text-feature-title-${index}`}>{item.title}</h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Academic Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of programs designed to nurture
              curiosity and academic excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {programs.slice(0, 3).map((program, index) => (
              <motion.div
                key={program.id}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover-elevate" data-testid={`card-program-home-${program.id}`}>
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-6xl" data-testid={`text-program-icon-${program.id}`}>{program.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3" data-testid={`text-program-name-${program.id}`}>
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground mb-4" data-testid={`text-program-description-${program.id}`}>
                      {program.description}
                    </p>
                    <Link href="/academics">
                      <Button
                        variant="outline"
                        data-testid={`button-explore-${program.id}`}
                      >
                        Explore Program
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/academics">
              <Button size="lg" variant="default" data-testid="button-view-all-programs">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Campus Life
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond the classroom, students engage in a vibrant community of
              learning, growth, and discovery.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                title: "STEM Excellence",
                description:
                  "Our state-of-the-art science laboratories and innovative STEM programs prepare students for careers in science, technology, engineering, and mathematics. From robotics to biotechnology, students engage in hands-on learning experiences.",
                image: scienceImage,
              },
              {
                title: "Athletics & Wellness",
                description:
                  "With championship-winning teams and comprehensive athletic programs, we promote physical fitness, teamwork, and sportsmanship. Our modern facilities support a wide range of sports and wellness activities.",
                image: sportsImage,
              },
              {
                title: "Arts & Culture",
                description:
                  "From theater productions to fine arts, music, and dance, our arts programs provide students with opportunities to explore their creativity and develop their talents in a supportive environment.",
                image: artsImage,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                data-testid={`section-campus-life-${index}`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl w-full h-auto shadow-xl"
                    data-testid={`img-campus-life-${index}`}
                  />
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid={`text-campus-life-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-lg text-muted-foreground" data-testid={`text-campus-life-description-${index}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for exciting events and activities throughout the year.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate" data-testid={`card-event-${event.id}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-center min-w-16" data-testid={`badge-event-date-${event.id}`}>
                        <div className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs uppercase">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3" data-testid={`text-event-title-${event.id}`}>
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-event-description-${event.id}`}>
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span data-testid={`text-event-time-${event.id}`}>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span data-testid={`text-event-location-${event.id}`}>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button size="lg" variant="default" data-testid="button-view-all-events">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students, parents, and alumni about their experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Excellence Academy provided me with not just an education, but a foundation for life. The teachers genuinely care about each student's success.",
                name: "Sarah Johnson",
                role: "Class of 2023",
              },
              {
                quote:
                  "As a parent, I couldn't be happier with our decision. The academic programs are challenging, and the supportive environment helps our daughter thrive.",
                name: "Michael Chen",
                role: "Parent",
              },
              {
                quote:
                  "The skills and values I learned at Excellence Academy have been instrumental in my career. I'm proud to be an alumnus.",
                name: "Emily Rodriguez",
                role: "Alumni, Class of 2018",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full" data-testid={`card-testimonial-${index}`}>
                  <blockquote className="font-serif italic text-lg mb-4" data-testid={`text-testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-auto">
                    <div className="font-semibold" data-testid={`text-testimonial-name-${index}`}>{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
