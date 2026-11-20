import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Send,
  MessageSquare,
  HelpCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function Contact() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const FAQS = [
    {
      qEn: 'How does AgriRent ensure the condition of rented machinery?',
      qHi: 'एग्रीरेंट किराए की मशीनरी की कार्यक्षमता कैसे सुनिश्चित करता है?',
      aEn: 'Every tractor and implement listing undergoes a mechanical checklist verification (engine, PTO shaft, hydraulics, tires/blades) and document check (RC, valid fitness) prior to activation on the platform.',
      aHi: 'प्रत्येक ट्रैक्टर और यंत्र का पंजीकरण (RC) और मैकेनिकल चेकलिस्ट (पीटीओ शाफ्ट, हाइड्रोलिक्स, टायर और ब्लेड) की प्लेटफॉर्म पर जांच की जाती है।'
    },
    {
      qEn: 'Who is responsible for fuel (diesel) during the rental period?',
      qHi: 'किराया अवधि के दौरान डीजल (ईंधन) का खर्च कौन उठाता है?',
      aEn: 'Diesel is supplied by the renting farmer according to actual field working hours. Machines are delivered with a full or documented tank level and returned at the same level.',
      aHi: 'खेत पर कार्य के दौरान डीजल का खर्च किराए पर लेने वाले किसान का होता है। मशीन जिस स्तर पर मिलती है, उसी स्तर पर वापस की जाती है।'
    },
    {
      qEn: 'How does trailer delivery work to my farm?',
      qHi: 'खेत तक ट्रेलर डिलीवरी की व्यवस्था कैसे होती है?',
      aEn: 'When selecting the "Farm Trailer Delivery" option (+₹450), the machinery owner arranges a transport trolley or drives the implement directly to your designated farm entrance at the agreed hour.',
      aHi: 'ट्रेलर डिलीवरी (+₹450) चुनने पर उपकरण मालिक तय समय पर ट्रॉली या ट्रेलर से सीधे आपके खेत के रास्ते तक मशीन पहुंचाता है।'
    },
    {
      qEn: 'What happens if the equipment breaks down during field operation?',
      qHi: 'यदि खेत में कार्य के दौरान मशीन खराब हो जाए तो क्या नियम है?',
      aEn: 'Normal mechanical wear-and-tear is the owner’s responsibility. In case of unexpected breakdown, work hours are paused immediately, and the owner either repairs the unit or issues a pro-rata refund.',
      aHi: 'सामान्य यांत्रिक खराबी मालिक की जिम्मेदारी होती है। खराबी की स्थिति में किराया समय रोक दिया जाता है और मालिक मरम्मत या यथानुपात वापसी करता है।'
    },
    {
      qEn: 'How do I list my own tractor or implements?',
      qHi: 'मैं अपना ट्रैक्टर या कृषि उपकरण कैसे किराए पर दे सकता हूं?',
      aEn: 'Click "List Equipment" in the navbar, choose your machinery category, set your preferred daily rental price, and submit basic photos. Nearby farmers will be able to book your idle days.',
      aHi: 'नेवबार में "उपकरण जोड़ें" पर क्लिक करें, श्रेणी चुनें, दैनिक किराया तय करें और फोटो दर्ज करें। आस-पास के किसान तुरंत बुकिंग अनुरोध भेज सकेंगे।'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.contact.submit(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to submit message to database.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="agri-container space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="agri-badge agri-badge-green">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सहायता केंद्र' : 'Farmer Support'}</span>
            </span>

            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-agri-dark tracking-tight">
              {t('contactHeading')}
            </h1>

            <p className="text-xs sm:text-sm text-agri-muted leading-relaxed">
              {t('contactSubheading')}
            </p>
          </div>

          {/* 2-Column: Contact Details & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div className="agri-card p-6 bg-white space-y-5">
                <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3">
                  {language === 'hi' ? 'सीधे संपर्क करें' : 'Direct Helpline & Office'}
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-agri-text block">{language === 'hi' ? 'टोल-फ्री किसान हेल्पलाइन' : 'Toll-Free Farmer Helpline'}</span>
                      <span className="text-agri-primary font-bold text-sm block mt-0.5">+91 1800-AGRI-RENT</span>
                      <span className="text-agri-muted text-[11px]">Mon–Sat: 8:00 AM – 8:00 PM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-agri-text block">{t('yourEmail')}</span>
                      <span className="text-agri-text block mt-0.5">support@agrirent.in</span>
                      <span className="text-agri-muted text-[11px]">24-Hour response time</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-agri-text block">{language === 'hi' ? 'क्षेत्रीय कृषि केंद्र' : 'Regional Ag Hub'}</span>
                      <span className="text-agri-text block mt-0.5">Sanwer Road Industrial & Agricultural Zone, Indore, MP 452015</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="agri-card p-6 sm:p-8 bg-white">
                <h3 className="font-poppins font-semibold text-base text-agri-text mb-4">
                  {t('sendMessageTitle')}
                </h3>

                {submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-sm font-semibold text-emerald-800">{t('contactSuccess')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-agri-text mb-1">{t('yourName')} *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-agri-text mb-1">{t('yourPhone')} *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-agri-text mb-1">{t('yourEmail')} *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@gmail.com"
                        className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-agri-text mb-1">{t('subject')} *</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Combine Harvester Availability in Ujjain"
                        className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-agri-text mb-1">{t('message')} *</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your question or request..."
                        className="w-full p-2.5 rounded-xl border border-agri-border bg-agri-bg text-agri-text focus:outline-none focus:border-agri-primary"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('sendMessageAction')}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* FAQ Accordion Section */}
          <div className="pt-6 border-t border-agri-border">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="agri-badge agri-badge-amber mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सामान्य प्रश्न' : 'FAQ'}</span>
              </span>
              <h2 className="font-poppins font-bold text-2xl text-agri-dark">
                {t('faqTitle')}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const question = language === 'hi' ? faq.qHi : faq.qEn;
                const answer = language === 'hi' ? faq.aHi : faq.aEn;

                return (
                  <div
                    key={idx}
                    className="agri-card overflow-hidden bg-white border border-agri-border transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-poppins font-semibold text-xs sm:text-sm text-agri-text">
                        {question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-agri-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-agri-primary' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-agri-muted leading-relaxed border-t border-agri-borderLight pt-3">
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
