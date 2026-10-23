import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Heart, Award, Send, CheckCircle2, AlertCircle, BookOpen, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { IMAGES } from '../services/wpService';

interface AlumniRegistrationPayload {
  fullName: string;
  gradYear: string;
  currentCity: string;
  country: string;
  profession: string;
  telephone: string;
  email: string;
  mentorshipInterest: boolean;
  message: string;
  privacyAgreed: boolean;
}

export const AlumniPage: React.FC = () => {
  const [formData, setFormData] = useState<AlumniRegistrationPayload>({
    fullName: '',
    gradYear: '',
    currentCity: '',
    country: 'Cameroon',
    profession: '',
    telephone: '',
    email: '',
    mentorshipInterest: true,
    message: '',
    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    // Validation
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      setResult({ success: false, message: 'Please enter your full name (at least 3 characters).' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.telephone || formData.telephone.length < 8) {
      setResult({ success: false, message: 'Please provide a valid contact telephone number.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.privacyAgreed) {
      setResult({ success: false, message: 'Please agree to the privacy notice for alumni directory records.' });
      setIsSubmitting(false);
      return;
    }

    const refId = `PSS-ALM-${Date.now().toString(36).toUpperCase()}`;

    // Store in local storage for admin review
    try {
      const existing = JSON.parse(localStorage.getItem('pss_nkwen_alumni_directory') || '[]');
      existing.unshift({
        ...formData,
        referenceId: refId,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('pss_nkwen_alumni_directory', JSON.stringify(existing));
    } catch {
      // ignore storage quota
    }

    setResult({
      success: true,
      message: `Welcome home! Your alumni registration has been recorded with reference ${refId}. The alumni liaison desk will connect with you.`,
      refId,
    });
    setIsSubmitting(false);
    setFormData({
      fullName: '',
      gradYear: '',
      currentCity: '',
      country: 'Cameroon',
      profession: '',
      telephone: '',
      email: '',
      mentorshipInterest: true,
      message: '',
      privacyAgreed: false,
    });
  };

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Alumni (PRENEXA)' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Community & Legacy · PRENEXA
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Presbyterian Secondary School Nkwen Ex-Students Association (PRENEXA)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Uniting all PSS Nkwen ex-students across Cameroon and the worldwide diaspora in fellowship, mentorship, and service under our school motto: <strong>"God, Peace, Knowledge"</strong> (<em>"Dieu, La Paix et Le Savoir"</em>).
          </p>
        </div>
      </section>

      {/* Hero Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-white rounded-2xl overflow-hidden border border-navy-900 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-md border border-white/15 text-xs text-amber-300 font-medium">
                <GraduationCap className="w-4 h-4" />
                <span>PRENEXA · Official Alumni Association</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                "God, Peace, Knowledge"
              </h2>
              <p className="text-xs text-amber-300 font-serif italic -mt-2">
                "Dieu, La Paix et Le Savoir"
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you walked our pavilions in Nkwen decades ago or recently celebrated your GCE results, you are a member of PRENEXA. Our alumni association supports current students through scholarship endowments, career mentorship, laboratory equipment gifts, and annual homecoming chapel services.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/237677866377?text=Hello%20PRENEXA%20Alumni%20Desk%2C%20I%20am%20an%20ex-student%20of%20PSS%20Nkwen%20reaching%20out."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Chat with PRENEXA on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span>Cameroon & Global Diaspora Chapters</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-400" />
                <span>Mentorship & Student Sponsorship</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
            <ImageWithFallback
              src={IMAGES.alumniYaoundeAgm2025}
              alt="PRENEXA Yaounde Chapter AGM 2025 Grand Group Photo with banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/60 backdrop-blur-xs rounded-lg text-xs text-white border border-white/10 hidden sm:block">
              <span className="font-bold text-amber-300 block">PRENEXA Yaoundé AGM 2025</span>
              <span className="text-[11px] text-slate-300">National alumni assembly gathered in Cameroon's capital</span>
            </div>
          </div>
        </div>
      </section>

      {/* Silver Jubilee 25 Years Central Callout for Alumni */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-950 text-white rounded-2xl p-8 sm:p-10 border-2 border-amber-400/50 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Major Milestone Announcement
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Celebrating 25 Years: Silver Jubilee Homecoming
              </h2>
            </div>
            <div className="text-right">
              <span className="block font-mono text-xs text-amber-300 font-semibold">19 Nov (Bamenda)</span>
              <span className="block font-mono text-xs text-slate-300">20–21 Nov (Yaoundé)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white text-base block font-serif">Leg 1: Bamenda Campus (19 Nov)</strong>
              <p className="text-xs leading-relaxed text-slate-300">
                Homecoming march past, ecumenical Thanksgiving Chapel service, cultural dances, and the commissioning of Silver Jubilee landmark infrastructure projects.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white text-base block font-serif">Leg 2: Yaoundé Gala & Summit (20–21 Nov)</strong>
              <p className="text-xs leading-relaxed text-slate-300">
                National Alumni Colloquium on Friday, followed by the Grand Silver Jubilee Gala Banquet, awards ceremony, and Endowment Fund launch on Saturday.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-amber-200/90 italic">
              Official Theme: "Honouring Our Past, Building Our Future"
            </p>
            <Link
              to="/jubilee"
              className="px-6 py-3 text-xs font-bold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Jubilee Program & RSVP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRENEXA in Action: Authentic Photographic Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Photographic Archive · PRENEXA in Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Conventions, Fellowship & Sporting Brotherhood
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real moments of camaraderie from national annual general meetings, health walks, and gala dinners across Cameroon.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 hover:text-navy-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg border border-slate-200 transition-colors w-fit"
          >
            <span>Browse Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: AGM 2025 Yaounde */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.alumniYaoundeAgm2025}
                alt="PRENEXA Yaounde Chapter AGM 2025 group photo with banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-navy-950 text-xs font-bold rounded-md shadow-xs">
                Yaoundé · AGM 2025
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Annual General Assembly
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                PRENEXA Yaoundé Chapter AGM 2025 Grand Assembly
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hundreds of ex-students gathered in front of the venue proudly holding the <em>"PRENEXA YAOUNDE AGM 2025"</em> banner, uniting multiple generations of graduates in fraternity and strategic fundraising.
              </p>
            </div>
          </div>

          {/* Card 2: AGM 2024 Executive High Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.alumniExecutiveAgm2024}
                alt="PRENEXA AGM 2024 Executive High Table and banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-navy-900 text-amber-300 text-xs font-semibold rounded-md border border-white/10">
                Executive Leadership · AGM 2024
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Deliberations & Strategy
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                National Executive Presidium & High Table
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                National executive bureau and committee leaders presiding over convention deliberations, reviewing financial endowments, candidate mentorship structures, and school infrastructure interventions.
              </p>
            </div>
          </div>

          {/* Card 3: Sports Walk & Trophy Presentation */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.alumniSportsWalk}
                alt="PRENEXA Sports Walk and trophy presentation with Bamenda and Yaounde banners"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-md">
                Sports & Wellness
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Athletic Fraternity
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                PRENEXA Sports Day Walk & Trophy Celebration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Promoting physical health and fraternal bonding: ex-students from Bamenda, Yaoundé, and Douala chapters celebrating with the official PRENEXA banners and victory trophies.
              </p>
            </div>
          </div>

          {/* Card 4: Gala Dinner & Masquerade Ball */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={IMAGES.alumniGalaBall}
                alt="PRENEXA Red Carpet Gala Dinner and Masquerade Ball"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-purple-900 text-amber-300 text-xs font-semibold rounded-md border border-white/10">
                Black Tie Gala & Awards
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Excellence Recognition
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Annual Reunion Gala Dinner & Masquerade Ball
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ex-students dressed in elegant black tie on the red carpet during the PRENEXA Annual Gala and Awards Banquet, honoring outstanding professional achievements and benefactors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Alumni Initiatives
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            How Ex-Students Give Back
          </h2>
          <p className="text-sm text-slate-600">
            Fostering continuous collaboration between graduates and the ongoing educational mission of PSS Nkwen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Career & Academic Mentorship
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ex-students in medicine, engineering, law, business, education, and technology provide virtual and in-person mentorship to Form 5 and High School pupils.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Library & Lab Endowments
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alumni book drives, scientific glassware contributions, and computer laboratory support that enhance learning tools for current candidates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-900">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Annual Homecoming & Fellowship
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reconnecting classmates through annual reunion chapel services, campus tours in Bamenda, and joint celebrations of school milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Registration Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Information & Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Join the PSS Nkwen Alumni Registry
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Registering your current details helps the school administration and regional chapter coordinators keep you informed about school developments, homecoming gatherings, and mentorship opportunities.
            </p>

            <VerificationNotice title="Official Alumni Coordination Notice">
              Alumni affairs and chapter activities are organized in formal coordination with the Presbyterian Education Authority and school management. Contact information is strictly protected and never sold or shared with external third parties.
            </VerificationNotice>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <strong className="text-slate-900 block font-semibold">Alumni Liaison Office</strong>
              <p>Presbyterian Secondary School Nkwen</p>
              <p>Nkwen, Bamenda, North-West Region, Cameroon</p>
              <p className="text-slate-500 pt-1">
                For batch coordinators organizing reunions, please specify your graduation year in the message box.
              </p>
            </div>
          </div>

          {/* Registration Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Ex-Students Roster
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Alumni Registration Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below to reconnect with PSS Nkwen.
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
                    <span className="font-bold block">{result.success ? 'Registration Successful' : 'Notice'}</span>
                    <p>{result.message}</p>
                    {result.refId && (
                      <span className="block font-mono text-[11px] text-emerald-800 bg-white/70 px-2 py-0.5 rounded border border-emerald-300 w-fit mt-1">
                        Ref: {result.refId}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="almFullName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name (Including maiden name if applicable) *
                  </label>
                  <input
                    type="text"
                    id="almFullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Victorine Bih Ngu"
                    className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="almGradYear" className="block text-xs font-semibold text-slate-700 mb-1">
                      Year Completed / Form 5 or Upper Sixth
                    </label>
                    <input
                      type="text"
                      id="almGradYear"
                      value={formData.gradYear}
                      onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                      placeholder="e.g. 2018 or Class of 2020"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="almProfession" className="block text-xs font-semibold text-slate-700 mb-1">
                      Profession / Current Field
                    </label>
                    <input
                      type="text"
                      id="almProfession"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      placeholder="e.g. Civil Engineer, Teacher, Medical Doctor"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="almCity" className="block text-xs font-semibold text-slate-700 mb-1">
                      Current City of Residence
                    </label>
                    <input
                      type="text"
                      id="almCity"
                      value={formData.currentCity}
                      onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                      placeholder="e.g. Bamenda, Douala, Yaoundé, London"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="almCountry" className="block text-xs font-semibold text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="almCountry"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Cameroon, UK, USA, Germany"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="almTel" className="block text-xs font-semibold text-slate-700 mb-1">
                      Telephone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="almTel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="e.g. +237 677 866 377"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="almEmail" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="almEmail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alumni@example.com"
                      className="w-full px-3.5 py-3 text-base sm:text-sm min-h-[44px] border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                {/* Mentorship Checkbox */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mentorshipInterest}
                      onChange={(e) => setFormData({ ...formData, mentorshipInterest: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-navy-900 min-h-[20px] min-w-[20px]"
                    />
                    <span className="text-xs text-slate-700 font-medium leading-snug">
                      I am interested in participating in student mentorship, career talks, or alumni batch projects.
                    </span>
                  </label>
                </div>

                <div>
                  <label htmlFor="almMessage" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message, Favorite PSS Nkwen Memory, or Batch Ideas
                  </label>
                  <textarea
                    id="almMessage"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any memories of your teachers, chapel services, or ways your batch would like to collaborate..."
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
                      I agree to have my details recorded in the official PSS Nkwen alumni registry in compliance with the school's <Link to="/privacy" className="text-navy-900 underline font-medium">Privacy Policy</Link>.
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
                    <span>{isSubmitting ? 'Recording Registration...' : 'Submit Alumni Registration'}</span>
                  </button>

                  <a
                    href="https://wa.me/237677866377?text=Hello%20PRENEXA%20Secretariat%2C%20I%20am%20a%20PSS%20Nkwen%20ex-student%20reaching%20out%20via%20the%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>Chat PRENEXA on WhatsApp (+237) &rarr;</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
