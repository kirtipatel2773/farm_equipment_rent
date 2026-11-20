
import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Sprout,
  Droplets,
  Tractor,
  ShieldCheck,
  Sun,
  Wrench,
  Clock,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Modal from './Modal';

const guides = [
  {
    id: 1,
    category: 'Soil Management',
    categoryHi: 'मिट्टी प्रबंधन',
    title: 'Prepare Your Soil for Better Crops',
    titleHi: 'अच्छी फसल के लिए मिट्टी तैयार करें',
    description: 'Learn how to prepare healthy soil and improve crop productivity.',
    descriptionHi: 'स्वस्थ मिट्टी तैयार करने और फसल की पैदावार बढ़ाने के तरीके जानें।',
    icon: Sprout,
    color: 'bg-green-100 text-green-700',
    time: '5 min read',
    steps: [
      'Remove weeds, stones and unwanted materials from the field.',
      'Test soil quality before selecting fertilizers.',
      'Plough the field properly to make the soil loose.',
      'Add organic manure to improve soil fertility.',
    ],
    stepsHi: [
      'खेत से खरपतवार, पत्थर और अनावश्यक चीजें हटाएं।',
      'खाद चुनने से पहले मिट्टी की जांच करवाएं।',
      'मिट्टी को भुरभुरा बनाने के लिए खेत की जुताई करें।',
      'मिट्टी की उर्वरता बढ़ाने के लिए जैविक खाद डालें।',
    ],
  },
  {
    id: 2,
    category: 'Water Management',
    categoryHi: 'जल प्रबंधन',
    title: 'Smart Irrigation Techniques',
    titleHi: 'स्मार्ट सिंचाई तकनीक',
    description: 'Save water and maintain proper moisture for healthy crops.',
    descriptionHi: 'पानी बचाएं और फसलों के लिए उचित नमी बनाए रखें।',
    icon: Droplets,
    color: 'bg-blue-100 text-blue-700',
    time: '4 min read',
    steps: [
      'Check soil moisture before watering crops.',
      'Use drip irrigation wherever suitable.',
      'Avoid excessive watering to prevent root damage.',
      'Water crops during cooler hours when possible.',
    ],
    stepsHi: [
      'फसलों को पानी देने से पहले मिट्टी की नमी जांचें।',
      'जहां संभव हो ड्रिप सिंचाई का उपयोग करें।',
      'जड़ों को नुकसान से बचाने के लिए अधिक पानी न दें।',
      'संभव हो तो ठंडे समय में सिंचाई करें।',
    ],
  },
  {
    id: 3,
    category: 'Farm Machinery',
    categoryHi: 'कृषि मशीनरी',
    title: 'Choose the Right Farm Equipment',
    titleHi: 'सही कृषि उपकरण चुनें',
    description: 'Understand which machinery is suitable for your farming needs.',
    descriptionHi: 'अपनी खेती की जरूरत के अनुसार सही मशीनरी चुनना सीखें।',
    icon: Tractor,
    color: 'bg-orange-100 text-orange-700',
    time: '6 min read',
    steps: [
      'Identify the type and size of your farming work.',
      'Compare machinery specifications and horsepower.',
      'Check equipment condition before using or renting.',
      'Choose equipment according to your budget and requirements.',
    ],
    stepsHi: [
      'अपने खेती के काम का प्रकार और आकार समझें।',
      'मशीन की विशेषताओं और हॉर्सपावर की तुलना करें।',
      'उपयोग या किराये पर लेने से पहले मशीन की जांच करें।',
      'अपने बजट और जरूरत के अनुसार उपकरण चुनें।',
    ],
  },
  {
    id: 4,
    category: 'Crop Protection',
    categoryHi: 'फसल सुरक्षा',
    title: 'Protect Your Crops from Pests',
    titleHi: 'फसलों को कीटों से सुरक्षित रखें',
    description: 'Learn basic practices to identify and manage crop pests.',
    descriptionHi: 'फसल के कीटों की पहचान और नियंत्रण के तरीके जानें।',
    icon: ShieldCheck,
    color: 'bg-purple-100 text-purple-700',
    time: '5 min read',
    steps: [
      'Inspect crops regularly for signs of pest damage.',
      'Remove heavily affected plant parts when appropriate.',
      'Use recommended pest-control methods.',
      'Follow product labels and safety instructions.',
    ],
    stepsHi: [
      'कीटों के लक्षण देखने के लिए फसलों की नियमित जांच करें।',
      'जरूरत पड़ने पर प्रभावित पौधों के हिस्से हटाएं।',
      'अनुशंसित कीट नियंत्रण तरीकों का उपयोग करें।',
      'दवा के लेबल और सुरक्षा निर्देशों का पालन करें।',
    ],
  },
  {
    id: 5,
    category: 'Seasonal Farming',
    categoryHi: 'मौसमी खेती',
    title: 'Plan Your Farming Season',
    titleHi: 'खेती के मौसम की योजना बनाएं',
    description: 'Plan sowing, irrigation and harvesting activities on time.',
    descriptionHi: 'बुवाई, सिंचाई और कटाई की सही समय पर योजना बनाएं।',
    icon: Sun,
    color: 'bg-yellow-100 text-yellow-700',
    time: '4 min read',
    steps: [
      'Understand the local seasonal conditions.',
      'Select crops suitable for your region.',
      'Plan sowing and harvesting activities.',
      'Arrange seeds, fertilizers and equipment in advance.',
    ],
    stepsHi: [
      'अपने क्षेत्र के मौसम की जानकारी लें।',
      'अपने क्षेत्र के अनुसार उपयुक्त फसल चुनें।',
      'बुवाई और कटाई की योजना बनाएं।',
      'बीज, खाद और उपकरणों की व्यवस्था पहले करें।',
    ],
  },
  {
    id: 6,
    category: 'Equipment Care',
    categoryHi: 'उपकरण की देखभाल',
    title: 'Maintain Your Farm Machinery',
    titleHi: 'कृषि मशीनरी की देखभाल करें',
    description: 'Simple maintenance practices to keep machinery working properly.',
    descriptionHi: 'मशीनरी को अच्छी स्थिति में रखने के लिए जरूरी देखभाल सीखें।',
    icon: Wrench,
    color: 'bg-red-100 text-red-700',
    time: '5 min read',
    steps: [
      'Clean equipment after every use.',
      'Check oil, fuel and other essential fluids.',
      'Inspect tyres, belts and moving parts.',
      'Store machinery in a clean and covered area.',
    ],
    stepsHi: [
      'हर उपयोग के बाद उपकरण साफ करें।',
      'ऑयल, ईंधन और अन्य जरूरी तरल पदार्थ जांचें।',
      'टायर, बेल्ट और चलने वाले हिस्सों की जांच करें।',
      'मशीनरी को साफ और ढकी हुई जगह पर रखें।',
    ],
  },
];

export default function FarmingGuideSection() {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-green-50/70 to-white border-t border-agri-border">
      <div className="agri-container">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            <BookOpen size={16} />
            {isHindi ? 'किसानों के लिए ज्ञान केंद्र' : 'Knowledge Hub for Farmers'}
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-agri-text font-poppins mb-4">
            {isHindi ? 'खेती सीखें, बेहतर फसल उगाएं' : 'Learn Farming, Grow Better'}
          </h2>

          <p className="text-agri-muted text-sm sm:text-base leading-7">
            {isHindi
              ? 'खेती, कृषि मशीनरी, सिंचाई और फसल प्रबंधन से जुड़ी उपयोगी जानकारी एक ही जगह पर पाएं।'
              : 'Explore useful farming tips, machinery guidance, irrigation techniques and crop management practices.'}
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;

            return (
              <div
                key={guide.id}
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${guide.color}`}>
                    <Icon size={27} />
                  </div>

                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {guide.time}
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  {isHindi ? guide.categoryHi : guide.category}
                </span>

                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3 group-hover:text-green-700 transition-colors">
                  {isHindi ? guide.titleHi : guide.title}
                </h3>

                <p className="text-sm text-gray-500 leading-6 mb-6 min-h-[48px]">
                  {isHindi ? guide.descriptionHi : guide.description}
                </p>

                <button
                  onClick={() => setSelectedGuide(guide)}
                  className="w-full flex items-center justify-between border-t border-gray-100 pt-4 text-green-700 font-semibold text-sm hover:text-green-900"
                >
                  {isHindi ? 'गाइड पढ़ें' : 'Read Guide'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-green-800 rounded-2xl p-7 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {isHindi ? 'स्मार्ट खेती की शुरुआत करें!' : 'Start Your Smart Farming Journey!'}
            </h3>
            <p className="text-green-100 text-sm">
              {isHindi
                ? 'सही जानकारी और सही उपकरण से खेती को बेहतर बनाएं।'
                : 'Make farming easier with the right knowledge and equipment.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-green-100">
            <CheckCircle2 size={22} />
            <span className="text-sm font-medium">
              {isHindi ? 'सीखें और आगे बढ़ें' : 'Learn and Grow'}
            </span>
          </div>
        </div>

        {/* Guide Modal */}
        {selectedGuide && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedGuide(null)}
            maxWidth="max-w-2xl"
          >
            <div className="py-2">
              <div className="flex justify-between items-center mb-5">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                  {isHindi ? selectedGuide.categoryHi : selectedGuide.category}
                </span>

                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close guide"
                >
                  <X size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {isHindi ? selectedGuide.titleHi : selectedGuide.title}
              </h2>

              <p className="text-gray-500 text-sm leading-7 mb-6">
                {isHindi ? selectedGuide.descriptionHi : selectedGuide.description}
              </p>

              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-4">
                  {isHindi ? 'जरूरी सुझाव' : 'Important Steps'}
                </h3>

                <div className="space-y-4">
                  {(isHindi ? selectedGuide.stepsHi : selectedGuide.steps).map((step, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <span className="w-7 h-7 shrink-0 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-6">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
