import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Calendar, User } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { wpService } from '../services/wpService';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wpService.getNews().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'PCC & National News', 'Academic News', 'Silver Jubilee', 'Student Activities'];

  const filteredArticles = articles.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'PCC & National News' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Official Dispatches & Church Reports
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Presbyterian Church & School News
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Authentic countrywide reports on the Presbyterian Church in Cameroon (PCC), Presbyterian Education Authority (PEA) milestones, and PSS Nkwen announcements.
          </p>
        </div>

        {/* Filter bar and search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-b border-slate-200 pb-4">
          {/* Functional segmented category buttons with horizontal touch scrolling */}
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

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="w-full pl-9 pr-3 py-2 text-base sm:text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900 focus:outline-hidden bg-white min-h-[40px]"
            />
          </div>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-xs text-slate-400">Loading published dispatches...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 p-8 space-y-2">
            <p className="text-sm font-semibold text-slate-700">No matching announcements found.</p>
            <p className="text-xs text-slate-500">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-navy-900 font-semibold underline pt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    {/* Unboxed metadata per zero-pill discipline */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-navy-900">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={article.date}>{article.date}</time>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-slate-900 group-hover:text-navy-900 leading-snug">
                      <Link to={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{article.author}</span>
                  <Link
                    to={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-navy-900 hover:text-amber-700"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
