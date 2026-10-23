import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Award, Calendar, FileText, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { wpService, IMAGES, VERIFIED_SCHOOL_PROFILE } from '../services/wpService';
import { NewsArticle, SchoolEvent, DownloadableDocument } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { JubileeCountdown } from '../components/common/JubileeCountdown';

export const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [documents, setDocuments] = useState<DownloadableDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [newsData, eventData, docData] = await Promise.all([
          wpService.getNews(),
          wpService.getEvents(),
          wpService.getDocuments(),
        ]);
        setNews(newsData.slice(0, 3));
        setEvents(eventData.slice(0, 3));
        setDocuments(docData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <ImageWithFallback
            src={IMAGES.hero}
            alt="Presbyterian Secondary School Nkwen campus nestled in the Bamenda hills"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl space-y-6">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-md border border-white/15 text-xs tracking-wide text-amber-300 font-medium">
              <span>Cameroon GCE Board Centre 11409</span>
              <span aria-hidden="true">·</span>
              <span>Nkwen, Bamenda</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              Presbyterian Secondary School Nkwen
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
              Fostering academic excellence, moral discipline, and Christian leadership in the heart of Bamenda, North-West Region of Cameroon.
            </p>

            {/* Official School Motto */}
            <div className="pt-1 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold block mb-1">
                Official School Motto · Devise Officielle
              </span>
              <p className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                "{VERIFIED_SCHOOL_PROFILE.motto.en}"
              </p>
              <p className="text-xs text-amber-200/90 italic mt-0.5">
                "{VERIFIED_SCHOOL_PROFILE.motto.fr}"
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/admissions"
                className="px-6 py-3.5 text-sm font-semibold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Admissions Overview</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <a
                href={VERIFIED_SCHOOL_PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Write Us on WhatsApp</span>
              </a>

              <Link
                to="/about"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all flex items-center justify-center min-h-[44px]"
              >
                About Our School
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center min-h-[44px]"
              >
                Contact Administration
              </Link>
            </div>
          </div>
        </div>

        {/* Operational Strip below hero */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xs py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Location</span>
              <span className="text-white font-medium">Nkwen, Bamenda, NW Region</span>
            </div>
            <div>
              <span className="text-slate-400 block">Examination Centre</span>
              <span className="text-amber-300 font-medium">Centre No. 11409 (GCE Board)</span>
            </div>
            <div>
              <span className="text-slate-400 block">Classification</span>
              <span className="text-white font-medium">Denominational Secondary</span>
            </div>
            <div>
              <span className="text-slate-400 block">Administration Desk</span>
              <span className="text-white font-medium">PEA Directory: 677866377</span>
            </div>
          </div>
        </div>
      </section>

      {/* 25th Anniversary Silver Jubilee Live Countdown Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <JubileeCountdown variant="banner" showDualSelector={true} />
      </section>

      {/* Welcome & Verified Identity Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Welcome to PSS Nkwen
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug">
                Educating the Whole Person Through Faith, Diligence, and Character
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Presbyterian Secondary School (PSS) Nkwen is a respected denominational secondary institution situated in Nkwen, within the Bamenda metropolis of Cameroon's North-West Region. Operating within the esteemed Presbyterian Education Authority (PEA) framework, the school seeks to provide holistic secondary education that sharpens intellect while nurturing moral uprightness.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We welcome prospective candidates and parents seeking a disciplined and supportive scholastic community. Our curricula cover foundational arts, social sciences, modern bilingual languages, pure and applied sciences, and commercial subjects.
            </p>

            {/* Transparent administrative note */}
            <VerificationNotice title="Official Information Verification Status">
              Historical statistics, official crest, and finalized calendar items are kept up to date in consultation with school management. Official principal statements and fee schedules are published following administrative approval.
            </VerificationNotice>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-navy-800 group"
              >
                <span>Read more about our heritage & mission</span>
                <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right column: Verified GCE Centre Spotlight & Image */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <ImageWithFallback
                src={IMAGES.mainMonument}
                alt="PSS Nkwen iconic entrance roundel monument - Welcome to PSS Nkwen / Bienvenue au PSS Nkwen"
                className="w-full h-56 object-cover"
              />
              <div className="p-5 bg-white space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-950">
                    Official Examination Centre Record
                  </span>
                  <span className="text-xs font-mono text-slate-500">Centre 11409</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Category Classification:</span>
                    <span className="font-semibold text-slate-800">Denominational Centre</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">2025 O-Level Session Record:</span>
                    <span className="font-semibold text-slate-800">9 Registered · 9 Sat (4+) · 9 Passes</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Authority:</span>
                    <span className="font-semibold text-slate-800">Cameroon GCE Board</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  *Official historical centre data from the Cameroon GCE Board 2025 results document. Published strictly as historical factual record without generalized claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Institutional Pillars & Heritage Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Authentic Institutional Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Campus Landmarks & Community Custodians
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real institutional visual records from the Nkwen Bamenda campus, the royal traditional fondom, and our vibrant alumni chapters.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 hover:text-navy-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg border border-slate-200 transition-colors w-fit"
          >
            <span>View Full Photo Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1: Entrance Monument */}
          <Link
            to="/about"
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.mainMonument}
                alt="PSS Nkwen Welcome Entrance Monument"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-amber-400 text-navy-950 text-[11px] font-bold rounded shadow-xs">
                Welcome Gate
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                Campus Landmark
              </span>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-navy-900 transition-colors">
                Entrance Roundel Monument
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                "Welcome to PSS Nkwen / Bienvenue au PSS Nkwen" welcoming students and visitors.
              </p>
            </div>
          </Link>

          {/* Item 2: Administrative Block */}
          <Link
            to="/about"
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.campusAdminBlock}
                alt="PSS Nkwen Two-Storey Administrative Block"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-navy-900 text-amber-300 text-[11px] font-semibold rounded border border-white/10">
                Administration
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                School Facilities
              </span>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-navy-900 transition-colors">
                Two-Storey Admin Block
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                Housing the Principal, Vice-Principals, staff room, and school registry offices.
              </p>
            </div>
          </Link>

          {/* Item 3: Fon of Nkwen */}
          <Link
            to="/about"
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.fonOfNkwen}
                alt="His Royal Highness The Fon of Nkwen on the royal throne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-amber-400/90 text-navy-950 text-[11px] font-bold rounded shadow-xs">
                Royal Patronage
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                Host Community
              </span>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-navy-900 transition-colors">
                HRH The Fon of Nkwen
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                Paramount traditional ruler of Nkwen Fondom and custodian of ancestral host land.
              </p>
            </div>
          </Link>

          {/* Item 4: PRENEXA Alumni Network */}
          <Link
            to="/alumni"
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.alumniYaoundeAgm2025}
                alt="PRENEXA Yaounde Chapter AGM 2025"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-emerald-700 text-white text-[11px] font-semibold rounded shadow-xs">
                PRENEXA Alumni
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                Ex-Students Network
              </span>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-navy-900 transition-colors">
                PRENEXA National Network
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                Uniting alumni across Cameroon and the diaspora in mentorship, sports, and scholarships.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Academic Pillars Section */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Academic Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Comprehensive Secondary Curriculum
            </h2>
            <p className="text-sm text-slate-600">
              Structured courses preparing students for Cameroon Ordinary Level and Advanced Level certificate examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Sciences */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Pure & Applied Sciences
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mathematics, Physics, Chemistry, Biology, and Computer Science with regular laboratory practicals.
                </p>
              </div>
              <span className="text-xs text-amber-700 font-medium">Form 1 - Form 5 & High School</span>
            </div>

            {/* Card 2: Arts & Humanities */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                  <Compass className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Arts & Social Sciences
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Literature in English, History, Geography, Citizenship, and Religious Studies developing analytical minds.
                </p>
              </div>
              <span className="text-xs text-amber-700 font-medium">Form 1 - Form 5 & High School</span>
            </div>

            {/* Card 3: Bilingual Languages */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Modern Languages & French
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  English Language and French bilingual proficiency, instilling communicative confidence in Cameroon's dual heritage.
                </p>
              </div>
              <span className="text-xs text-amber-700 font-medium">Bilingual Curriculum</span>
            </div>

            {/* Card 4: Business Studies */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Commerce & Economics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Foundations in Economics, Commerce, and Accounting for career readiness and entrepreneurial literacy.
                </p>
              </div>
              <span className="text-xs text-amber-700 font-medium">Commercial Stream</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/academics"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-navy-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              <span>Explore Complete Academic Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Admissions Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Admissions Desk · PSS Nkwen
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Enrolment & Admission Inquiries
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Prospective students and guardians are invited to submit an admission enquiry online or download registration checklists. Our admissions desk responds promptly to assist families.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/admissions"
                className="px-6 py-3 text-xs font-semibold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Submit Admission Enquiry
              </Link>
              <Link
                to="/downloads"
                className="px-6 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Admission Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Upcoming Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* News column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block">
                  Updates
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  News & Announcements
                </h2>
              </div>
              <Link to="/news" className="text-xs font-semibold text-navy-900 hover:underline">
                View All News &rarr;
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading announcements...</div>
            ) : (
              <div className="space-y-6">
                {news.map((item) => (
                  <article key={item.id} className="group border-b border-slate-100 pb-6 last:border-b-0 flex flex-col sm:flex-row gap-4 items-start">
                    {item.featuredImage && (
                      <Link to={`/news/${item.slug}`} className="w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 block">
                        <ImageWithFallback
                          src={item.featuredImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={item.date}>{item.date}</time>
                        <span aria-hidden="true">·</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-navy-900 transition-colors leading-snug">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                      <Link
                        to={`/news/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 group-hover:text-amber-700 pt-1"
                      >
                        <span>Read full story</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Events column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block">
                  Calendar
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  Upcoming Events
                </h2>
              </div>
              <Link to="/events" className="text-xs font-semibold text-navy-900 hover:underline">
                All Events &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    <span>{evt.date}</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="text-slate-600 font-normal">{evt.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                    <span>Venue: {evt.venue}</span>
                    <span className="text-navy-900 font-medium">{evt.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Public Downloads Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Official Documents
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Public Forms & Publications
              </h2>
            </div>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-navy-800"
            >
              <span>View All Downloadable Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-navy-900">{doc.category}</span>
                    <span className="font-mono">{doc.fileType} · {doc.fileSize}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {doc.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Date: {doc.uploadDate}</span>
                  <Link
                    to="/downloads"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-amber-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
