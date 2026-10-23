import React from 'react';
import { Info } from 'lucide-react';

interface VerificationNoticeProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'verified';
}

export const VerificationNotice: React.FC<VerificationNoticeProps> = ({
  title = 'Administrative Notice',
  children,
  variant = 'info',
}) => {
  const isVerified = variant === 'verified';

  return (
    <div
      className={`rounded-lg p-4 text-xs leading-relaxed border ${
        isVerified
          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isVerified ? 'text-emerald-700' : 'text-amber-700'}`} aria-hidden="true" />
        <div>
          <span className="font-semibold block mb-0.5 tracking-tight">{title}</span>
          <div className="text-slate-700">{children}</div>
        </div>
      </div>
    </div>
  );
};
