import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Tag,
  CheckCircle2,
  MapPin,
  Sparkles,
  Search,
  VolumeX,
  Volume2,
  Play,
  Pause,
  Tractor
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { location, categories } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoRef = useRef(null);

  const VIDEO_URL = '/herobnr.mp4';

  const POSTER_IMAGE =
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=85';

  const categoryOptions = [
    { id: 'All', nameEn: 'All Categories', nameHi: 'सभी श्रेणियां' },
    ...categories.map(cat => ({
      id: cat.name,
      nameEn: cat.name,
      nameHi: cat.name
    }))
  ];

  const LOCATIONS = [
    'All Locations',
    'Indore, MP',
    'Dewas, MP',
    'Ujjain, MP',
    'Ratlam, MP',
    'Mandsaur, MP',
    'Bhopal, MP'
  ];

  // Reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Search functionality
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim());
    }

    if (selectedCategory && selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }

    if (selectedLocation && selectedLocation !== 'All Locations') {
      params.append('location', selectedLocation);
    }

    navigate(`/equipment?${params.toString()}`);
  };

  // Play and Pause video
  // const toggleVideoPlay = async () => {
  //   if (!videoRef.current) return;

  //   if (videoRef.current.paused) {
  //     try {
  //       await videoRef.current.play();
  //       setVideoPlaying(true);
  //     } catch (error) {
  //       console.error('Video play failed:', error);
  //       setVideoPlaying(false);
  //     }
  //   } else {
  //     videoRef.current.pause();
  //     setVideoPlaying(false);
  //   }
  // };

  // Mute and Unmute video
  // const toggleMute = () => {
  //   const nextMuted = !isMuted;

  //   setIsMuted(nextMuted);

  //   if (videoRef.current) {
  //     videoRef.current.muted = nextMuted;
  //   }
  // };

  return (
   <section className="relative w-full min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] overflow-hidden bg-green-950">
      {/* FULL WIDTH BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full">

        {!prefersReducedMotion && !videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster={POSTER_IMAGE}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onError={(e) => {
              console.error(
                'Video loading error:',
                e.currentTarget.error
              );
              setVideoError(true);
            }}
           className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={POSTER_IMAGE}
            alt="Agricultural tractor working in a field"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* DARK OVERLAY */}
       <div className="absolute inset-0 bg-green-950/20" />

<div className="absolute inset-0 bg-gradient-to-r from-green-950/65 via-green-900/35 to-green-800/10" />

<div className="absolute inset-0 bg-gradient-to-t from-green-950/45 via-transparent to-green-900/10" />
      </div>

      {/* VIDEO CONTROLS */}
      {!videoError && !prefersReducedMotion && (
        <div className="absolute top-5 right-5 z-30 flex gap-2">

          {/* <button
            type="button"
            onClick={toggleVideoPlay}
            aria-label={videoPlaying ? 'Pause video' : 'Play video'}
            className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 border border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            {videoPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button> */}

          {/* <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 border border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button> */}

        </div>
      )}

      {/* HERO CONTENT */}
     <div className="relative z-10 w-full flex items-center">

  <div className="agri-container w-full py-8 sm:py-10 lg:py-12">
          <div className="max-w-5xl mx-auto text-center space-y-3">

            {/* HERO BADGE
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-md">
              
              <span>{t('heroBadge')}</span>
            </div> */}

            {/* MAIN HEADING */}
           <h1
  className={`font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight ${
    language === 'hi'
      ? 'leading-[1.5] sm:leading-[1.4]'
      : 'leading-[1.15]'
  }`}
>

              {t('heroHeadline1')} &nbsp;
              <span className="text-yellow-300">
                 {t('heroHeadline2')}
              </span>

              <br />

              <span className="text-white">
                {t('heroHeadline3')}
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtext')}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">

              <Link
                to="/equipment"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-sm sm:text-base shadow-xl transition-all duration-200 hover:-translate-y-1 text-center"
              >
                {t('btnFindEquipment')}
              </Link>

              <Link
                to="/add-equipment"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/50 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 text-center"
              >
                {t('btnListEquipment')}
              </Link>

            </div>

            {/* SEARCH BAR */}
            <div className="pt-5 sm:pt-6 w-full max-w-5xl mx-auto">

              <form
                onSubmit={handleSearchSubmit}
                className="w-full p-3 rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row items-stretch gap-2"
              >

                {/* KEYWORD SEARCH */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-agri-primary">

                  <Search className="w-5 h-5 text-agri-primary shrink-0" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchKeywordPlaceholder')}
                    className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />

                </div>

                {/* CATEGORY */}
                <div className="md:w-52 flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">

                  <Tractor className="w-5 h-5 text-agri-primary shrink-0" />

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {categoryOptions.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {language === 'hi'
                          ? category.nameHi
                          : category.nameEn}
                      </option>
                    ))}
                  </select>

                </div>

                {/* LOCATION */}
                <div className="md:w-48 flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">

                  <MapPin className="w-5 h-5 text-agri-primary shrink-0" />

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>

                </div>

                {/* SEARCH BUTTON */}
                <button
                  type="submit"
                  className="md:w-auto px-8 py-3.5 bg-agri-primary hover:bg-agri-primaryHover text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>{t('searchBtn')}</span>
                </button>

              </form>

            </div>

            {/* TRUST INDICATORS
            <div className="pt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-9 text-white/90 text-xs sm:text-sm font-medium">

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-300" />
                <span>{t('trustVerified')}</span>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-yellow-300" />
                <span>{t('trustPricing')}</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>{t('trustBooking')}</span>
              </div>

            </div> */}

          </div>

        </div>

      </div>

    </section>
  );
}