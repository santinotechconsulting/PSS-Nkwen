import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Check } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { wpService } from '../services/wpService';
import { NewsArticle } from '../types';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      setLoading(true);
      const found = await wpService.getNewsBySlug(slug);
      if (found) {
        setArticle(found);
        const allNews = await wpService.getNews();
        setRelated(allNews.filter((n) => n.slug !== slug).slice(0, 2));
      }
      setLoading(false);
    }
    loadArticle();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-slate-400">
        Loading article details...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-slate-900">Article Not Found</h1>
        <p className="text-xs text-slate-600">The requested article could not be located in the current publication archive.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-navy-900 rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to News Archive</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs
        items={[
          { label: 'PCC & National News', path: '/news' },
          { label: article.title },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Editorial Header */}
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-navy-900">{article.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{article.date}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-900 transition-colors cursor-pointer"
              title="Copy link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="text-xs text-slate-500">
            Published by <span className="font-semibold text-slate-700">{article.author}</span>
          </div>
        </div>

        {/* Hero Featured Media */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-[320px] sm:h-[420px] object-cover"
          />
        </div>

        {/* Body Prose with Editorial styling */}
        <div className="prose prose-slate max-w-prose mx-auto text-sm sm:text-base text-slate-800 leading-relaxed space-y-5">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-navy-900' : ''}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-navy-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Dispatches</span>
          </Link>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-10 space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Related Announcements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2 block group"
                >
                  <span className="text-[11px] font-semibold text-amber-700 block">{item.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-navy-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
