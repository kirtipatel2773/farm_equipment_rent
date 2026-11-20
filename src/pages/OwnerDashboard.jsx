import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Tractor, 
  Inbox, 
  IndianRupee, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2, 
  Power, 
  LogOut,
  MapPin,
  CalendarCheck
} from 'lucide-react';

export default function OwnerDashboard() {
  const { 
    user, 
    equipmentList, 
    ownerRequests, 
    ownerFleet,
    toggleEquipmentAvailability, 
    deleteEquipment, 
    updateRequestStatus, 
    logout 
  } = useApp();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet', 'requests', 'earnings'

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Real database fleet and requests calculation
  const ownerEquipment = ownerFleet && ownerFleet.length > 0
    ? ownerFleet
    : equipmentList.filter(e => String(e.owner_id) === String(user?.id) || String(e.owner?.id) === String(user?.id));

  const pendingRequests = ownerRequests.filter(r => 
    r.status && (r.status.toLowerCase() === 'pending')
  );

  const acceptedRequests = ownerRequests.filter(r => 
    r.status && ['accepted', 'confirmed', 'completed'].includes(r.status.toLowerCase())
  );

  // Exact earnings calculated directly from database records
  const totalEarnings = acceptedRequests.reduce((sum, r) => 
    sum + (Number(r.amount) || Number(r.totalAmount) || 0), 0
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user.name || user.full_name || 'Owner';

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
                    src={user?.avatar || user?.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'}
                    alt={displayName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-agri-primary"
                  />
                  <div className="overflow-hidden">
                    <h3 className="font-poppins font-semibold text-sm text-agri-text truncate">
                      {displayName}
                    </h3>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800">
                      {language === 'hi' ? 'उपकरण मालिक' : 'Machinery Owner'}
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <nav className="space-y-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('fleet')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'fleet' ? 'bg-agri-primary text-white shadow-xs' : 'text-agri-text hover:bg-agri-bg hover:text-agri-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Tractor className="w-4 h-4" />
                      <span>{t('fleetTab')}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'fleet' ? 'bg-white/20 text-white' : 'bg-agri-bg text-agri-muted'}`}>
                      {ownerEquipment.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('requests')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'requests' ? 'bg-agri-primary text-white shadow-xs' : 'text-agri-text hover:bg-agri-bg hover:text-agri-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Inbox className="w-4 h-4" />
                      <span>{t('requestsTab')}</span>
                    </div>
                    {pendingRequests.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                        {pendingRequests.length}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('earnings')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'earnings' ? 'bg-agri-primary text-white shadow-xs' : 'text-agri-text hover:bg-agri-bg hover:text-agri-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IndianRupee className="w-4 h-4" />
                      <span>{t('earningsTab')}</span>
                    </div>
                  </button>
                </nav>

                {/* Actions */}
                <div className="pt-4 border-t border-agri-borderLight space-y-2">
                  <Link
                    to="/add-equipment"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-agri-primary text-white text-xs font-semibold hover:bg-agri-primaryHover transition-colors shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{t('navListEquipment')}</span>
                  </Link>

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
                    {t('ownerDashboardTitle')}
                  </h1>
                  <p className="text-xs text-agri-muted mt-0.5">
                    {language === 'hi' ? 'अपने कृषि उपकरणों की उपलब्धता, बुकिंग और कमाई का प्रबंधन करें' : 'Manage your listed machinery fleet, rental requests, and earnings'}
                  </p>
                </div>

                <Link
                  to="/add-equipment"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-primary hover:bg-agri-primaryHover text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('navListEquipment')}</span>
                </Link>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-agri-light text-agri-primary flex items-center justify-center">
                    <Tractor className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('fleetCountMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-agri-text">{ownerEquipment.length}</span>
                  </div>
                </div>

                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('pendingRequestsMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-amber-700">{pendingRequests.length}</span>
                  </div>
                </div>

                <div className="agri-card p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-agri-muted block">{t('totalEarningsMetric')}</span>
                    <span className="font-poppins font-bold text-xl text-emerald-700">₹{totalEarnings.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* TAB 1: Fleet Management */}
              {activeTab === 'fleet' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-base text-agri-text">
                      {t('fleetTab')} ({ownerEquipment.length})
                    </h3>
                  </div>

                  {ownerEquipment.length === 0 ? (
                    <div className="agri-card p-8 text-center space-y-3 bg-white border border-agri-border">
                      <Tractor className="w-12 h-12 text-agri-muted mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-semibold text-agri-text">
                        {language === 'hi' ? 'वर्तमान में कोई उपकरण सूचीबद्ध नहीं है।' : 'No machinery in your fleet yet.'}
                      </p>
                      <p className="text-xs text-agri-muted">
                        {language === 'hi' ? 'नीचे दिए गए बटन पर क्लिक करके अपना पहला कृषि उपकरण जोड़ें।' : 'Click the button below to add your first machine to the catalog.'}
                      </p>
                      <Link to="/add-equipment" className="inline-flex items-center gap-2 px-5 py-2.5 bg-agri-primary text-white text-xs font-semibold rounded-xl">
                        <PlusCircle className="w-4 h-4" />
                        <span>{t('navListEquipment')}</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {ownerEquipment.map((item) => (
                        <div
                          key={item.id}
                          className="agri-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-agri-border shrink-0"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-poppins font-bold text-sm text-agri-text">
                                  {item.name}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  item.available ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {item.available ? t('availableNow') : t('unavailable')}
                                </span>
                              </div>
                              <p className="text-xs text-agri-muted">
                                {item.category} • {item.horsepower || '50 HP'} • {item.location}
                              </p>
                              <p className="text-xs font-semibold text-agri-primary">
                                ₹{(item.pricePerDay || 1000).toLocaleString('en-IN')}{t('pricePerDay')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 justify-end">
                            <button
                              onClick={() => toggleEquipmentAvailability(item.id)}
                              type="button"
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                                item.available
                                  ? 'border-amber-300 text-amber-700 hover:bg-amber-50'
                                  : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                              }`}
                            >
                              <Power className="w-3.5 h-3.5" />
                              <span>{item.available ? (language === 'hi' ? 'ऑफलाइन करें' : 'Mark In Use') : (language === 'hi' ? 'उपलब्ध करें' : 'Mark Available')}</span>
                            </button>

                            <button
                              onClick={() => deleteEquipment(item.id)}
                              type="button"
                              className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete equipment listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Rental Requests */}
              {activeTab === 'requests' && (
                <div className="space-y-4">
                  <h3 className="font-poppins font-semibold text-base text-agri-text">
                    {t('rentalRequests')} ({ownerRequests.length})
                  </h3>

                  {ownerRequests.length === 0 ? (
                    <div className="agri-card p-8 text-center text-xs text-agri-muted bg-white border border-agri-border">
                      {language === 'hi' ? 'डेटाबेस में कोई लंबित अनुरोध नहीं है।' : 'No rental requests in database yet.'}
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {ownerRequests.map((req) => (
                        <div
                          key={req.id}
                          className="agri-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-poppins font-bold text-sm text-agri-text">
                                {req.farmerName}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                req.status === 'Accepted' || req.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : req.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                              }`}>
                                {req.status}
                              </span>
                            </div>
                            <p className="text-xs text-agri-muted">
                              Machinery: <span className="font-semibold text-agri-text">{req.equipmentName}</span> • {req.startDate} to {req.endDate} ({req.days} days)
                            </p>
                            <p className="text-[11px] text-agri-muted flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-agri-primary" />
                              <span>{req.farmerLocation}</span>
                              <span>• Total: ₹{(req.amount || 0).toLocaleString('en-IN')}</span>
                            </p>
                          </div>

                          {req.status === 'Pending' && (
                            <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 justify-end">
                              <button
                                onClick={() => updateRequestStatus(req.id, 'confirmed')}
                                type="button"
                                className="px-3.5 py-1.5 rounded-lg bg-agri-primary text-white text-xs font-semibold hover:bg-agri-primaryHover transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{t('acceptRequest')}</span>
                              </button>
                              <button
                                onClick={() => updateRequestStatus(req.id, 'cancelled')}
                                type="button"
                                className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>{t('rejectRequest')}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Earnings */}
              {activeTab === 'earnings' && (
                <div className="agri-card p-6 bg-white space-y-4">
                  <h3 className="font-poppins font-semibold text-base text-agri-text border-b border-agri-borderLight pb-3">
                    {t('earningsSummary')}
                  </h3>

                  <div className="p-4 rounded-xl bg-agri-bg border border-agri-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-agri-muted">{language === 'hi' ? 'कुल अर्जित किराया (पुष्टि की गई बुकिंग)' : 'Total Revenue Earned (Confirmed Bookings)'}</span>
                      <h4 className="font-poppins font-bold text-2xl text-agri-primary mt-1">₹{totalEarnings.toLocaleString('en-IN')}</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Calculated from MongoDB
                    </span>
                  </div>

                  <p className="text-xs text-agri-muted leading-relaxed">
                    {language === 'hi'
                      ? 'रेंटल शुल्क का भुगतान किसान द्वारा सीधे खेत पर मशीनरी डिलीवरी के समय अथवा ऑनलाइन माध्यम से पूरा किया जाता है।'
                      : 'Payouts are coordinated directly between the renter and machinery owner with zero platform deduction.'}
                  </p>
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
