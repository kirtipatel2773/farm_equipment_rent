import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import EquipmentCard from '../components/EquipmentCard';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Fuel, 
  CalendarDays, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  ArrowLeft,
  Clock, 
  Sparkles,
  Truck,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function EquipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { equipmentList, toggleFavorite, isFavorite } = useApp();
  const { language, t } = useLanguage();

  const [dbEquipment, setDbEquipment] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Find in context or fetch directly from MongoDB
  useEffect(() => {
    let isMounted = true;
    const loadItem = async () => {
      setLoadingItem(true);
      setFetchError(null);

      // Check context list first
      const foundInContext = equipmentList.find(
        (item) => String(item.id) === String(id) || String(item._id) === String(id)
      );

      if (foundInContext) {
        if (isMounted) {
          setDbEquipment(foundInContext);
          setLoadingItem(false);
        }
        return;
      }

      // Otherwise fetch by ID from MongoDB API
      try {
        const res = await api.equipment.getById(id);
        if (isMounted) {
          if (res.success && res.data) {
            setDbEquipment(res.data);
          } else {
            setFetchError('Equipment record not found.');
          }
          setLoadingItem(false);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message || 'Equipment not found in database.');
          setLoadingItem(false);
        }
      }
    };

    loadItem();
    return () => { isMounted = false; };
  }, [id, equipmentList]);

  const equipment = dbEquipment;
  const favorite = equipment ? isFavorite(equipment.id) : false;

  const gallery = equipment?.gallery && equipment.gallery.length > 0 
    ? equipment.gallery 
    : [equipment?.image || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80'];
  
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (gallery.length > 0) {
      setActiveImage(gallery[0]);
    }
  }, [gallery]);

  // Calculator State
  const today = new Date().toISOString().split('T')[0];
  const nextDay = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(nextDay);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Dynamic days calculation
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  const pricePerDay = equipment ? Number(equipment.pricePerDay || equipment.price_per_day || 0) : 0;
  const subtotal = rentalDays * pricePerDay;
  const securityDeposit = equipment ? (Number(equipment.securityDeposit) || Math.round(pricePerDay * 2)) : 0;
  const platformFee = Math.round(subtotal * 0.05);
  const estimatedTotal = subtotal + platformFee;

  // Similar equipment in same category from MongoDB
  const similarEquipment = useMemo(() => {
    if (!equipment) return [];
    return equipmentList
      .filter((item) => String(item.id) !== String(equipment.id) && item.category === equipment.category)
      .slice(0, 3);
  }, [equipment, equipmentList]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setContactSubmitting(true);
    try {
      await api.contact.submit({
        name: equipment.owner?.name || 'Farmer Client',
        email: 'inquiry@agrirent.in',
        phone: equipment.owner?.phone || '',
        subject: `Inquiry regarding ${equipment.name} (ID: ${equipment.id})`,
        message: contactMessage.trim()
      });
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setContactModalOpen(false);
        setContactMessage('');
      }, 2500);
    } catch (err) {
      alert(`Could not send inquiry: ${err.message}`);
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleBookingClick = () => {
    navigate(`/booking?equipmentId=${equipment.id}&startDate=${startDate}&endDate=${endDate}`);
  };

  if (loadingItem) {
    return (
      <div className="min-h-screen flex flex-col bg-agri-bg">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 text-agri-primary animate-spin mx-auto" />
            <p className="text-xs text-agri-muted">
              {language === 'hi' ? 'डेटाबेस से मशीनरी विवरण लोड हो रहा है...' : 'Loading machinery details from MongoDB...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (fetchError || !equipment) {
    return (
      <div className="min-h-screen flex flex-col bg-agri-bg">
        <Navbar />
        <div className="agri-container py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-poppins text-agri-dark">
            {language === 'hi' ? 'उपकरण नहीं मिला' : 'Equipment Record Not Found'}
          </h2>
          <p className="text-xs sm:text-sm text-agri-muted max-w-md mx-auto">
            {fetchError || (language === 'hi' ? 'यह उपकरण डेटाबेस में मौजूद नहीं है।' : 'The requested equipment ID does not exist in MongoDB.')}
          </p>
          <Link
            to="/equipment"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-agri-primary text-white rounded-xl text-xs font-semibold hover:bg-agri-primaryHover transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToCatalog')}</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="agri-container">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-agri-muted mb-6 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-agri-primary transition-colors">{t('navHome')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/equipment" className="hover:text-agri-primary transition-colors">{t('navBrowse')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/equipment?category=${encodeURIComponent(equipment.category)}`} className="hover:text-agri-primary transition-colors">{equipment.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-agri-text font-semibold truncate max-w-xs">{equipment.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visuals & Specifications (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Image Stage */}
              <div className="agri-card p-2 bg-white overflow-hidden relative group">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={activeImage || equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  
                  {/* Availability Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
                      equipment.available 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-600 text-white'
                    }`}>
                      {equipment.available ? t('availableNow') : t('unavailable')}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleFavorite(equipment.id)}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-agri-text hover:text-red-500 transition-colors shadow-sm cursor-pointer"
                    aria-label="Save machinery"
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Thumbnails */}
                {gallery.length > 1 && (
                  <div className="flex gap-2.5 p-2 overflow-x-auto">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          activeImage === img ? 'border-agri-primary ring-2 ring-agri-primary/20' : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Machinery Header & Key Specs */}
              <div className="agri-card p-6 bg-white space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="agri-badge agri-badge-green text-xs">
                      {equipment.category}
                    </span>
                    <span className="text-xs text-agri-muted">
                      {equipment.brand} • Model {equipment.model}
                    </span>
                  </div>

                  <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-agri-dark tracking-tight">
                    {equipment.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-agri-muted">
                    <Rating rating={equipment.rating} reviewsCount={equipment.reviews} />
                    <span className="flex items-center gap-1 text-agri-text">
                      <MapPin className="w-3.5 h-3.5 text-agri-primary" />
                      <span>{equipment.location}</span>
                    </span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-agri-borderLight text-xs">
                  <div className="p-3 rounded-xl bg-agri-bg border border-agri-border/60">
                    <Gauge className="w-4 h-4 text-agri-primary mb-1" />
                    <span className="text-[11px] text-agri-muted block">{language === 'hi' ? 'क्षमता / हॉर्सपावर' : 'Power Output'}</span>
                    <span className="font-semibold text-agri-text">{equipment.horsepower || '50 HP'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-agri-bg border border-agri-border/60">
                    <Fuel className="w-4 h-4 text-agri-primary mb-1" />
                    <span className="text-[11px] text-agri-muted block">{language === 'hi' ? 'ईंधन प्रकार' : 'Fuel / Drive'}</span>
                    <span className="font-semibold text-agri-text">{equipment.fuelType || 'Diesel'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-agri-bg border border-agri-border/60">
                    <CalendarDays className="w-4 h-4 text-agri-primary mb-1" />
                    <span className="text-[11px] text-agri-muted block">{language === 'hi' ? 'निर्माण वर्ष' : 'Mfg Year'}</span>
                    <span className="font-semibold text-agri-text">{equipment.year || '2023'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-agri-bg border border-agri-border/60">
                    <ShieldCheck className="w-4 h-4 text-agri-primary mb-1" />
                    <span className="text-[11px] text-agri-muted block">{language === 'hi' ? 'कार्य स्थिति' : 'Condition'}</span>
                    <span className="font-semibold text-emerald-700">{equipment.condition || 'Excellent'}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-agri-borderLight">
                  <h3 className="font-poppins font-semibold text-sm text-agri-text mb-2">
                    {language === 'hi' ? 'मशीन विवरण एवं कार्य क्षमता' : 'Machinery Description & Capability'}
                  </h3>
                  <p className="text-xs sm:text-sm text-agri-muted leading-relaxed">
                    {equipment.description}
                  </p>
                </div>
              </div>

              {/* Machinery Owner Card */}
              <div className="agri-card p-6 bg-white space-y-4">
                <h3 className="font-poppins font-semibold text-sm text-agri-text border-b border-agri-borderLight pb-3">
                  {language === 'hi' ? 'सत्यापित उपकरण मालिक' : 'Verified Equipment Host'}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={equipment.owner?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'}
                      alt={equipment.owner?.name || 'Owner'}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-agri-primary"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-poppins font-bold text-sm text-agri-text">
                          {equipment.owner?.name || 'Verified Owner'}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-agri-muted">
                        {equipment.owner?.location || equipment.location}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-agri-border hover:border-agri-primary text-xs font-semibold text-agri-text hover:bg-agri-bg transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <MessageSquare className="w-4 h-4 text-agri-primary" />
                    <span>{t('contactOwner')}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing & Booking Scheduler (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-5">
              
              <div className="agri-card p-6 bg-white border border-agri-border shadow-soft-lg space-y-5">
                
                {/* Rate Header */}
                <div className="flex items-baseline justify-between border-b border-agri-borderLight pb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-agri-muted block">
                      {language === 'hi' ? 'दैनिक किराया दर' : 'Daily Rental Rate'}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-poppins font-bold text-2xl sm:text-3xl text-agri-primary">
                        ₹{pricePerDay.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-agri-muted font-medium">/ day</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-agri-muted block">{t('securityDeposit')}</span>
                    <span className="font-semibold text-xs text-agri-text">
                      ₹{securityDeposit.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Date Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-agri-text">
                    {language === 'hi' ? 'किराया अवधि चुनें' : 'Operational Rental Window'}
                  </label>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="block text-[11px] text-agri-muted mb-1">{language === 'hi' ? 'प्रारंभ तिथि' : 'Start Date'}</span>
                      <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text font-medium text-xs focus:outline-none focus:border-agri-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-agri-muted mb-1">{language === 'hi' ? 'वापसी तिथि' : 'Return Date'}</span>
                      <input
                        type="date"
                        min={startDate || today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text font-medium text-xs focus:outline-none focus:border-agri-primary cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-3.5 rounded-xl bg-agri-bg border border-agri-border/70 space-y-2 text-xs">
                  <div className="flex justify-between text-agri-muted">
                    <span>₹{pricePerDay.toLocaleString('en-IN')} × {rentalDays} {language === 'hi' ? 'दिन' : 'days'}</span>
                    <span className="font-medium text-agri-text">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-agri-muted">
                    <span>{t('platformFee')} (5%)</span>
                    <span className="font-medium text-agri-text">₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-agri-border flex justify-between font-bold text-sm text-agri-dark">
                    <span>{t('estimatedTotal')}</span>
                    <span className="text-agri-primary">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  disabled={!equipment.available}
                  onClick={handleBookingClick}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                    equipment.available
                      ? 'bg-agri-primary hover:bg-agri-primaryHover text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{equipment.available ? t('bookNow') : t('currentlyRented')}</span>
                </button>

                <p className="text-[11px] text-center text-agri-muted">
                  🔒 {language === 'hi' ? 'शून्य अग्रिम कटौतियां • खेत पर सत्यापन उपरांत भुगतान' : 'Verified machine • Direct payment on field delivery'}
                </p>

              </div>

            </div>

          </div>

          {/* Similar Equipment Section from MongoDB */}
          {similarEquipment.length > 0 && (
            <div className="mt-14 pt-10 border-t border-agri-border">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-agri-text mb-6">
                {t('similarEquipment')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarEquipment.map((item) => (
                  <EquipmentCard key={item.id} equipment={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Owner Contact Modal */}
      {contactModalOpen && (
        <Modal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          maxWidth="max-w-md"
        >
          <div className="py-2">
            <h3 className="font-poppins font-bold text-lg text-agri-dark mb-1">
              {t('contactOwner')}
            </h3>
            <p className="text-xs text-agri-muted mb-4">
              {equipment.owner?.name} • {equipment.name}
            </p>

            {messageSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Message delivered to owner and saved to database!</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-agri-text mb-1">
                    Direct Phone Number
                  </label>
                  <p className="text-xs font-bold text-agri-primary bg-agri-light p-2.5 rounded-xl flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{equipment.owner?.phone || '+91 98260 11234'}</span>
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agri-text mb-1">
                    Send Field Details or Requirement Note
                  </label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Enter acreage, field location or preferred arrival hour..."
                    className="w-full p-2.5 rounded-xl border border-agri-border text-xs text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-agri-border text-xs font-semibold text-agri-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="px-5 py-2 rounded-xl bg-agri-primary text-white text-xs font-semibold hover:bg-agri-primaryHover disabled:opacity-60"
                  >
                    {contactSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
