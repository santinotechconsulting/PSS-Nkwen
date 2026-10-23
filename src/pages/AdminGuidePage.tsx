import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Server, Key, Settings, BookOpen, CheckCircle, ShieldCheck, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { WpBridgeModal } from '../components/common/WpBridgeModal';

export const AdminGuidePage: React.FC = () => {
  const [isWpModalOpen, setIsWpModalOpen] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Administrator & Handover Guide' }]} />

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Technical Project Handover
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            WordPress Administrator & Deployment Manual
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Prepared by <strong>Santino Tech Consulting</strong> ("We Build Your Digital Presence") for Presbyterian Secondary School Nkwen administrators, webmasters, and stakeholders.
          </p>
        </div>

        {/* Quick Launch Diagnostics Action */}
        <div className="p-6 bg-navy-950 text-white rounded-2xl border border-navy-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-400" />
              <span>WordPress REST API Diagnostics Bridge</span>
            </h3>
            <p className="text-xs text-slate-300">
              Test connection to Hostinger WordPress, switch synchronization modes, or inspect local submissions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsWpModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Launch CMS Diagnostics
          </button>
        </div>
      </section>

      {/* Manual Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Step 1: WordPress Architecture */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-navy-900" />
            <span>1. WordPress CMS Backend Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The website uses a headless architecture where WordPress handles content management and editorial workflows, while the React/Vite frontend provides lightning-fast performance, accessibility, and mobile optimization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Hostinger WordPress Hosting</span>
              <p className="text-slate-600">
                Runs standard WordPress (PHP/MySQL) where the custom plugin <code className="bg-white px-1 py-0.5 rounded border border-slate-200">pss-nkwen-core</code> is activated.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Vercel / Static Frontend</span>
              <p className="text-slate-600">
                Hosts the React SPA that consumes REST endpoints (<code className="bg-white px-1 py-0.5 rounded border border-slate-200">/wp-json/wp/v2/</code> and <code className="bg-white px-1 py-0.5 rounded border border-slate-200">/wp-json/pss-nkwen/v1/</code>).
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Content Management Workflow */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-navy-900" />
            <span>2. Routine Content Updates for School Staff</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Publishing News & Announcements:</strong> Navigate to <em>WP Admin &gt; Posts &gt; Add New</em>. Enter title, excerpt, content, select category (e.g., Academic News, School Announcements), attach a Featured Image, and click Publish.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Adding School Events:</strong> Navigate to <em>WP Admin &gt; School Events &gt; Add New</em>. Enter event date, start/end time, venue, and description.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Uploading Public Documents:</strong> Navigate to <em>WP Admin &gt; Public Documents &gt; Add New</em>. Upload official PDF forms, term calendars, or flyers.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Reviewing Enquiries:</strong> Navigate to <em>WP Admin &gt; Enquiries Registry</em>. Review new admission requests and contact messages. Data is strictly password-protected and never shown publicly.
              </div>
            </li>
          </ul>
        </div>

        {/* Step 3: Deployment & Code Repository */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-navy-900" />
            <span>3. Repository & Documentation Files</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All configuration guides and source assets have been compiled into dedicated markdown documentation in the project codebase:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900">/docs/HOSTINGER_DEPLOYMENT_GUIDE.md</span>
              <p className="text-slate-500 mt-0.5">Full single-host deployment on Hostinger WordPress & static files.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900">/docs/VERCEL_HOSTINGER_HYBRID_GUIDE.md</span>
              <p className="text-slate-500 mt-0.5">Hybrid architecture with Vercel frontend and Hostinger WordPress.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900">/docs/WORDPRESS_ADMIN_MANUAL.md</span>
              <p className="text-slate-500 mt-0.5">Comprehensive handbook for school secretaries and administrators.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900">/docs/CONTENT_COLLECTION_CHECKLIST.md</span>
              <p className="text-slate-500 mt-0.5">Checklist of items awaiting administrative confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostics Modal */}
      <WpBridgeModal isOpen={isWpModalOpen} onClose={() => setIsWpModalOpen(false)} />
    </div>
  );
};
