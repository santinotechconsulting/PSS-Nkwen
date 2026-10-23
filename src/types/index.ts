/**
 * Core domain types for Presbyterian Secondary School (PSS) Nkwen Website
 * Developed by Santino Tech Consulting - "We Build Your Digital Presence"
 */

export interface SchoolProfile {
  name: string;
  acronym: string;
  centreNumber: string;
  location: string;
  region: string;
  country: string;
  educationalCategory: string;
  directoryPhone: string;
  isPhoneConfirmed: boolean;
  officialEmail?: string;
  principalName?: string;
  motto: {
    en: string;
    fr: string;
  };
  alumniName: string;
  alumniAcronym: string;
  whatsappNumber: string;
  whatsappUrl: string;
  provisionalColors: {
    navy: string;
    gold: string;
    white: string;
  };
}

export interface NewsArticle {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  featuredImage: string;
  readTime: string;
  tags?: string[];
}

export interface SchoolEvent {
  id: string | number;
  title: string;
  slug: string;
  date: string;
  time: string;
  venue: string;
  category: 'Academic' | 'Spiritual' | 'Sports' | 'Administrative' | 'Community';
  description: string;
  isUpcoming: boolean;
  image?: string;
}

export interface GalleryImage {
  id: string | number;
  title: string;
  caption: string;
  album: string;
  imageUrl: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  date?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
}

export interface DownloadableDocument {
  id: string | number;
  title: string;
  description: string;
  category: 'Admissions' | 'Academic' | 'Notices' | 'Policies' | 'Brochures';
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX';
  uploadDate: string;
  downloadUrl: string;
}

export interface AcademicDepartment {
  id: string;
  name: string;
  shortDescription: string;
  levels: string;
  subjects: string[];
  headNote?: string;
}

export interface AdmissionEnquiryPayload {
  parentName: string;
  telephone: string;
  email?: string;
  studentName?: string;
  intendedClass: string;
  currentSchool?: string;
  message: string;
  privacyAgreed: boolean;
  timestamp?: string;
}

export interface ContactEnquiryPayload {
  fullName: string;
  telephone: string;
  email?: string;
  subject: string;
  message: string;
  privacyAgreed: boolean;
  timestamp?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string>;
}

export interface WordPressSettings {
  apiBaseUrl: string;
  isLiveConnected: boolean;
  siteTitle: string;
  siteDescription: string;
  lastChecked?: string;
}
