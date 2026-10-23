import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, Clock, ArrowRight, Bell, Check, Award } from 'lucide-react';
import { SILVER_JUBILEE_INFO } from '../../services/wpService';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalSeconds: number;
}

interface JubileeCountdownProps {
  variant?: 'hero' | 'banner' | 'compact';
  defaultLeg?: 'bamenda' | 'yaounde';
  showDualSelector?: boolean;
  className?: string;
}

// Celebration target dates in Cameroon Timezone (WAT, GMT+1)
const CELEBRATION_DATES = {
  bamenda: {
    name: 'Bamenda Campus Celebration',
    dateLabel: 'Thursday, 19th November 2026',
    timeLabel: '08:30 AM WAT (GMT+1)',
    venue: 'PSS Nkwen Campus Pavilion & Chapel, Bamenda',
    // 2026-11-19T09:00:00+01:00
    targetIso: '2026-11-19T09:00:00+01:00',
    description: 'Thanksgiving Chapel Service, Student Exhibitions, Alumni March & Silver Jubilee Monument Dedication.',
  },
  yaounde: {
    name: 'Yaoundé Grand Gala & Summit',
    dateLabel: '20th & 21st November 2026',
    timeLabel: '05:00 PM WAT (GMT+1)',
    venue: 'Yaoundé, Centre Region, Cameroon',
    // 2026-11-20T17:00:00+01:00
    targetIso: '2026-11-20T17:00:00+01:00',
    description: 'National Alumni Colloquium, Career Mentorship Symposium & Silver Jubilee Banquet with Endowment Launch.',
  },
};

function calculateTimeLeft(targetDateStr: string): TimeLeft {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      totalSeconds: 0,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    totalSeconds: Math.floor(diff / 1000),
  };
}

export const JubileeCountdown: React.FC<JubileeCountdownProps> = ({
  variant = 'hero',
  defaultLeg = 'bamenda',
  showDualSelector = true,
  className = '',
}) => {
  const [selectedLeg, setSelectedLeg] = useState<'bamenda' | 'yaounde'>(defaultLeg);
  const currentLegConfig = CELEBRATION_DATES[selectedLeg];
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(currentLegConfig.targetIso));
  const [copiedReminder, setCopiedReminder] = useState(false);

  useEffect(() => {
    // Initial sync
    setTimeLeft(calculateTimeLeft(currentLegConfig.targetIso));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(currentLegConfig.targetIso));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLeg, currentLegConfig.targetIso]);

  // Calendar iCal download helper
  const handleDownloadIcs = () => {
    const isBamenda = selectedLeg === 'bamenda';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PSS Nkwen//Silver Jubilee 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:PSS Nkwen 25th Silver Jubilee - ${currentLegConfig.name}`,
      `DESCRIPTION:Theme: "${SILVER_JUBILEE_INFO.theme}"\\n${currentLegConfig.description}\\nMotto: God, Peace, Knowledge (Dieu, La Paix et Le Savoir)`,
      `LOCATION:${currentLegConfig.venue}`,
      isBamenda ? 'DTSTART:20261119T080000Z' : 'DTSTART:20261120T160000Z',
      isBamenda ? 'DTEND:20261119T180000Z' : 'DTEND:20261121T220000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PSS_Nkwen_25th_Jubilee_${selectedLeg}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedReminder(true);
    setTimeout(() => setCopiedReminder(false), 3000);
  };

  const padZero = (num: number) => num.toString().padStart(2, '0');

  // Time unit cards data
  const units = [
    { label: 'Days', value: padZero(timeLeft.days), sub: 'Jours' },
    { label: 'Hours', value: padZero(timeLeft.hours), sub: 'Heures' },
    { label: 'Minutes', value: padZero(timeLeft.minutes), sub: 'Minutes' },
    { label: 'Seconds', value: padZero(timeLeft.seconds), sub: 'Secondes' },
  ];

  /* -------------------------------------------------------------
     COMPACT VARIANT (for sidebars, top banners, or modest widgets)
  ------------------------------------------------------------- */
  if (variant === 'compact') {
    return (
      <div className={`bg-navy-900 text-white rounded-2xl p-5 border border-navy-700/80 shadow-lg ${className}`}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Silver Jubilee Countdown
            </span>
          </div>
          <span className="text-[11px] text-slate-300 font-medium bg-navy-800/80 px-2 py-0.5 rounded-full border border-navy-700">
            19 Nov 2026
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center py-2">
          {units.map((unit) => (
            <div key={unit.label} className="bg-navy-950/80 rounded-xl p-2 border border-navy-800/80">
              <span className="block text-xl font-bold font-mono text-amber-400 leading-tight">
                {unit.value}
              </span>
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
          <p className="text-[11px] text-slate-300 italic truncate">
            "{SILVER_JUBILEE_INFO.theme}"
          </p>
          <Link
            to="/jubilee"
            className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 shrink-0"
          >
            Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     BANNER VARIANT (for Homepage section, distinct from hero)
  ------------------------------------------------------------- */
  if (variant === 'banner') {
    return (
      <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white border-2 border-amber-500/30 shadow-2xl ${className}`}>
        {/* Glow & background patterns */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left info column */}
            <div className="w-full lg:max-w-md space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/15 border border-amber-400/30 rounded-full text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>25 Years of Existence · 1999–2024 / 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                The Silver Jubilee Countdown
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Theme: <strong className="text-amber-300 font-medium">"{SILVER_JUBILEE_INFO.theme}"</strong>
                <br />
                <span className="text-xs text-slate-400 italic">"Dieu, La Paix et Le Savoir"</span>
              </p>

              {/* Dual leg selector tabs */}
              {showDualSelector && (
                <div className="flex flex-col sm:inline-flex sm:flex-row p-1 bg-navy-950/90 rounded-xl border border-navy-800 text-xs font-medium w-full sm:w-auto gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedLeg('bamenda')}
                    className={`px-3 py-2 rounded-lg transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                      selectedLeg === 'bamenda'
                        ? 'bg-amber-400 text-navy-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    1. Bamenda Campus (19 Nov)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLeg('yaounde')}
                    className={`px-3 py-2 rounded-lg transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                      selectedLeg === 'yaounde'
                        ? 'bg-amber-400 text-navy-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    2. Yaoundé Gala (20–21 Nov)
                  </button>
                </div>
              )}
            </div>

            {/* Middle/Right: Digit Counter Blocks */}
            <div className="w-full lg:flex-1 max-w-xl">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                {units.map((unit) => (
                  <div
                    key={unit.label}
                    className="relative bg-navy-950/90 border border-amber-500/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-inner backdrop-blur-md transition-transform hover:scale-[1.02]"
                  >
                    <span className="block text-xl sm:text-3xl lg:text-5xl font-mono font-bold text-amber-400 tracking-tight leading-none">
                      {unit.value}
                    </span>
                    <span className="block text-[9px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1.5 sm:mt-2 truncate">
                      {unit.label}
                    </span>
                    <span className="block text-[8px] sm:text-[10px] text-amber-200/60 font-serif italic truncate">
                      {unit.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Destination badge & CTA */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-200">{currentLegConfig.venue}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:ml-auto">
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="text-slate-200 hover:text-white bg-navy-800/80 hover:bg-navy-800 border border-navy-700 sm:bg-transparent sm:border-0 rounded-lg px-3 py-2 flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer min-h-[44px]"
                    title="Add celebration to your phone or desktop calendar"
                  >
                    {copiedReminder ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Calendar Saved!</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add to Calendar</span>
                      </>
                    )}
                  </button>

                  <Link
                    to="/jubilee"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold rounded-lg shadow-sm transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Full Programme & RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------------
     HERO VARIANT (for JubileePage top banner marquee)
  ------------------------------------------------------------- */
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-navy-950 text-white border-2 border-amber-500/40 shadow-2xl ${className}`}>
      {/* Decorative background radiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12">
        {/* Top Badges & Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-navy-800">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-amber-400 text-navy-950 text-xs font-bold uppercase tracking-wider rounded-md shadow-xs">
              Official Silver Jubilee
            </span>
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              19th & 20th–21st November 2026
            </span>
          </div>

          {/* Leg Switcher */}
          {showDualSelector && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1 bg-navy-900 rounded-xl border border-navy-700 text-xs font-semibold w-full md:w-auto">
              <button
                type="button"
                onClick={() => setSelectedLeg('bamenda')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-[40px] ${
                  selectedLeg === 'bamenda'
                    ? 'bg-amber-400 text-navy-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Leg 1: Bamenda Campus (19 Nov)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeg('yaounde')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-[40px] ${
                  selectedLeg === 'yaounde'
                    ? 'bg-amber-400 text-navy-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Leg 2: Yaoundé Gala (20–21 Nov)</span>
              </button>
            </div>
          )}
        </div>

        {/* Center Countdown Display */}
        <div className="py-8 sm:py-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
              Time Remaining Until {currentLegConfig.name}
            </span>
            <h3 className="text-lg sm:text-2xl font-serif text-slate-200">
              {currentLegConfig.dateLabel} · {currentLegConfig.timeLabel}
            </h3>
          </div>

          {/* Countdown Digit Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative bg-navy-900/90 border-2 border-amber-400/30 rounded-2xl p-3 sm:p-6 shadow-xl backdrop-blur-md transform transition duration-200 hover:-translate-y-1 hover:border-amber-400/60"
              >
                <div className="text-3xl sm:text-5xl lg:text-7xl font-mono font-bold text-amber-400 tracking-tight leading-none drop-shadow-sm">
                  {unit.value}
                </div>
                <div className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
                  {unit.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-amber-200/60 font-serif italic mt-0.5">
                  {unit.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Theme Banner */}
          <div className="pt-2 max-w-xl mx-auto">
            <p className="text-base sm:text-lg font-serif italic text-amber-200 font-medium">
              "{SILVER_JUBILEE_INFO.theme}"
            </p>
            <p className="text-xs text-slate-400 mt-1">
              "Honorer notre passé, bâtir notre avenir" · Official Jubilee Motto
            </p>
          </div>
        </div>

        {/* Footer actions of countdown card */}
        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300 text-center sm:text-left justify-center sm:justify-start">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentLegConfig.venue}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-navy-850 hover:bg-navy-800 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              {copiedReminder ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Added to Calendar</span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download .ICS Reminder</span>
                </>
              )}
            </button>

            <a
              href="#rsvp-section"
              className="px-5 py-2.5 text-xs font-bold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>RSVP For This Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
