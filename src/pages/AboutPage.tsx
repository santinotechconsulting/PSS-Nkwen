import React from 'react';
import { Award, ShieldCheck, Heart, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { IMAGES, VERIFIED_SCHOOL_PROFILE } from '../services/wpService';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Page Title & Lead */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            About PSS Nkwen
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Presbyterian Secondary School Nkwen
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A distinguished denominational secondary institution dedicated to academic achievement, Christian character formation, and community service in Bamenda, Cameroon.
          </p>
        </div>
      </section>

      {/* Core Institutional Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Institutional Overview & Background
            </h2>
            <div className="prose prose-slate text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed">
              <p>
                Presbyterian Secondary School Nkwen (PSS Nkwen) is located in Nkwen, an energetic educational and commercial district within the city of Bamenda, in the North-West Region of Cameroon. As a faith-based denominational institution operating within the Presbyterian Church educational framework, the school upholds a disciplined tradition of intellectual and spiritual upbringing.
              </p>
              <p>
                Secondary education in Cameroon is crucial in shaping adolescents into grounded, productive citizens. PSS Nkwen provides balanced instruction covering both general arts and scientific disciplines, emphasizing intellectual curiosity alongside Presbyterian moral integrity.
              </p>
              <p>
                Under the classification of the Cameroon General Certificate of Education (GCE) Board, PSS Nkwen is formally designated as <strong>Examination Centre Number 11409</strong>.
              </p>
            </div>

            {/* Verification notice for details pending confirmation */}
            <VerificationNotice title="Institutional Archival Verification">
              In accordance with school policy, historical founding year records, official crest iconography, and executive profiles are subject to final administrative confirmation by Presbyterian Education Authority leadership before permanent public archiving.
            </VerificationNotice>

            {/* Official School Motto */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Official School Motto · Devise de l'Établissement
              </span>
              <p className="text-xl font-serif font-bold text-navy-900">
                "{VERIFIED_SCHOOL_PROFILE.motto.en}"
              </p>
              <p className="text-sm font-serif italic text-amber-800">
                "{VERIFIED_SCHOOL_PROFILE.motto.fr}"
              </p>
              <p className="text-xs text-slate-500 pt-1">
                Reflecting the core Presbyterian commitment to spiritual reverence, communal peace, and scholastic diligence.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <ImageWithFallback
                src={IMAGES.chapel}
                alt="Presbyterian secondary school chapel environment"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 bg-white space-y-3">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
                  Denominational Identity
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Presbyterian Christian Foundation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Morning devotions, spiritual fellowship, ethical conduct codes, and pastoral mentorship form an integral part of daily campus life.
                </p>
              </div>
            </div>

            {/* Quick Fact Box */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                Verified School Profile Summary
              </h3>
              <dl className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500">Official Name:</dt>
                  <dd className="font-semibold text-slate-900">Presbyterian Secondary School Nkwen</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500">Acronym:</dt>
                  <dd className="font-semibold text-slate-900">PSS Nkwen</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500">GCE Centre Number:</dt>
                  <dd className="font-mono font-bold text-navy-900">11409</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="text-slate-500">Location:</dt>
                  <dd className="font-semibold text-slate-900">Nkwen, Bamenda, NW Region, Cameroon</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-slate-500">Category:</dt>
                  <dd className="font-semibold text-slate-900">Denominational Secondary</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Educational Ethos */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Core Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Holistic Secondary Education
            </h2>
            <p className="text-sm text-slate-600">
              Guided by Presbyterian values of honesty, academic diligence, humility, and dedication to God and humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Academic Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured preparation for the Cameroon GCE Ordinary and Advanced Level syllabuses through disciplined study and research.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Christian Moral Discipline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instilling personal responsibility, honesty, mutual respect, and accountability among students and staff alike.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <Heart className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Service to Society</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspiring pupils to use their education to serve families, local communities, and the broader Cameroonian nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Administration Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Administration & Governance
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            School Leadership
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Presbyterian Secondary School Nkwen operates under the guidance of the Presbyterian Education Authority in Cameroon, overseen by the principal, vice-principals, senior discipline masters, and heads of academic departments.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Administrative Profiles & Staff Registry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official biographies of the current principal, chaplains, and senior administrative personnel are published upon administrative review. To contact administrative offices directly, please consult the school directory or use our official contact enquiry form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Royal Host Community & Traditional Custodianship: The Fon of Nkwen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 text-white rounded-3xl overflow-hidden border border-amber-500/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold">
              <span>Royal Host Community · Nkwen Kingdom</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                His Royal Highness The Fon of Nkwen
              </h2>
              <p className="text-xs font-mono tracking-wider uppercase text-amber-400 font-semibold">
                Paramount Traditional Ruler & Custodian of Nkwen Ancestral Heritage
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Presbyterian Secondary School Nkwen stands on the ancestral, peaceful lands of the historic <strong>Nkwen Kingdom</strong> in Bamenda. The institution has continuously flourished under the royal patronage, hospitality, and blessings of <strong>His Royal Highness The Fon of Nkwen</strong> and the Nkwen Traditional Council.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                <span className="text-amber-300 font-semibold block">Custodians of the Land</span>
                <p className="text-slate-300 leading-relaxed">
                  Generations of PSS Nkwen students have enjoyed safe, welcoming communal coexistence within the Nkwen Fondom.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                <span className="text-amber-300 font-semibold block">Cultural Dignity & Peace</span>
                <p className="text-slate-300 leading-relaxed">
                  Fostering respect for Cameroonian indigenous heritage alongside disciplined Christian moral upbringing.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-full min-h-[380px] lg:min-h-[480px] bg-slate-950 flex flex-col justify-end">
            <ImageWithFallback
              src={IMAGES.fonOfNkwen}
              alt="His Royal Highness The Fon of Nkwen seated in royal traditional attire on the throne"
              className="w-full h-full object-cover object-top absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="relative z-10 p-5 bg-black/60 backdrop-blur-xs border-t border-white/10 text-xs">
              <span className="font-bold text-amber-300 block">HRH The Fon of Nkwen</span>
              <span className="text-slate-300 text-[11px]">Paramount Traditional Ruler, Nkwen Fondom, Bamenda</span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Landmarks & Authentic Infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Physical Campus & Facilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Iconic Landmarks of PSS Nkwen
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Real architectural photographs capturing the serene learning environment, administrative heartbeat, and gateway that welcome students to campus daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Landmark 1: Two-storey Administrative Block */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.campusAdminBlock}
                alt="PSS Nkwen Two-Storey Administrative Block with arched balustrades and cross"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-navy-950/80 backdrop-blur-xs text-amber-300 text-xs font-semibold rounded-md border border-white/10">
                Administrative Heartbeat
              </div>
            </div>
            <div className="p-6 space-y-2.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Central Campus Facility
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Two-Storey Administrative Block
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adorned with classical arched balustrades and topped with the Christian cross, the Administrative Block houses the Principal’s office, Vice-Principals’ suites, staff common room, bursary, and examination coordination archives.
              </p>
            </div>
          </div>

          {/* Landmark 2: Welcome Entrance Monument */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.mainMonument}
                alt="PSS Nkwen Welcome entrance roundel monument - Welcome to PSS Nkwen / Bienvenue au PSS Nkwen"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-navy-950 text-xs font-bold rounded-md shadow-sm">
                Campus Gateway
              </div>
            </div>
            <div className="p-6 space-y-2.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Official Entrance Landmark
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                "Welcome to PSS Nkwen" Monument
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The famous concrete roundel gateway situated at the entrance boulevard, inscribed with <em>"Welcome to PSS Nkwen / Bienvenue au PSS Nkwen"</em>. It marks the threshold where candidates embark on their transformational secondary school journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
