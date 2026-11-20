import React from 'react';
import { IndianRupee, ShieldCheck, Wrench, Sparkles, TrendingUp, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Benefits() {
  const { language, t } = useLanguage();

  const economicBenefits = [
    {
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
      icon: IndianRupee,
      tag: language === 'hi' ? 'पूंजी सुरक्षा' : 'Capital Efficiency'
    },
    {
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
      icon: TrendingUp,
      tag: language === 'hi' ? 'शून्य ब्याज' : 'Zero Idle Overhead'
    },
    {
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
      icon: Sparkles,
      tag: language === 'hi' ? 'आधुनिक यंत्र' : 'Advanced Tech'
    },
    {
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
      icon: ShieldCheck,
      tag: language === 'hi' ? 'सीधा संपर्क' : 'Zero Middlemen'
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-agri-bg border-t border-agri-border">
      <div className="agri-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="agri-badge agri-badge-amber mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('whyBadge')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-agri-text">
            {t('whyHeading')}
          </h2>
          <p className="text-sm sm:text-base text-agri-muted mt-2">
            {t('whySubheading')}
          </p>
        </div>

        {/* 4 Core Agricultural Economics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {economicBenefits.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="agri-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center group-hover:bg-agri-primary group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-agri-accent bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-poppins font-semibold text-base text-agri-text mb-2 group-hover:text-agri-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-agri-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factual Economic Comparison: Buying vs Renting on AgriRent */}
        <div className="agri-card p-6 sm:p-8 bg-white border border-agri-border">
          <h3 className="text-lg sm:text-xl font-bold font-poppins text-agri-text mb-4 text-center">
            {language === 'hi' ? 'वित्तीय तुलना: मशीनरी खरीदना बनाम एग्रीरेंट पर किराए पर लेना' : 'Financial Comparison: Purchasing Machinery vs. AgriRent On-Demand'}
          </h3>
          <p className="text-xs sm:text-sm text-agri-muted text-center max-w-2xl mx-auto mb-6">
            {language === 'hi' 
              ? 'औसतन 3–15 एकड़ के किसान के लिए बुवाई और कटाई के 12–20 दिनों की वास्तविक आर्थिक तुलना।'
              : 'Typical seasonal economics for a 3–15 acre Indian farm holding needing 12–20 operational machinery days per season.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-agri-border bg-agri-bg">
                  <th className="py-3 px-4 font-semibold text-agri-text">
                    {language === 'hi' ? 'लागत कारक' : 'Cost Factor'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-red-700">
                    {language === 'hi' ? 'मशीनरी खरीदना (स्वयं का स्वामित्व)' : 'Purchasing Heavy Machinery'}
                  </th>
                  <th className="py-3 px-4 font-semibold text-agri-primary">
                    {language === 'hi' ? 'एग्रीरेंट मॉडल (किराया)' : 'AgriRent On-Demand Rental'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-agri-borderLight text-agri-text">
                <tr>
                  <td className="py-3 px-4 font-medium">{language === 'hi' ? 'शुरुआती पूंजी (Upfront Capital)' : 'Upfront Capital Investment'}</td>
                  <td className="py-3 px-4 text-red-600">₹8,00,000 – ₹12,00,000 (लोन / ऋण)</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">{language === 'hi' ? 'शून्य (केवल दैनिक किराया)' : 'Zero (Pay only per working day)'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">{language === 'hi' ? 'सालाना बैंक ब्याज व EMI' : 'Annual Loan Interest & EMI'}</td>
                  <td className="py-3 px-4 text-red-600">₹1,20,000 – ₹1,80,000 / वर्ष</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">{language === 'hi' ? 'शून्य' : 'None'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">{language === 'hi' ? 'रखरखाव, मोबिल ऑयल व घिसावट' : 'Off-Season Maintenance & Depreciation'}</td>
                  <td className="py-3 px-4 text-red-600">₹25,000 – ₹50,000 / वर्ष (मालिक की जिम्मेदारी)</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">{language === 'hi' ? 'मालिक द्वारा वहन (किसान पर शून्य बोझ)' : 'Covered by Equipment Owner'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">{language === 'hi' ? 'उन्नत यंत्रों की उपलब्धता' : 'Access to Specialized Attachments'}</td>
                  <td className="py-3 px-4 text-red-600">{language === 'hi' ? 'सीमित (हर उपकरण खरीदना संभव नहीं)' : 'Limited (Expensive to buy multiple implements)'}</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">{language === 'hi' ? 'असीमित (रोटावेटर, सीड ड्रिल, MB प्लाउ जब चाहें)' : 'Flexible (Rent rotavator, seeder, laser leveler as needed)'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
