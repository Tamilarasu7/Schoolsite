import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Academics from "@/pages/academics";
import FacultyPage from "@/pages/faculty";
import Events from "@/pages/events";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import AdminFaculty from "@/pages/admin/faculty";
import AdminEvents from "@/pages/admin/events";
import AdminPrograms from "@/pages/admin/programs";
import AdminGallery from "@/pages/admin/gallery";
import AdminContacts from "@/pages/admin/contacts";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/academics" component={Academics} />
      <Route path="/faculty" component={FacultyPage} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/faculty" component={AdminFaculty} />
      <Route path="/admin/events" component={AdminEvents} />
      <Route path="/admin/programs" component={AdminPrograms} />
      <Route path="/admin/gallery" component={AdminGallery} />
      <Route path="/admin/contacts" component={AdminContacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
