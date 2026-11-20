import React, { useState } from 'react';
import { Search, CalendarCheck, PhoneCall, Tractor, PlusCircle, Bell, CheckCircle2, IndianRupee, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('farmer'); // 'farmer' or 'owner'

  const farmerSteps = [
    {
      number: '01',
      title: t('farmerStep1Title'),
      description: t('farmerStep1Desc'),
      icon: Search,
    },
    {
      number: '02',
      title: t('farmerStep2Title'),
      description: t('farmerStep2Desc'),
      icon: CalendarCheck,
    },
    {
      number: '03',
      title: t('farmerStep3Title'),
      description: t('farmerStep3Desc'),
      icon: PhoneCall,
    },
    {
      number: '04',
      title: t('farmerStep4Title'),
      description: t('farmerStep4Desc'),
      icon: Tractor,
    },
  ];

  const ownerSteps = [
    {
      number: '01',
      title: t('ownerStep1Title'),
      description: t('ownerStep1Desc'),
      icon: PlusCircle,
    },
    {
      number: '02',
      title: t('ownerStep2Title'),
      description: t('ownerStep2Desc'),
      icon: Bell,
    },
    {
      number: '03',
      title: t('ownerStep3Title'),
      description: t('ownerStep3Desc'),
      icon: CheckCircle2,
    },
    {
      number: '04',
      title: t('ownerStep4Title'),
      description: t('ownerStep4Desc'),
      icon: IndianRupee,
    },
  ];

  const activeSteps = activeTab === 'farmer' ? farmerSteps : ownerSteps;

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white border-t border-agri-border">
      <div className="agri-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="agri-badge agri-badge-green mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('howBadge')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-agri-text">
            {t('howHeading')}
          </h2>
          <p className="text-sm sm:text-base text-agri-muted mt-2">
            {t('howSubheading')}
          </p>

          {/* Role Toggle Switch */}
          <div className="inline-flex p-1 bg-agri-bg rounded-2xl border border-agri-border mt-6">
            <button
              onClick={() => setActiveTab('farmer')}
              type="button"
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'farmer'
                  ? 'bg-agri-primary text-white shadow-sm'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              {t('tabForFarmers')}
            </button>
            <button
              onClick={() => setActiveTab('owner')}
              type="button"
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'owner'
                  ? 'bg-agri-primary text-white shadow-sm'
                  : 'text-agri-text hover:text-agri-primary'
              }`}
            >
              {t('tabForOwners')}
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {activeSteps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="agri-card p-6 text-center flex flex-col items-center group hover:-translate-y-1 transition-all duration-200"
              >
                {/* Step Icon Badge */}
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-agri-light text-agri-primary flex items-center justify-center group-hover:bg-agri-primary group-hover:text-white transition-all duration-200">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-agri-dark text-white text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                    {step.number}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-poppins font-semibold text-base text-agri-text mb-2 group-hover:text-agri-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-agri-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
