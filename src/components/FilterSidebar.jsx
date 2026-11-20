import React from 'react';
import { Filter, RotateCcw, Star, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

export default function FilterSidebar({
  filters,
  setFilters,
  onReset,
  totalCount = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  const { language, t } = useLanguage();
  const { categories } = useApp();

  const LOCATIONS = [
    'All Locations',
    'Indore, MP',
    'Dewas, MP',
    'Ujjain, MP',
    'Ratlam, MP',
    'Mandsaur, MP',
    'Bhopal, MP'
  ];

  const CATEGORY_NAMES_HI = {
    'Tractor': 'ट्रैक्टर',
    'Harvester': 'हार्वेस्टर',
    'Rotavator': 'रोटावेटर',
    'Cultivator': 'कल्टीवेटर',
    'Seed Drill': 'सीड ड्रिल',
    'Boom Sprayer': 'बूम स्प्रेयर',
    'Plough & Tillage': 'प्लाउ और जुताई यंत्र',
    'Other Implements': 'अन्य उपकरण'
  };

  const handleCategoryChange = (catName) => {
    setFilters(prev => {
      const exists = prev.categories.includes(catName);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter(c => c !== catName)
          : [...prev.categories, catName]
      };
    });
  };

  return (
    <div className={`agri-card p-5 ${isMobileDrawer ? 'h-full overflow-y-auto' : 'sticky top-24'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-agri-borderLight">
        <div className="flex items-center gap-2 text-agri-text">
          <Filter className="w-4 h-4 text-agri-primary" />
          <h3 className="font-poppins font-semibold text-sm">
            {t('filterTitle')}
          </h3>
          <span className="text-[11px] bg-agri-light text-agri-primary font-bold px-2 py-0.5 rounded-full">
            {totalCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            type="button"
            className="flex items-center gap-1 text-xs text-agri-muted hover:text-agri-primary transition-colors cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
          </button>

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              type="button"
              className="p-1.5 rounded-lg text-agri-muted hover:text-agri-text hover:bg-gray-100"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-agri-muted mb-1.5">
          {t('filterLocation')}
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          className="w-full text-xs font-medium border border-agri-border rounded-xl p-2.5 bg-agri-bg focus:ring-2 focus:ring-agri-primary/20 focus:border-agri-primary outline-none cursor-pointer"
        >
          {LOCATIONS.map(loc => (
            <option key={loc} value={loc}>
              {loc === 'All Locations' && language === 'hi' ? 'सभी स्थान' : loc}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Filter (From MongoDB) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-agri-muted">
            {t('filterCategory')}
          </label>
          {filters.categories.length > 0 && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, categories: [] }))}
              type="button"
              className="text-[11px] text-agri-primary hover:underline"
            >
              {language === 'hi' ? 'साफ़ करें' : 'Clear'}
            </button>
          )}
        </div>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isChecked = filters.categories.includes(cat.name);
            const label = language === 'hi' && CATEGORY_NAMES_HI[cat.name] ? CATEGORY_NAMES_HI[cat.name] : cat.name;
            const count = cat.equipment_count ?? cat.equipmentCount ?? cat.count ?? 0;
            return (
              <label
                key={cat.id || cat._id}
                className="flex items-center justify-between text-xs text-agri-text hover:text-agri-primary cursor-pointer py-1 group"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryChange(cat.name)}
                    className="w-4 h-4 rounded text-agri-primary focus:ring-agri-primary border-agri-border cursor-pointer accent-agri-primary"
                  />
                  <span className={isChecked ? 'font-semibold text-agri-primary' : 'font-medium'}>
                    {label}
                  </span>
                </div>
                <span className="text-[11px] text-agri-muted group-hover:text-agri-primary">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-agri-muted">
            {t('filterMaxPrice')}
          </label>
          <span className="text-xs font-bold text-agri-primary">
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="250"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-agri-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-agri-muted mt-1">
          <span>₹500</span>
          <span>₹5,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-agri-muted mb-2">
          {t('filterMinRating')}
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                filters.minRating === rating
                  ? 'bg-agri-primary text-white border-agri-primary shadow-xs'
                  : 'bg-white border-agri-border text-agri-text hover:border-agri-primary/50'
              }`}
            >
              {rating === 0 ? (
                <span>{language === 'hi' ? 'सभी' : 'All'}</span>
              ) : (
                <>
                  <span>{rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-3 border-t border-agri-borderLight">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-medium text-agri-text">
            {t('filterAvailabilityOnly')}
          </span>
          <input
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyAvailable: e.target.checked }))}
            className="w-4 h-4 rounded text-agri-primary focus:ring-agri-primary border-agri-border cursor-pointer accent-agri-primary"
          />
        </label>
      </div>

      {isMobileDrawer && (
        <div className="mt-5 pt-3 border-t border-agri-borderLight">
          <button
            onClick={onCloseMobileDrawer}
            type="button"
            className="w-full py-3 bg-agri-primary text-white rounded-xl font-semibold text-sm shadow-sm"
          >
            {language === 'hi' ? `परिणाम देखें (${totalCount})` : `Show ${totalCount} Results`}
          </button>
        </div>
      )}

    </div>
  );
}
