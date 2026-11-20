import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FarmingGuideSection from '../components/FarmingGuideSection';
import { useLanguage } from '../context/LanguageContext';

export default function FarmingGuide() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />
      <main className="flex-1 py-10 sm:py-14">
        <FarmingGuideSection />
      </main>
      <Footer />
    </div>
  );
}
