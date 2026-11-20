import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sprout, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Tractor, 
  ArrowRight,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();

  const pillars = [
    {
      title: t('pillar1Title'),
      desc: t('pillar1Desc'),
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: t('pillar2Title'),
      desc: t('pillar2Desc'),
      icon: ShieldCheck,
      color: 'bg-agri-light text-agri-primary'
    },
    {
      title: t('pillar3Title'),
      desc: t('pillar3Desc'),
      icon: Tractor,
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="agri-container space-y-12 sm:space-y-16">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="agri-badge agri-badge-green">
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'हमारे बारे में' : 'About AgriRent'}</span>
            </span>

            <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-agri-dark tracking-tight leading-tight">
              {t('aboutHeading')}
            </h1>

            <p className="text-sm sm:text-base text-agri-muted leading-relaxed">
              {t('aboutSubheading')}
            </p>
          </div>

          {/* Mission Card with Authentic Farm Visual */}
          <div className="agri-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white">
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-agri-primary">
                {t('missionTitle')}
              </span>
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-agri-dark leading-snug">
                {language === 'hi' 
                  ? 'हर भारतीय किसान के लिए आधुनिक कृषि मशीनरी को सुलभ बनाना' 
                  : 'Bridging the Mechanization Gap for Smallholder Farmers'}
              </h2>
              <p className="text-xs sm:text-sm text-agri-muted leading-relaxed">
                {t('missionDesc')}
              </p>
              <div className="pt-2 flex flex-col gap-2 text-xs text-agri-text">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri-primary shrink-0" />
                  <span>{language === 'hi' ? '80% तक पूंजी लागत की बचत' : 'Up to 80% capital expenditure savings for marginal farmers'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri-primary shrink-0" />
                  <span>{language === 'hi' ? 'स्थानीय मशीनरी मालिकों के लिए अतिरिक्त मौसमी आय' : 'Predictable seasonal income for equipment owners'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri-primary shrink-0" />
                  <span>{language === 'hi' ? 'बुवाई व कटाई में समय की बचत से अधिक फसल उपज' : 'Timely sowing & harvesting to reduce crop weather risk'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 h-64 lg:h-auto min-h-[300px] relative">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"
                alt="Indian farmland harvest"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div>
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <h3 className="font-poppins font-bold text-xl sm:text-2xl text-agri-dark">
                {language === 'hi' ? 'हमारे मार्गदर्शक सिद्धांत' : 'Our Guiding Principles'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="agri-card p-6 bg-white space-y-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-poppins font-bold text-base text-agri-text">
                      {p.title}
                    </h4>
                    <p className="text-xs text-agri-muted leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center pt-4">
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <span>{t('btnFindEquipment')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
