import React, { useState, useEffect } from 'react';
import { DocumentRenderer } from '@keystatic/core/renderer';

interface TextImageRowProps {
  title: string;
  body: string;
  image: string | null;
  align: 'left' | 'right';
}

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  accent: 'orange' | 'blue';
}

interface FeatureColumn {
  title: string;
  description: string;
  icon: 'cap' | 'check' | 'star' | 'phone' | 'currency' | 'support' | 'computer';
}

interface FeaturesGridProps {
  sectionTitle?: string;
  columns: FeatureColumn[];
}

interface ImageBannerProps {
  title: string;
  subtitle?: string | null;
  image?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  overlayOpacity?: 'none' | 'opacity-20' | 'opacity-40' | 'opacity-60' | 'opacity-80';
  align?: 'center' | 'left' | 'right';
}

interface Slide {
  title: string;
  subtitle?: string | null;
  image?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}

interface ImageCarouselProps {
  title?: string | null;
  slides: Slide[];
}

interface GalleryImage {
  image?: string | null;
  caption: string;
}

interface ImageGalleryProps {
  sectionTitle?: string | null;
  columns?: '2' | '3' | '4';
  images: GalleryImage[];
}

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  title?: string | null;
  items: AccordionItem[];
}

// Subcomponente: Fila Texto e Imagen
const TextImageRowBlock: React.FC<TextImageRowProps> = ({ title, body, image, align }) => {
  return (
    <div className="py-20 border-b border-slate-100 bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${align === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:col-span-7 ${align === 'left' ? 'lg:order-last' : 'lg:order-first'} text-center lg:text-left`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-[1.1] mb-6">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 whitespace-pre-line">
              {body}
            </p>
          </div>
          <div className={`lg:col-span-5 ${align === 'left' ? 'lg:order-first' : 'lg:order-last'} flex justify-center`}>
            {image ? (
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 group">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" 
                />
              </div>
            ) : (
              <div className="w-full max-w-md aspect-[4/3] bg-slate-100 rounded-3xl flex items-center justify-center border border-dashed border-slate-300">
                <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Banner CTA
const CtaBannerBlock: React.FC<CtaBannerProps> = ({ title, subtitle, buttonText, buttonLink, accent }) => {
  const isOrange = accent === 'orange';
  const containerBg = isOrange 
    ? 'bg-gradient-to-br from-accent-orange to-red-600' 
    : 'bg-gradient-to-br from-accent-blue to-indigo-700';
  const glowClass = isOrange ? 'glow-orange shadow-accent-orange/20' : 'glow-blue shadow-accent-blue/20';

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${containerBg} ${glowClass} rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl`}>
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 filter blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-black/10 filter blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-[1.1] mb-3">{title}</h3>
              <p className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed">{subtitle}</p>
            </div>
            <div className="shrink-0">
              <a href={buttonLink} className={`px-8 py-4 bg-white hover:bg-slate-50 ${isOrange ? 'text-accent-orange' : 'text-accent-blue'} font-extrabold text-base rounded-xl transition-all duration-300 shadow-md flex items-center gap-3 transform hover:scale-105 active:scale-95`}>
                <span>{buttonText}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Grid de Características
const FeaturesGridBlock: React.FC<FeaturesGridProps> = ({ sectionTitle, columns = [] }) => {
  return (
    <div className="py-24 bg-slate-50 border-b border-slate-200/50 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-orange/5 filter blur-[95px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 filter blur-[95px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sectionTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-3">{sectionTitle}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {columns.map((col, index) => (
            <div key={index} className="bg-white border border-slate-200/60 shadow-lg hover:shadow-xl shadow-slate-200/50 rounded-[28px] p-8 flex flex-col items-start relative group hover:border-accent-blue/30 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-accent-blue/8 border border-accent-blue/15 flex items-center justify-center text-accent-blue mb-6 shadow-sm group-hover:bg-accent-orange/10 group-hover:border-accent-orange/15 group-hover:text-accent-orange transition-colors duration-300">
                {col.icon === 'cap' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6L3.9 9M12 14l7.6-4.2M6 18.8V19a2 2 0 002 2h8a2 2 0 002-2v-.2" />
                  </svg>
                )}
                {col.icon === 'check' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {col.icon === 'star' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.52 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.838-.197-1.539-1.118l1.52-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.906a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )}
                {col.icon === 'phone' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                {col.icon === 'currency' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1" />
                  </svg>
                )}
                {col.icon === 'support' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {col.icon === 'computer' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{col.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed whitespace-pre-line">{col.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Banner de Imagen Premium de Fondo (imageBanner)
const ImageBannerBlock: React.FC<ImageBannerProps> = ({ title, subtitle, image, ctaText, ctaLink, overlayOpacity = 'opacity-40', align = 'center' }) => {
  const alignClasses = {
    center: 'items-center text-center justify-center mx-auto',
    left: 'items-start text-left justify-start lg:max-w-3xl',
    right: 'items-end text-right justify-end ml-auto lg:max-w-3xl'
  };

  const overlayOpacityClasses = {
    none: 'bg-black/0',
    'opacity-20': 'bg-black/20',
    'opacity-40': 'bg-black/40',
    'opacity-60': 'bg-black/60',
    'opacity-80': 'bg-black/80'
  };

  return (
    <div className="relative min-h-[500px] flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 select-none">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-850"></div>
        )}
        <div className={`absolute inset-0 z-10 ${overlayOpacityClasses[overlayOpacity]}`}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className={`flex flex-col ${alignClasses[align]} text-white`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-[1.1] mb-6 drop-shadow-md">{title}</h2>
          {subtitle && <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed mb-8 max-w-2xl drop-shadow-sm whitespace-pre-line">{subtitle}</p>}
          {ctaText && ctaLink && (
            <div className="flex">
              <a href={ctaLink} className="px-8 py-4 bg-accent-orange hover:bg-accent-orange-hover text-white font-extrabold text-base rounded-xl btn-premium glow-orange flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 duration-300">
                <span>{ctaText}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Carrusel de Imagen Interactivo (React client state)
const ImageCarouselBlock: React.FC<ImageCarouselProps> = ({ title, slides = [] }) => {
  if (slides.length === 0) return null;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="py-16 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {title && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-display text-slate-900">{title}</h2>
          </div>
        )}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-950 group">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-700 ease-in-out ${index === activeIndex ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}
              >
                <div className="absolute inset-0 z-0 select-none">
                  {slide.image ? (
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
                </div>
                <div className="relative z-20 w-full max-w-4xl px-8 sm:px-16 text-center text-white flex flex-col items-center">
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-[1.1] mb-4">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium max-w-2xl mb-6">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <a href={slide.ctaLink} className="px-6 py-3 bg-accent-orange hover:bg-accent-orange-hover text-white font-extrabold text-sm rounded-xl btn-premium glow-orange flex items-center justify-center gap-2 transform active:scale-95 duration-300">
                      <span>{slide.ctaText}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button 
                type="button" 
                onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
              >
                <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                type="button" 
                onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              >
                <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                {slides.map((_, index) => (
                  <button 
                    key={index}
                    type="button" 
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/40 ${index === activeIndex ? 'bg-accent-orange border-accent-orange w-6' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Galería de Imágenes
const ImageGalleryBlock: React.FC<ImageGalleryProps> = ({ sectionTitle, columns = '3', images = [] }) => {
  const columnClasses = {
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="py-20 bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold font-display text-slate-900">{sectionTitle}</h2>
          </div>
        )}
        <div className={`grid gap-6 ${columnClasses[columns]}`}>
          {images.map((img, index) => (
            <div key={index} className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200/60 shadow-md group bg-slate-900">
              {img.image ? (
                <img 
                  src={img.image} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 pointer-events-none">
                <span className="text-white text-sm sm:text-base font-bold drop-shadow-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Subcomponente: Acordeón FAQs
const AccordionBlock: React.FC<AccordionProps> = ({ title = "Preguntas Frecuentes", items = [] }) => {
  return (
    <div className="py-20 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">{title}</h2>
          </div>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <details key={index} className="group bg-white border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:shadow-md hover:border-slate-350 open:border-accent-blue/30">
              <summary className="flex items-center justify-between p-6 cursor-pointer select-none text-left list-none outline-none group-open:bg-slate-50/50 transition-colors duration-300">
                <span className="text-base sm:text-lg font-bold text-slate-800 group-open:text-accent-blue transition-colors duration-300">
                  {item.question}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-open:bg-accent-blue/8 group-open:text-accent-blue transition-all duration-300">
                  <svg className="w-4 h-4 transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="border-t border-slate-150 p-6 text-slate-650 bg-white leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Principal de Renderizado
export const KeystaticRenderer: React.FC<{ document: any }> = ({ document }) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-extrabold prose-a:text-accent-blue hover:prose-a:text-accent-blue-hover">
      <DocumentRenderer
        document={document}
        componentBlocks={{
          textImageRow: (props) => <TextImageRowBlock {...props} />,
          ctaBanner: (props) => <CtaBannerBlock {...props} />,
          featuresGrid: (props) => <FeaturesGridBlock {...props} />,
          imageBanner: (props) => <ImageBannerBlock {...props} />,
          imageCarousel: (props) => <ImageCarouselBlock {...props} />,
          imageGallery: (props) => <ImageGalleryBlock {...props} />,
          accordionSection: (props) => <AccordionBlock {...props} />
        }}
      />
    </div>
  );
};
