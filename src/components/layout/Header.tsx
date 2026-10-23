import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  GraduationCap,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Search,
  BookOpen,
  Calendar,
  Image,
  Download,
  Building2,
  Users,
  Compass,
  FileCheck2,
  Phone,
  Layers,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { VERIFIED_SCHOOL_PROFILE } from '../../services/wpService';

interface SubMenuItem {
  label: string;
  path: string;
  description?: string;
  icon?: React.ElementType;
}

interface NavItem {
  label: string;
  path?: string;
  badge?: string;
  badgeColor?: string;
  category?: 'core' | 'academic' | 'community' | 'resources';
  icon?: React.ElementType;
  children?: SubMenuItem[];
}

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSelectedCategory, setMobileSelectedCategory] = useState<string>('all');
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    'About Us': false,
    'Academics': false,
    'News & Media': false,
  });

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const navigationConfig: NavItem[] = [
    {
      label: 'Home',
      path: '/',
      category: 'core',
      icon: Building2,
    },
    {
      label: '25th Jubilee',
      path: '/jubilee',
      badge: '2026 Milestone',
      badgeColor: 'bg-amber-400 text-navy-950 font-bold',
      category: 'core',
      icon: Sparkles,
    },
    {
      label: 'About Us',
      path: '/about',
      category: 'core',
      icon: Compass,
      children: [
        {
          label: 'School Overview & Foundation',
          path: '/about',
          description: 'Faith-based secondary education & campus in Nkwen, Bamenda',
          icon: Building2,
        },
        {
          label: 'Presbyterian Heritage & Values',
          path: '/about',
          description: 'Spiritual grounding, moral integrity & Christian discipline',
          icon: Compass,
        },
        {
          label: 'Motto & Identity',
          path: '/about',
          description: 'God, Peace, Knowledge · Dieu, La Paix et Le Savoir',
          icon: GraduationCap,
        },
      ],
    },
    {
      label: 'Academics',
      path: '/academics',
      category: 'academic',
      icon: BookOpen,
      children: [
        {
          label: 'Academic Programmes',
          path: '/academics',
          description: 'General secondary instruction & departmental streams',
          icon: BookOpen,
        },
        {
          label: 'Departments & Disciplines',
          path: '/academics',
          description: 'Sciences, Arts, Languages, Commercial & Religious Studies',
          icon: Layers,
        },
        {
          label: 'Cameroon GCE Centre 11409',
          path: '/academics',
          description: 'Accredited examination centre for Ordinary & Advanced Levels',
          icon: FileCheck2,
        },
      ],
    },
    {
      label: 'Admissions',
      path: '/admissions',
      badge: '2025/2026',
      badgeColor: 'bg-emerald-600 text-white font-semibold',
      category: 'academic',
      icon: FileCheck2,
    },
    {
      label: 'Alumni (PRENEXA)',
      path: '/alumni',
      badge: 'PRENEXA',
      badgeColor: 'bg-blue-600 text-white font-semibold',
      category: 'community',
      icon: Users,
    },
    {
      label: 'News & Media',
      category: 'community',
      icon: Calendar,
      children: [
        {
          label: 'PCC & National News',
          path: '/news',
          description: 'Presbyterian Church in Cameroon bulletins & school press',
          icon: BookOpen,
        },
        {
          label: 'Events & Calendar',
          path: '/events',
          description: 'Jubilee celebrations, worship services & term dates',
          icon: Calendar,
        },
        {
          label: 'Campus Photo Gallery',
          path: '/gallery',
          description: 'Historical archives, assemblies, science labs & sports',
          icon: Image,
        },
      ],
    },
    {
      label: 'Downloads',
      path: '/downloads',
      category: 'resources',
      icon: Download,
    },
    {
      label: 'Contact',
      path: '/contact',
      category: 'resources',
      icon: Phone,
    },
  ];

  // Close dropdown and drawer on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setMobileSearchQuery('');
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeDropdown) {
          setActiveDropdown(null);
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          toggleButtonRef.current?.focus();
        }
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-focus search input when mobile menu opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, activeDropdown]);

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isChildActive = (children?: SubMenuItem[]) => {
    if (!children) return false;
    return children.some((child) => child.path === location.pathname);
  };

  // Filtered links for mobile drawer search
  const filteredNavItems = useMemo(() => {
    const query = mobileSearchQuery.trim().toLowerCase();
    return navigationConfig.filter((item) => {
      const matchesCategory =
        mobileSelectedCategory === 'all' || item.category === mobileSelectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const labelMatch = item.label.toLowerCase().includes(query);
      const badgeMatch = item.badge?.toLowerCase().includes(query);
      const childMatch = item.children?.some(
        (c) =>
          c.label.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query)
      );

      return labelMatch || badgeMatch || childMatch;
    });
  }, [navigationConfig, mobileSearchQuery, mobileSelectedCategory]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-200">
      {/* Upper Brand & Quick Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 h-16 sm:h-20">
          {/* Brand Wordmark & Crest */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-slate-900 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy-900 rounded-lg p-1"
            aria-label="Presbyterian Secondary School Nkwen - Homepage"
          >
            {/* Crest Symbol */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy-950 flex items-center justify-center text-amber-400 shadow-sm border border-navy-800 shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-bold font-serif tracking-tight text-navy-950 group-hover:text-navy-800 leading-tight">
                  PSS Nkwen
                </span>
                <span className="inline-flex px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold bg-amber-400 text-navy-950 rounded uppercase tracking-wider shrink-0">
                  25th Jubilee
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wide line-clamp-1">
                Presbyterian Secondary School · Bamenda
              </span>
              <span className="text-[10px] text-amber-800/90 italic hidden md:block">
                God, Peace, Knowledge · Dieu, La Paix et Le Savoir
              </span>
            </div>
          </Link>

          {/* Action CTAs & Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct WhatsApp Chat Action */}
            <a
              href={VERIFIED_SCHOOL_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
              title="Chat directly with PSS Nkwen on WhatsApp (+237 677 866 377)"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>WhatsApp Direct</span>
            </a>

            {/* Admissions Quick Button */}
            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white bg-navy-950 hover:bg-navy-900 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Admissions</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            </Link>

            {/* UNMISTAKABLE Mobile Menu Toggle Button */}
            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg text-white bg-navy-950 hover:bg-navy-900 shadow-sm transition-all min-h-[44px] cursor-pointer border border-navy-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Institutional Navigation Bar (Desktop & Tablet) */}
      <div className="bg-navy-950 border-t border-navy-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            ref={navRef}
            className="hidden lg:flex items-center justify-between gap-1 xl:gap-2 text-sm font-semibold"
            aria-label="Main Navigation"
          >
            <div className="flex items-center gap-1 xl:gap-1.5 overflow-x-auto py-1">
              {navigationConfig.map((item) => {
                if (item.children) {
                  const isOpen = activeDropdown === item.label;
                  const active = isChildActive(item.children) || item.path === location.pathname;

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md text-xs xl:text-sm whitespace-nowrap transition-colors cursor-pointer min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 ${
                          active || isOpen
                            ? 'bg-navy-900 text-amber-400 font-bold'
                            : 'text-slate-200 hover:bg-navy-900 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute left-0 top-full pt-1.5 w-76 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 py-2 divide-y divide-slate-100 text-slate-800">
                            {item.children.map((child, cIdx) => {
                              const ChildIcon = child.icon || ChevronRight;
                              const isCurrentChild = location.pathname === child.path;

                              return (
                                <Link
                                  key={cIdx}
                                  to={child.path}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                                    isCurrentChild
                                      ? 'bg-amber-50 text-navy-950 font-bold border-l-4 border-amber-500'
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-navy-900'
                                  }`}
                                >
                                  <ChildIcon
                                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                                      isCurrentChild ? 'text-amber-600' : 'text-slate-400'
                                    }`}
                                    aria-hidden="true"
                                  />
                                  <div>
                                    <span className="text-xs font-bold block">{child.label}</span>
                                    {child.description && (
                                      <span className="text-[11px] text-slate-500 block line-clamp-1 mt-0.5 font-normal">
                                        {child.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Direct Link Item
                const isJubilee = item.path === '/jubilee';
                const isAlumni = item.path === '/alumni';

                return (
                  <NavLink
                    key={item.label}
                    to={item.path!}
                    className={({ isActive }) =>
                      `whitespace-nowrap transition-all px-3 py-2.5 rounded-md text-xs xl:text-sm flex items-center gap-1.5 min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        isActive
                          ? 'bg-amber-400 text-navy-950 font-bold shadow-xs'
                          : isJubilee
                          ? 'text-amber-300 hover:bg-navy-900 hover:text-amber-200 font-bold'
                          : isAlumni
                          ? 'text-blue-200 hover:bg-navy-900 hover:text-white font-semibold'
                          : 'text-slate-200 hover:bg-navy-900 hover:text-white'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          item.badgeColor || 'bg-amber-400 text-navy-950'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Quick GCE Centre Status on right side */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-amber-300 font-medium pl-3 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>GCE Centre 11409 · Bamenda</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Horizontal Quick-Links Strip on Mobile & Tablet */}
      <div className="lg:hidden bg-navy-900 text-slate-200 px-3 py-1.5 border-t border-navy-800 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap touch-pan-x">
        <span className="text-amber-400 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mr-1 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
          <span>Quick:</span>
        </span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/jubilee"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'text-amber-300 hover:bg-navy-800'
            }`
          }
        >
          🎉 25th Jubilee
        </NavLink>
        <NavLink
          to="/alumni"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          PRENEXA Alumni
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          PCC News
        </NavLink>
        <NavLink
          to="/academics"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          Academics
        </NavLink>
        <NavLink
          to="/admissions"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          Admissions
        </NavLink>
        <NavLink
          to="/downloads"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          Downloads
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md transition-colors min-h-[38px] flex items-center ${
              isActive ? 'bg-amber-400 text-navy-950 font-bold' : 'hover:bg-navy-800 text-slate-200'
            }`
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Mobile Drawer Overlay / Dialog */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="PSS Nkwen Navigation Menu"
        >
          {/* Main Slide-in Content Panel */}
          <div className="bg-white text-slate-900 w-full sm:max-w-md ml-auto h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-250">
            {/* Drawer Header with Crest & Close Action */}
            <div className="bg-navy-950 text-white p-4 flex items-center justify-between border-b border-navy-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                    PSS Nkwen Portal
                  </span>
                  <p className="text-[11px] text-slate-300 italic line-clamp-1">
                    "God, Peace, Knowledge" · "Dieu, La Paix et Le Savoir"
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-navy-900 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-amber-400" />
              </button>
            </div>

            {/* Quick Find Search & Category Filters in Drawer */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-2 shrink-0">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  placeholder="Quick find page: Jubilee, GCE, PRENEXA, News..."
                  className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-navy-900 min-h-[40px]"
                />
                {mobileSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setMobileSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-[11px] whitespace-nowrap pt-1">
                {[
                  { id: 'all', label: 'All Pages' },
                  { id: 'core', label: 'Institutional' },
                  { id: 'academic', label: 'Academics & GCE' },
                  { id: 'community', label: 'Community & News' },
                  { id: 'resources', label: 'Downloads' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setMobileSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer min-h-[30px] ${
                      mobileSelectedCategory === cat.id
                        ? 'bg-navy-950 text-amber-400 font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Navigation Links List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1 divide-y divide-slate-100">
              {filteredNavItems.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className="text-xs text-slate-500 font-medium">
                    No matching pages found for "{mobileSearchQuery}"
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileSearchQuery('');
                      setMobileSelectedCategory('all');
                    }}
                    className="text-xs text-navy-900 font-bold underline"
                  >
                    Reset navigation filters
                  </button>
                </div>
              ) : (
                filteredNavItems.map((item) => {
                  const ItemIcon = item.icon || Building2;

                  if (item.children) {
                    const isExpanded = !!mobileExpanded[item.label] || !!mobileSearchQuery;

                    return (
                      <div key={item.label} className="pt-2 first:pt-0">
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-50 min-h-[46px] transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <span className="flex items-center gap-2.5">
                            <ItemIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />
                            <span>{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full ${
                                  item.badgeColor || 'bg-amber-400 text-navy-950'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-navy-950' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="pl-4 pr-1 pb-2 space-y-1 bg-slate-50 rounded-xl my-1 border border-slate-200/60">
                            {item.children.map((child, cIdx) => {
                              const ChildIcon = child.icon || ChevronRight;
                              const isCurrentChild = location.pathname === child.path;

                              return (
                                <NavLink
                                  key={cIdx}
                                  to={child.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={({ isActive }) =>
                                    `block px-3 py-2.5 rounded-lg text-xs transition-colors min-h-[44px] flex items-center gap-2.5 ${
                                      isActive || isCurrentChild
                                        ? 'bg-navy-950 text-white font-bold'
                                        : 'text-slate-700 hover:bg-slate-200'
                                    }`
                                  }
                                >
                                  <ChildIcon
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isCurrentChild ? 'text-amber-400' : 'text-slate-400'
                                    }`}
                                  />
                                  <div>
                                    <span className="font-semibold block">{child.label}</span>
                                    {child.description && (
                                      <span className="text-[10px] opacity-80 block font-normal line-clamp-1">
                                        {child.description}
                                      </span>
                                    )}
                                  </div>
                                </NavLink>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isJubilee = item.path === '/jubilee';
                  const isAlumni = item.path === '/alumni';

                  return (
                    <div key={item.label} className="pt-2 first:pt-0">
                      <NavLink
                        to={item.path!}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-3 rounded-lg text-sm font-bold transition-colors min-h-[46px] flex items-center justify-between ${
                            isActive
                              ? 'bg-navy-950 text-white shadow-xs'
                              : isJubilee
                              ? 'bg-amber-50 text-amber-950 hover:bg-amber-100 border border-amber-300'
                              : isAlumni
                              ? 'bg-blue-50 text-blue-950 hover:bg-blue-100 border border-blue-200'
                              : 'text-slate-900 hover:bg-slate-50'
                          }`
                        }
                      >
                        <span className="flex items-center gap-2.5">
                          <ItemIcon
                            className={`w-4 h-4 ${
                              isJubilee ? 'text-amber-600' : isAlumni ? 'text-blue-600' : 'text-slate-500'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{item.label}</span>
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              item.badgeColor || 'bg-amber-400 text-navy-950'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Instant Actions Ribbon inside Drawer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
              <a
                href={VERIFIED_SCHOOL_PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm min-h-[46px] transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chat on WhatsApp (+237 677 866 377)</span>
              </a>

              <Link
                to="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-navy-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm min-h-[44px] transition-colors"
              >
                <span>Admissions & Enrolment Desk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
