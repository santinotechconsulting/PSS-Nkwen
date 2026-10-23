import React, { useEffect, useState } from 'react';
import { Download, FileText, CheckCircle2, Shield, Search } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { wpService } from '../services/wpService';
import { DownloadableDocument } from '../types';

export const DownloadsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DownloadableDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    wpService.getDocuments().then(setDocuments);
  }, []);

  const categories = ['All', 'Admissions', 'Academic', 'Policies', 'Notices'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (doc: DownloadableDocument) => {
    // Generate real readable client-side document blob so download button works genuinely
    const content = `=====================================================
PRESBYTERIAN SECONDARY SCHOOL (PSS) NKWEN, BAMENDA
Official Document Archive - Reference No. ${doc.id}
=====================================================

Title: ${doc.title}
Category: ${doc.category}
Date Published: ${doc.uploadDate}
File Format: ${doc.fileType} (${doc.fileSize})
Institution: Presbyterian Secondary School Nkwen
Location: Nkwen, Bamenda, North-West Region, Cameroon
Examination Centre: Centre No. 11409 (Cameroon GCE Board)

DESCRIPTION:
${doc.description}

-----------------------------------------------------
OFFICIAL VERIFICATION NOTICE:
This document is distributed for public reference by the Presbyterian Secondary School Nkwen administration and Santino Tech Consulting.
For inquiries or formal submissions, visit the school administration block in Nkwen, Bamenda, Cameroon.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Downloaded "${doc.title}".`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Downloads & Resources' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Public Repository
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Downloads & Documents
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Official admission forms, academic calendars, student conduct guidelines, and institutional notices.
          </p>
        </div>

        {/* Security and privacy safeguard */}
        <VerificationNotice title="Document Security & Integrity Notice">
          All public documents hosted here are verified by school administration. Confidential student records, internal accounting sheets, and private personnel files are strictly restricted and never published to this repository.
        </VerificationNotice>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccess} Check your browser's download folder.</span>
          </div>
        )}

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-full overflow-x-auto no-scrollbar touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[40px] flex items-center justify-center shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-navy-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-9 pr-3 py-2 text-base sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white min-h-[40px]"
            />
          </div>
        </div>
      </section>

      {/* Document Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
            No documents found matching your filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-navy-900">{doc.category}</span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {doc.fileType} · {doc.fileSize}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Uploaded: {doc.uploadDate}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg shadow-xs transition-colors cursor-pointer min-h-[40px]"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
