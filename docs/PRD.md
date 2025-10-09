# Tiani Beeming - Professional Portfolio Website

A clean, modern portfolio website showcasing Tiani Beeming's pastry chef expertise with elegant visual galleries, integrated CMS capabilities, and professional presentation optimized for recruiters and hiring managers.

**Experience Qualities**:
1. Professional - Establishes credibility and expertise through sophisticated design choices and clear information hierarchy
2. Efficient - Enables quick scanning and navigation for busy recruiters with prominent CTAs and logical flow  
3. Inspiring - Showcases culinary artistry through beautiful image presentation and thoughtful visual storytelling

**Complexity Level**: Light Application (multiple features with basic state)
This portfolio requires dynamic filtering, lightbox galleries, content management capabilities, and form handling while maintaining focus on content presentation over complex interactions.

## Essential Features

### Hero Landing Section
- **Functionality**: Professional introduction with headshot, headline, and brief summary
- **Purpose**: Immediately establish credibility and professional identity for visitors
- **Trigger**: Page load on home route
- **Progression**: Page loads → Hero displays → User sees professional summary → CTAs guide to portfolio or CV
- **Success criteria**: Clear professional identity communicated within 3 seconds of page load

### Portfolio Gallery with Filtering
- **Functionality**: Masonry-style grid of work samples with category filtering and lightbox viewing
- **Purpose**: Showcase breadth and quality of pastry work in scannable format
- **Trigger**: "View My Work" CTA or direct navigation
- **Progression**: Gallery loads → User sees filter options → Clicks category → Gallery filters → Clicks image → Lightbox opens with details
- **Success criteria**: All portfolio items load within 2 seconds, filtering works smoothly, lightbox provides clear detail view

### CV/Resume Presentation
- **Functionality**: HTML-rendered resume with PDF download capability
- **Purpose**: Provide complete professional background in both readable and downloadable formats
- **Trigger**: "See My CV" CTA or navigation
- **Progression**: CV page loads → User scans content → Clicks download → PDF saves locally
- **Success criteria**: CV content is clearly formatted and PDF downloads successfully

### Content Management System
- **Functionality**: Admin interface for updating portfolio items, about content, and CV
- **Purpose**: Enable independent content updates without developer intervention
- **Trigger**: Admin login (owner authentication via spark.user())
- **Progression**: Owner visits site → Authenticated as owner → Admin controls appear → Makes edits → Changes persist
- **Success criteria**: Owner can add/edit/delete portfolio items and update text content

### Contact Integration
- **Functionality**: Contact form with email forwarding and professional contact display
- **Purpose**: Facilitate direct communication from potential employers
- **Trigger**: Contact page navigation or inline contact sections
- **Progression**: User fills form → Submits → Email sent → Confirmation displayed
- **Success criteria**: Form submissions reach designated email within 5 minutes

## Edge Case Handling

- **No Portfolio Items**: Display elegant empty state with admin prompts for content creation
- **Large Image Files**: Implement lazy loading and compression to maintain performance
- **Form Spam**: Basic validation and rate limiting to prevent abuse
- **Mobile Navigation**: Collapsible menu system for small screens
- **Slow Connections**: Progressive loading with skeleton states for content

## Design Direction

The design should evoke sophistication, artisanal craftsmanship, and professional excellence - reflecting the precision and artistry of fine pastry work. A minimal interface with generous white space allows the visual work to be the star while maintaining the professional credibility required for career advancement.

## Color Selection

Complementary (opposite colors) - Using the specified blue palette to create visual interest while maintaining professional sophistication.

- **Primary Color**: Dark Blue (oklch(0.25 0.15 240)) - Communicates trust, professionalism, and depth of expertise
- **Secondary Colors**: Light Blue (oklch(0.75 0.15 200)) for interactive elements and highlights, Charcoal Grey (oklch(0.25 0.02 0)) for body text
- **Accent Color**: Light Blue (oklch(0.75 0.15 200)) - Attention-grabbing highlight for CTAs and active states
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Charcoal text (oklch(0.25 0.02 0)) - Ratio 8.2:1 ✓
  - Primary (Dark Blue oklch(0.25 0.15 240)): White text (oklch(1 0 0)) - Ratio 9.1:1 ✓  
  - Accent (Light Blue oklch(0.75 0.15 200)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓
  - Card (Light Grey oklch(0.98 0.01 0)): Charcoal text (oklch(0.25 0.02 0)) - Ratio 7.9:1 ✓

## Font Selection

Typography should convey elegance and readability, reflecting the precision of pastry arts while ensuring excellent scanning for recruiters.

- **Typographic Hierarchy**: 
  - H1 (Name/Hero): Playfair Display Bold/48px/tight letter spacing - Elegant serif for personal branding
  - H2 (Section Headers): Inter SemiBold/32px/normal spacing - Clean sans-serif for structure
  - H3 (Portfolio Titles): Inter Medium/24px/normal spacing - Consistent hierarchy
  - Body Text: Inter Regular/16px/1.6 line height - Optimal readability
  - Labels/Tags: Inter Medium/14px/uppercase - Clear categorization

## Animations

Subtle, purposeful motion that enhances usability without distracting from content - reflecting the careful precision of pastry work.

- **Purposeful Meaning**: Smooth transitions communicate quality and attention to detail, hover states provide clear interaction feedback
- **Hierarchy of Movement**: Portfolio filtering (300ms), lightbox open/close (250ms), button hover states (150ms), page transitions (400ms)

## Component Selection

- **Components**: Card for portfolio items, Dialog for lightbox viewer, Button for CTAs and filters, Form for contact, Tabs for CV sections, Badge for category labels
- **Customizations**: Custom masonry grid layout, specialized image optimization, admin interface overlays using sheet/drawer components
- **States**: Hover states for portfolio cards with subtle lift effect, active states for filter buttons, loading states for image gallery, focused states for form inputs
- **Icon Selection**: Phosphor icons for download (DownloadSimple), contact (Envelope), navigation (List), admin (Gear), close (X)
- **Spacing**: 8px base unit - padding-4 for cards, gap-6 for grid items, py-8 for sections, px-6 for containers
- **Mobile**: Stack hero elements vertically, single-column portfolio grid, collapsible navigation, touch-optimized filter buttons, bottom sheet for mobile lightbox