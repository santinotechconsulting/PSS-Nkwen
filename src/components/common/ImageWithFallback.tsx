import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Presbyterian Secondary School Nkwen visual archive',
  fallbackTitle = 'Presbyterian Secondary School Nkwen',
  className = '',
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900 text-slate-300 p-6 text-center select-none ${className}`}
        role="img"
        aria-label={`${alt} (Visual placeholder)`}
      >
        <ImageOff className="w-8 h-8 text-amber-400 mb-2 opacity-80" aria-hidden="true" />
        <span className="text-xs uppercase tracking-wider font-semibold text-amber-200">
          PSS Nkwen Archive
        </span>
        <span className="text-xs text-slate-400 mt-1 max-w-[240px] truncate">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${!isLoaded ? 'img-skeleton' : ''}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
