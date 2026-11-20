import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  const quickLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navBrowse'), path: '/equipment' },
    { name: t('navFarmingGuide'), path: '/farming-guide' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navContact'), path: '/contact' },
  ];

  const categories = [
    { name: language === 'hi' ? 'ट्रैक्टर रेंटल' : 'Tractor Rentals', path: '/equipment?category=Tractor' },
    { name: language === 'hi' ? 'हार्वेस्टर सेवाएं' : 'Harvester Services', path: '/equipment?category=Harvester' },
    { name: language === 'hi' ? 'रोटावेटर एवं टिलर' : 'Rotavator & Tillers', path: '/equipment?category=Rotavator' },
    { name: language === 'hi' ? 'कल्टीवेटर' : 'Cultivator', path: '/equipment?category=Cultivator' },
    { name: language === 'hi' ? 'सीड ड्रिल एवं प्लांटर' : 'Seed Drill & Planters', path: '/equipment?category=Seed Drill' },
    { name: language === 'hi' ? 'बूम स्प्रेयर' : 'Boom Sprayers', path: '/equipment?category=Sprayer' },
  ];

  return (
    <footer className="bg-agri-dark text-white pt-14 pb-10 border-t border-agri-primary/30 mt-auto">
      <div className="agri-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-agri-primary flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <span className="font-poppins font-bold text-2xl tracking-tight text-white">
                Agri<span className="text-agri-accent">Rent</span>
              </span>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              {language === 'hi'
                ? 'भारतीय किसानों के लिए आधुनिक एवं किफायती कृषि मशीनरी रेंटल प्लेटफॉर्म। किराए पर मशीनें लें, लागत घटाएं और पैदावार बढ़ाएं।'
                : 'India’s trusted farm equipment rental network. Connecting farmers with verified local machinery owners for affordable, on-demand mechanization.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-agri-accent font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'hi' ? 'सत्यापित उपकरण • सुरक्षित प्रक्रिया' : 'Verified Machinery • Direct Farmer Support'}
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-sm text-white uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित लिंक' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-sm text-white uppercase tracking-wider">
              {language === 'hi' ? 'उपकरण श्रेणियां' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    className="text-gray-300 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-poppins font-semibold text-sm text-white uppercase tracking-wider">
              {language === 'hi' ? 'सहायता एवं संपर्क' : 'Farmer Support'}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-agri-accent shrink-0 mt-0.5" />
                <span>Indore, Dewas & Ujjain Farming Hub, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-agri-accent shrink-0" />
                <span>+91 1800-AGRI-RENT (Toll-Free 9AM-7PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-agri-accent shrink-0" />
                <span>support@agrirent.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AgriRent. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Built for Indian Agriculture</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
