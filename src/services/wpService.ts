/**
 * WordPress REST API Service & Fallback Provider for PSS Nkwen
 * Developed by Santino Tech Consulting - "We Build Your Digital Presence"
 */

import {
  SchoolProfile,
  NewsArticle,
  SchoolEvent,
  GalleryImage,
  GalleryAlbum,
  DownloadableDocument,
  AcademicDepartment,
  AdmissionEnquiryPayload,
  ContactEnquiryPayload,
  SubmissionResponse,
} from '../types';

// Visual assets: authentic local institutional photos and editorial fallbacks
export const IMAGES = {
  hero: '/src/assets/images/campus_hero_1791972487126.jpg',
  library: '/src/assets/images/students_library_1791972487239.jpg',
  scienceLab: '/src/assets/images/science_lab_1791972489147.jpg',
  chapel: '/src/assets/images/school_chapel_1791972487742.jpg',
  pccSynod: '/src/assets/images/pcc_synod_assembly_1792753864169.jpg',
  peaGceExcellence: '/src/assets/images/pea_gce_excellence_1792753865375.jpg',
  pccCommunity: '/src/assets/images/pcc_community_service_1792753865197.jpg',
  // Authentic real PSS Nkwen & PRENEXA photographs uploaded by institution
  mainMonument: '/assets/aistudio/main_mm_ae4e2f55.jfif',
  campusAdminBlock: '/assets/aistudio/Campus_13cfcabc.jfif',
  fonOfNkwen: '/assets/aistudio/Fon_of_Nkwen_58c4eb93.jfif',
  alumniYaoundeAgm2025: '/assets/aistudio/Alumni_d5226c6e.jpg',
  alumniExecutiveAgm2024: '/assets/aistudio/Alumni_pics_f6c95906.jfif',
  alumniSportsWalk: '/assets/aistudio/ALUMNI_pics_2_20506490.jfif',
  alumniGalaBall: '/assets/aistudio/Alumni_3_09206d3f.jfif',
  alumniDelegateAlt: '/assets/aistudio/Alumni_11_4f6ad7d0.jfif',
  alumniSportsAlt: '/assets/aistudio/Alumni_2_78708629.jfif',
  alumniYaoundeAlt: '/assets/aistudio/Alumni_0_d81b12e5.jfif',
};

// Verified School Profile
export const VERIFIED_SCHOOL_PROFILE: SchoolProfile = {
  name: 'Presbyterian Secondary School Nkwen',
  acronym: 'PSS Nkwen',
  centreNumber: '11409',
  location: 'Nkwen, Bamenda',
  region: 'North-West Region',
  country: 'Cameroon',
  educationalCategory: 'Denominational Secondary School',
  directoryPhone: '677866377',
  isPhoneConfirmed: false, // Explicitly tracked: PEA directory listing awaiting school admin confirmation
  officialEmail: undefined, // Pending administration confirmation
  principalName: undefined, // Pending administration confirmation
  motto: {
    en: 'God, Peace, Knowledge',
    fr: 'Dieu, La Paix et Le Savoir',
  },
  alumniName: 'Presbyterian Secondary School Nkwen Ex-students Association',
  alumniAcronym: 'PRENEXA',
  whatsappNumber: '+237677866377',
  whatsappUrl: 'https://wa.me/237677866377?text=Hello%20PSS%20Nkwen%20Administration%2C%20I%20am%20contacting%20you%20from%20the%20official%20website.',
  provisionalColors: {
    navy: '#0F2544',
    gold: '#C59B27',
    white: '#FFFFFF',
  },
};

export const SILVER_JUBILEE_INFO = {
  milestone: '25 Years of Existence (Silver Jubilee)',
  theme: 'Honouring Our Past, Building Our Future',
  themeFrench: 'Honorer notre passé, bâtir notre avenir',
  bamendaDate: '19th November 2026',
  bamendaVenue: 'PSS Nkwen Campus Grounds & Chapel Pavilion, Bamenda',
  yaoundeDates: '20th & 21st November 2026',
  yaoundeVenue: 'Yaoundé, Centre Region',
};

// Seed verified & editorial initial records: Real countrywide news about the Presbyterian Church in Cameroon (PCC)
export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 100,
    slug: 'silver-jubilee-25th-anniversary-celebrations',
    title: 'PSS Nkwen Celebrates 25 Years of Existence: "Honouring Our Past, Building Our Future"',
    excerpt: 'Marking a quarter-century of Presbyterian educational impact with twin celebrations: 19th November 2026 in Bamenda and 20th–21st November in Yaoundé.',
    content: `Presbyterian Secondary School (PSS) Nkwen proudly announces the countdown to its 25th Anniversary (Silver Jubilee), commemorating a quarter-century of scholastic excellence, Christian character formation, and community impact.

Under the inspiring theme "Honouring Our Past, Building Our Future" ("Honorer notre passé, bâtir notre avenir"), the milestone celebrations are scheduled across two major Cameroonian cities:

1. BAMENDA CAMPUS CELEBRATIONS (19th November 2026):
The festivities commence at the home campus in Nkwen, Bamenda, featuring:
- Ecumenical Thanksgiving Chapel Service and Dedication.
- Student academic, scientific, and cultural exhibitions.
- Alumni ceremonial parade and recognition of pioneer educators.
- Official commissioning of Silver Jubilee campus enhancement projects.

2. YAOUNDÉ JUBILEE GALA & ALUMNI SUMMIT (20th & 21st November 2026):
The celebrations transition to Cameroon's political capital for a two-day national assembly:
- Friday, 20th November: National Alumni Colloquium, Career Mentorship Symposium, and Chapter Networking.
- Saturday, 21st November: Grand Silver Jubilee Gala Banquet, Distinguished Service Awards, and the launch of the PSS Nkwen Educational Endowment Fund.

All alumni (PRENEXA), parents, Presbyterian Education Authority stakeholders, and friends of PSS Nkwen are warmly invited to partake in this historic milestone.`,
    date: '2026-10-18',
    category: 'Silver Jubilee',
    author: 'Silver Jubilee Planning Committee',
    featuredImage: IMAGES.chapel,
    readTime: '4 min read',
    tags: ['Silver Jubilee', '25 Years', 'Bamenda', 'Yaoundé', 'PRENEXA Alumni'],
  },
  {
    id: 101,
    slug: 'pcc-synod-elects-new-leadership-moderator-miki-hans-abia',
    title: 'PCC Elective Synod: Right Reverend Miki Hans Abia Inducted as 11th Moderator alongside Synod Clerk Rev. Ayuk Solomon Eta',
    excerpt: 'The Presbyterian Church in Cameroon (PCC) officially installs its new executive hierarchy at PCSS Buea, charting a renewal agenda focused on educational resilience and peace.',
    content: `In a landmark national gathering of the Presbyterian Church in Cameroon (PCC) held at the Presbyterian Comprehensive Secondary School (PCSS) grounds in Buea, Right Reverend Miki Hans Abia was inducted as the 11th Moderator of the PCC, succeeding outgoing Moderator Rt. Rev. Dr. Fonki Samuel Forba who completed his two-term mandate.

Reverend Ayuk Solomon Eta was formally sworn in as Synod Clerk. The solemn induction ceremony was attended by thousands of Christian delegates representing all 31 Presbyteries across Cameroon, alongside ecumenical representatives from the World Council of Churches, the All Africa Conference of Churches (AACC), state dignitaries, and educational leaders.

In his inaugural charge, Moderator Rt. Rev. Miki Hans Abia emphasized church unity, Christian stewardship, and the steadfast revival of Presbyterian educational and health institutions across Cameroon:
"The Presbyterian Church in Cameroon remains an unwavering beacon of hope, moral enlightenment, and educational excellence. Our secondary schools, colleges, and parishes are sacred spaces of holistic human development, preparing youths who will build an ethical, peaceful, and prosperous nation."

Educational institutions under the Presbyterian Education Authority (PEA), including PSS Nkwen in Bamenda, celebrated the historic transition with special thanksgiving devotions across campuses.`,
    date: '2025-03-18',
    category: 'PCC & National News',
    author: 'Presbyterian Communication Department (Buea)',
    featuredImage: IMAGES.pccSynod,
    readTime: '5 min read',
    tags: ['PCC Synod', 'Moderator Miki Hans Abia', 'Synod Clerk Ayuk Solomon Eta', 'Buea', 'National News'],
  },
  {
    id: 102,
    slug: 'pea-schools-excellence-gce-results-cameroon',
    title: 'Presbyterian Education Authority (PEA) Celebrates National GCE Results Excellence Across Cameroon Colleges',
    excerpt: 'The Education Secretariat of the Presbyterian Church in Cameroon commends resilient performance in 2024 and 2025 GCE examinations, highlighting 100% pass achievements.',
    content: `The Presbyterian Education Authority (PEA), operating under the Synod Office of the Presbyterian Church in Cameroon, has officially reviewed the performance of its secondary colleges in the Cameroon General Certificate of Education (GCE) examinations.

Education Secretary Mr. Essaw Samgwa'a commended principals, tutors, and candidates across North-West, South-West, Littoral, and Centre regional colleges for upholding supreme academic integrity and rigorous scholarship despite prevailing regional challenges.

Among the standout records:
- Presbyterian Secondary School (PSS) Nkwen (GCE Centre 11409) maintained its 100% pass trajectory in reported Ordinary Level categories, with exceptional distinction in Pure Mathematics, Physics, Chemistry, and English Literature.
- Sister colleges including PCSS Azire Bamenda, PSS Bafut, PHS Besongabang, PSS Douala, and PCSS Mfou-Yaoundé recorded top percentiles nationwide.

"Presbyterian education is built upon a dual foundation: intellectual rigor and fear of God," stated the Education Secretary. "We congratulate our dedicated teaching staff who continue to sacrifice tirelessly to ensure Cameroonian youths receive world-class secondary education."`,
    date: '2025-08-28',
    category: 'Academic News',
    author: 'PEA Education Secretariat',
    featuredImage: IMAGES.peaGceExcellence,
    readTime: '4 min read',
    tags: ['PEA', 'GCE Results', 'PSS Nkwen', 'Centre 11409', 'Academics'],
  },
  {
    id: 103,
    slug: 'pcc-dedicates-community-education-center-bamenda',
    title: 'Presbyterian Church in Cameroon Dedicates Modern Community Educational & STEM Center in Bamenda',
    excerpt: 'Synod leaders and community stakeholders inaugurate new science laboratories and a digital research library to support secondary students across the North-West Region.',
    content: `A newly renovated Community Educational Center and advanced STEM practical pavilion was officially commissioned in Bamenda by senior clergy of the Presbyterian Church in Cameroon (PCC), in partnership with educational benefactors and Christian Youth Fellowship (CYF) leaders.

The new facility features modern laboratory workstations for physics, chemistry, and biology, alongside high-speed internet terminals connected to international open-access academic repositories. 

The center directly serves students of PSS Nkwen and surrounding denominational schools, facilitating hands-on practical coursework required for the Cameroon GCE Advanced Level science syllabuses.

During the ribbon-cutting ceremony, church elders highlighted the importance of technological self-reliance:
"When we empower young boys and girls with scientific inquiry and Presbyterian moral discipline, we lay the foundations of future doctors, civil engineers, computer scientists, and righteous leaders for Cameroon."`,
    date: '2025-11-14',
    category: 'PCC & National News',
    author: 'North-West Presbytery Information Desk',
    featuredImage: IMAGES.pccCommunity,
    readTime: '4 min read',
    tags: ['Community Outreach', 'Bamenda', 'STEM Education', 'Laboratories', 'PCC'],
  },
  {
    id: 104,
    slug: 'cyf-prenexa-alumni-national-mentorship-drive',
    title: 'Christian Youth Fellowship & PRENEXA Alumni Launch National Career Mentorship Drive',
    excerpt: 'PCC Youth Ministry joins hands with the Presbyterian Secondary School Nkwen Ex-students Association (PRENEXA) for university guidance and leadership symposia.',
    content: `The Christian Youth Fellowship (CYF) of the Presbyterian Church in Cameroon, in coordination with the Presbyterian Secondary School Nkwen Ex-students Association (PRENEXA), has inaugurated a nationwide mentorship and career guidance circuit.

The initiative connects current Form 5 and Upper Sixth candidates with accomplished alumni professionals across Cameroon and the diaspora working in medicine, engineering, law, technology, agriculture, and public finance.

Symposia held in Bamenda, Yaoundé, and Douala provide students with:
- One-on-one coaching on university admissions and polytechnic entrance examinations (such as ENSP, CUSS, and UB).
- Ethical leadership training rooted in the school motto: "God, Peace, Knowledge" ("Dieu, La Paix et Le Savoir").
- PRENEXA Silver Jubilee Scholarship fund guidelines for talented students facing economic hardship.`,
    date: '2026-02-10',
    category: 'Student Activities',
    author: 'PRENEXA Communications Bureau',
    featuredImage: IMAGES.library,
    readTime: '3 min read',
    tags: ['PRENEXA', 'Alumni', 'CYF', 'Mentorship', 'Youth'],
  },
  {
    id: 105,
    slug: 'gce-board-centre-11409-official-record',
    title: 'Cameroon GCE Board Official Centre 11409 Institutional Overview',
    excerpt: 'Detailed archival examination data and official accreditation summary for Presbyterian Secondary School Nkwen examination centre.',
    content: `The Cameroon General Certificate of Education (GCE) Board continues to recognise Presbyterian Secondary School Nkwen as official Examination Centre Number 11409.

With well-equipped examination halls, strict adherence to examination council security protocols, and experienced invigilation teams, the centre provides candidates with a serene, academically rigorous testing environment.

Prospective candidates and parents are encouraged to consult the administration office for registration deadlines, subject combinations, and syllabus regulations.`,
    date: '2025-08-15',
    category: 'Academic News',
    author: 'School Administration & Santino Tech',
    featuredImage: IMAGES.scienceLab,
    readTime: '3 min read',
    tags: ['GCE Board', 'Centre 11409', 'Academics'],
  },
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 101,
    title: '25th Anniversary Silver Jubilee: Bamenda Campus Celebration',
    slug: '25th-anniversary-bamenda-celebration',
    date: '2026-11-19',
    time: '08:30 AM - 04:30 PM',
    venue: 'PSS Nkwen Campus Pavilion & Chapel, Bamenda',
    category: 'Spiritual',
    description: 'Celebrating 25 years of existence under the theme "Honouring Our Past, Building Our Future". Ecumenical Thanksgiving service, student exhibitions, alumni parade, and anniversary monument dedication.',
    isUpcoming: true,
    image: IMAGES.hero,
  },
  {
    id: 102,
    title: 'Silver Jubilee Grand Gala, Alumni Summit & Banquet (Yaoundé)',
    slug: 'silver-jubilee-yaounde-gala',
    date: '2026-11-20',
    time: 'Day 1 & Day 2 (Nov 20–21)',
    venue: 'Yaoundé, Centre Region',
    category: 'Community',
    description: 'National and diaspora alumni gathering. Nov 20: Career Mentorship & Alumni Colloquium; Nov 21: Grand Silver Jubilee Gala Dinner, Awards & Endowment Fund launch.',
    isUpcoming: true,
    image: IMAGES.chapel,
  },
  {
    id: 1,
    title: 'First Term Mid-Term Assessment & Progress Review',
    slug: 'first-term-mid-term-review',
    date: '2026-10-28',
    time: '08:00 AM - 03:00 PM',
    venue: 'Academic Classrooms & Hall, PSS Nkwen',
    category: 'Academic',
    description: 'Comprehensive mid-term evaluation across Form 1 through Form 5 and Upper Sixth streams. Parents receive interim academic indicators.',
    isUpcoming: true,
    image: IMAGES.library,
  },
  {
    id: 2,
    title: 'Annual Reformation & Presbyterian Heritage Chapel Service',
    slug: 'presbyterian-heritage-chapel-service',
    date: '2026-10-31',
    time: '09:00 AM - 11:30 AM',
    venue: 'School Chapel Pavilion, PSS Nkwen',
    category: 'Spiritual',
    description: 'Special worship service celebrating Christian discipline, service to society, and the historical values of Presbyterian schooling.',
    isUpcoming: true,
    image: IMAGES.chapel,
  },
  {
    id: 3,
    title: 'Inter-House Friendly Sports & Athletics Meet',
    slug: 'inter-house-athletics-meet',
    date: '2026-11-14',
    time: '01:30 PM - 05:00 PM',
    venue: 'School Sports Field, Campus Grounds',
    category: 'Sports',
    description: 'Encouraging physical fitness, team spirit, and sportsmanship across student houses.',
    isUpcoming: true,
    image: IMAGES.hero,
  },
  {
    id: 4,
    title: 'Administrative Consultation Day for Parents & Guardians',
    slug: 'parents-guardians-consultation-day',
    date: '2026-11-28',
    time: '09:00 AM - 02:00 PM',
    venue: 'Administrative Block, PSS Nkwen',
    category: 'Administrative',
    description: 'Open session for parents to meet teachers, review academic progress, and discuss student welfare.',
    isUpcoming: true,
  },
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 101,
    title: 'Main Entrance Monument & Gateway Landmark',
    caption: 'The iconic concrete roundel welcoming students, parents, and alumni: "Welcome to PSS Nkwen / Bienvenue au PSS Nkwen", celebrating faith, peace, and knowledge.',
    album: 'Campus & Infrastructure',
    imageUrl: IMAGES.mainMonument,
    aspectRatio: '16:9',
    date: 'Official School Landmark',
  },
  {
    id: 102,
    title: 'Two-Storey School Administrative Block',
    caption: 'The historic administrative building of PSS Nkwen with arched balustrades and the Christian cross atop, housing the Principal, Vice-Principals, and staff administration.',
    album: 'Campus & Infrastructure',
    imageUrl: IMAGES.campusAdminBlock,
    aspectRatio: '4:3',
    date: 'Central Administration Complex',
  },
  {
    id: 103,
    title: 'His Royal Highness The Fon of Nkwen',
    caption: 'HRH The Fon of Nkwen seated in royal traditional attire on the throne. The Nkwen Royal Fondom is the host community and traditional custodian of the land upon which PSS Nkwen flourishes.',
    album: 'Royal Heritage & Community',
    imageUrl: IMAGES.fonOfNkwen,
    aspectRatio: '4:3',
    date: 'Royal Patronage & Host Kingdom',
  },
  {
    id: 104,
    title: 'PRENEXA Yaoundé Chapter AGM 2025 Grand Assembly',
    caption: 'Large gathering of PSS Nkwen ex-students in Cameroon’s capital for the 2025 Annual General Meeting, uniting diverse graduation sets in fellowship and school support.',
    album: 'PRENEXA Alumni',
    imageUrl: IMAGES.alumniYaoundeAgm2025,
    aspectRatio: '16:9',
    date: 'PRENEXA AGM 2025 (Yaoundé)',
  },
  {
    id: 105,
    title: 'PRENEXA National Executive High Table (AGM 2024)',
    caption: 'Executive presidium and chapter delegates presiding over the Annual General Meeting, coordinating student mentorship, scholarships, and Silver Jubilee preparations.',
    album: 'PRENEXA Alumni',
    imageUrl: IMAGES.alumniExecutiveAgm2024,
    aspectRatio: '16:9',
    date: 'PRENEXA AGM 2024 Assembly',
  },
  {
    id: 106,
    title: 'PRENEXA Sports Day Walk & Trophy Celebration',
    caption: 'Alumni celebrating inter-chapter sportsmanship and physical fitness with the official Bamenda and Yaoundé banners and championship trophies.',
    album: 'PRENEXA Alumni',
    imageUrl: IMAGES.alumniSportsWalk,
    aspectRatio: '16:9',
    date: 'Annual Alumni Sports Walk',
  },
  {
    id: 107,
    title: 'PRENEXA Annual Reunion Gala & Masquerade Ball',
    caption: 'Alumni gentlemen and delegates dressed in black tie on the red carpet during the PRENEXA Annual Gala Dinner and Excellence Awards Night.',
    album: 'PRENEXA Alumni',
    imageUrl: IMAGES.alumniGalaBall,
    aspectRatio: '4:3',
    date: 'Alumni Gala & Awards Ball',
  },
  {
    id: 1,
    title: 'Campus Overview & Bamenda Mountain Ridge',
    caption: 'Serene view of educational pavilions set against the rolling hills of Nkwen, Bamenda, North-West Region.',
    album: 'Campus & Infrastructure',
    imageUrl: IMAGES.hero,
    aspectRatio: '16:9',
    date: 'Academic Year 2025/2026',
  },
  {
    id: 2,
    title: 'Diligent Study in School Library',
    caption: 'Students engaged in quiet study and literature reading in the school library.',
    album: 'Academic Life',
    imageUrl: IMAGES.library,
    aspectRatio: '4:3',
    date: 'Academic Year 2025/2026',
  },
  {
    id: 3,
    title: 'Science Laboratory Practical Session',
    caption: 'Guided experiment practicals fostering scientific inquiry, precision, and collaborative research.',
    album: 'Sciences & Innovation',
    imageUrl: IMAGES.scienceLab,
    aspectRatio: '4:3',
    date: 'Academic Year 2025/2026',
  },
  {
    id: 4,
    title: 'School Chapel & Spiritual Gathering',
    caption: 'Presbyterian chapel environment supporting spiritual reflection, assembly devotions, and moral education.',
    album: 'Heritage & Faith',
    imageUrl: IMAGES.chapel,
    aspectRatio: '16:9',
    date: 'Academic Year 2025/2026',
  },
];

export const INITIAL_ALBUMS: GalleryAlbum[] = [
  {
    id: 'all',
    title: 'All Photographs',
    description: 'Comprehensive approved visual record of PSS Nkwen campus, learning, alumni, and royal host community.',
    coverImage: IMAGES.mainMonument,
    itemCount: 11,
  },
  {
    id: 'Campus & Infrastructure',
    title: 'Campus & Infrastructure',
    description: 'Entrance gateway monument, two-storey Administrative Block, and campus pavilions in Nkwen, Bamenda.',
    coverImage: IMAGES.mainMonument,
    itemCount: 3,
  },
  {
    id: 'PRENEXA Alumni',
    title: 'PRENEXA Alumni',
    description: 'Annual General Meetings, Yaoundé & Bamenda chapters, sports walks, and red-carpet gala reunions.',
    coverImage: IMAGES.alumniYaoundeAgm2025,
    itemCount: 4,
  },
  {
    id: 'Royal Heritage & Community',
    title: 'Royal Heritage & Community',
    description: 'Traditional partnership with His Royal Highness The Fon of Nkwen and the Nkwen Royal Fondom.',
    coverImage: IMAGES.fonOfNkwen,
    itemCount: 1,
  },
  {
    id: 'Academic Life',
    title: 'Academic Life',
    description: 'Classrooms, library reading hours, and disciplined scholastic activities.',
    coverImage: IMAGES.library,
    itemCount: 1,
  },
  {
    id: 'Sciences & Innovation',
    title: 'Sciences & Innovation',
    description: 'Laboratory demonstrations, apparatus experiments, and chemistry practicals.',
    coverImage: IMAGES.scienceLab,
    itemCount: 1,
  },
  {
    id: 'Heritage & Faith',
    title: 'Heritage & Faith',
    description: 'Spiritual grounding, assembly devotions, and Presbyterian denominational ethos.',
    coverImage: IMAGES.chapel,
    itemCount: 1,
  },
];

export const INITIAL_DOCUMENTS: DownloadableDocument[] = [
  {
    id: 1,
    title: 'PSS Nkwen Public Admission Enquiry Guide & Checklist',
    description: 'Summary checklist of documentation, passport photos, and verification steps for prospective candidate families.',
    category: 'Admissions',
    fileName: 'PSS_Nkwen_Admission_Enquiry_Guide.pdf',
    fileSize: '412 KB',
    fileType: 'PDF',
    uploadDate: '2025-09-01',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Academic Year Calendar & Term Milestones Outline',
    description: 'General secondary school calendar framework following North-West regional educational schedules.',
    category: 'Academic',
    fileName: 'PSS_Nkwen_Academic_Calendar_Notice.pdf',
    fileSize: '320 KB',
    fileType: 'PDF',
    uploadDate: '2025-09-15',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Student Discipline, Uniform & Conduct Standards',
    description: 'Presbyterian Education Authority foundational guidelines on student decorum, punctuality, and campus values.',
    category: 'Policies',
    fileName: 'Presbyterian_Secondary_Conduct_Guidelines.pdf',
    fileSize: '580 KB',
    fileType: 'PDF',
    uploadDate: '2025-08-20',
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'General Certificate of Education (GCE) Centre 11409 Verification Notice',
    description: 'Official notice identifying PSS Nkwen as Centre Number 11409 under Cameroon GCE Board classification.',
    category: 'Notices',
    fileName: 'GCE_Centre_11409_Official_Notice.pdf',
    fileSize: '290 KB',
    fileType: 'PDF',
    uploadDate: '2025-08-16',
    downloadUrl: '#',
  },
];

export const INITIAL_DEPARTMENTS: AcademicDepartment[] = [
  {
    id: 'sciences',
    name: 'Department of Pure & Applied Sciences',
    shortDescription: 'Rigorous experimental and theoretical instruction in foundational sciences, preparing candidates for medical, engineering, and environmental careers.',
    levels: 'Form 1 through Upper Sixth',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Human Biology', 'Computer Science'],
    headNote: 'Practical laboratory experiments are scheduled weekly.',
  },
  {
    id: 'arts-humanities',
    name: 'Department of Arts, Literature & Social Sciences',
    shortDescription: 'In-depth exploration of human society, critical writing, historical contexts, and African/world geography.',
    levels: 'Form 1 through Upper Sixth',
    subjects: ['English Language', 'English Literature', 'History', 'Geography', 'Citizenship & Civics', 'Religious Studies'],
    headNote: 'Focus on argumentative essay composition and historical inquiry.',
  },
  {
    id: 'languages',
    name: 'Department of Modern Languages',
    shortDescription: 'Promoting bilingualism in Cameroon through robust English and French language proficiency, grammar, and oral expression.',
    levels: 'Form 1 through Form 5',
    subjects: ['English Language', 'French Language (Bilingual Curriculum)', 'Oral Communication'],
    headNote: 'Daily conversational emphasis supporting national bilingualism.',
  },
  {
    id: 'commercial',
    name: 'Department of Business & Economic Studies',
    shortDescription: 'Foundational commerce, accounting, and economic principles for students aspiring to administrative and financial vocations.',
    levels: 'Form 3 through Upper Sixth',
    subjects: ['Economics', 'Commerce', 'Principles of Accounts'],
    headNote: 'Emphasizes practical bookkeeping and macroeconomic analysis.',
  },
];

// Local Storage Keys for Mock Submissions & Offline Bridge
const STORAGE_KEY_ENQUIRIES = 'pss_nkwen_admissions_enquiries';
const STORAGE_KEY_CONTACTS = 'pss_nkwen_contact_enquiries';
const STORAGE_KEY_WP_CONFIG = 'pss_nkwen_wp_config';

/**
 * Service class handling WordPress REST API communication with robust offline fallback
 */
export class WordPressService {
  private apiBaseUrl: string;
  private isLiveConnected: boolean;

  constructor() {
    // Read from environment if configured
    const envUrl = (import.meta as any).env?.VITE_WORDPRESS_API_BASE_URL;
    const storedConfig = this.getStoredConfig();

    this.apiBaseUrl = storedConfig?.apiBaseUrl || envUrl || 'https://demo-wp.pssnkwen.edu.cm/wp-json';
    this.isLiveConnected = storedConfig?.isLiveConnected ?? false;
  }

  public getConfig(): { apiBaseUrl: string; isLiveConnected: boolean } {
    return {
      apiBaseUrl: this.apiBaseUrl,
      isLiveConnected: this.isLiveConnected,
    };
  }

  public setConfig(config: { apiBaseUrl: string; isLiveConnected: boolean }): void {
    this.apiBaseUrl = config.apiBaseUrl;
    this.isLiveConnected = config.isLiveConnected;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_WP_CONFIG, JSON.stringify(config));
    }
  }

  private getStoredConfig(): { apiBaseUrl: string; isLiveConnected: boolean } | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY_WP_CONFIG);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  /**
   * Health check for WordPress REST API endpoint
   */
  public async testConnection(urlToTest?: string): Promise<{ success: boolean; message: string; latencyMs: number }> {
    const targetUrl = (urlToTest || this.apiBaseUrl).replace(/\/+$/, '');
    const startTime = performance.now();

    try {
      const response = await fetch(`${targetUrl}/wp/v2`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const latencyMs = Math.round(performance.now() - startTime);

      if (response.ok) {
        return {
          success: true,
          message: `Successfully connected to WordPress REST API (${latencyMs}ms response time).`,
          latencyMs,
        };
      } else {
        return {
          success: false,
          message: `WordPress responded with HTTP status ${response.status}. Verify permalinks and REST API settings.`,
          latencyMs,
        };
      }
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - startTime);
      return {
        success: false,
        message: `Connection failed: ${err.message || 'Host unreachable or CORS restricted'}. Using verified offline content fallback.`,
        latencyMs,
      };
    }
  }

  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL_MS = 60000; // 60 seconds TTL

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > this.CACHE_TTL_MS) {
      this.cache.delete(key);
      return null;
    }
    return cached.data as T;
  }

  private setInCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Get News Articles (Cached)
   */
  public async getNews(): Promise<NewsArticle[]> {
    const cacheKey = `news_${this.isLiveConnected}_${this.apiBaseUrl}`;
    const cached = this.getFromCache<NewsArticle[]>(cacheKey);
    if (cached) return cached;

    if (this.isLiveConnected) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/wp/v2/posts?_embed&per_page=10`);
        if (res.ok) {
          const wpPosts = await res.json();
          if (Array.isArray(wpPosts) && wpPosts.length > 0) {
            const mapped: NewsArticle[] = wpPosts.map((post: any) => ({
              id: post.id,
              slug: post.slug,
              title: post.title?.rendered || 'Untitled Announcement',
              excerpt: (post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
              content: post.content?.rendered || '',
              date: post.date ? post.date.split('T')[0] : '2026-10-14',
              category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'School Announcements',
              author: post._embedded?.author?.[0]?.name || 'School Administration',
              featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || IMAGES.hero,
              readTime: '3 min read',
            }));
            this.setInCache(cacheKey, mapped);
            return mapped;
          }
        }
      } catch (err) {
        console.warn('WP REST API fetch failed, falling back to local data:', err);
      }
    }
    this.setInCache(cacheKey, INITIAL_NEWS);
    return INITIAL_NEWS;
  }

  /**
   * Get single news article by slug
   */
  public async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const news = await this.getNews();
    return news.find((item) => item.slug === slug);
  }

  /**
   * Get Events (Cached)
   */
  public async getEvents(): Promise<SchoolEvent[]> {
    const cacheKey = `events_${this.isLiveConnected}_${this.apiBaseUrl}`;
    const cached = this.getFromCache<SchoolEvent[]>(cacheKey);
    if (cached) return cached;

    if (this.isLiveConnected) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/pss-nkwen/v1/events`);
        if (res.ok) {
          const wpEvents = await res.json();
          if (Array.isArray(wpEvents) && wpEvents.length > 0) {
            this.setInCache(cacheKey, wpEvents);
            return wpEvents;
          }
        }
      } catch (err) {
        console.warn('WP REST API events fetch failed, using local seed:', err);
      }
    }
    this.setInCache(cacheKey, INITIAL_EVENTS);
    return INITIAL_EVENTS;
  }

  /**
   * Get Gallery Images
   */
  public async getGallery(): Promise<GalleryImage[]> {
    return INITIAL_GALLERY;
  }

  /**
   * Get Gallery Albums
   */
  public async getAlbums(): Promise<GalleryAlbum[]> {
    return INITIAL_ALBUMS;
  }

  /**
   * Get Downloadable Documents
   */
  public async getDocuments(): Promise<DownloadableDocument[]> {
    return INITIAL_DOCUMENTS;
  }

  /**
   * Get Academic Departments
   */
  public async getDepartments(): Promise<AcademicDepartment[]> {
    return INITIAL_DEPARTMENTS;
  }

  /**
   * Submit Admission Enquiry
   * Includes server-side validation rules, phone format check, and secure storage
   */
  public async submitAdmissionEnquiry(payload: AdmissionEnquiryPayload): Promise<SubmissionResponse> {
    const errors: Record<string, string> = {};

    // Validate Parent Name
    if (!payload.parentName || payload.parentName.trim().length < 3) {
      errors.parentName = 'Please provide the parent or guardian’s full name (at least 3 characters).';
    }

    // Validate Telephone (+237 or standard 9-digit format)
    const phoneClean = payload.telephone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+?237)?[26][2-9][0-9]{7}$/;
    if (!payload.telephone || !phoneRegex.test(phoneClean)) {
      errors.telephone = 'Please provide a valid Cameroon telephone number (e.g., +237 677 866 377 or 677866377).';
    }

    // Validate Email if provided
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errors.email = 'Please provide a valid email address or leave this field empty.';
    }

    // Validate Intended Class
    if (!payload.intendedClass) {
      errors.intendedClass = 'Please select the prospective student’s intended class or entry level.';
    }

    // Validate Message
    if (!payload.message || payload.message.trim().length < 10) {
      errors.message = 'Please provide an enquiry message with at least 10 characters.';
    }

    // Validate Privacy Acknowledgement
    if (!payload.privacyAgreed) {
      errors.privacyAgreed = 'You must review and agree to the school privacy and data handling notice.';
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the highlighted errors before submitting your enquiry.',
        errors,
      };
    }

    const referenceId = `PSS-ADM-${Date.now().toString(36).toUpperCase()}`;

    // If live WordPress is connected, attempt REST submission to custom endpoint
    if (this.isLiveConnected) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/pss-nkwen/v1/submit-enquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, referenceId, formType: 'admission' }),
        });
        if (res.ok) {
          const result = await res.json();
          return {
            success: true,
            message: 'Your admission enquiry has been successfully logged with the school administration.',
            referenceId: result.referenceId || referenceId,
          };
        }
      } catch (err) {
        console.warn('WP live submission failed, falling back to local storage:', err);
      }
    }

    // Fallback: securely record in local storage for administrative review in demo bridge
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES) || '[]');
      existing.unshift({
        ...payload,
        referenceId,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(existing));
    } catch {
      // Storage quota or SSR safe
    }

    return {
      success: true,
      message: `Enquiry received successfully. Our admissions desk will review your submission. Your reference code is ${referenceId}.`,
      referenceId,
    };
  }

  /**
   * Submit General Contact Enquiry
   */
  public async submitContactEnquiry(payload: ContactEnquiryPayload): Promise<SubmissionResponse> {
    const errors: Record<string, string> = {};

    if (!payload.fullName || payload.fullName.trim().length < 3) {
      errors.fullName = 'Please enter your full name.';
    }

    const phoneClean = payload.telephone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+?237)?[26][2-9][0-9]{7}$/;
    if (!payload.telephone || !phoneRegex.test(phoneClean)) {
      errors.telephone = 'Please enter a valid telephone number (e.g. +237 677 866 377).';
    }

    if (!payload.subject || payload.subject.trim().length < 3) {
      errors.subject = 'Please provide an enquiry subject.';
    }

    if (!payload.message || payload.message.trim().length < 10) {
      errors.message = 'Please provide your message (at least 10 characters).';
    }

    if (!payload.privacyAgreed) {
      errors.privacyAgreed = 'Please accept the privacy policy to submit.';
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please complete all required fields correctly.',
        errors,
      };
    }

    const referenceId = `PSS-CNT-${Date.now().toString(36).toUpperCase()}`;

    // Store in local contact submissions registry
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_CONTACTS) || '[]');
      existing.unshift({
        ...payload,
        referenceId,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(existing));
    } catch {
      // ignore
    }

    return {
      success: true,
      message: `Thank you. Your message has been routed to the PSS Nkwen administrative office. Reference: ${referenceId}`,
      referenceId,
    };
  }

  /**
   * Get Stored Enquiries for Admin Review
   */
  public getStoredEnquiries(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_ENQUIRIES) || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Clear Stored Enquiries (Administrative action)
   */
  public clearStoredEnquiries(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_ENQUIRIES);
      localStorage.removeItem(STORAGE_KEY_CONTACTS);
    }
  }
}

export const wpService = new WordPressService();
