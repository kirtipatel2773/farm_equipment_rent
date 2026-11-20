import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { useApp } from '../context/AppContext';
import { ArrowRight, Tractor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CategorySection() {
  const { categories, loading } = useApp();
  const { t, language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-agri-bg">
      <div className="agri-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="agri-badge agri-badge-green mb-2.5">
              <Tractor className="w-3.5 h-3.5" />
              <span>{t('catBadge')}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-agri-text">
              {t('catHeading')}
            </h2>
            <p className="text-sm sm:text-base text-agri-muted mt-1.5 max-w-xl">
              {t('catSubheading')}
            </p>
          </div>

          <Link
            to="/equipment"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-agri-primary hover:text-agri-primaryHover transition-colors group self-start md:self-auto"
          >
            <span>{t('viewAllCategories')}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Loaded dynamically from MongoDB) */}
        {loading && categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="agri-card p-6 h-40 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 agri-card p-8 bg-white border border-agri-border">
            <Tractor className="w-12 h-12 text-agri-muted mx-auto mb-3 opacity-40" />
            <p className="text-sm text-agri-muted">
              {language === 'hi' ? 'कोई श्रेणी उपलब्ध नहीं है।' : 'No equipment categories available in database.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.id || category._id} category={category} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
