import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { wpService } from '../services/wpService';
import { GalleryImage, GalleryAlbum } from '../types';

export const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [activeAlbum, setActiveAlbum] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    Promise.all([wpService.getGallery(), wpService.getAlbums()]).then(([imgs, albms]) => {
      setImages(imgs);
      setAlbums(albms);
    });
  }, []);

  // Handle ESC key press and body scroll locking for Lightbox modal
  useEffect(() => {
    if (activeLightbox) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveLightbox(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeLightbox]);

  const filteredImages = images.filter((img) => {
    if (activeAlbum === 'all') return true;
    return img.album === activeAlbum;
  });

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'Photo Gallery' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Campus Life & Visual Archive
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A window into the educational environment, scholastic activities, and natural hillside beauty of PSS Nkwen in Bamenda.
          </p>
        </div>

        {/* Child privacy safeguard notice per prompt instructions */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p>
            <strong>Student Privacy & Public Media Policy:</strong> Photographs published on this portal are approved by school administration for official institutional representation. Personal student records, telephone numbers, and private data are never displayed.
          </p>
        </div>

        {/* Album Tabs (Segmented control) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-full overflow-x-auto">
          {albums.map((album) => (
            <button
              key={album.id}
              type="button"
              onClick={() => setActiveAlbum(album.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeAlbum === album.id
                  ? 'bg-white text-navy-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>
      </section>

      {/* Images Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setActiveLightbox(image)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLightbox(image)}
              aria-label={`View enlarged photo: ${image.title}`}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                <ImageWithFallback
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700">{image.album}</span>
                  {image.date && <span>{image.date}</span>}
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-navy-900">
                  {image.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <span>{activeLightbox.album}</span>
                {activeLightbox.date && (
                  <>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{activeLightbox.date}</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                {activeLightbox.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
