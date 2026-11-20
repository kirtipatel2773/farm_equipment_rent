import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PlusCircle, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CTASection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-agri-bg border-t border-agri-border">
      <div className="agri-container">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-agri-dark via-agri-primary to-agri-dark text-white p-8 sm:p-12 lg:p-14 shadow-card">
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-emerald-100 border border-white/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-agri-accent" />
              <span>{t('ctaBadge')}</span>
            </span>

            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
              {t('ctaHeading')}
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto leading-relaxed">
              {t('ctaSubtext')}
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/equipment"
                className="px-6 py-3.5 rounded-xl bg-white text-agri-dark hover:bg-emerald-50 font-semibold text-sm shadow-sm transition-all duration-150 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-agri-primary" />
                <span>{t('btnFindEquipment')}</span>
              </Link>
              <Link
                to="/add-equipment"
                className="px-6 py-3.5 rounded-xl bg-agri-accent hover:bg-amber-600 text-white font-semibold text-sm shadow-sm transition-all duration-150 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('btnListEquipment')}</span>
              </Link>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-emerald-100/90 font-medium">
              <span>✓ {language === 'hi' ? 'सीधी मालिक दरें' : 'Direct Owner Rates'}</span>
              <span>✓ {language === 'hi' ? 'जांची-परखी मशीनें' : 'Mechanically Inspected'}</span>
              <span>✓ {language === 'hi' ? 'शून्य दलाली शुल्क' : 'Zero Brokerage Fee'}</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
