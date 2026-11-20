import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonial() {
  const testimonials = [
    {
      name: 'Ramesh Patel',
      role: 'Wheat & Soybean Farmer, Indore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'AgriRent has made my farming work so much easier. I rented a John Deere tractor for sowing season and the whole process was smooth, transparent, and significantly more affordable than local brokers.',
      verified: true,
      equipmentRented: 'John Deere 5050 D'
    },
    {
      name: 'Harpal Singh',
      role: 'Crop Cultivator, Dewas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'During the peak harvest window, finding a combine harvester is normally a nightmare. With AgriRent, I reserved one a week in advance. Machine arrived on time with an expert operator!',
      verified: true,
      equipmentRented: 'Mahindra Combine Harvester'
    },
    {
      name: 'Dharmendra Patidar',
      role: 'Progressive Farmer, Ujjain',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'I also list my Shaktiman rotavator on AgriRent when I am not using it. It has given me an additional ₹28,000 extra income every single month. Highly recommended platform.',
      verified: true,
      equipmentRented: 'Shaktiman Rotavator'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-wider text-agri-primary bg-agri-light px-3.5 py-1 rounded-full inline-block mb-3">
            Farmer Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-agri-text">
            Trusted by Thousands of Farmers
          </h2>
          <p className="text-sm sm:text-base text-agri-muted mt-2">
            Real stories from farmers across Madhya Pradesh who transformed their harvest economics with AgriRent.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-agri-bg rounded-2xl p-6 sm:p-7 border border-agri-border shadow-card hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-agri-primary/20" />
                </div>

                {/* Quote Text */}
                <p className="text-agri-text text-sm leading-relaxed mb-6 font-medium italic">
                  "{t.content}"
                </p>
              </div>

              {/* Farmer Info */}
              <div className="pt-4 border-t border-agri-border flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-agri-primary"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-poppins font-semibold text-sm text-agri-text truncate">
                      {t.name}
                    </h4>
                    {t.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-agri-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-agri-muted truncate">{t.role}</p>
                  <p className="text-[11px] text-agri-primary font-medium mt-0.5">
                    Rented: {t.equipmentRented}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
