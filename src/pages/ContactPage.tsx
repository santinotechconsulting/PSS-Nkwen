import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { wpService, VERIFIED_SCHOOL_PROFILE } from '../services/wpService';
import { ContactEnquiryPayload, SubmissionResponse } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactEnquiryPayload>({
    fullName: '',
    telephone: '',
    email: '',
    subject: '',
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
      const res = await wpService.submitContactEnquiry(formData);
      setResult(res);
      if (res.success) {
        setFormData({
          fullName: '',
          telephone: '',
          email: '',
          subject: '',
          message: '',
          privacyAgreed: false,
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'A communication error occurred. Please try again or visit our campus office.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Administrative Enquiries
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Contact Administration
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Get in touch with the administration of Presbyterian Secondary School Nkwen, Bamenda, Cameroon.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Institutional Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Campus Location & Directory
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <MapPin className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">Physical Campus</strong>
                  <span>Nkwen, Bamenda</span>
                  <span className="block text-slate-500">North-West Region, Cameroon</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-bold text-base" aria-hidden="true">WA</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="block text-slate-900 font-semibold">Instant WhatsApp Contact</strong>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Fast Response
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    Need immediate answers regarding admissions, student documents, or PRENEXA alumni coordination? Write directly to the administration.
                  </p>
                  <a
                    href="https://wa.me/237677866377?text=Hello%20PSS%20Nkwen%20Administration%2C%20I%20am%20writing%20from%20the%20contact%20page."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                  >
                    <span>Write the School on WhatsApp (+237 677 866 377) &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <Phone className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900 font-semibold">Directory Telephone Line</strong>
                  <span className="font-mono text-slate-900 text-sm font-bold">
                    +237 {VERIFIED_SCHOOL_PROFILE.directoryPhone}
                  </span>
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200 leading-snug">
                    Listed in Presbyterian Education Authority directory for PSS Nkwen.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                <Clock className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold mb-0.5">Administrative Office Hours</strong>
                  <span>Monday – Friday: 08:00 AM – 03:30 PM (WAT)</span>
                  <span className="block text-slate-500">Closed on Sundays & Presbyterian Church Holidays</span>
                </div>
              </div>
            </div>

            <VerificationNotice title="Official Email & Digital Channels Notice">
              Official school email addresses and social media handles are in the process of formal registration and verification. For immediate inquiries, please submit the form or visit the campus office.
            </VerificationNotice>

            {/* Developer Contact Notice */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">Digital Portal Technical Developer:</div>
              <p>Santino Tech Consulting · "We Build Your Digital Presence."</p>
            </div>
          </div>

          {/* Contact Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Send a Message
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  General & Admissions Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your message will be securely routed to the PSS Nkwen administrative office.
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
                    <span className="font-bold block">{result.success ? 'Message Delivered' : 'Notice'}</span>
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
                <div>
                  <label htmlFor="contactFullName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactFullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Fru Nkwenti"
                    className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                  />
                  {result?.errors?.fullName && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactTelephone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Telephone Number * (+237)
                    </label>
                    <input
                      type="tel"
                      id="contactTelephone"
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
                    <label htmlFor="contactEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactSubject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Enquiry Subject *
                  </label>
                  <input
                    type="text"
                    id="contactSubject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiry regarding Form 1 Admissions or GCE Centre Verification"
                    className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                  />
                  {result?.errors?.subject && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.subject}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="contactMessage" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message Details * (Minimum 10 characters)
                  </label>
                  <textarea
                    id="contactMessage"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your questions or notes for the administration..."
                    className="w-full px-3.5 py-3 text-base sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden resize-y bg-white"
                  />
                  {result?.errors?.message && (
                    <span className="text-xs text-rose-600 mt-1 block">{result.errors.message}</span>
                  )}
                </div>

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
                      I agree that my submitted information will be handled strictly for the purpose of responding to this enquiry in line with the school's <Link to="/privacy" className="text-navy-900 underline font-medium">Privacy Policy</Link>.
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
                    <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
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
