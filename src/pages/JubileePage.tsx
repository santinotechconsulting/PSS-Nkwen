import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, Award, Users, Heart, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { JubileeCountdown } from '../components/common/JubileeCountdown';
import { IMAGES, SILVER_JUBILEE_INFO } from '../services/wpService';

interface JubileeRsvpPayload {
  fullName: string;
  affiliation: 'Alumni / Ex-Student' | 'Parent / Guardian' | 'Staff / Educator' | 'Friend / Well-Wisher';
  gradYear?: string;
  attendanceChoice: 'Bamenda Campus (19 Nov)' | 'Yaoundé Celebrations (20–21 Nov)' | 'Both Celebrations';
  telephone: string;
  email: string;
  endowmentPledge?: string;
  congratulatoryMessage: string;
  privacyAgreed: boolean;
}

export const JubileePage: React.FC = () => {
  const [formData, setFormData] = useState<JubileeRsvpPayload>({
    fullName: '',
    affiliation: 'Alumni / Ex-Student',
    gradYear: '',
    attendanceChoice: 'Both Celebrations',
    telephone: '',
    email: '',
    endowmentPledge: '',
    congratulatoryMessage: '',
    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      setResult({ success: false, message: 'Please provide your full name.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.telephone || formData.telephone.length < 8) {
      setResult({ success: false, message: 'Please provide a valid contact telephone number.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.privacyAgreed) {
      setResult({ success: false, message: 'Please agree to the privacy and data handling notice.' });
      setIsSubmitting(false);
      return;
    }

    const refId = `PSS-25TH-${Date.now().toString(36).toUpperCase()}`;

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('pss_nkwen_jubilee_rsvps') || '[]');
      existing.unshift({
        ...formData,
        referenceId: refId,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('pss_nkwen_jubilee_rsvps', JSON.stringify(existing));
    } catch {
      // storage quota safe
    }

    setResult({
      success: true,
      message: `Thank you for joining the 25th Anniversary celebration! Your RSVP has been confirmed with reference code ${refId}. The organizing committee will send you event access passes.`,
      refId,
    });
    setIsSubmitting(false);
    setFormData({
      fullName: '',
      affiliation: 'Alumni / Ex-Student',
      gradYear: '',
      attendanceChoice: 'Both Celebrations',
      telephone: '',
      email: '',
      endowmentPledge: '',
      congratulatoryMessage: '',
      privacyAgreed: false,
    });
  };

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: '25th Anniversary (Silver Jubilee)' }]} />

      {/* Hero Marquee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-navy-950 text-white rounded-3xl overflow-hidden border border-navy-800 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
            <ImageWithFallback
              src={IMAGES.mainMonument}
              alt="PSS Nkwen Welcome Entrance Monument celebrating 25 years"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Silver Jubilee Milestone · 2001 – 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              Celebrating 25 Years of Existence
            </h1>

            <div className="space-y-2 border-l-2 border-amber-400 pl-4">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                Official Jubilee Theme
              </span>
              <p className="text-xl sm:text-2xl font-serif italic text-slate-100">
                "{SILVER_JUBILEE_INFO.theme}"
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              From its establishment in Nkwen, Bamenda, Presbyterian Secondary School Nkwen has dedicated 25 years to nurturing generations of young leaders anchored in scholastic brilliance, Christian moral discipline, and humble service to Cameroon and the world.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#rsvp-form"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>RSVP / Register Attendance</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/alumni"
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all"
              >
                Alumni Network & Batch Mobilization
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Jubilee Precision Countdown Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JubileeCountdown variant="hero" showDualSelector={true} />
      </section>

      {/* Two-City Celebration Itinerary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Jubilee Program of Activities
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Twin Celebration Schedule
          </h2>
          <p className="text-sm text-slate-600">
            Join students, alumni, parents, and church dignitaries for the celebrations in Bamenda and Yaoundé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Leg 1: Bamenda Campus */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                <ImageWithFallback
                  src={IMAGES.campusAdminBlock}
                  alt="PSS Nkwen Two-Storey Administrative Block on Bamenda Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-navy-950/80 backdrop-blur-xs text-amber-300 text-xs font-semibold rounded-md border border-white/10">
                  Bamenda Campus · 19 Nov 2026
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Leg 1 · Home Campus Celebration
                  </span>
                  <span className="font-mono text-xs font-semibold text-navy-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    19th November 2026
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-navy-900 shrink-0" />
                    <span className="font-semibold text-slate-800">PSS Nkwen Campus Grounds & Chapel, Bamenda</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Thanksgiving, March Past & Campus Monument Dedication
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">08:30 AM:</span>
                    <span>Arrival & Reception of Presbyterian Church & Civil Dignitaries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">09:30 AM:</span>
                    <span>Ecumenical Jubilee Thanksgiving Service & Sermon.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">11:30 AM:</span>
                    <span>Grand Student March Past, Choir Anthems & Cultural Exhibitions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">01:30 PM:</span>
                    <span>Unveiling of 25th Anniversary Memorial Plaque & Campus Enhancements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">02:30 PM:</span>
                    <span>Alumni & Staff Refreshments and Inter-generational Fellowship.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 mx-8 mb-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>Open to all:</strong> Students, parents, alumni resident in Bamenda and the North-West Region, and the general public.
            </div>
          </div>

          {/* Leg 2: Yaoundé Gala & Summit */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                <ImageWithFallback
                  src={IMAGES.alumniYaoundeAgm2025}
                  alt="PRENEXA Yaounde Chapter AGM Alumni Assembly"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-navy-950 text-xs font-bold rounded-md shadow-xs">
                  Yaoundé Gala · 20–21 Nov 2026
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Leg 2 · National Assembly & Gala
                  </span>
                  <span className="font-mono text-xs font-semibold text-navy-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    20th & 21st November 2026
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-navy-900 shrink-0" />
                    <span className="font-semibold text-slate-800">Yaoundé, Centre Region (Cameroon)</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Alumni Colloquium, Grand Jubilee Banquet & Endowment
                  </h3>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">Friday, 20 Nov:</span>
                    <span>National Alumni Colloquium: "Building Our Future — Educating for 2050". Career roundtables with senior professionals and young graduates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">Saturday, 21 Nov:</span>
                    <span>Grand Silver Jubilee Banquet, Distinguished Pioneer Service Awards, and Launch of the PSS Nkwen Educational Endowment Fund.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-navy-900">Attire:</span>
                    <span>Formal / Traditional African attire / Jubilee Commemorative Fabric.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 mx-8 mb-8 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>Mobilization Focus:</strong> Specially structured for national alumni chapters, diaspora delegates, and Presbyterian education benefactors.
            </div>
          </div>
        </div>
      </section>

      {/* Silver Jubilee Pillars */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              A Quarter-Century of Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Jubilee Legacy Objectives
            </h2>
            <p className="text-sm text-slate-600">
              Aligning our past achievements with transformative investments for the next 25 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Honouring Our Pioneers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Celebrating pioneer principals, dedicated teachers, Presbyterian church pastors, and PTA leaders who laid the school's bedrock.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Uniting Global Alumni</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consolidating active alumni chapters across Bamenda, Yaoundé, Douala, Europe, North America, and beyond into an impactful support federation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Endowment for the Future</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Establishing the 25th Anniversary Endowment to sponsor disadvantaged pupils and modernize science laboratories and digital infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP & Registration Form */}
      <div id="rsvp-section" className="scroll-mt-24" />
      <section id="rsvp-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Celebration Attendance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Silver Jubilee RSVP & Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Confirm your participation for the Bamenda and/or Yaoundé celebrations.
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
              <div>
                <span className="font-bold block">{result.success ? 'RSVP Confirmed' : 'Submission Notice'}</span>
                <p>{result.message}</p>
                {result.refId && (
                  <span className="block font-mono text-[11px] text-emerald-800 bg-white/70 px-2 py-0.5 rounded border border-emerald-300 w-fit mt-1">
                    Reference: {result.refId}
                  </span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="jubileeFullName" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                id="jubileeFullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Dr. Emmanuel Nfor"
                className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jubileeAffiliation" className="block text-xs font-semibold text-slate-700 mb-1">
                  Affiliation to PSS Nkwen *
                </label>
                <select
                  id="jubileeAffiliation"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value as any })}
                  className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white cursor-pointer"
                >
                  <option value="Alumni / Ex-Student">Alumni / Ex-Student</option>
                  <option value="Parent / Guardian">Parent / Guardian</option>
                  <option value="Staff / Educator">Staff / Educator</option>
                  <option value="Friend / Well-Wisher">Friend / Well-Wisher</option>
                </select>
              </div>

              <div>
                <label htmlFor="jubileeAttendance" className="block text-xs font-semibold text-slate-700 mb-1">
                  Celebration Location(s) *
                </label>
                <select
                  id="jubileeAttendance"
                  value={formData.attendanceChoice}
                  onChange={(e) => setFormData({ ...formData, attendanceChoice: e.target.value as any })}
                  className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white cursor-pointer"
                >
                  <option value="Both Celebrations">Both Celebrations (Bamenda & Yaoundé)</option>
                  <option value="Bamenda Campus (19 Nov)">Bamenda Campus (19th November 2026)</option>
                  <option value="Yaoundé Celebrations (20–21 Nov)">Yaoundé Celebrations (20th & 21st November 2026)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jubileeTelephone" className="block text-xs font-semibold text-slate-700 mb-1">
                  Telephone / WhatsApp * (+237)
                </label>
                <input
                  type="tel"
                  id="jubileeTelephone"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  placeholder="e.g. +237 677 866 377"
                  className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                />
              </div>

              <div>
                <label htmlFor="jubileeEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (For event invitations)
                </label>
                <input
                  type="email"
                  id="jubileeEmail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="jubileePledge" className="block text-xs font-semibold text-slate-700 mb-1">
                Voluntary Jubilee Endowment Pledge or Project Support (Optional)
              </label>
              <input
                type="text"
                id="jubileePledge"
                value={formData.endowmentPledge}
                onChange={(e) => setFormData({ ...formData, endowmentPledge: e.target.value })}
                placeholder="e.g. Donation to Science Lab modernization, Student scholarship, or Batch contribution"
                className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
              />
            </div>

            <div>
              <label htmlFor="jubileeMessage" className="block text-xs font-semibold text-slate-700 mb-1">
                Congratulatory Message / Memories of PSS Nkwen
              </label>
              <textarea
                id="jubileeMessage"
                rows={3}
                value={formData.congratulatoryMessage}
                onChange={(e) => setFormData({ ...formData, congratulatoryMessage: e.target.value })}
                placeholder="Share your congratulatory thoughts or memories as PSS Nkwen celebrates 25 years..."
                className="w-full px-3.5 py-3 text-base sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden resize-y bg-white"
              />
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
                  I agree to receive communications regarding the 25th Silver Jubilee celebration in accordance with the school's <Link to="/privacy" className="text-navy-900 underline font-medium">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 disabled:opacity-50 rounded-xl shadow-sm transition-all cursor-pointer min-h-[48px]"
              >
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                <span>{isSubmitting ? 'Submitting RSVP...' : 'Confirm Jubilee RSVP'}</span>
              </button>

              <a
                href="https://wa.me/237677866377?text=Hello%20PSS%20Nkwen%2025th%20Jubilee%20Committee%2C%20I%20would%20like%20to%20coordinate%20regarding%20the%20Silver%20Jubilee%20celebrations."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all cursor-pointer min-h-[48px]"
              >
                <span>Write Committee on WhatsApp (+237) &rarr;</span>
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
