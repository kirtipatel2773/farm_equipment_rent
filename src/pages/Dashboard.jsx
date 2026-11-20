import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EquipmentCard from '../components/EquipmentCard';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Bookmark, 
  User, 
  LogOut, 
  Clock, 
  Phone, 
  Tractor, 
  Truck 
} from 'lucide-react';

export default function Dashboard() {
  const { user, bookings, favorites, equipmentList, logout } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const savedEquipment = equipmentList.filter((item) => favorites.includes(String(item.id)) || favorites.includes(String(item._id)));
  const activeBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Active' || b.status === 'Pending');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: t('overviewTab'), icon: LayoutDashboard },
    { id: 'bookings', label: t('bookingsTab'), count: bookings.length, icon: CalendarCheck },
    { id: 'saved', label: t('savedTab'), count: savedEquipment.length, icon: Bookmark },
    { id: 'profile', label: t('profileTab'), icon: User },
  ];

  if (!user) return null;

  const displayName = user.name || user.full_name || 'Farmer';
  const displayEmail = user.email || '';
  const displayPhone = user.phone || 'N/A';
  const displayLocation = user.location || 'Indore, MP';

  return (
    <div className="min-h-screen flex flex-col bg-agri-bg">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="agri-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation (3 cols) */}
            <div className="lg:col-span-3">
              <div className="agri-card p-5 bg-white border border-agri-border sticky top-24 space-y-5">
                
                {/* Profile Snapshot */}
                <div className="flex items-center gap-3 pb-4 border-b border-agri-borderLight">
                  <img
                    src={user?.avatar || user?.avatar_url || 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg'}
                    alt={displayName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-agri-primary"
                  />
                  <div className="overflow-hidden">
                    <h3 className="font-poppins font-semibold text-sm text-agri-text truncate">
                      {displayName}
                    </h3>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-agri-light text-agri-primary">
                      {user.role === 'owner' ? (language === 'hi' ? 'उपकरण मालिक' : 'Equipment Owner') : (language === 'hi' ? 'किसान / रेंटर' : 'Farmer / Renter')}
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <nav className="space-y-1 text-xs font-semibold">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? 'bg-agri-primary text-white shadow-xs'
                            : 'text-agri-text hover:bg-agri-bg hover:text-agri-primary'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            isActive ? 'bg-white/20 text-white' : 'bg-agri-bg text-agri-muted'
                          }`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Owner View Link & Logout */}
                <div className="pt-4 border-t border-agri-borderLight space-y-2">
                  {user.role === 'owner' && (
                    <Link
                      to="/owner-dashboard"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-agri-border hover:border-agri-primary text-xs font-semibold text-agri-text hover:bg-agri-bg transition-colors"
                    >
                      <Tractor className="w-3.5 h-3.5 text-agri-primary" />
                      <span>{language === 'hi' ? 'मालिक डैशबोर्ड देखें' : 'Owner Dashboard'}</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('navSignOut')}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Main Content Area (9 cols) */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-agri-dark">
                    {t('farmerDashboardTitle')}
                  </h1>
                  <p className="text-xs text-agri-muted mt-0.5">
                    {language === 'hi' ? 'अपनी कृषि मशीनरी बुकिंग और सहेजे गए यंत्रों का प्रबंधन करें' : 'Manage your machinery reservations, schedules, and bookmarks'}
                  </p>
                </div>

                <Link
                  to="/equipment"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
                >
                  <Tractor className="w-4 h-4" />
                  <span>{t('btnFindEquipment')}</span>
                </Link>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('totalBookingsMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-agri-text">{bookings.length}</span>
                  </div>
                </div>

                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('activeRentalsMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-emerald-700">{activeBookings.length}</span>
                  </div>
                </div>

                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('savedMachinesMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-amber-700">{savedEquipment.length}</span>
                  </div>
                </div>
              </div>

              {/* TAB 1: Overview & Active Bookings */}
              {(activeTab === 'dashboard' || activeTab === 'bookings') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-base text-agri-text">
                      {t('myBookings')}
                    </h3>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="agri-card p-8 text-center space-y-3">
                      <p className="text-xs text-agri-muted">{language === 'hi' ? 'अभी कोई बुकिंग दर्ज नहीं है।' : 'No machinery reservations made yet in database.'}</p>
                      <Link to="/equipment" className="inline-block px-4 py-2 bg-agri-primary text-white text-xs font-semibold rounded-xl">
                        {t('btnFindEquipment')}
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="agri-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <img
                              src={booking.equipmentImage || 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg'}
                              alt={booking.equipmentName}
                              className="w-16 h-16 rounded-xl object-cover border border-agri-border shrink-0"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-poppins font-bold text-sm text-agri-text">
                                  {booking.equipmentName}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  booking.status === 'Confirmed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-agri-light text-agri-primary'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-xs text-agri-muted">
                                Ref: <span className="font-semibold text-agri-text">{booking.bookingReference || booking.id}</span> • {booking.startDate} to {booking.endDate} ({booking.days} days)
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-agri-muted pt-0.5">
                                <span className="flex items-center gap-1">
                                  <Truck className="w-3.5 h-3.5 text-agri-primary" />
                                  {booking.deliveryOption === 'delivery' ? (language === 'hi' ? 'खेत पर डिलीवरी' : 'Trailer Delivery') : (language === 'hi' ? 'स्वयं पिकअप' : 'Self Pickup')}
                                </span>
                                {booking.ownerName && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5 text-agri-primary" />
                                    {booking.ownerName}: {booking.ownerPhone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right border-t md:border-t-0 pt-3 md:pt-0 flex md:flex-col items-center md:items-end justify-between">
                            <span className="text-[11px] text-agri-muted block">{language === 'hi' ? 'कुल भुगतान' : 'Total Amount'}</span>
                            <span className="font-poppins font-bold text-base text-agri-primary">
                              ₹{(booking.totalAmount || booking.amount || 0).toLocaleString('en-IN')}
                            </span>
                            <Link
                              to={`/equipment/${booking.equipmentId}`}
                              className="text-xs font-semibold text-agri-primary hover:underline mt-1 block"
                            >
                              {t('viewDetails')}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Saved Equipment */}
              {activeTab === 'saved' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('savedTab')} ({savedEquipment.length})
                  </h3>
                  {savedEquipment.length === 0 ? (
                    <div className="agri-card p-8 text-center space-y-3">
                      <p className="text-xs text-agri-muted">{language === 'hi' ? 'कोई उपकरण सहेजा नहीं गया है।' : 'No bookmarked machinery.'}</p>
                      <Link to="/equipment" className="inline-block px-4 py-2 bg-agri-primary text-white text-xs font-semibold rounded-xl">
                        {t('btnFindEquipment')}
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedEquipment.map((item) => (
                        <EquipmentCard key={item.id} equipment={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Profile */}
              {activeTab === 'profile' && (
                <div className="agri-card p-6 bg-white space-y-4">
                  <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3">
                    {t('profileTab')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-agri-muted block">{t('farmerNameLabel')}</span>
                      <span className="font-semibold text-agri-text text-sm mt-0.5 block">{displayName}</span>
                    </div>
                    <div>
                      <span className="text-agri-muted block">{t('yourEmail')}</span>
                      <span className="font-semibold text-agri-text text-sm mt-0.5 block">{displayEmail}</span>
                    </div>
                    <div>
                      <span className="text-agri-muted block">{t('farmerPhoneLabel')}</span>
                      <span className="font-semibold text-agri-text text-sm mt-0.5 block">{displayPhone}</span>
                    </div>
                    <div>
                      <span className="text-agri-muted block">{language === 'hi' ? 'पंजीकृत जिला' : 'Region'}</span>
                      <span className="font-semibold text-agri-text text-sm mt-0.5 block">{displayLocation}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
