import React, { useState } from 'react';
import { Search, MapPin, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SearchBar({
  initialQuery = '',
  initialCategory = '',
  onSearch,
  variant = 'hero'
}) {
  const { location, setLocation, categories } = useApp();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, category, location });
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (category) params.set('category', category);
      if (location) params.set('location', location);
      navigate(`/equipment?${params.toString()}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={`w-full ${
        isHero
          ? 'bg-white p-2.5 sm:p-3 rounded-2xl shadow-soft-lg border border-agri-border/80'
          : 'bg-white p-2 rounded-xl border border-agri-border shadow-xs'
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 divide-y md:divide-y-0 md:divide-x divide-agri-border">
        
        {/* Equipment Name / Keyword */}
        <div className="flex-1 flex items-center gap-3 px-3 py-1.5">
          <Search className="w-5 h-5 text-agri-primary shrink-0" />
          <div className="flex-1">
            {isHero && (
              <label className="block text-[10px] uppercase font-bold tracking-wider text-agri-muted">
                What do you need?
              </label>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tractor, rotavator, harvester..."
              className="w-full text-sm text-agri-text placeholder:text-agri-muted/80 bg-transparent focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Category Selector (from MongoDB) */}
        <div className="flex-1 md:max-w-[210px] flex items-center gap-3 px-3 py-1.5">
          <Layers className="w-5 h-5 text-agri-primary shrink-0" />
          <div className="flex-1">
            {isHero && (
              <label className="block text-[10px] uppercase font-bold tracking-wider text-agri-muted">
                Category
              </label>
            )}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm text-agri-text bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id || cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="flex-1 md:max-w-[210px] flex items-center gap-3 px-3 py-1.5">
          <MapPin className="w-5 h-5 text-agri-primary shrink-0" />
          <div className="flex-1">
            {isHero && (
              <label className="block text-[10px] uppercase font-bold tracking-wider text-agri-muted">
                Location
              </label>
            )}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm text-agri-text bg-transparent focus:outline-none font-medium cursor-pointer"
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

        {/* Action Button */}
        <div className="pt-2 md:pt-0 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-agri-primary hover:bg-[#076e35] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </form>
  );
}
