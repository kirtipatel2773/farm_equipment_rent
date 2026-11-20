import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Info,
  ChevronRight,
  Tractor
} from 'lucide-react';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { equipmentList, user, createBooking } = useApp();
  const { language, t } = useLanguage();

  const equipmentId = searchParams.get('equipmentId') || equipmentList[0]?.id;
  const equipment = equipmentList.find((item) => item.id === equipmentId) || equipmentList[0];

  const today = new Date().toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(searchParams.get('startDate') || today);
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || defaultEnd);

  // Delivery preference
  const [deliveryOption, setDeliveryOption] = useState('delivery'); // 'delivery' or 'pickup'
  const deliveryFee = deliveryOption === 'delivery' ? 450 : 0;

  // Farmer Information
  const [formData, setFormData] = useState({
    name: user?.name || 'Ramesh Patel',
    phone: user?.phone || '+91 98765 43210',
    village: 'Village Hatod, Tehsil Depalpur',
    district: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '453111',
    instructions: 'Please call before bringing the tractor trailer to the farm entrance near water borewell.'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'cod', 'netbanking'
  const [upiId, setUpiId] = useState('farmer@upi');

  const [error, setError] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic calculations
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  const subtotal = rentalDays * equipment.pricePerDay;
  const securityDeposit = equipment.securityDeposit || Math.round(equipment.pricePerDay * 2);
  const platformFee = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + platformFee + deliveryFee;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullAddress = `${formData.village}, ${formData.district}, ${formData.state} - ${formData.pincode}`;
      const newBooking = await createBooking({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        equipmentImage: equipment.image,
        category: equipment.category,
        brand: equipment.brand,
        model: equipment.model,
        pricePerDay: equipment.pricePerDay,
        startDate,
        endDate,
        days: rentalDays,
        subtotal,
        deliveryFee,
        platformFee,
        securityDeposit,
        totalAmount,
        deliveryOption,
        farmerName: formData.name,
        farmerPhone: formData.phone,
        farmerAddress: fullAddress,
        notes: formData.instructions,
        paymentMethod
      });

      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setSuccessModalOpen(true);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Booking submission failed.');
    }
  };

  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col bg-agri-bg">
        <Navbar />
        <div className="agri-container py-16 text-center">
          <p className="text-agri-muted">{t('noResults')}</p>
          <Link to="/equipment" className="mt-4 inline-block px-5 py-2.5 bg-agri-primary text-white rounded-xl text-sm font-semibold">
            {t('backToCatalog')}
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
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-agri-muted mb-6">
            <Link to="/" className="hover:text-agri-primary transition-colors">{t('navHome')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/equipment" className="hover:text-agri-primary transition-colors">{t('navBrowse')}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/equipment/${equipment.id}`} className="hover:text-agri-primary transition-colors truncate max-w-xs">{equipment.name}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-agri-text font-semibold">{language === 'hi' ? 'बुकिंग' : 'Booking'}</span>
          </div>

          <div className="mb-8">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-agri-dark tracking-tight">
              {t('bookingHeading')}
            </h1>
            <p className="text-xs sm:text-sm text-agri-muted mt-1.5">
              {t('bookingSubheading')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Area (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Rental Schedule */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-agri-borderLight pb-3">
                  <Calendar className="w-5 h-5 text-agri-primary" />
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('stepDates')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-agri-text mb-1.5">
                      {t('startDateLabel')}
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-agri-border bg-agri-bg text-xs font-semibold text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-agri-text mb-1.5">
                      {t('endDateLabel')}
                    </label>
                    <input
                      type="date"
                      min={startDate || today}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-agri-border bg-agri-bg text-xs font-semibold text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-agri-light/60 border border-agri-primary/20 flex items-center justify-between text-xs font-medium text-agri-primary">
                  <span>{language === 'hi' ? 'कुल कार्य दिवस:' : 'Total Field Duration:'}</span>
                  <span className="font-bold text-sm">{rentalDays} {language === 'hi' ? 'दिन' : 'Days'}</span>
                </div>
              </div>

              {/* Step 2: Delivery Preference */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-agri-borderLight pb-3">
                  <Truck className="w-5 h-5 text-agri-primary" />
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('stepDelivery')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label 
                    className={`p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      deliveryOption === 'delivery'
                        ? 'border-agri-primary bg-agri-light/30 shadow-xs'
                        : 'border-agri-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-poppins font-semibold text-xs sm:text-sm text-agri-text block">
                          {t('trailerDeliveryTitle')}
                        </span>
                        <p className="text-[11px] text-agri-muted leading-relaxed">
                          {t('trailerDeliveryDesc')}
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="delivery"
                        checked={deliveryOption === 'delivery'}
                        onChange={() => setDeliveryOption('delivery')}
                        className="mt-1 accent-agri-primary"
                      />
                    </div>
                  </label>

                  <label 
                    className={`p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      deliveryOption === 'pickup'
                        ? 'border-agri-primary bg-agri-light/30 shadow-xs'
                        : 'border-agri-border bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-poppins font-semibold text-xs sm:text-sm text-agri-text block">
                          {t('selfPickupTitle')}
                        </span>
                        <p className="text-[11px] text-agri-muted leading-relaxed">
                          {t('selfPickupDesc')}
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="pickup"
                        checked={deliveryOption === 'pickup'}
                        onChange={() => setDeliveryOption('pickup')}
                        className="mt-1 accent-agri-primary"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Farmer & Field Location */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-agri-borderLight pb-3">
                  <MapPin className="w-5 h-5 text-agri-primary" />
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('stepFarmerInfo')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-agri-text mb-1">{t('farmerNameLabel')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-agri-text mb-1">{t('farmerPhoneLabel')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-agri-text mb-1">{t('villageLabel')}</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleFormChange}
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-agri-text mb-1">{t('districtLabel')}</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleFormChange}
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-agri-text mb-1">{t('pincodeLabel')}</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleFormChange}
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-agri-text mb-1">{t('fieldNotesLabel')}</label>
                    <textarea
                      rows={2}
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleFormChange}
                      placeholder="e.g. Near solar pump, east farm road..."
                      className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div className="agri-card p-6 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-agri-borderLight pb-3">
                  <CreditCard className="w-5 h-5 text-agri-primary" />
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('stepPayment')}
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-agri-border bg-white cursor-pointer hover:border-agri-primary">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-agri-primary"
                      />
                      <span className="font-semibold text-agri-text">{t('payUpi')}</span>
                    </div>
                    <span className="text-[11px] font-bold text-agri-primary bg-agri-light px-2 py-0.5 rounded">Fast</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-agri-border bg-white cursor-pointer hover:border-agri-primary">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-agri-primary"
                      />
                      <span className="font-semibold text-agri-text">{t('payCod')}</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">On Handover</span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-agri-border bg-white cursor-pointer hover:border-agri-primary">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="accent-agri-primary"
                      />
                      <span className="font-semibold text-agri-text">{t('payNetbanking')}</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Summary Area (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              <div className="agri-card p-6 bg-white border border-agri-border">
                
                {/* Equipment Snapshot Card */}
                <div className="flex gap-3.5 pb-4 border-b border-agri-borderLight">
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-20 h-16 rounded-xl object-cover border border-agri-border"
                  />
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-agri-primary bg-agri-light px-2 py-0.5 rounded">
                      {equipment.category}
                    </span>
                    <h4 className="font-poppins font-semibold text-sm text-agri-text truncate mt-1">
                      {equipment.name}
                    </h4>
                    <p className="text-xs text-agri-muted truncate">
                      {equipment.location} • ₹{equipment.pricePerDay.toLocaleString('en-IN')}{t('pricePerDay')}
                    </p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="py-4 space-y-2.5 text-xs border-b border-agri-borderLight">
                  <div className="flex justify-between text-agri-muted">
                    <span>
                      {t('subtotalAmount')} ({rentalDays} {language === 'hi' ? 'दिन' : 'days'})
                    </span>
                    <span className="font-semibold text-agri-text">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-agri-muted">
                    <span>
                      {deliveryOption === 'delivery' ? (language === 'hi' ? 'ट्रेलर डिलीवरी शुल्क' : 'Farm Trailer Delivery') : (language === 'hi' ? 'स्वयं पिकअप' : 'Self Pickup')}
                    </span>
                    <span className="font-semibold text-agri-text">
                      {deliveryOption === 'delivery' ? `+₹${deliveryFee}` : (language === 'hi' ? 'मुफ़्त' : 'Free')}
                    </span>
                  </div>
                  <div className="flex justify-between text-agri-muted">
                    <span>{t('serviceFee')}</span>
                    <span className="font-semibold text-agri-text">₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-agri-borderLight flex justify-between text-base font-bold text-agri-dark">
                    <span>{language === 'hi' ? 'कुल देय राशि' : 'Total Payable'}</span>
                    <span className="text-agri-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Refundable Deposit Notice */}
                <div className="py-3 px-3.5 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2 my-4">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>{t('securityDeposit')}: ₹{securityDeposit.toLocaleString('en-IN')}</strong>
                    <p className="mt-0.5">
                      {language === 'hi'
                        ? 'यह राशि मशीनरी वापसी के समय पूर्ण निरीक्षण के तुरंत बाद वापस कर दी जाती है।'
                        : 'Held safely and refunded immediately upon return inspection.'}
                    </p>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? (language === 'hi' ? 'बुकिंग दर्ज हो रही है...' : 'Processing...') : t('confirmBookingAction')}</span>
                </button>

              </div>

            </div>

          </form>

        </div>
      </main>

      {/* Confirmation Success Modal */}
      {successModalOpen && createdBooking && (
        <Modal
          isOpen={successModalOpen}
          onClose={() => {
            setSuccessModalOpen(false);
            navigate('/dashboard');
          }}
          maxWidth="max-w-md"
        >
          <div className="py-2 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-agri-primary mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="font-poppins font-bold text-xl text-agri-dark">
              {t('bookingSuccessTitle')}
            </h3>

            <p className="text-xs text-agri-muted leading-relaxed">
              {t('bookingSuccessMsg')}
            </p>

            <div className="p-4 rounded-xl bg-agri-bg border border-agri-border text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-agri-muted">Booking Reference:</span>
                <span className="font-bold text-agri-text">{createdBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-muted">Machinery:</span>
                <span className="font-semibold text-agri-text">{createdBooking.equipmentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-agri-muted">Schedule:</span>
                <span className="font-semibold text-agri-text">{createdBooking.startDate} to {createdBooking.endDate} ({createdBooking.days} days)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-agri-borderLight">
                <span className="font-semibold text-agri-text">Total:</span>
                <span className="font-bold text-agri-primary">₹{createdBooking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSuccessModalOpen(false);
                navigate('/dashboard');
              }}
              type="button"
              className="w-full py-3 rounded-xl bg-agri-primary text-white font-semibold text-xs hover:bg-agri-primaryHover transition-all cursor-pointer"
            >
              {t('viewInDashboard')}
            </button>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
