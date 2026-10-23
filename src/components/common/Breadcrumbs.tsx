import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Canonical route mapping for auto-generated breadcrumb labels
const ROUTE_LABELS: Record<string, string> = {
  about: 'About Us',
  academics: 'Academics & Curriculum',
  admissions: 'Admissions',
  news: 'PCC & National News',
  events: 'Events & Calendar',
  gallery: 'Campus Photo Gallery',
  downloads: 'Downloads & Resources',
  alumni: 'Alumni (PRENEXA)',
  jubilee: '25th Silver Jubilee',
  contact: 'Contact & Location',
  privacy: 'Privacy Policy',
  'admin-guide': 'Administrator & Handover Manual',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Compute breadcrumb list: either custom items or auto-generated from current pathname
  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) {
      return [];
    }

    const generated: BreadcrumbItem[] = [];
    let accumulatedPath = '';

    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Check predefined label or humanize segment
      let label = ROUTE_LABELS[segment];
      if (!label) {
        // Format kebab-case or slug into clean title
        label = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }

      generated.push({
        label,
        path: isLast ? undefined : accumulatedPath,
      });
    });

    return generated;
  }, [items, location.pathname]);

  // Handle scroll detection for mobile gradient hints
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [breadcrumbItems]);

  // Don't render breadcrumbs on homepage if no custom items
  if (location.pathname === '/' && (!items || items.length === 0)) {
    return null;
  }

  // Determine parent back-target for mobile convenience
  const parentCrumb = breadcrumbItems.length > 1 ? breadcrumbItems[breadcrumbItems.length - 2] : null;
  const backTarget = parentCrumb?.path || (breadcrumbItems.length === 1 ? '/' : null);
  const backLabel = parentCrumb?.label || (breadcrumbItems.length === 1 ? 'Home' : 'Back');

  // Generate Schema.org BreadcrumbList JSON-LD for Search Engines & SEO
  const jsonLd = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pssnkwen.edu.cm';

    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      ...breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.label,
        ...(item.path ? { item: `${origin}${item.path}` } : {}),
      })),
    ];

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    });
  }, [breadcrumbItems]);

  return (
    <>
      {/* Schema.org BreadcrumbList structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <nav
        aria-label="Breadcrumb navigation"
        className={`bg-slate-100/90 border-b border-slate-200/90 text-xs transition-colors print:hidden ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between gap-3 min-h-[44px] py-1">
            {/* Quick Mobile Back Button if deep */}
            {backTarget && (
              <div className="sm:hidden shrink-0">
                <Link
                  to={backTarget}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-navy-900 bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 active:bg-slate-100 min-h-[36px]"
                  title={`Back to ${backLabel}`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-navy-800" aria-hidden="true" />
                  <span className="truncate max-w-[120px]">{backLabel}</span>
                </Link>
              </div>
            )}

            {/* Breadcrumb Trail Container with smooth touch scrolling */}
            <div className="relative flex-1 overflow-hidden">
              {/* Left scroll fade hint on mobile */}
              {canScrollLeft && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-100/90 to-transparent pointer-events-none z-10 sm:hidden"
                  aria-hidden="true"
                />
              )}

              {/* Right scroll fade hint on mobile */}
              {canScrollRight && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-100/90 to-transparent pointer-events-none z-10 sm:hidden"
                  aria-hidden="true"
                />
              )}

              <div
                ref={scrollContainerRef}
                className="overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap touch-pan-x flex items-center py-1.5"
              >
                <ol
                  className="flex items-center gap-1.5 sm:gap-2 text-slate-500 font-medium"
                  itemScope
                  itemType="https://schema.org/BreadcrumbList"
                >
                  {/* Root / Home Link */}
                  <li
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <Link
                      to="/"
                      itemProp="item"
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-navy-950 font-semibold px-2 py-1 rounded-md hover:bg-slate-200/50 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy-900 min-h-[32px]"
                    >
                      <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                      <span itemProp="name" className="hidden sm:inline">Home</span>
                      <span className="sr-only sm:hidden">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                  </li>

                  {/* Breadcrumb Segments */}
                  {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    const position = index + 2;

                    return (
                      <li
                        key={index}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                        className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                      >
                        <ChevronRight
                          className="w-3.5 h-3.5 text-slate-400 shrink-0"
                          aria-hidden="true"
                        />

                        {isLast || !item.path ? (
                          <span
                            itemProp="name"
                            aria-current="page"
                            className="text-navy-950 font-bold px-2 py-1 bg-white/70 sm:bg-transparent rounded-md border border-slate-200/50 sm:border-0 shadow-2xs sm:shadow-none truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg"
                            title={item.label}
                          >
                            {item.label}
                          </span>
                        ) : (
                          <Link
                            to={item.path}
                            itemProp="item"
                            className="text-slate-600 hover:text-navy-950 font-medium hover:underline underline-offset-4 decoration-amber-500 px-2 py-1 rounded-md hover:bg-slate-200/50 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy-900 min-h-[32px] flex items-center"
                          >
                            <span itemProp="name">{item.label}</span>
                          </Link>
                        )}
                        <meta itemProp="position" content={String(position)} />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Institutional Badge Indicator on desktop */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-300/80 text-[11px] text-slate-500 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-medium text-navy-900">PSS Nkwen Official Portal</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
