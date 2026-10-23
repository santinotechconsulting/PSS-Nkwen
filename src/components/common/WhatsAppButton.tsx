import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { VERIFIED_SCHOOL_PROFILE } from '../../services/wpService';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneParam = '237677866377';
  const defaultText = customMessage 
    ? encodeURIComponent(customMessage) 
    : encodeURIComponent('Hello PSS Nkwen Administration, I am contacting you from the official website regarding inquiries.');

  const whatsappHref = `https://wa.me/${phoneParam}?text=${defaultText}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex items-end gap-2 group">
      {/* Tooltip prompt (desktop & hover) */}
      <div 
        className="hidden sm:flex items-center gap-2 bg-slate-900/90 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 backdrop-blur-xs transition-all duration-200"
        role="tooltip"
      >
        <div className="flex flex-col text-right">
          <span className="font-semibold text-emerald-400">Chat with Administration</span>
          <span className="text-[10px] text-slate-300 font-mono">+237 677 866 377</span>
        </div>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-emerald-300 relative shrink-0 cursor-pointer"
        aria-label="Chat with PSS Nkwen Administration on WhatsApp at +237 677866377"
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-white" aria-hidden="true" />
        
        {/* Active badge */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-slate-900 rounded-full" />
      </a>
    </aside>
  );
};
