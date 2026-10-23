import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, CheckCircle2, AlertCircle, Send, ShieldCheck, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { wpService, VERIFIED_SCHOOL_PROFILE } from '../services/wpService';
import { AdmissionEnquiryPayload, SubmissionResponse } from '../types';

export const AdmissionsPage: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionEnquiryPayload>({
    parentName: '',
    telephone: '',
    email: '',
    studentName: '',
    intendedClass: 'Form 1 (Fresh Entry)',
    currentSchool: '',
    message: '',
    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await wpService.submitAdmissionEnquiry(formData);
      setResult(res);
      if (res.success) {
        setFormData({
          parentName: '',
          telephone: '',
          email: '',
          studentName: '',
          intendedClass: 'Form 1 (Fresh Entry)',
          currentSchool: '',
          message: '',
          privacyAgreed: false,
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'A network communication error occurred. Please contact the administrative desk directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Admissions' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Admissions Desk
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Admissions & Enrolment
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Welcome prospective candidates and families seeking admission into Presbyterian Secondary School Nkwen, Bamenda.
          </p>
        </div>
      </section>

      {/* Overview & Guidelines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left instructions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Admission Guidelines & Pathways
            </h2>
            <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
              <p>
                PSS Nkwen welcomes candidates who demonstrate disciplined learning attitudes, moral integrity, and commitment to academic growth. We offer admission across multiple entry points:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                <li><strong>Form 1:</strong> Primary School Leaving Certificate (FSLC) / First School Leaving Certificate graduates or common entrance applicants.</li>
                <li><strong>Forms 2 to 4:</strong> Transfer students seeking mid-stream entry based on previous school transcripts.</li>
                <li><strong>Lower Sixth:</strong> Candidates who have successfully passed the Cameroon GCE Ordinary Level with required grades in their prospective streams.</li>
              </ul>
            </div>

            {/* Prompt required neutral message */}
            <VerificationNotice title="Official Fees, Deadlines & Requirements Notice">
              For the latest admission requirements, fees and deadlines, please contact the school administration or visit the admissions office on campus in Nkwen, Bamenda.
            </VerificationNotice>

            {/* Instant WhatsApp Admissions Desk */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Instant WhatsApp Admissions Support
                </span>
                <span className="text-[11px] font-mono text-emerald-800 font-bold">+237 677 866 377</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Parents or guardians inquiring from other towns or abroad can write directly to the administration on WhatsApp for quick inquiries regarding entrance exams, class availability, and requirements.
              </p>
              <a
                href="https://wa.me/237677866377?text=Hello%20Admissions%20Desk%2C%20I%20am%20inquiring%20about%20student%20admission%20at%20PSS%20Nkwen."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
              >
                <span>Write Admissions on WhatsApp (+237 677 866 377) &rarr;</span>
              </a>
            </div>

            {/* Document Download Card */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Official Admission Checklist & Guide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download our public checklist summarizing required candidate documentation, identification photos, and medical certificate requirements.
              </p>
              <Link
                to="/downloads"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Go to Downloads Section</span>
              </Link>
            </div>

            {/* FAQs */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-navy-900" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <details className="p-3 bg-white border border-slate-200 rounded-lg group">
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                    <span>How can parents obtain official registration forms?</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
                  </summary>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Official forms can be collected directly from the campus administration block in Nkwen or downloaded in PDF format from our public Downloads repository.
                  </p>
                </details>

                <details className="p-3 bg-white border border-slate-200 rounded-lg group">
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                    <span>What is the school directory telephone number?</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">&darr;</span>
                  </summary>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    The Presbyterian Education Authority online directory lists {VERIFIED_SCHOOL_PROFILE.directoryPhone}. This number is published as a directory reference awaiting school confirmation.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Right form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Admission Enquiry Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submit an initial enquiry to the PSS Nkwen administrative desk. All fields with * are required.
                </p>
              </div>

              {result && (
                <div
                  className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
                    result.success
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                  role="alert"
                >
                  {result.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <span className="font-bold block">{result.success ? 'Enquiry Logged' : 'Submission Notice'}</span>
                    <p>{result.message}</p>
                    {result.referenceId && (
                      <span className="block font-mono text-[11px] text-emerald-800 bg-white/70 px-2 py-0.5 rounded border border-emerald-300 w-fit">
                        Ref: {result.referenceId}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Parent Name */}
                <div>
                  <label htmlFor="parentName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Forgwe Peter Ndikum"
                    className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                  />
                  {result?.errors?.parentName && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.parentName}</span>
                  )}
                </div>

                {/* Telephone & Email grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telephone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Telephone Number * (+237)
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="e.g. +237 677 866 377"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                    {result?.errors?.telephone && (
                      <span className="text-xs text-rose-600 mt-1 block">{result.errors.telephone}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                    {result?.errors?.email && (
                      <span className="text-xs text-rose-600 mt-1 block">{result.errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Student Name & Intended Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentName" className="block text-xs font-semibold text-slate-700 mb-1">
                      Prospective Student Name
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="Candidate's Name"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="intendedClass" className="block text-xs font-semibold text-slate-700 mb-1">
                      Intended Class / Stream *
                    </label>
                    <select
                      id="intendedClass"
                      value={formData.intendedClass}
                      onChange={(e) => setFormData({ ...formData, intendedClass: e.target.value })}
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white cursor-pointer"
                    >
                      <option value="Form 1 (Fresh Entry)">Form 1 (Fresh Entry)</option>
                      <option value="Form 2 (Transfer)">Form 2 (Transfer)</option>
                      <option value="Form 3 (Transfer)">Form 3 (Transfer)</option>
                      <option value="Form 4 (Transfer)">Form 4 (Transfer)</option>
                      <option value="Lower Sixth (Science Stream)">Lower Sixth (Science Stream)</option>
                      <option value="Lower Sixth (Arts Stream)">Lower Sixth (Arts Stream)</option>
                      <option value="Lower Sixth (Commercial Stream)">Lower Sixth (Commercial Stream)</option>
                    </select>
                  </div>
                </div>

                {/* Current School */}
                <div>
                  <label htmlFor="currentSchool" className="block text-xs font-semibold text-slate-700 mb-1">
                    Current or Previous Primary/Secondary School
                  </label>
                  <input
                    type="text"
                    id="currentSchool"
                    value={formData.currentSchool}
                    onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                    placeholder="e.g. PCPS Nkwen or Previous Secondary School"
                    className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Enquiry Details or Specific Inquiries *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify any particular questions regarding admission timelines, boarding/day arrangements, or documentation requirements."
                    className="w-full px-3.5 py-3 text-base sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden resize-y bg-white"
                  />
                  {result?.errors?.message && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.message}</span>
                  )}
                </div>

                {/* Privacy checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-navy-900 min-h-[20px] min-w-[20px]"
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      I understand this enquiry will be processed solely by the PSS Nkwen admissions desk in accordance with the school's <Link to="/privacy" className="text-navy-900 underline font-medium">Privacy Policy</Link>. Sensitive records (medical/exam slips) will only be submitted in person upon formal enrollment.
                    </span>
                  </label>
                  {result?.errors?.privacyAgreed && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.privacyAgreed}</span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer min-h-[48px]"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
