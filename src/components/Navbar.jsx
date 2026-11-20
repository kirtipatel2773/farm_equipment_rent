import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  Menu, 
  X, 
  PlusCircle, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown,
  Repeat,
  Languages,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, switchRole, logout } = useApp();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer and dropdown when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navBrowse'), path: '/equipment' },
    { name: t('navFarmingGuide'), path: '/farming-guide' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-agri-border shadow-subtle transition-all">
      <div className="agri-container">
        <div className="flex items-center justify-between h-18 py-2">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-agri-primary"
            aria-label="AgriRent Home"
          >
            <div className="w-10 h-10 rounded-xl bg-agri-light flex items-center justify-center text-agri-primary border border-agri-primary/20 group-hover:bg-agri-primary group-hover:text-white transition-all duration-200">
              <Sprout className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-xl tracking-tight text-agri-dark leading-none">
                Agri<span className="text-agri-primary">Rent</span>
              </span>
              <span className="text-[11px] font-medium text-agri-muted tracking-normal mt-0.5">
                {language === 'hi' ? 'कृषि उपकरण रेंटल' : 'Farm Equipment Rental'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-agri-primary bg-agri-light font-bold'
                      : 'text-agri-text hover:text-agri-primary hover:bg-agri-bg'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Actions: Language Selector, Auth, Prominent Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-agri-border bg-agri-bg hover:bg-agri-light/60 hover:border-agri-primary/40 text-xs font-semibold text-agri-text transition-all cursor-pointer"
              title={language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
              aria-label="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-agri-primary" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* User Session or Auth Links */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl border border-agri-border hover:border-agri-primary/40 bg-white transition-all cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPeaz2Vb0qYXctwSinAEZRRXEuKZb72VtXUVfcatH8wA&s=10'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-agri-border"
                  />
                  <div className="text-left leading-tight hidden lg:block">
                    <span className="block text-xs font-semibold text-agri-text truncate max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-agri-primary font-bold uppercase tracking-wider">
                      {user.role === 'owner' ? (language === 'hi' ? 'मालिक' : 'Owner') : (language === 'hi' ? 'किसान' : 'Farmer')}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-agri-muted transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-dropdown border border-agri-border py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-agri-borderLight">
                      <p className="text-xs font-semibold text-agri-text truncate">{user.name}</p>
                      <p className="text-[11px] text-agri-muted truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-agri-light text-agri-primary">
                        {user.role === 'owner' ? 'Equipment Owner' : 'Farmer / Renter'}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={user.role === 'owner' ? '/owner-dashboard' : '/dashboard'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-agri-text hover:bg-agri-light/60 hover:text-agri-primary transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-agri-primary" />
                        <span>{user.role === 'owner' ? t('navOwnerDashboard') : t('navFarmerDashboard')}</span>
                      </Link>

                      {/* <button
                        type="button"
                        onClick={() => {
                          const nextRole = user.role === 'owner' ? 'farmer' : 'owner';
                          switchRole(nextRole);
                          setUserDropdownOpen(false);
                          navigate(nextRole === 'owner' ? '/owner-dashboard' : '/dashboard');
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-agri-text hover:bg-agri-light/60 hover:text-agri-primary transition-colors cursor-pointer"
                      >
                        <Repeat className="w-4 h-4 text-agri-accent" />
                        <span>
                          {language === 'hi' 
                            ? `बदलें: ${user.role === 'owner' ? 'किसान' : 'मालिक'}` 
                            : `Switch to ${user.role === 'owner' ? 'Farmer' : 'Owner'}`}
                        </span>
                      </button> */}
                    </div>

                    <div className="pt-1 border-t border-agri-borderLight">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('navSignOut')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 text-xs lg:text-sm font-semibold text-agri-text hover:text-agri-primary transition-colors"
              >
                {t('navLogin')}
              </Link>
            )}

            {/* Prominent Action Button */}
            <Link
              to={user ? "/add-equipment" : "/signup"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white text-xs lg:text-sm font-semibold shadow-sm transition-all duration-150 active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{user ? t('navListEquipment') : (language === 'hi' ? 'शुरू करें' : 'Get Started')}</span>
            </Link>

          </div>

          {/* Mobile Right Controls: Language Button & Accessible Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              type="button"
              className="px-2.5 py-1.5 rounded-lg border border-agri-border text-xs font-bold text-agri-primary bg-agri-light active:bg-agri-lightHover"
              aria-label="Toggle Language"
            >
              {language === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-agri-text hover:bg-agri-light/60 active:bg-agri-light focus:outline-none focus-visible:ring-2 focus-visible:ring-agri-primary"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-agri-dark" /> : <Menu className="w-6 h-6 text-agri-dark" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-18 bg-white border-b border-agri-border shadow-dropdown px-4 pt-4 pb-6 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          
          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-light text-agri-primary font-bold'
                      : 'text-agri-text hover:bg-agri-bg'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User Session or Mobile Actions */}
          <div className="pt-3 border-t border-agri-border space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-agri-bg border border-agri-border">
                  <img
                    src={user.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPeaz2Vb0qYXctwSinAEZRRXEuKZb72VtXUVfcatH8wA&s=10'}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-agri-border"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold text-agri-text truncate">{user.name}</p>
                    <span className="text-[10px] font-bold uppercase text-agri-primary">
                      {user.role === 'owner' ? 'Equipment Owner' : 'Farmer'}
                    </span>
                  </div>
                </div>

                <Link
                  to={user.role === 'owner' ? '/owner-dashboard' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-agri-primary text-white text-sm font-semibold shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{user.role === 'owner' ? t('navOwnerDashboard') : t('navFarmerDashboard')}</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  {/* <button
                    type="button"
                    onClick={() => {
                      switchRole(user.role === 'owner' ? 'farmer' : 'owner');
                      setMobileMenuOpen(false);
                    }}
                    className="py-2.5 px-3  rounded-xl border border-agri-border text-xs font-semibold text-agri-text hover:bg-gray-50 flex items-center justify-center gap-1.5"
                  >
                    <Repeat className="w-3.5 h-3.5 text-agri-accent" />
                    <span>{user.role === 'owner' ? 'Switch to Farmer' : 'Switch to Owner'}</span>
                  </button> */}

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="py-2.5 px-3 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('navSignOut')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-3 rounded-xl border border-agri-border text-sm font-semibold text-agri-text hover:bg-agri-bg"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-3 rounded-xl bg-agri-primary text-white text-sm font-semibold shadow-sm"
                >
                  {t('navSignUp')}
                </Link>
              </div>
            )}

            {/* List Equipment Link */}
            <Link
              to="/add-equipment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-agri-light text-agri-dark text-sm font-semibold border border-agri-primary/20"
            >
              <PlusCircle className="w-4 h-4 text-agri-primary" />
              <span>{t('navListEquipment')}</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
