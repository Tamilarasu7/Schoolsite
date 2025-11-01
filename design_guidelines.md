# School Website Design Guidelines

## Design Approach

**Reference-Based Approach** drawing inspiration from modern educational institutions (Stanford, MIT digital presence) combined with Airbnb's card aesthetics and Apple's minimalist elegance. The design prioritizes trust, approachability, and showcasing the school's vibrant community.

**Core Principles:**
- Academic excellence with warmth and accessibility
- Visual storytelling through authentic imagery
- Clear information hierarchy for parents, students, and staff
- Community-focused design celebrating student life

---

## Typography

**Font Families:**
- Headings: Inter (weights: 600, 700, 800)
- Body: Inter (weights: 400, 500)
- Accents: Playfair Display for special quotes/testimonials (weight: 600 italic)

**Hierarchy:**
- Hero Headline: text-5xl md:text-7xl font-bold
- Section Headers: text-3xl md:text-5xl font-bold
- Subsection Titles: text-2xl md:text-3xl font-semibold
- Card Titles: text-xl md:text-2xl font-semibold
- Body Text: text-base md:text-lg
- Small Labels: text-sm font-medium

---

## Layout System

**Spacing Primitives:**
Primary units: 4, 8, 12, 16, 20, 24, 32
- Component padding: p-4, p-8, p-12
- Section spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-8 md:gap-12
- Element margins: mb-4, mb-8, mb-12

**Container Strategy:**
- Full-width sections with inner max-w-7xl mx-auto px-4 md:px-8
- Content sections: max-w-6xl
- Text content: max-w-4xl

---

## Page Structure & Sections

### Homepage (8 sections)

**1. Hero Section**
- Full viewport height (min-h-screen) with stunning campus image
- Centered overlay content with school name, tagline, and dual CTAs
- Subtle scroll indicator
- Navigation: Fixed transparent header becoming solid on scroll, includes logo, main nav links (About, Academics, Admissions, Campus Life, Events, Contact), and "Apply Now" CTA

**2. Welcome/Mission Statement**
- Two-column layout: Principal's welcome message (left) + mission highlights in cards (right)
- Warm, inviting tone with authentic principal photo
- max-w-6xl container

**3. Why Choose Us**
- 4-column grid (2 on tablet, 1 on mobile) featuring key differentiators
- Icon + title + description cards with hover elevation
- Stats integration: student count, faculty ratio, graduation rate

**4. Academic Programs**
- 3-column grid showcasing major departments
- Rich cards with representative imagery, department name, brief description, "Explore" link
- Staggered card heights for visual interest

**5. Campus Life Showcase**
- Split-screen layout alternating image-text pairs
- Highlights: Student Activities, Athletics, Arts & Culture, Community Service
- Each block includes compelling imagery with descriptive content

**6. Upcoming Events**
- Horizontal scrollable card carousel (3-4 visible)
- Event cards: date badge, title, location, time, thumbnail image
- "View All Events" link

**7. Testimonials**
- 3-column testimonial cards from students/parents/alumni
- Includes photo, quote (Playfair Display), name, relationship to school

**8. Contact & Footer**
- Two-column: Contact form (left) + School info/map (right)
- Comprehensive footer with quick links, contact details, social media, newsletter signup
- Trust indicators: accreditation badges, awards

### Academics Page

- Hero: Program-specific imagery with breadcrumb navigation
- Department Grid: 2-3 column cards with icons, descriptions, faculty count
- Curriculum Highlights: Accordion or tab interface for different grade levels
- Faculty Spotlight: Featured teachers with photos and bios
- Academic Resources: Download links, schedules, academic calendar

### Faculty Directory

- Filterable grid (by department) with faculty cards
- Each card: Professional photo, name, title, department, email, bio preview
- Modal or dedicated page for full bio on click
- Department heads featured prominently

### Events & Calendar

- Monthly calendar view with event markers
- List view toggle showing upcoming events chronologically
- Event detail cards: full description, date/time, location, registration link
- Filter by event type (academic, sports, arts, community)

### Gallery

- Masonry grid layout for dynamic visual interest
- Categories: Campus, Events, Sports, Arts, Student Life
- Lightbox functionality for full-screen image viewing
- Load more pagination

### Contact Page

- Prominent contact form with fields: Name, Email, Phone, Inquiry Type, Message
- Office hours, phone numbers, email addresses
- Interactive map embed
- FAQ accordion section

---

## Component Library

### Navigation
- Fixed header with logo left, nav center, CTA right
- Mobile: Hamburger menu with slide-in drawer
- Mega menu for "Academics" showing all departments

### Cards
- Elevation: shadow-md hover:shadow-xl transition
- Rounded corners: rounded-xl
- Padding: p-6 md:p-8
- Border: subtle border or none depending on context

### Buttons
- Primary: Large CTAs (px-8 py-4 rounded-full font-semibold)
- Secondary: Outlined variant (border-2)
- Blurred backgrounds when overlaying images (backdrop-blur-sm bg-white/90)

### Forms
- Input fields: Rounded (rounded-lg), generous padding (px-4 py-3), focus states with ring
- Labels: text-sm font-medium mb-2
- Error states: Red accent with helper text

### Event Cards
- Compact horizontal layout on list view
- Date badge positioned top-left
- Category tag for filtering

### Image Treatments
- Aspect ratio maintained: aspect-video for landscape, aspect-square for profiles
- Object-fit: cover with rounded corners
- Lazy loading for performance

---

## Images

**Hero Image:** 
Full-screen, high-quality photograph of campus featuring students in action (studying outdoors, walking between buildings). Bright, welcoming, authentic. Image should convey energy and community.

**Section Images:**
- Academic Programs: Classroom scenes, lab work, students engaged in learning
- Campus Life: Sports activities, arts performances, student clubs, outdoor spaces
- Faculty: Professional headshots with consistent lighting/background
- Events: Candid shots from past school events
- Gallery: Mix of campus architecture, student activities, seasonal shots

**Placement:**
- Hero: Full viewport background
- Academic cards: Top-aligned, aspect-video ratio
- Testimonials: Small circular avatars (w-16 h-16)
- Faculty: Professional portraits (aspect-square)
- Events: Thumbnail images (aspect-video, smaller scale)
- Campus Life: Large feature images in split layouts

---

## Animation Guidelines

**Minimal, Purposeful Animations:**
- Scroll-triggered fade-in for section headings (Framer Motion)
- Card hover elevations (transform scale 1.02)
- Smooth page transitions
- Subtle parallax on hero image (optional)
- No distracting continuous animations
- Navigation menu slide-in on mobile

---

## Accessibility

- Semantic HTML throughout
- ARIA labels for icon buttons
- Keyboard navigation support
- Sufficient contrast ratios (WCAG AA minimum)
- Form validation with clear error messages
- Alt text for all images describing content meaningfully