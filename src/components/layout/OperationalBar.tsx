import React from 'react';
import { MapPin, Phone, Award, Settings2 } from 'lucide-react';
import { VERIFIED_SCHOOL_PROFILE } from '../../services/wpService';

interface OperationalBarProps {
  onOpenWpBridge: () => void;
}

export const OperationalBar: React.FC<OperationalBarProps> = ({ onOpenWpBridge }) => {
  return (
    <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-navy-900/60 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left items: Centre & Location */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-medium text-slate-200">GCE Centre: 11409</span>
          </div>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span>Nkwen, Bamenda · North-West Cameroon</span>
          </div>
          <span className="text-slate-600 hidden md:inline" aria-hidden="true">·</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Phone className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
            <span>Tel: +237 {VERIFIED_SCHOOL_PROFILE.directoryPhone}</span>
          </div>
          <span className="text-slate-600 hidden lg:inline" aria-hidden="true">·</span>
          <a
            href="https://wa.me/237677866377?text=Hello%20PSS%20Nkwen%20Administration%2C%20I%20am%20contacting%20you%20from%20the%20official%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            title="Chat directly with PSS Nkwen on WhatsApp"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>WhatsApp: +237 677 866 377</span>
          </a>
        </div>

        {/* Right items: WP CMS Status & Dev Credit */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <button
            type="button"
            onClick={onOpenWpBridge}
            className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 bg-navy-900/80 hover:bg-navy-800 px-2.5 py-1 rounded-sm border border-amber-400/30 transition-colors cursor-pointer"
            title="Configure or test WordPress REST API integration"
          >
            <Settings2 className="w-3 h-3 text-amber-400" />
            <span>WP CMS Bridge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
