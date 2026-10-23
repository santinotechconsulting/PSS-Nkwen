import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Download, Filter } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { wpService } from '../services/wpService';
import { SchoolEvent } from '../types';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wpService.getEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Academic', 'Spiritual', 'Sports', 'Administrative'];

  const filteredEvents = events.filter((evt) => {
    if (selectedFilter === 'All') return true;
    return evt.category === selectedFilter;
  });

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Events & Calendar' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            School Calendar
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Events & Key Milestones
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Academic examinations, spiritual devotions, sporting meetings, and administrative consultations for the academic session.
          </p>
        </div>

        {/* Verification notice for official calendar */}
        <VerificationNotice title="Official Academic Schedule Coordination">
          Event dates follow the North-West regional academic calendar established by the Ministry of Secondary Education (MINESEC) and the Presbyterian Education Authority. Any emergency reschedules will be posted here and through official church notices.
        </VerificationNotice>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-white text-navy-950 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            to="/downloads"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full Term Calendar (PDF)</span>
          </Link>
        </div>
      </section>

      {/* Events Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-400">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
            No events found under the selected category.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Date Badge (Editorial clean tabular typography) */}
                <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-6 gap-2">
                  <div className="flex items-center gap-2 text-navy-900">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-mono text-sm font-bold">{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="md:col-span-7 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-amber-800">{evt.category}</span>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="md:col-span-2 text-right">
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-xs font-semibold text-navy-900 hover:text-amber-700 underline underline-offset-2"
                  >
                    Enquire With Admin &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
