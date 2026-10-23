import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle2, FlaskConical, Languages, Calculator, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { wpService, IMAGES } from '../services/wpService';
import { AcademicDepartment } from '../types';

export const AcademicsPage: React.FC = () => {
  const [departments, setDepartments] = useState<AcademicDepartment[]>([]);

  useEffect(() => {
    wpService.getDepartments().then(setDepartments);
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Academics' }]} />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Curriculum & Instruction
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Academic Programmes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Rigorous secondary education preparing students for Cameroon General Certificate of Education (GCE) Ordinary and Advanced Levels.
          </p>
        </div>
      </section>

      {/* Overview & Examination Centre Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Scholastic Structure & Pathways
            </h2>
            <div className="text-sm sm:text-base text-slate-700 space-y-3 leading-relaxed">
              <p>
                At Presbyterian Secondary School Nkwen, the academic cycle is structured to build progressive competence from junior secondary (Forms 1–3) to senior secondary (Forms 4–5) and High School sixth-form streams (Lower and Upper Sixth).
              </p>
              <p>
                In the first three years, pupils complete a broad, balanced general foundation encompassing natural sciences, humanities, mathematics, and bilingual language training. At the end of Form 3, students select specialized subject groupings tailored to their academic aptitudes and future higher education ambitions.
              </p>
            </div>

            <VerificationNotice title="Official Syllabuses & Accreditation">
              All courses adhere strictly to the national curriculum approved by the Ministry of Secondary Education (MINESEC) and the Cameroon GCE Board syllabus requirements for Centre 11409.
            </VerificationNotice>

            {/* Examination Centre 11409 Reference */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Cameroon GCE Board Examination Centre 11409</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                PSS Nkwen is an accredited examination centre. The Cameroon GCE Board's 2025 Ordinary Level records documented 9 registered candidates sitting for four or more subjects with 9 passes in the reported centre category.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <ImageWithFallback
                src={IMAGES.scienceLab}
                alt="Science laboratory experimentation at PSS Nkwen"
                className="w-full h-64 object-cover"
              />
              <div className="p-5 bg-white space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Practical Instruction
                </span>
                <h3 className="text-sm font-bold text-slate-900">Science Laboratory Practicals</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Regular hands-on experiments in chemistry, physics, and biology enable students to master scientific methodology and laboratory safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Curricular Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Academic Departments & Subject Areas
            </h2>
            <p className="text-sm text-slate-600">
              Departmental breakdown based on standard Presbyterian secondary curriculum specifications in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      {dept.name}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      {dept.levels}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dept.shortDescription}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Core Subjects Taught:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-sm"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {dept.headNote && (
                  <p className="text-[11px] text-amber-800 bg-amber-50/60 p-2.5 rounded-md border border-amber-200/60 italic">
                    Note: {dept.headNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular & Student Development */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Holistic Growth
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Clubs, Societies & Spiritual Nurture
          </h2>
          <p className="text-sm text-slate-600">
            Complementing classroom studies with leadership, debate, environmental awareness, and Christian fellowship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">Debating & Press Club</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enhancing public speaking, critical reasoning, and current affairs debate among pupils.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">Young Scientists Club</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Encouraging science exhibitions, experimental inquiry, and technological literacy.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">Christian Youth Fellowship</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Presbyterian chapel services, hymn singing, moral guidance, and community outreach.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-1.5">
            <h4 className="text-sm font-bold text-slate-900">Sports & Athletics</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Football, volleyball, handball, and track events promoting physical stamina and sportsmanship.
            </p>
          </div>
        </div>

        <div className="pt-6 flex justify-center">
          <Link
            to="/admissions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg shadow-sm transition-colors min-h-[44px] w-full sm:w-auto"
          >
            <span>Proceed to Admissions & Registration</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};
