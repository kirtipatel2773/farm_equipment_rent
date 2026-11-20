import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import EquipmentGrid from '../components/EquipmentGrid';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, SlidersHorizontal, ChevronDown, X, Tractor, ArrowUpDown } from 'lucide-react';

export default function Equipment() {
  const { equipmentList } = useApp();
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State from URL
  const initialCategory = searchParams.get('category');
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || 'All Locations';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [visibleCount, setVisibleCount] = useState(9);

  const [filters, setFilters] = useState({
    search: initialSearch,
    categories: initialCategory ? [initialCategory] : [],
    location: initialLocation,
    maxPrice: 5000,
    minRating: 0,
    onlyAvailable: false,
  });

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const locParam = searchParams.get('location');

    setFilters(prev => ({
      ...prev,
      categories: categoryParam ? [categoryParam] : prev.categories,
      search: searchParam !== null ? searchParam : prev.search,
      location: locParam || prev.location
    }));
    if (searchParam !== null) setSearchQuery(searchParam);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      location: 'All Locations',
      maxPrice: 5000,
      minRating: 0,
      onlyAvailable: false,
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const handleRemoveCategory = (cat) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== cat)
    }));
  };

  // Filter and Sort Logic
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      if (filters.location && filters.location !== 'All Locations') {
        const targetCity = filters.location.split(',')[0].toLowerCase().trim();
        if (!item.location.toLowerCase().includes(targetCity)) {
          return false;
        }
      }

      if (item.pricePerDay > filters.maxPrice) {
        return false;
      }

      if (filters.minRating > 0 && item.rating < filters.minRating) {
        return false;
      }

      if (filters.onlyAvailable && !item.available) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [equipmentList, filters, sortBy]);

  const displayedEquipment = filteredEquipment.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="agri-container">
          
          {/* Header Banner */}
          <div className="mb-6 sm:mb-8">
            <span className="agri-badge agri-badge-green mb-2.5">
              <Tractor className="w-3.5 h-3.5" />
              <span>{t('catalogBadge')}</span>
            </span>
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-agri-dark tracking-tight">
              {t('catalogHeading')}
            </h1>
            <p className="text-xs sm:text-sm text-agri-muted mt-1.5 max-w-2xl">
              {t('catalogSubheading')}
            </p>
          </div>

          {/* Search Bar & Mobile Controls Card */}
          <div className="agri-card p-3 sm:p-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Search input form */}
              <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
                <Search className="w-4 h-4 text-agri-primary absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchKeywordPlaceholder')}
                  className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs sm:text-sm text-agri-text focus:outline-none focus:border-agri-primary font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1.5 bg-agri-primary text-white rounded-lg text-xs font-semibold hover:bg-agri-primaryHover transition-all cursor-pointer"
                >
                  {t('searchBtn')}
                </button>
              </form>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                type="button"
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-agri-border bg-agri-bg text-xs font-semibold text-agri-text"
              >
                <SlidersHorizontal className="w-4 h-4 text-agri-primary" />
                <span>
                  {t('filterTitle')} ({filters.categories.length + (filters.minRating > 0 ? 1 : 0) + (filters.onlyAvailable ? 1 : 0)})
                </span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-agri-muted hidden md:inline font-medium">{t('sortBy')}</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-agri-border bg-white text-xs font-semibold text-agri-text focus:outline-none focus:border-agri-primary cursor-pointer"
                  >
                    <option value="recommended">{t('sortRecommended')}</option>
                    <option value="price-low">{t('sortPriceAsc')}</option>
                    <option value="price-high">{t('sortPriceDesc')}</option>
                    <option value="rating">{t('sortRating')}</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-agri-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Active Filters Pill Bar */}
            {(filters.categories.length > 0 || filters.search || filters.minRating > 0 || filters.onlyAvailable || filters.location !== 'All Locations') && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-agri-borderLight text-xs">
                <span className="text-agri-muted font-medium">{t('activeFilters')}</span>
                
                {filters.categories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-agri-light text-agri-primary font-medium text-[11px]"
                  >
                    <span>{c}</span>
                    <button
                      onClick={() => handleRemoveCategory(c)}
                      className="hover:text-agri-dark"
                      aria-label={`Remove ${c}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.search && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-agri-light text-agri-primary font-medium text-[11px]">
                    <span>"{filters.search}"</span>
                    <button onClick={() => { setFilters(prev => ({ ...prev, search: '' })); setSearchQuery(''); }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.location !== 'All Locations' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-agri-light text-agri-primary font-medium text-[11px]">
                    <span>{filters.location}</span>
                    <button onClick={() => setFilters(prev => ({ ...prev, location: 'All Locations' }))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.onlyAvailable && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                    <span>{t('availableNow')}</span>
                    <button onClick={() => setFilters(prev => ({ ...prev, onlyAvailable: false }))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-agri-muted hover:text-agri-primary text-[11px] font-semibold underline ml-2"
                >
                  {t('resetFilters')}
                </button>
              </div>
            )}
          </div>

          {/* Catalog Layout: Desktop Sidebar (3 cols) + Results Grid (9 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                totalCount={filteredEquipment.length}
              />
            </div>

            {/* Results Grid Container */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Results Count Bar */}
              <div className="flex items-center justify-between text-xs text-agri-muted px-1">
                <p>
                  {t('showingResults')}{' '}
                  <span className="font-semibold text-agri-text">{displayedEquipment.length}</span>{' '}
                  {t('ofResults')}{' '}
                  <span className="font-semibold text-agri-text">{filteredEquipment.length}</span>{' '}
                  {t('machines')}
                </p>
              </div>

              {/* Machinery Grid */}
              <EquipmentGrid
                equipment={displayedEquipment}
                columns={3}
                emptyTitle={language === 'hi' ? 'कोई उपकरण नहीं मिला' : 'No Equipment Found'}
                emptyDescription={t('noMatchingEquipment')}
                onResetFilters={handleResetFilters}
              />

              {/* Load More Button */}
              {displayedEquipment.length < filteredEquipment.length && (
                <div className="pt-6 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    type="button"
                    className="px-6 py-2.5 rounded-xl border border-agri-border bg-white hover:bg-agri-bg text-agri-text text-xs sm:text-sm font-semibold transition-all shadow-subtle cursor-pointer"
                  >
                    {t('loadMore')}
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white z-10 p-4 shadow-2xl">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              totalCount={filteredEquipment.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
