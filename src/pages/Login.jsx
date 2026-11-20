import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(language === 'hi' ? 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।' : 'Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const loggedUser = await login(email.trim(), password);
      setIsSubmitting(false);

      if (loggedUser.role === 'owner') {
        navigate('/owner-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 flex items-center justify-center">
        <div className="agri-container max-w-md w-full">
          
          <div className="agri-card p-6 sm:p-8 bg-white border border-agri-border shadow-card">
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-agri-light text-agri-primary mx-auto flex items-center justify-center mb-3">
                <Sprout className="w-6 h-6" />
              </div>
              <h1 className="font-poppins font-bold text-2xl text-agri-dark">
                {language === 'hi' ? 'एग्रीरेंट में लॉग इन करें' : 'Login to AgriRent'}
              </h1>
              <p className="text-xs text-agri-muted mt-1">
                {language === 'hi' ? 'उपकरण किराए पर लेने या प्रबंधित करने के लिए अपने खाते में प्रवेश करें' : 'Access your farm rentals or manage your equipment fleet'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-agri-text mb-1">
                  {t('yourEmail')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. manoj.owner@agrirent.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-medium text-agri-text focus:outline-none focus:border-agri-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agri-text mb-1">
                  {language === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-agri-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                    <span>{language === 'hi' ? 'सत्यापित किया जा रहा है...' : 'Authenticating...'}</span>
                  </>
                ) : (
                  <>
                    <span>{t('navLogin')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switch to sign up */}
            <div className="mt-6 pt-4 border-t border-agri-borderLight text-center text-xs text-agri-muted">
              <span>{language === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"} </span>
              <Link to="/signup" className="font-semibold text-agri-primary hover:underline">
                {t('navSignUp')}
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
