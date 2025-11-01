import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-bold text-xl mb-4">Excellence Academy</h3>
            <p className="text-muted-foreground mb-4">
              Inspiring minds and shaping futures through quality education and
              holistic development.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-linkedin">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/academics">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-academics">
                    Academics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faculty">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-faculty">
                    Faculty
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-events">
                    Events
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-gallery">
                    Gallery
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Education Lane, Knowledge City, KC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@excellenceacademy.edu</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and events.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                data-testid="input-newsletter-email"
              />
              <Button variant="default" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Excellence Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
