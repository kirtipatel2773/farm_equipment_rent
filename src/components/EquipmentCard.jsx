import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Gauge, Fuel, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Rating from './Rating';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function EquipmentCard({ equipment }) {
  const { toggleFavorite, isFavorite } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  const favorite = isFavorite(equipment.id);

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80';

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(equipment.id);
  };

  const handleRentNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking?equipmentId=${equipment.id}`);
  };

  return (
    <div className="agri-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-200">
      <div>
        {/* Card Image and Badges */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Link to={`/equipment/${equipment.id}`} tabIndex={-1}>
            <img
              src={imageFailed ? FALLBACK_IMAGE : (equipment.image || FALLBACK_IMAGE)}
              alt={equipment.name}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          {/* Favorite Heart Button */}
          <button
            onClick={handleHeartClick}
            type="button"
            aria-label={favorite ? "Remove from saved" : "Save equipment"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 hover:scale-110 transition-all shadow-sm z-10 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Category Tag */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-agri-dark/90 text-white backdrop-blur-sm shadow-xs">
            {equipment.category}
          </span>

          {/* Availability Status Badge */}
          <div className="absolute bottom-3 left-3">
            {equipment.available ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {t('availableNow')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs">
                <XCircle className="w-3 h-3 text-amber-600" />
                {t('unavailable')}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Rating and Location */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <Rating rating={equipment.rating} reviews={equipment.reviews} size="xs" />
            <div className="flex items-center gap-1 text-[11px] text-agri-muted truncate">
              <MapPin className="w-3 h-3 text-agri-primary shrink-0" />
              <span className="truncate">{equipment.location}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/equipment/${equipment.id}`} className="block">
            <h3 className="font-poppins font-semibold text-agri-text text-base group-hover:text-agri-primary transition-colors line-clamp-1">
              {equipment.name}
            </h3>
          </Link>

          {/* Brand & Model subtitle */}
          <p className="text-xs text-agri-muted mt-0.5 mb-3 font-medium">
            {equipment.brand} • {equipment.model}
          </p>

          {/* Specs Chips: Horsepower & Fuel */}
          <div className="grid grid-cols-2 gap-2 py-2 border-y border-agri-borderLight text-xs text-agri-muted">
            <div className="flex items-center gap-1.5 truncate">
              <Gauge className="w-3.5 h-3.5 text-agri-primary shrink-0" />
              <span className="truncate">{equipment.horsepower || '50 HP'}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-agri-primary shrink-0" />
              <span className="truncate">{equipment.fuelType || 'Diesel'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Rent Now Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-agri-muted block leading-none">{language === 'hi' ? 'दैनिक किराया' : 'Rental Price'}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-poppins font-bold text-lg text-agri-text">
              ₹{equipment.pricePerDay.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-agri-muted font-medium">{t('pricePerDay')}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to={`/equipment/${equipment.id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-agri-muted hover:text-agri-primary hover:bg-agri-bg transition-colors"
          >
            {t('viewDetails')}
          </Link>
          <button
            onClick={handleRentNow}
            type="button"
            className="px-3.5 py-2 rounded-xl bg-agri-primary text-white font-semibold text-xs hover:bg-agri-primaryHover transition-all shadow-subtle active:scale-95 cursor-pointer"
          >
            {t('rentNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
