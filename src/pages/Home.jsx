import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import FarmingGuideSection from '../components/FarmingGuideSection';
import TrustSafetySection from '../components/TrustSafetySection';
import CTASection from '../components/CTASection';
import EquipmentCard from '../components/EquipmentCard';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, Tractor } from 'lucide-react';

export default function Home() {
  const { equipmentList, loading } = useApp();
  const { t, language } = useLanguage();

  // Load featured available machinery items directly from MongoDB
  const featuredEquipment = equipmentList.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      {/* 1. Clean, attractive navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section with multi-filter search, media player, and dual actions */}
        <Hero />

        {/* 3. Popular Equipment Categories from MongoDB */}
        <CategorySection />

        {/* 4. Featured & Recently Listed Equipment (Dynamically Loaded from MongoDB) */}
        <section className="py-12 sm:py-16 bg-white border-t border-agri-border">
          <div className="agri-container">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="agri-badge agri-badge-green mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-agri-accent" />
                  <span>{t('featuredBadge')}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-agri-text">
                  {t('featuredHeading')}
                </h2>
                <p className="text-sm sm:text-base text-agri-muted mt-1.5 max-w-xl">
                  {t('featuredSubheading')}
                </p>
              </div>

              <Link
                to="/equipment"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-agri-primary hover:text-agri-primaryHover transition-colors group self-start md:self-auto"
              >
                <span>{t('btnBrowseAll')}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Featured Grid (Responsive 1 to 3 columns) */}
            {loading && featuredEquipment.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(n => (
                  <div key={n} className="agri-card p-6 h-72 animate-pulse bg-gray-100" />
                ))}
              </div>
            ) : featuredEquipment.length === 0 ? (
              <div className="text-center py-12 agri-card p-8 bg-agri-bg border border-agri-border">
                <Tractor className="w-12 h-12 text-agri-muted mx-auto mb-3 opacity-40" />
                <h3 className="font-semibold text-base text-agri-dark mb-1">
                  {language === 'hi' ? 'कोई उपकरण उपलब्ध नहीं है' : 'No equipment available'}
                </h3>
                <p className="text-xs text-agri-muted max-w-md mx-auto">
                  {language === 'hi' 
                    ? 'वर्तमान में डेटाबेस में कोई उपकरण सूचीबद्ध नहीं है। उपकरण मालिक अपना उपकरण सूचीबद्ध कर सकते हैं।' 
                    : 'Currently no machinery records exist in the database. Equipment owners can add listings using the Add Equipment form.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEquipment.map((item) => (
                  <EquipmentCard key={item.id} equipment={item} />
                ))}
              </div>
            )}

            {/* Full Catalog Button */}
            {featuredEquipment.length > 0 && (
              <div className="mt-10 sm:mt-12 text-center">
                <Link
                  to="/equipment"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-agri-light hover:bg-agri-lightHover text-agri-dark font-semibold text-sm border border-agri-primary/20 transition-all shadow-subtle"
                >
                  <Tractor className="w-4 h-4 text-agri-primary" />
                  <span>{t('btnExploreFullCatalog')}</span>
                  <ArrowRight className="w-4 h-4 text-agri-primary" />
                </Link>
              </div>
            )}

          </div>
        </section>

        {/* 5. A Clear "How It Works" Section for Farmers and Owners */}
        <HowItWorks />

        {/* 6. Benefits of Renting Instead of Purchasing Machinery (Agricultural Economics) */}
        {/* <Benefits /> */}

        {/* 7. Farming Guide Preview from MongoDB */}
        <FarmingGuideSection />

        {/* 8. Trust and Safety Information Without Fabricated Claims */}
        <TrustSafetySection />

        {/* 9. Clear Final Call to Action */}
        <CTASection />
      </main>

      {/* 10. Compact, organized footer with contact and navigation links */}
      <Footer />
    </div>
  );
}
