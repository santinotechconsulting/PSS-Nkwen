import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OperationalBar } from './components/layout/OperationalBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WpBridgeModal } from './components/common/WpBridgeModal';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Code-split pages for performance & minimal initial bundle
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage').then(m => ({ default: m.AcademicsPage })));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage').then(m => ({ default: m.AdmissionsPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage').then(m => ({ default: m.DownloadsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AlumniPage = lazy(() => import('./pages/AlumniPage').then(m => ({ default: m.AlumniPage })));
const JubileePage = lazy(() => import('./pages/JubileePage').then(m => ({ default: m.JubileePage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const AdminGuidePage = lazy(() => import('./pages/AdminGuidePage').then(m => ({ default: m.AdminGuidePage })));

// Scroll to top helper with location tracking
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Accessible page loading fallback
function PageLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-9 h-9 border-3 border-slate-200 border-t-navy-900 rounded-full animate-spin mb-3" />
      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
        Loading PSS Nkwen Portal...
      </span>
      <span className="sr-only">Loading page content, please wait.</span>
    </div>
  );
}

// Animated routes with subtle fade-in transition
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/jubilee" element={<JubileePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/admin-guide" element={<AdminGuidePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isWpBridgeOpen, setIsWpBridgeOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-navy-900 selection:text-amber-300">
        {/* Operational Utility Ribbon */}
        <OperationalBar onOpenWpBridge={() => setIsWpBridgeOpen(true)} />

        {/* Top Bar Header */}
        <Header />

        {/* Main Content Area with Target ID for Skip Link */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden flex flex-col">
          <Suspense fallback={<PageLoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating WhatsApp Contact Action */}
        <WhatsAppButton />

        {/* In-browser WordPress CMS Bridge Diagnostics Modal */}
        <WpBridgeModal isOpen={isWpBridgeOpen} onClose={() => setIsWpBridgeOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
