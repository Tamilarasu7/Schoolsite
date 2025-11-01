import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import type { Contact } from "@shared/schema";
import { Mail, Phone, Calendar } from "lucide-react";

export default function AdminContacts() {
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Contact Submissions
            </h1>
            <p className="text-muted-foreground">
              View and manage contact form submissions
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 h-48 animate-pulse">
                  <div className="h-full bg-muted rounded-lg" />
                </Card>
              ))}
            </div>
          ) : contacts.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground">
                No contact submissions yet.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="p-6" data-testid={`card-contact-${contact.id}`}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4" data-testid={`text-contact-name-${contact.id}`}>
                        {contact.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-primary"
                            data-testid={`link-email-${contact.id}`}
                          >
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span data-testid={`text-phone-${contact.id}`}>{contact.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span data-testid={`text-date-${contact.id}`}>
                            {new Date(contact.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <div className="mt-3">
                          <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full" data-testid={`badge-inquiry-type-${contact.id}`}>
                            {contact.inquiryType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Message</h4>
                      <p className="text-muted-foreground text-sm" data-testid={`text-message-${contact.id}`}>
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
