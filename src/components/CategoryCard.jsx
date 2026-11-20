import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tractor, Wheat, Cog, Shovel, Sprout, Droplets, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  Tractor: Tractor,
  Wheat: Wheat,
  Cog: Cog,
  Shovel: Shovel,
  Sprout: Sprout,
  Droplets: Droplets,
  Wrench: Wrench,
  tractor: Tractor,
  harvester: Wheat,
  rotavator: Cog,
  cultivator: Shovel,
  'seed-drill': Sprout,
  sprayer: Droplets,
  plough: Wrench
};

const CATEGORY_NAME_MAP = {
  'Tractor': { en: 'Tractors', hi: 'ट्रैक्टर', descHi: 'जुताई, बुवाई व भारी ढुलाई के लिए उच्च क्षमता वाले ट्रैक्टर' },
  'Harvester': { en: 'Harvesters', hi: 'हार्वेस्टर', descHi: 'गेहूं, धान, सोयाबीन व मक्का के लिए कंबाइन हार्वेस्टर' },
  'Rotavator': { en: 'Rotavators', hi: 'रोटावेटर', descHi: 'मिट्टी की बारीक जुताई, खरपतवार हटाने और क्यारी बनाने हेतु' },
  'Cultivator': { en: 'Cultivators', hi: 'कल्टीवेटर', descHi: 'मिट्टी में हवा के संचार व खरपतवार नियंत्रण के लिए स्प्रिंग टाइन' },
  'Seed Drill': { en: 'Seed Drills', hi: 'सीड ड्रिल', descHi: 'उर्वरक एवं बीज की सटीक बुवाई के लिए आधुनिक सीड ड्रिल' },
  'Boom Sprayer': { en: 'Boom Sprayers', hi: 'बूम स्प्रेयर', descHi: 'बड़े खेतों में कीटनाशक व पोषण के त्वरित छिड़काव यंत्र' },
  'Plough & Tillage': { en: 'Plough & Tillage', hi: 'प्लाउ और जुताई यंत्र', descHi: 'गहरी जुताई व मिट्टी पलटने के लिए हाइड्रोलिक एमबी प्लाउ' },
  'Other Implements': { en: 'Other Implements', hi: 'अन्य उपकरण', descHi: 'लेजर लेवलर, बेलर और ट्रेलर ट्राली' }
};

export default function CategoryCard({ category }) {
  const { language } = useLanguage();
  const IconComponent = ICON_MAP[category.slug] || ICON_MAP[category.icon] || Tractor;
  const localized = CATEGORY_NAME_MAP[category.name];
  const title = localized ? localized[language] || localized.en : category.name;
  const description = (language === 'hi' && localized?.descHi) ? localized.descHi : (category.description || '');
  const count = category.equipment_count ?? category.equipmentCount ?? category.count ?? 0;
  const imageUrl = category.image_url || category.image || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80';

  return (
    <Link
      to={`/equipment?category=${encodeURIComponent(category.name)}`}
      className="agri-card p-4 sm:p-5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200"
    >
      <div>
        {/* Top: Icon & Image Thumbnail */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center group-hover:bg-agri-primary group-hover:text-white transition-colors duration-200">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-agri-border bg-gray-50">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="font-poppins font-semibold text-agri-text text-base group-hover:text-agri-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-agri-muted mt-1 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer count and action */}
      <div className="pt-3.5 mt-3.5 border-t border-agri-borderLight flex items-center justify-between">
        <span className="text-xs font-semibold text-agri-primary bg-agri-light px-2.5 py-0.5 rounded-full">
          {count} {language === 'hi' ? 'उपलब्ध' : 'Listed'}
        </span>
        <div className="w-7 h-7 rounded-full bg-agri-bg flex items-center justify-center text-agri-muted group-hover:bg-agri-primary group-hover:text-white transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
