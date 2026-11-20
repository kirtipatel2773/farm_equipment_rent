import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Mail, Lock, User, Phone, MapPin, ArrowRight, AlertCircle, Tractor, Wheat, Loader2 } from 'lucide-react';

export default function Signup() {
  const { signup } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Indore, MP');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer'); // 'farmer' or 'owner'
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password) {
      setError(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError(language === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const createdUser = await signup({
        full_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        password,
        role,
        preferred_language: language
      });

      setIsSubmitting(false);

      if (createdUser.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 flex items-center justify-center">
        <div className="agri-container max-w-lg w-full">
          
          <div className="agri-card p-6 sm:p-8 bg-white border border-agri-border shadow-card">
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-agri-light text-agri-primary mx-auto flex items-center justify-center mb-3">
                <Sprout className="w-6 h-6" />
              </div>
              <h1 className="font-poppins font-bold text-2xl text-agri-dark">
                {language === 'hi' ? 'एग्रीरेंट खाता बनाएं' : 'Create an AgriRent Account'}
              </h1>
              <p className="text-xs text-agri-muted mt-1">
                {language === 'hi' ? 'किसानों और मशीनरी मालिकों के विश्वसनीय नेटवर्क से जुड़ें' : 'Join India’s trusted farm equipment network'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Role Selection Toggle */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-agri-text mb-2">
                {language === 'hi' ? 'आपकी भूमिका चुनें' : 'I want to register as:'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    role === 'farmer'
                      ? 'border-agri-primary bg-agri-light/60 text-agri-dark ring-2 ring-agri-primary/20'
                      : 'border-agri-border bg-white text-agri-muted hover:border-agri-primary/40'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    role === 'farmer' ? 'bg-agri-primary text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-agri-dark">
                      {language === 'hi' ? 'किसान' : 'Farmer'}
                    </span>
                    <span className="block text-[11px] text-agri-muted leading-tight">
                      {language === 'hi' ? 'किराए पर यंत्र लेना' : 'Rent farm machinery'}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    role === 'owner'
                      ? 'border-agri-primary bg-agri-light/60 text-agri-dark ring-2 ring-agri-primary/20'
                      : 'border-agri-border bg-white text-agri-muted hover:border-agri-primary/40'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    role === 'owner' ? 'bg-agri-primary text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Tractor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-agri-dark">
                      {language === 'hi' ? 'मशीनरी मालिक' : 'Equipment Owner'}
                    </span>
                    <span className="block text-[11px] text-agri-muted leading-tight">
                      {language === 'hi' ? 'यंत्र किराए पर देना' : 'List & earn from equipment'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-agri-text mb-1">
                  {t('fullName')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agri-text mb-1">
                  {t('yourEmail')} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh.patel@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agri-text mb-1">
                    {t('phone')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-agri-text mb-1">
                    {language === 'hi' ? 'स्थान (जिला, राज्य)' : 'Location'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Indore, MP"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agri-text mb-1">
                  {language === 'hi' ? 'सुरक्षित पासवर्ड' : 'Password'} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'hi' ? 'खाता बनाया जा रहा है...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{t('navSignUp')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switch to login */}
            <div className="mt-6 pt-4 border-t border-agri-borderLight text-center text-xs text-agri-muted">
              <span>{language === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'} </span>
              <Link to="/login" className="font-semibold text-agri-primary hover:underline">
                {t('navLogin')}
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
