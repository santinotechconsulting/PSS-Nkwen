import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationNotice } from '../components/common/VerificationNotice';
import { ShieldCheck, Lock, EyeOff, FileText, UserCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Data Governance & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Privacy Policy & Data Handling
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Presbyterian Secondary School Nkwen ("PSS Nkwen") is committed to safeguarding the privacy and personal data of prospective students, parents, guardians, and visitors.
          </p>
        </div>

        <VerificationNotice title="Policy Review & Administrative Approval Notice">
          This policy outlines the technical and operational privacy principles implemented on the official web portal developed by Santino Tech Consulting. Formal institutional ratification is conducted in coordination with the Presbyterian Education Authority.
        </VerificationNotice>

        {/* Policy Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-navy-900" />
              <span>1. Information Collected Through Digital Forms</span>
            </h2>
            <p>
              When visitors submit an Admission Enquiry or General Contact Enquiry on this website, we collect only the necessary information required to process and respond to the request:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li><strong>Parent / Guardian Name:</strong> Used to address correspondence appropriately.</li>
              <li><strong>Telephone Number:</strong> Used to contact parents regarding admission availability or questions.</li>
              <li><strong>Email Address (Optional):</strong> Used to transmit written acknowledgements or documentation.</li>
              <li><strong>Prospective Student Name & Intended Class:</strong> Used to verify availability within the appropriate academic level.</li>
              <li><strong>Enquiry Message:</strong> Specific notes or inquiries provided voluntarily by the applicant.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-navy-900" />
              <span>2. Safeguards Relating to Children & Sensitive Documents</span>
            </h2>
            <p>
              We enforce strict child-protection principles regarding digital submissions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li>We <strong>do not</strong> request, collect, or store sensitive student documents (such as birth certificates, original GCE slips, national identity cards, or private medical records) through unauthenticated public web forms.</li>
              <li>Official registration files and identity documents are processed strictly in person at the school administration office in Nkwen, Bamenda, with parental oversight.</li>
              <li>Under no circumstances are student enquiry submissions made accessible in public search indexes or exposed via public REST API endpoints.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-navy-900" />
              <span>3. How We Use and Protect Submitted Data</span>
            </h2>
            <p>
              Submitted data is used exclusively by authorized school administrative personnel to evaluate admission inquiries, verify class vacancies, and provide requested school circulars.
            </p>
            <p>
              Data is transmitted over secure encrypted connections (HTTPS) and stored in accordance with least-privilege administrative access controls within the WordPress content management system and secure database infrastructure.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-navy-900" />
              <span>4. Data Retention, Correction & Rights</span>
            </h2>
            <p>
              Admission enquiries are retained during the relevant admission cycle and archived or removed following the completion of student enrolment.
            </p>
            <p>
              Parents and guardians retain the right to request the review, correction, or deletion of their contact details by writing to the school administrative desk or contacting the administration in person.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              5. Contact for Privacy Inquiries
            </h2>
            <p className="text-xs text-slate-600">
              For any questions concerning data handling, digital records, or child protection policies, please contact:
            </p>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">The Administrative Office</p>
              <p>Presbyterian Secondary School (PSS) Nkwen</p>
              <p>Nkwen, Bamenda, North-West Region, Cameroon</p>
              <p>PEA Directory Telephone: +237 677 866 377</p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
