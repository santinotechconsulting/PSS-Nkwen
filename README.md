# Presbyterian Secondary School (PSS) Nkwen — Official Web Portal

**Developed by Santino Tech Consulting**  
*Tagline: "We Build Your Digital Presence."*

Official modern, responsive, accessible, and secure web portal for **Presbyterian Secondary School (PSS) Nkwen**, located in Nkwen, Bamenda, North-West Region, Cameroon (Cameroon GCE Board Examination Centre No. **11409**).

---

## 1. Project Overview & Architecture

This application delivers a decoupled (headless) digital presence for PSS Nkwen:
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7.
- **CMS Backend**: WordPress (running on Hostinger or any PHP/MySQL host) using standard REST API (`/wp-json/wp/v2/`) and the custom `pss-nkwen-core` plugin (`/wp-json/pss-nkwen/v1/`).
- **Synchronized Data & Offline Fallback**: Features an in-browser WordPress CMS Bridge enabling instant toggling between live WordPress REST API data and verified historical archives, with local persistence for test enquiry submissions.

---

## 2. Verified School Information

- **School Name**: Presbyterian Secondary School Nkwen
- **Acronym**: PSS Nkwen
- **Location**: Nkwen, Bamenda, North-West Region, Cameroon
- **Classification**: Denominational Secondary School (Presbyterian Education Authority)
- **Examination Centre Number**: **11409** (Cameroon GCE Board)
- **2025 O-Level Session Record**: 9 registered candidates, 9 sat for 4+ subjects, 9 passed in category reported for Centre 11409 (Strictly reported as year-specific historical examination centre data).
- **PEA Directory Telephone**: `677866377` (Listed with explicit notice that current number is under school administration confirmation).
- **Provisional Stance / Copy**: *"Learning, Character and Service"* (Proposed copy awaiting formal school board confirmation).

---

## 3. Key Pages & Routes

1. **Home (`/`)**: Hero banner, verified examination centre facts, academic pillars, admissions callout, latest news, upcoming events, and document spotlight.
2. **About Us (`/about`)**: Denominational history, Presbyterian educational tradition, governance structure, and core values.
3. **Academics (`/academics`)**: Curriculum breakdown (Sciences, Arts & Social Sciences, Bilingual Languages, Business), laboratory instruction, and student clubs.
4. **Admissions (`/admissions`)**: Entry pathways, admission guide, downloadable checklist, and **working admission enquiry form** with Cameroon phone validation (`+237`).
5. **News & Announcements (`/news` & `/news/:slug`)**: Publication archives, category filtering, search, and full editorial reading view.
6. **Events & Calendar (`/events`)**: Chronological event schedule, categories, and calendar notices.
7. **Photo Gallery (`/gallery`)**: Responsive album grid with an accessible lightbox viewer and child privacy safeguards.
8. **Downloads (`/downloads`)**: Public document repository with instant downloadable resources.
9. **Contact Us (`/contact`)**: Campus location, directory telephone notice, and working enquiry form.
10. **Privacy Policy (`/privacy`)**: Data handling disclosure, student protection, and retention guidelines.
11. **Admin & WP Bridge (`/admin-guide`)**: Technical handover manual with diagnostic tools.

---

## 4. Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Commands
```bash
# Install dependencies
npm install

# Run development server (Port 3000)
npm run dev

# Compile TypeScript and build for production
npm run build

# Run type checking & linting
npm run lint
```

---

## 5. WordPress Custom Plugin

Located in `/wordpress-plugin/pss-nkwen-core/pss-nkwen-core.php`.
- Custom post types: `pss_event`, `pss_document`, `pss_enquiry`.
- REST API endpoints under `/wp-json/pss-nkwen/v1/`.
- Private enquiry logging: Submissions are stored privately in WordPress and never exposed to unauthenticated public API queries.
- CORS configuration for frontend domains.

Installation: Compress `pss-nkwen-core` into a zip archive and upload via **WordPress Admin > Plugins > Add New > Upload Plugin**.

---

## 6. Deployment Documentation

Comprehensive deployment instructions are provided in the `/docs` directory:
- [Hostinger Deployment Guide](docs/HOSTINGER_DEPLOYMENT_GUIDE.md)
- [Vercel + Hostinger Decoupled Hybrid Guide](docs/VERCEL_HOSTINGER_HYBRID_GUIDE.md)
- [WordPress Administrator Manual](docs/WORDPRESS_ADMIN_MANUAL.md)
- [Content Collection Checklist](docs/CONTENT_COLLECTION_CHECKLIST.md)
- [Verified vs. Unconfirmed Information Registry](docs/UNCONFIRMED_SCHOOL_INFO_REGISTRY.md)
- [QA & Testing Acceptance Checklist](docs/TESTING_ACCEPTANCE_CHECKLIST.md)

---

## 7. Developer & Attribution

- **Developed by**: Santino Tech Consulting
- **Tagline**: *We Build Your Digital Presence.*
- **Target Institution**: Presbyterian Secondary School (PSS) Nkwen, Bamenda, Cameroon.
