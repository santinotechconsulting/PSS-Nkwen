# Quality Assurance & Testing Acceptance Checklist
**Presbyterian Secondary School (PSS) Nkwen Official Web Portal**
**Santino Tech Consulting - "We Build Your Digital Presence"**

This document details the functional, visual, accessibility, and architectural test criteria verified on the project.

---

## 1. Page Routes & Navigation Integrity
- [x] **Homepage (`/`)**: Displays hero, verified Centre 11409 facts, academic pillars, latest news, and upcoming events.
- [x] **About Us (`/about`)**: Renders denominational identity, institutional background, governance note, and values.
- [x] **Academics (`/academics`)**: Presents curriculum overview, departments, subjects, laboratory instruction, and co-curriculars.
- [x] **Admissions (`/admissions`)**: Displays entry pathways, admission guidelines, downloadable checklist link, and working enquiry form.
- [x] **News & Announcements (`/news`)**: Category filter tabs, search input, unboxed date/category metadata, and read-more routes.
- [x] **Article Detail (`/news/:slug`)**: Full prose layout, drop cap typography, share button, and related articles.
- [x] **Events & Calendar (`/events`)**: Chronological event schedule, categories, dates/times/venues, and term calendar notice.
- [x] **Photo Gallery (`/gallery`)**: Responsive album grid, child privacy notice, and accessible interactive lightbox modal.
- [x] **Downloads (`/downloads`)**: Working downloadable text/PDF files, category filters, and search bar.
- [x] **Contact Us (`/contact`)**: Verified location (Nkwen, Bamenda), directory phone note, working contact enquiry form.
- [x] **Privacy Policy (`/privacy`)**: Child privacy protection, form data handling, data retention, and administrative review notice.
- [x] **Admin Guide (`/admin-guide`)**: Full handover manual and trigger for the in-browser WordPress CMS Bridge.

---

## 2. Interactive Form Handling & Validation
- [x] **Cameroon Phone Validation**: Validates `+237 6xx xx xx xx` or `6xx xx xx xx` standard telecom formats.
- [x] **Server/Local Persistence**: Generates unique tracking reference codes (e.g. `PSS-ADM-XXXX`) and persists submissions.
- [x] **Anti-Spam & Honeypot**: Embedded in WordPress plugin endpoints.
- [x] **Privacy Agreement Enforcement**: Mandatory checkbox prior to submission.
- [x] **No Simulated Delays**: Direct, honest feedback provided immediately upon submission.

---

## 3. Visual & Aesthetic Standards (Design Constitution Compliance)
- [x] **Top Bar Contract**: Exactly 3 zones (Zone 1: wordmark, Zone 2: single-line nav links, Zone 3: primary CTA).
- [x] **Zero-Pill Discipline**: Metadata uses unboxed typography with typographic separators (`·`).
- [x] **Anti-AI Slop**: No `//` comment headings, no fake telemetry, no glowing pulse dots, no thick left accent borders.
- [x] **Typography**: Playfair Display for editorial headings, Plus Jakarta Sans for body prose, tabular numerals for figures.
- [x] **Zero-Broken-Image Policy**: All images have robust domain-tailored CSS/SVG fallback containers.

---

## 4. Mobile Responsiveness & Accessibility
- [x] Mobile drawer navigation tested for touchscreen and keyboard focus.
- [x] Touch targets exceed 44px on mobile devices.
- [x] Color contrast ratios exceed WCAG AA standards (4.5:1 text, 3:1 large text).
- [x] Visible focus rings (`focus-visible`) enabled across all interactive controls.
