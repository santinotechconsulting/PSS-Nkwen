import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { VERIFIED_SCHOOL_PROFILE } from '../../services/wpService';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Footer Ribbon */}
      <div className="border-b border-navy-900/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity & Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-md bg-navy-900 border border-navy-700 flex items-center justify-center text-amber-400">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block leading-tight">
                  PSS Nkwen
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase">
                  Bamenda · Cameroon
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Presbyterian Secondary School (PSS) Nkwen provides sound secondary education rooted in Presbyterian Christian discipline, academic diligence, and service to society.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-amber-300">
              <Award className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span className="font-medium">Cameroon GCE Centre No. 11409</span>
            </div>
          </div>

          {/* Col 2: Institutional Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Campus Location & Directory
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Nkwen, Bamenda, North-West Region, Cameroon</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-slate-200">PEA Directory: {VERIFIED_SCHOOL_PROFILE.directoryPhone}</span>
                  <span className="block text-[10px] text-amber-400/80">
                    Directory-listed contact under school administration confirmation
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Denominational Secondary Institution</span>
              </div>
            </div>
          </div>

          {/* Col 3: Key Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Public Navigation
            </h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  About Presbyterian Secondary School
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  Academic Programmes & Curricula
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  Admissions Overview & Enquiry
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  School News & Announcements
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  School Calendar & Events
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  Downloadable Documents & Forms
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-amber-300 transition-colors py-1.5 inline-block min-h-[36px] flex items-center">
                  Alumni & Ex-Students Network
                </Link>
              </li>
              <li>
                <Link to="/jubilee" className="hover:text-amber-300 transition-colors text-amber-400 font-semibold py-1.5 inline-block min-h-[36px] flex items-center">
                  ★ 25th Silver Jubilee (Nov 2026)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions Quick Guide */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Admissions Desk
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parents seeking admission for the upcoming academic session may submit an online enquiry or consult the administration office in Nkwen, Bamenda.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-1 min-h-[44px]"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <div className="pt-2">
              <Link
                to="/admin-guide"
                className="text-[11px] text-slate-500 hover:text-slate-400 underline underline-offset-2 py-1 inline-block"
              >
                Administrator & WordPress Handover Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Developer Credit */}
      <div className="pt-6 pb-24 sm:pb-6 px-4 sm:px-6 lg:px-8 bg-black/40 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
            <span>&copy; {currentYear} Presbyterian Secondary School Nkwen. All rights reserved.</span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <Link to="/privacy" className="hover:text-slate-200 underline underline-offset-2">
              Privacy Policy
            </Link>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-slate-400 font-mono">Centre 11409</span>
          </div>

          {/* Developer Credit */}
          <div className="text-center sm:text-right flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[11px] text-slate-400">
            <span>Website developed by <strong className="text-slate-200 font-semibold">Santino Tech Consulting</strong></span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-amber-400/90 italic">We Build Your Digital Presence.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
