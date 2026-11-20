import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Tractor, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  IndianRupee, 
  Gauge, 
  Fuel, 
  MapPin, 
  Tag, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AddEquipment() {
  const { addEquipment, categories, user } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const PRESET_PHOTOS = [
    { label: 'John Deere Tractor', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mahindra Harvester', url: 'https://images.unsplash.com/photo-1595244535352-7bfb34c2bb82?auto=format&fit=crop&w=800&q=80' },
    { label: 'Shaktiman Rotavator', url: 'https://images.unsplash.com/photo-1589876527568-19760bf05b63?auto=format&fit=crop&w=800&q=80' },
    { label: 'Field Cultivator', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80' },
    { label: 'Seed Drill Machine', url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Boom Sprayer Rig', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: 'Tractor',
    brand: '',
    model: '',
    pricePerDay: '',
    securityDeposit: '',
    horsepower: '',
    fuelType: 'Diesel',
    year: '2023',
    location: 'Indore, MP',
    description: '',
    image: PRESET_PHOTOS[0].url
  });

  const [featuresInput, setFeaturesInput] = useState('Power Steering, 4WD, Heavy Duty PTO');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.brand || !formData.pricePerDay) {
      setError(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill in required machinery details.');
      return;
    }

    if (!user) {
      setError(language === 'hi' ? 'कृपया उपकरण जोड़ने से पहले लॉग इन करें।' : 'Please log in before listing equipment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const parsedFeatures = featuresInput.split(',').map(f => f.trim()).filter(Boolean);
      
      const savedItem = await addEquipment({
        name: formData.name.trim(),
        category: formData.category,
        brand: formData.brand.trim(),
        model: formData.model ? formData.model.trim() : formData.name.trim(),
        pricePerDay: Number(formData.pricePerDay),
        securityDeposit: Number(formData.securityDeposit) || Number(formData.pricePerDay) * 2,
        horsepower: formData.horsepower || '50 HP',
        fuelType: formData.fuelType,
        year: formData.year,
        location: formData.location || user.location || 'Indore, MP',
        description: formData.description || 'High performance agricultural implement ready for field operations.',
        features: parsedFeatures.length > 0 ? parsedFeatures : ['Dual Clutch', 'Power Steering', 'Multi-speed PTO'],
        image: formData.image
      });

      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/equipment/${savedItem.id}`);
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to list equipment in database.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="agri-container max-w-4xl">
          
          <div className="mb-6">
            <span className="agri-badge agri-badge-green mb-2.5">
              <Tractor className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मशीनरी जोड़ें' : 'Owner Fleet Listing'}</span>
            </span>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-agri-dark tracking-tight">
              {t('addEquipmentHeading')}
            </h1>
            <p className="text-xs sm:text-sm text-agri-muted mt-1.5">
              {t('addEquipmentSubheading')}
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t('listingSuccessMsg')}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="agri-card p-6 sm:p-8 bg-white space-y-6">
            
            {/* Basic Machinery Information */}
            <div>
              <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3 mb-4">
                {language === 'hi' ? 'बुनियादी विवरण' : 'Machinery Specifications'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryNameLabel')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Deere 5050 D 4WD"
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryCategoryLabel')} *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary cursor-pointer"
                  >
                    {categories && categories.length > 0 ? (
                      categories.map(c => (
                        <option key={c.id || c._id} value={c.name}>{c.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="Tractor">Tractor (ट्रैक्टर)</option>
                        <option value="Harvester">Harvester (हार्वेस्टर)</option>
                        <option value="Rotavator">Rotavator (रोटावेटर)</option>
                        <option value="Cultivator">Cultivator (कल्टीवेटर)</option>
                        <option value="Seed Drill">Seed Drill (सीड ड्रिल)</option>
                        <option value="Boom Sprayer">Boom Sprayer (बूम स्प्रेयर)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryBrandLabel')} *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Mahindra, John Deere, Shaktiman..."
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryHpLabel')}
                  </label>
                  <input
                    type="text"
                    name="horsepower"
                    value={formData.horsepower}
                    onChange={handleChange}
                    placeholder="e.g. 50 HP or 42 Blades"
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Location */}
            <div>
              <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3 mb-4">
                {language === 'hi' ? 'किराया एवं स्थान' : 'Rental Rates & Location'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryPriceLabel')} *
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-agri-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      placeholder="1500"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryDepositLabel')}
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-agri-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="number"
                      name="securityDeposit"
                      value={formData.securityDeposit}
                      onChange={handleChange}
                      placeholder="3000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryLocationLabel')}
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary cursor-pointer"
                  >
                    <option value="Indore, MP">Indore, MP</option>
                    <option value="Dewas, MP">Dewas, MP</option>
                    <option value="Ujjain, MP">Ujjain, MP</option>
                    <option value="Ratlam, MP">Ratlam, MP</option>
                    <option value="Mandsaur, MP">Mandsaur, MP</option>
                    <option value="Bhopal, MP">Bhopal, MP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Picker */}
            <div>
              <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3 mb-4">
                {t('photoUploadTitle')}
              </h3>

              <div className="space-y-3">
                <span className="text-xs text-agri-muted block">
                  {language === 'hi' ? 'अपनी मशीनरी से मिलती-जुलती स्पष्ट तस्वीर चुनें:' : 'Select representative machinery photograph:'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {PRESET_PHOTOS.map((photo, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: photo.url })}
                      className={`rounded-xl overflow-hidden border-2 p-1 text-left transition-all cursor-pointer ${
                        formData.image === photo.url ? 'border-agri-primary shadow-xs' : 'border-agri-border hover:border-gray-400'
                      }`}
                    >
                      <img src={photo.url} alt={photo.label} className="w-full h-16 object-cover rounded-lg mb-1" />
                      <span className="text-[10px] font-semibold text-agri-text block truncate">{photo.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features & Description */}
            <div>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {language === 'hi' ? 'प्रमुख खूबियां (अल्पविराम से अलग करें)' : 'Key Features (Comma separated)'}
                  </label>
                  <input
                    type="text"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="e.g. Power Steering, Dual Clutch, 4WD"
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-agri-text mb-1">
                    {t('machineryDescLabel')}
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Field performance condition, implement attachments, and maintenance history..."
                    className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? (language === 'hi' ? 'सूचीबद्ध हो रहा है...' : 'Listing...') : t('submitListingAction')}</span>
              </button>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
