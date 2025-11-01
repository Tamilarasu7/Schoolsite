import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Science_education_classroom_scene_3058539a.png"; // Temporarily using science image

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
            Excellence Academy
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto">
            Inspiring Minds, Shaping Futures
          </p>
          <p className="text-base md:text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Join a community dedicated to academic excellence, character
            development, and preparing students for success in an ever-changing
            world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                variant="default"
                className="px-8 py-6 text-lg rounded-full"
                data-testid="button-hero-apply"
              >
                Apply Now
              </Button>
            </Link>
            <Link href="/academics">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-full backdrop-blur-sm bg-white/10 text-white border-white/30 hover:bg-white/20"
                data-testid="button-hero-programs"
              >
                Explore Programs
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  );
}
