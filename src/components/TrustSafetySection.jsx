import React from 'react';
import { ShieldCheck, ClipboardCheck, PhoneCall, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustSafetySection() {
  const { language } = useLanguage();

  const trustPillars = [
    {
      title: language === 'hi' ? 'स्वामित्व एवं आरसी सत्यापन' : 'Ownership & Registration Verification',
      desc: language === 'hi' 
        ? 'उपकरण सूचीकरण से पूर्व वाहन पंजीकरण (RC), फिटनेस और वास्तविक मालिक के विवरण का सत्यापन।'
        : 'Cross-verification of tractor and machinery RC documents to ensure authentic owner listings.',
      icon: ShieldCheck
    },
    {
      title: language === 'hi' ? 'खेत पर भौतिक निरीक्षण' : 'On-Farm Handover Checklist',
      desc: language === 'hi'
        ? 'डिलीवरी के समय पीटीओ शाफ्ट, हाइड्रोलिक लिफ्ट और इंजन की स्थिति की मौके पर जांच।'
        : 'Visual inspection of PTO connections, hydraulics, and tire/blade condition before field work commences.',
      icon: ClipboardCheck
    },
    {
      title: language === 'hi' ? 'पारदर्शी दैनिक किराया' : 'Transparent Daily Rates',
      desc: language === 'hi'
        ? 'बिना किसी गुप्त दलाली के तय दैनिक किराया दरें। किसान और मालिक के बीच पूर्ण स्पष्टता।'
        : 'Pre-agreed rental tariffs with no surprise broker markups or hidden fees.',
      icon: FileText
    },
    {
      title: language === 'hi' ? 'सीधा संपर्क एवं समन्वय' : 'Direct Farmer Coordination',
      desc: language === 'hi'
        ? 'मशीन आगमन का समय, ऑपरेटर की आवश्यकता और डिलीवरी के लिए सीधे मालिक से बातचीत।'
        : 'Direct telephone and WhatsApp communication with machine owners for field readiness.',
      icon: PhoneCall
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-agri-border">
      <div className="agri-container">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="agri-badge agri-badge-green mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'विश्वसनीयता एवं सुरक्षा' : 'Trust & Operational Safety'}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-agri-text">
            {language === 'hi' ? 'सुरक्षित एवं पारदर्शी कृषि रेंटल' : 'Built on Ground Reality and Transparency'}
          </h2>
          <p className="text-xs sm:text-sm text-agri-muted mt-2">
            {language === 'hi'
              ? 'भारतीय कृषि की परिस्थितियों के अनुरूप बनाई गई पारदर्शी व्यवस्था, जिसमें किसान और मालिक दोनों सुरक्षित रहें।'
              : 'Practical safeguards designed for Indian farming conditions to protect both renters and equipment owners.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="p-5 rounded-2xl bg-agri-bg border border-agri-border hover:border-agri-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center mb-3.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-semibold text-sm text-agri-text mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-agri-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
