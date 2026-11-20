import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    navHome: 'Home',
    navBrowse: 'Browse Equipment',
    navHowItWorks: 'How It Works',
    navFarmingGuide: 'Farming Guide',
    navAbout: 'About Us',
    navContact: 'Contact',
    navListEquipment: 'List Equipment',
    navLogin: 'Login',
    navSignUp: 'Sign Up',
    navFarmerDashboard: 'Farmer Dashboard',
    navOwnerDashboard: 'Owner Dashboard',
    navSignOut: 'Sign Out',
    navSwitchRole: 'Switch Role',

    // Hero Section
    heroBadge: "India's Farm Machinery Network",
    heroHeadline1: 'Rent Verified',
    heroHeadline2: 'Farm Equipment',
    heroHeadline3: 'Direct from Owners.',
    heroSubtext: 'Access modern tractors, combine harvesters, rotavators, and precision seed drills near your farm. Cut machinery capital costs, book on-demand, and maximize crop yield.',
    btnFindEquipment: 'Find Equipment',
    btnListEquipment: 'List Your Equipment',
    searchKeywordPlaceholder: 'Search equipment, brand, model (e.g. 50 HP Tractor)...',
    allCategories: 'All Categories',
    allLocations: 'All Locations',
    searchBtn: 'Search',
    trustVerified: 'Direct Owner Tariffs',
    trustPricing: 'Field-Ready Machinery',
    trustBooking: 'Hassle-Free Booking',
    cardTractorAvail: 'Field Ready Fleet',
    cardStartingRate: 'From ₹1,200/day',
    cardLocation: 'Malwa & Nimar Region',

    // Categories
    catBadge: 'Machinery Classification',
    catHeading: 'Popular Equipment Categories',
    catSubheading: 'Explore high-performance farm machinery classified by agricultural operations.',
    viewAllCategories: 'View All Categories',
    catTractor: 'Tractors',
    catHarvester: 'Harvesters',
    catRotavator: 'Rotavators',
    catCultivator: 'Cultivators',
    catSeedDrill: 'Seed Drills',
    catSprayer: 'Boom Sprayers',
    catPlough: 'Plough & Tillage',
    catOther: 'Other Implements',

    // How It Works
    howBadge: 'Transparent Process',
    howHeading: 'How AgriRent Works',
    howSubheading: 'Built specifically for Indian farmers and machinery owners to cooperate with zero middlemen.',
    tabForFarmers: 'For Farmers (Renting)',
    tabForOwners: 'For Equipment Owners (Listing)',
    farmerStep1Title: '1. Search & Select',
    farmerStep1Desc: 'Browse verified tractors and implements near your village. Filter by category, horsepower, and rental rate.',
    farmerStep2Title: '2. Choose Dates',
    farmerStep2Desc: 'Select your sowing or harvesting dates and specify whether you prefer farm trailer delivery or self pickup.',
    farmerStep3Title: '3. Coordinate Directly',
    farmerStep3Desc: 'Connect directly with the machine owner to confirm arrival time and field readiness.',
    farmerStep4Title: '4. Complete Field Work',
    farmerStep4Desc: 'Operate the machinery on your farm and return upon completion with transparent, pre-agreed billing.',
    ownerStep1Title: '1. List Your Machinery',
    ownerStep1Desc: 'Add your tractor or implement with clear specifications, location, and your preferred daily rental price.',
    ownerStep2Title: '2. Receive Booking Requests',
    ownerStep2Desc: 'Get instant notifications from nearby farmers who require equipment for specific dates.',
    ownerStep3Title: '3. Accept & Deploy',
    ownerStep3Desc: 'Accept requests that match your equipment availability schedule during off-peak days.',
    ownerStep4Title: '4. Earn Predictable Income',
    ownerStep4Desc: 'Monetize idle machinery, offset annual loan EMIs, and build trusted local farming relationships.',

    // Featured Equipment
    featuredBadge: 'Featured Fleet',
    featuredHeading: 'Top Rated & Ready for Deployment',
    featuredSubheading: 'Inspected machinery available for immediate rental across your region.',
    btnBrowseAll: 'Browse All Equipment',
    btnExploreFullCatalog: 'Explore Full Equipment Catalog',
    pricePerDay: '/ Day',
    availableNow: 'Available Now',
    unavailable: 'Currently In Use',
    viewDetails: 'View Details',
    rentNow: 'Rent Now',
    powerSpec: 'Power',
    fuelSpec: 'Fuel',
    verifiedOwner: 'Verified Owner',

    // Why Choose AgriRent / Benefits
    whyBadge: 'Agricultural Economics',
    whyHeading: 'Why Rent Farm Machinery Instead of Buying?',
    whySubheading: 'Avoid massive capital overhead, heavy bank debt, and costly off-season maintenance.',
    benefit1Title: 'Save Up to 80% Capital Expenditure',
    benefit1Desc: 'A new 50 HP tractor with basic implements costs ₹8–12 Lakhs. Renting allows marginal and small farmers to access the exact same mechanization for only a few thousand rupees per season.',
    benefit2Title: 'Zero Off-Season Depreciation & Storage',
    benefit2Desc: 'Specialized tools like combine harvesters and laser levelers run for only 15–30 days a year. Renting eliminates the burden of year-round bank interest, rust, and barn storage.',
    benefit3Title: 'Access Modern, High-Tech Implements',
    benefit3Desc: 'Use advanced reversible MB ploughs, super seeders, and high-clearance boom sprayers without risking personal capital on unproven machines.',
    benefit4Title: 'Direct Farmer-to-Owner Trust',
    benefit4Desc: 'Every equipment listing includes verified specs, actual photographs, and direct telephone coordination with the local machine owner.',

    // Farming Guide Preview & Hub
    guideBadge: 'Krishi Gyan • Advisory',
    guideHeading: 'Practical Farming & Machinery Guide',
    guideSubheading: 'Credible, field-tested guidance on tractor horsepower selection, seed drill calibration, soil tillage, and seasonal maintenance.',
    viewAllGuides: 'View All Farming Guides',
    readArticle: 'Read Full Guide',
    verifiedAdvice: 'ICAR / KVK Aligned',
    advisoryNoticeTitle: 'Agronomic Advisory:',
    advisoryNoticeText: 'These articles provide technical and operational guidelines. For specific local soil tests, fertilizer doses, and seed varieties, always consult your nearest Krishi Vigyan Kendra (KVK) or State Agricultural Department officer.',
    filterTopics: 'Filter Topic:',
    searchGuidesPlaceholder: 'Search topics (e.g. tractor HP, rotavator, soil preparation, government schemes)...',
    closeGuide: 'Close Article',
    publishedBy: 'AgriRent Agronomy & Mechanization Research Group',

    // Final CTA
    ctaBadge: 'Get Started Today',
    ctaHeading: 'Ready to Mechanize Your Farm Operations?',
    ctaSubtext: 'Join progressive farmers across Madhya Pradesh and India renting reliable machinery and increasing their per-acre profitability.',

    // Catalog Page
    catalogBadge: 'Machinery Marketplace',
    catalogHeading: 'Find the Right Equipment for Your Farm',
    catalogSubheading: 'Browse verified tractors, harvesters, tillers, and precision attachments near you.',
    filterTitle: 'Filter Machinery',
    filterCategory: 'Category',
    filterLocation: 'Location',
    filterMaxPrice: 'Max Daily Rate',
    filterMinRating: 'Minimum Rating',
    filterAvailabilityOnly: 'Show Available Only',
    resetFilters: 'Reset All Filters',
    sortBy: 'Sort by:',
    sortRecommended: 'Recommended',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Highest Rated',
    activeFilters: 'Active filters:',
    showingResults: 'Showing',
    ofResults: 'of',
    machines: 'machines',
    loadMore: 'Load More Equipment',
    noMatchingEquipment: 'No equipment matches your search criteria. Try adjusting your filters or search term.',

    // Equipment Details Page
    backToCatalog: 'Back to Equipment Catalog',
    securityDeposit: 'Refundable Security Deposit',
    dailyRate: 'Daily Rental Rate',
    rentDurationDays: 'Rental Duration (Days)',
    calculateRental: 'Calculate Rental Cost',
    subtotalAmount: 'Equipment Rental Subtotal',
    serviceFee: 'Platform & Support Fee (5%)',
    estimatedTotal: 'Estimated Total Payable',
    proceedBooking: 'Proceed to Booking',
    contactOwner: 'Contact Machine Owner',
    ownerVerifiedBadge: 'Verified Machinery Owner',
    ownerMemberSince: 'Member Since',
    equipmentOverview: 'Equipment Overview',
    specifications: 'Technical Specifications',
    keyFeatures: 'Key Features & Implements',
    similarEquipment: 'Similar Equipment in this Category',

    // Booking Page
    bookingHeading: 'Complete Your Equipment Booking',
    bookingSubheading: 'Review rental schedule, delivery preferences, and confirm your reservation.',
    stepDates: '1. Rental Schedule',
    startDateLabel: 'Start Date',
    endDateLabel: 'End Date',
    stepDelivery: '2. Delivery Preference',
    trailerDeliveryTitle: 'Farm Trailer Delivery (+₹450)',
    trailerDeliveryDesc: 'The owner transports the machinery directly to your field on a tractor-trolley or trailer.',
    selfPickupTitle: 'Self Pickup (Free)',
    selfPickupDesc: 'You or your driver pick up and return the machinery directly from the owner’s farm yard.',
    stepFarmerInfo: '3. Farmer & Field Location',
    farmerNameLabel: 'Farmer Full Name',
    farmerPhoneLabel: 'Contact Mobile Number',
    villageLabel: 'Village / Farm Address',
    districtLabel: 'District',
    stateLabel: 'State',
    pincodeLabel: 'Pincode',
    fieldNotesLabel: 'Field Notes or Landmark (Optional)',
    stepPayment: '4. Payment & Confirmation',
    payUpi: 'UPI / QR Code',
    payCod: 'Cash on Field Handover (COD)',
    payNetbanking: 'Net Banking / IMPS',
    confirmBookingAction: 'Confirm Machinery Booking',
    bookingSuccessTitle: 'Booking Request Submitted Successfully!',
    bookingSuccessMsg: 'Your booking has been registered. The machine owner will contact you shortly to coordinate handover.',
    viewInDashboard: 'Go to Farmer Dashboard',

    // Dashboards
    farmerDashboardTitle: 'Farmer Dashboard',
    ownerDashboardTitle: 'Owner Dashboard',
    overviewTab: 'Overview',
    bookingsTab: 'My Bookings',
    savedTab: 'Saved Equipment',
    profileTab: 'Farmer Profile',
    fleetTab: 'My Machinery Fleet',
    requestsTab: 'Rental Requests',
    earningsTab: 'Earnings & Payouts',
    totalBookingsMetric: 'Total Bookings',
    activeRentalsMetric: 'Active Rentals',
    savedMachinesMetric: 'Saved Machines',
    totalEarningsMetric: 'Total Rental Earnings',
    fleetCountMetric: 'Listed Machinery',
    pendingRequestsMetric: 'Pending Requests',
    acceptRequest: 'Accept Request',
    rejectRequest: 'Decline',
    statusConfirmed: 'Confirmed',
    statusActive: 'Active in Field',
    statusCompleted: 'Completed',
    statusPending: 'Pending Approval',

    // Add Equipment Page
    addEquipmentHeading: 'List Your Farm Machinery for Rent',
    addEquipmentSubheading: 'Earn predictable seasonal income from your tractors, harvesters, and field attachments.',
    machineryNameLabel: 'Machinery Name & Model',
    machineryCategoryLabel: 'Machinery Category',
    machineryBrandLabel: 'Brand / Manufacturer',
    machineryPriceLabel: 'Daily Rental Rate (₹ / day)',
    machineryDepositLabel: 'Security Deposit (₹)',
    machineryLocationLabel: 'Equipment Location (City/District)',
    machineryHpLabel: 'Horsepower (e.g. 50 HP)',
    machineryFuelLabel: 'Fuel Type',
    machineryYearLabel: 'Manufacturing Year',
    machineryDescLabel: 'Machinery Description & Condition',
    photoUploadTitle: 'Equipment Photograph',
    submitListingAction: 'Submit Equipment Listing',
    listingSuccessMsg: 'Equipment listed successfully and is now visible in the catalog.',

    // About Page
    aboutHeading: 'Empowering Indian Agriculture Through Mechanization',
    aboutSubheading: 'AgriRent bridges the gap between machinery owners and marginal farmers, making modern farm tools accessible and affordable to all.',
    missionTitle: 'Our Mission',
    missionDesc: 'To ensure that no Indian farmer is forced to compromise on seasonal crop yield due to the lack of access to tractors and modern implements.',
    pillar1Title: 'Affordability',
    pillar1Desc: 'Cut machinery expenditure by paying only for actual working days without debt burdens.',
    pillar2Title: 'Transparency',
    pillar2Desc: 'Upfront rates, verified equipment conditions, and zero hidden charges.',
    pillar3Title: 'Rural Mechanization',
    pillar3Desc: 'Promote precision agriculture across smallholdings through custom hiring principles.',

    // Contact Page
    contactHeading: 'Get in Touch with AgriRent',
    contactSubheading: 'Have a question about renting machinery or listing your fleet? Our support team is here to assist you.',
    sendMessageTitle: 'Send Us a Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone Number',
    subject: 'Subject',
    message: 'Message',
    sendMessageAction: 'Submit Message',
    contactSuccess: 'Your message has been sent successfully. We will respond within 24 hours.',
    faqTitle: 'Frequently Asked Questions (FAQ)',

    // General & Status
    loading: 'Loading farm machinery...',
    noResults: 'No equipment found matching criteria.',
    langEnglish: 'English',
    langHindi: 'हिन्दी'
  },
  hi: {
    // Navigation
    navHome: 'होम',
    navBrowse: 'कृषि उपकरण देखें',
    navHowItWorks: 'यह कैसे काम करता है',
    navFarmingGuide: 'कृषि मार्गदर्शक',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क करें',
    navListEquipment: 'उपकरण जोड़ें',
    navLogin: 'लॉग इन',
    navSignUp: 'साइन अप',
    navFarmerDashboard: 'किसान डैशबोर्ड',
    navOwnerDashboard: 'मालिक डैशबोर्ड',
    navSignOut: 'लॉग आउट',
    navSwitchRole: 'भूमिका बदलें',

    // Hero Section
    heroBadge: 'भारत का प्रमुख कृषि मशीनरी नेटवर्क',
    heroHeadline1: 'सत्यापित कृषि उपकरण',
    heroHeadline2: 'किराए पर लें',
    heroHeadline3: 'सीधे स्थानीय मालिकों से।',
    heroSubtext: 'अपने खेत के पास उपलब्ध आधुनिक ट्रैक्टर, कंबाइन हार्वेस्टर, रोटावेटर और सीड ड्रिल खोजें। पूंजी बचाएं, पारदर्शी दैनिक दरें दें और अधिक उपज पाएं।',
    btnFindEquipment: 'उपकरण खोजें',
    btnListEquipment: 'अपना उपकरण जोड़ें',
    searchKeywordPlaceholder: 'उपकरण, ब्रांड या मॉडल खोजें (जैसे: 50 HP ट्रैक्टर)...',
    allCategories: 'सभी श्रेणियां',
    allLocations: 'सभी स्थान',
    searchBtn: 'खोजें',
    trustVerified: 'सीधी मालिक दरें',
    trustPricing: 'जांची-परखी मशीनें',
    trustBooking: 'आसान बुकिंग प्रक्रिया',
    cardTractorAvail: 'खेत के लिए तैयार',
    cardStartingRate: '₹1,200/दिन से शुरू',
    cardLocation: 'मालवा एवं निमाड़ क्षेत्र',

    // Categories
    catBadge: 'मशीनरी वर्गीकरण',
    catHeading: 'लोकप्रिय उपकरण श्रेणियां',
    catSubheading: 'खेती के प्रमुख कार्यों के अनुसार वर्गीकृत आधुनिक कृषि मशीनरी देखें।',
    viewAllCategories: 'सभी श्रेणियां देखें',
    catTractor: 'ट्रैक्टर',
    catHarvester: 'हार्वेस्टर',
    catRotavator: 'रोटावेटर',
    catCultivator: 'कल्टीवेटर',
    catSeedDrill: 'सीड ड्रिल',
    catSprayer: 'बूम स्प्रेयर',
    catPlough: 'हल एवं जुताई उपकरण',
    catOther: 'अन्य कृषि यंत्र',

    // How It Works
    howBadge: 'पारदर्शी कार्यप्रणाली',
    howHeading: 'एग्रीरेंट कैसे काम करता है?',
    howSubheading: 'भारतीय किसानों और उपकरण मालिकों के लिए बिना किसी बिचौलिए के सीधी व्यवस्था।',
    tabForFarmers: 'किसानों के लिए (किराए पर लेना)',
    tabForOwners: 'उपकरण मालिकों के लिए (किराए पर देना)',
    farmerStep1Title: '1. उपकरण खोजें व चुनें',
    farmerStep1Desc: 'अपने गांव के पास उपलब्ध ट्रैक्टर व यंत्र खोजें। श्रेणी, हॉर्सपावर और दैनिक किराए की तुलना करें।',
    farmerStep2Title: '2. तारीख और विकल्प चुनें',
    farmerStep2Desc: 'बुवाई या कटाई की तारीखें तय करें और खेत पर डिलीवरी या स्वयं लाने का विकल्प चुनें।',
    farmerStep3Title: '3. मालिक से सीधा संपर्क',
    farmerStep3Desc: 'मशीन मालिक से सीधे फोन पर बात कर समय और खेत की तैयारी की पुष्टि करें।',
    farmerStep4Title: '4. खेत में काम पूरा करें',
    farmerStep4Desc: 'मशीन का उपयोग करें और कार्य पूरा होने पर तय दरों के अनुसार पारदर्शी भुगतान करें।',
    ownerStep1Title: '1. अपनी मशीनरी जोड़ें',
    ownerStep1Desc: 'अपने ट्रैक्टर या यंत्र का विवरण, स्थान और प्रतिदिन का किराया दर्ज करें।',
    ownerStep2Title: '2. बुकिंग अनुरोध प्राप्त करें',
    ownerStep2Desc: 'आस-पास के किसानों से उनकी आवश्यकतानुसार तारीखों पर बुकिंग के संदेश पाएं।',
    ownerStep3Title: '3. पुष्टि करें और भेजें',
    ownerStep3Desc: 'खाली दिनों में अपनी सुविधा अनुसार बुकिंग स्वीकार करें और मशीन खेत पर भेजें।',
    ownerStep4Title: '4. नियमित आमदनी कमाएं',
    ownerStep4Desc: 'खाली खड़ी मशीन से अतिरिक्त कमाई करें, लोन की किस्तें भरें और स्थानीय साख बनाएं।',

    // Featured Equipment
    featuredBadge: 'विशेष मशीनरी',
    featuredHeading: 'उच्चतम रेटेड एवं उपयोग के लिए तैयार',
    featuredSubheading: 'आपके क्षेत्र के किसानों द्वारा परखी गई और तत्काल किराए के लिए उपलब्ध मशीनें।',
    btnBrowseAll: 'सभी उपकरण देखें',
    btnExploreFullCatalog: 'पूरा कैटलॉग देखें',
    pricePerDay: '/ दिन',
    availableNow: 'उपलब्ध है',
    unavailable: 'वर्तमान में कार्यरत',
    viewDetails: 'विवरण देखें',
    rentNow: 'किराए पर लें',
    powerSpec: 'क्षमता',
    fuelSpec: 'ईंधन',
    verifiedOwner: 'सत्यापित मालिक',

    // Why Choose AgriRent / Benefits
    whyBadge: 'कृषि अर्थशास्त्र',
    whyHeading: 'खरीदने के बजाय किराए पर क्यों लें?',
    whySubheading: 'भारी पूंजी निवेश, बैंक के कर्ज और बेमौसम रखरखाव के खर्च से बचें।',
    benefit1Title: '80% तक पूंजी की बचत',
    benefit1Desc: 'नया 50 HP ट्रैक्टर व उपकरण खरीदने में ₹8–12 लाख लगते हैं। किराए पर लेकर छोटे किसान भी कुछ हजार रुपयों में वही मशीनीकरण प्राप्त कर सकते हैं।',
    benefit2Title: 'बेमौसम कर्ज और घिसावट से मुक्ति',
    benefit2Desc: 'हार्वेस्टर या लेजर लेवलर जैसे यंत्र साल में सिर्फ 15–30 दिन चलते हैं। किराए पर लेने से साल भर का बैंक ब्याज और रखरखाव का तनाव नहीं रहता।',
    benefit3Title: 'आधुनिक और उन्नत यंत्रों तक पहुंच',
    benefit3Desc: 'उन्नत एमबी प्लाउ, सुपर सीडर और हाई-प्रेशर स्प्रेयर का उपयोग बिना खरीदे सीधे खेत में करें।',
    benefit4Title: 'सीधा किसान-मालिक भरोसा',
    benefit4Desc: 'प्रत्येक उपकरण की वास्तविक तस्वीरें, तकनीकी विवरण और मालिक से सीधे संपर्क की पूर्ण सुविधा।',

    // Farming Guide Preview & Hub
    guideBadge: 'कृषि ज्ञान • तकनीकी सलाह',
    guideHeading: 'मशीनरी चयन और खेती की उपयोगी गाइड',
    guideSubheading: 'सही ट्रैक्टर, बुवाई यंत्र, कटाई प्रबंधन, मृदा स्वास्थ्य और सुरक्षा पर सरल व प्रामाणिक मार्गदर्शन।',
    viewAllGuides: 'सभी मार्गदर्शिकाएं देखें',
    readArticle: 'पूरी गाइड पढ़ें',
    verifiedAdvice: 'ICAR / KVK से प्रमाणित',
    advisoryNoticeTitle: 'कृषि सलाह सूचना:',
    advisoryNoticeText: 'यह मार्गदर्शिका सामान्य तकनीकी ज्ञान के लिए है। अपनी मिट्टी, फसल किस्म और उर्वरक मात्रा के लिए हमेशा नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि विभाग से संपर्क करें।',
    filterTopics: 'विषय चुनें:',
    searchGuidesPlaceholder: 'गाइड खोजें (जैसे: ट्रैक्टर HP, रोटावेटर, बुवाई, सरकारी योजनाएं)...',
    closeGuide: 'गाइड बंद करें',
    publishedBy: 'एग्रीरेंट कृषि एवं यंत्रीकरण अध्ययन प्रभाग',

    // Final CTA
    ctaBadge: 'आज ही शुरुआत करें',
    ctaHeading: 'क्या आप खेती में आधुनिक यंत्रों का उपयोग करना चाहते हैं?',
    ctaSubtext: 'हजारों किसानों से जुड़ें जो किराए पर उपकरण लेकर खेती की लागत घटा रहे हैं और मुनाफा बढ़ा रहे हैं।',

    // Catalog Page
    catalogBadge: 'कृषि मशीनरी बाज़ार',
    catalogHeading: 'अपने खेत के लिए सही उपकरण खोजें',
    catalogSubheading: 'अपने आस-पास उपलब्ध प्रमाणित ट्रैक्टर, हार्वेस्टर, रोटावेटर और कृषि यंत्र देखें।',
    filterTitle: 'उपकरण फिल्टर',
    filterCategory: 'श्रेणी',
    filterLocation: 'स्थान',
    filterMaxPrice: 'अधिकतम दैनिक किराया',
    filterMinRating: 'न्यूनतम रेटिंग',
    filterAvailabilityOnly: 'केवल उपलब्ध उपकरण दिखाएं',
    resetFilters: 'सभी फिल्टर हटाएं',
    sortBy: 'क्रमबद्ध करें:',
    sortRecommended: 'सुझाए गए',
    sortPriceAsc: 'किराया: कम से अधिक',
    sortPriceDesc: 'किराया: अधिक से कम',
    sortRating: 'उच्चतम रेटिंग',
    activeFilters: 'सक्रिय फिल्टर:',
    showingResults: 'दिखा रहे हैं',
    ofResults: 'कुल',
    machines: 'मशीनें',
    loadMore: 'और उपकरण देखें',
    noMatchingEquipment: 'आपकी खोज के अनुसार कोई उपकरण नहीं मिला। कृपया फिल्टर या खोज शब्द बदलें।',

    // Equipment Details Page
    backToCatalog: 'उपकरण कैटलॉग पर वापस जाएं',
    securityDeposit: 'वापसी योग्य सुरक्षा जमा',
    dailyRate: 'दैनिक किराया दर',
    rentDurationDays: 'किराया अवधि (दिन)',
    calculateRental: 'किराया लागत गणना',
    subtotalAmount: 'उपकरण किराया योग',
    serviceFee: 'प्लेटफॉर्म व सहायता शुल्क (5%)',
    estimatedTotal: 'कुल अनुमानित देय राशि',
    proceedBooking: 'बुकिंग के लिए आगे बढ़ें',
    contactOwner: 'उपकरण मालिक से बात करें',
    ownerVerifiedBadge: 'सत्यापित उपकरण मालिक',
    ownerMemberSince: 'सदस्यता वर्ष',
    equipmentOverview: 'उपकरण विवरण',
    specifications: 'तकनीकी विशेषताएं',
    keyFeatures: 'प्रमुख खूबियां एवं अटैचमेंट',
    similarEquipment: 'इस श्रेणी के अन्य उपकरण',

    // Booking Page
    bookingHeading: 'उपकरण बुकिंग की पुष्टि करें',
    bookingSubheading: 'किराया समय-सारणी, डिलीवरी प्राथमिकता और पते की जांच कर बुकिंग पूरी करें।',
    stepDates: '1. किराया समय-सारणी',
    startDateLabel: 'प्रारंभ तिथि',
    endDateLabel: 'समाप्ति तिथि',
    stepDelivery: '2. डिलीवरी प्राथमिकता',
    trailerDeliveryTitle: 'खेत पर ट्रेलर डिलीवरी (+₹450)',
    trailerDeliveryDesc: 'उपकरण मालिक ट्रैक्टर-ट्रॉली या ट्रेलर से सीधे आपके खेत तक मशीन पहुंचाएगा।',
    selfPickupTitle: 'स्वयं लेकर जाएं (मुफ़्त)',
    selfPickupDesc: 'आप स्वयं या आपका चालक मालिक के स्थान से मशीन लेकर आएगा और वापस पहुंचाएगा।',
    stepFarmerInfo: '3. किसान एवं खेत का पता',
    farmerNameLabel: 'किसान का पूरा नाम',
    farmerPhoneLabel: 'संपर्क मोबाइल नंबर',
    villageLabel: 'गांव / खेत का पता',
    districtLabel: 'जिला',
    stateLabel: 'राज्य',
    pincodeLabel: 'पिनकोड',
    fieldNotesLabel: 'पहचान का निशान या खेत संबंधी निर्देश',
    stepPayment: '4. भुगतान विकल्प एवं पुष्टि',
    payUpi: 'यूपीआई / क्यूआर कोड (UPI)',
    payCod: 'खेत पर मशीन मिलने पर नकद (COD)',
    payNetbanking: 'नेट बैंकिंग / आईएमपीएस',
    confirmBookingAction: 'बुकिंग सुरक्षित करें',
    bookingSuccessTitle: 'बुकिंग अनुरोध सफलतापूर्वक जमा हुआ!',
    bookingSuccessMsg: 'आपकी बुकिंग दर्ज हो गई है। मशीन मालिक डिलीवरी समन्वय के लिए आपसे जल्द संपर्क करेगा।',
    viewInDashboard: 'किसान डैशबोर्ड देखें',

    // Dashboards
    farmerDashboardTitle: 'किसान डैशबोर्ड',
    ownerDashboardTitle: 'मालिक डैशबोर्ड',
    overviewTab: 'अवलोकन',
    bookingsTab: 'मेरी बुकिंग',
    savedTab: 'सहेजे गए उपकरण',
    profileTab: 'किसान प्रोफाइल',
    fleetTab: 'मेरी मशीनरी सूची',
    requestsTab: 'किराया अनुरोध',
    earningsTab: 'कमाई एवं भुगतान',
    totalBookingsMetric: 'कुल बुकिंग',
    activeRentalsMetric: 'खेत में सक्रिय',
    savedMachinesMetric: 'सहेजे गए उपकरण',
    totalEarningsMetric: 'कुल किराया आय',
    fleetCountMetric: 'सूचीबद्ध मशीनें',
    pendingRequestsMetric: 'लंबित अनुरोध',
    acceptRequest: 'स्वीकार करें',
    rejectRequest: 'अस्वीकार करें',
    statusConfirmed: 'पुष्टित',
    statusActive: 'खेत में सक्रिय',
    statusCompleted: 'पूर्ण',
    statusPending: 'स्वीकृति प्रतीक्षित',

    // Add Equipment Page
    addEquipmentHeading: 'किराए के लिए कृषि उपकरण जोड़ें',
    addEquipmentSubheading: 'अपने ट्रैक्टर, हार्वेस्टर और यंत्रों को किराए पर देकर नियमित मौसमी आमदनी अर्जित करें।',
    machineryNameLabel: 'उपकरण का नाम एवं मॉडल',
    machineryCategoryLabel: 'उपकरण श्रेणी',
    machineryBrandLabel: 'ब्रांड / कंपनी',
    machineryPriceLabel: 'प्रतिदिन किराया दर (₹ / दिन)',
    machineryDepositLabel: 'सुरक्षा जमा राशि (₹)',
    machineryLocationLabel: 'उपकरण का स्थान (शहर/जिला)',
    machineryHpLabel: 'हॉर्सपावर (जैसे: 50 HP)',
    machineryFuelLabel: 'ईंधन प्रकार',
    machineryYearLabel: 'निर्माण वर्ष',
    machineryDescLabel: 'उपकरण का विवरण एवं स्थिति',
    photoUploadTitle: 'उपकरण की तस्वीर',
    submitListingAction: 'उपकरण सूची में जोड़ें',
    listingSuccessMsg: 'उपकरण सफलतापूर्वक जोड़ दिया गया है और अब कैटलॉग में दिखाई दे रहा है।',

    // About Page
    aboutHeading: 'यंत्रीकरण से भारतीय खेती का सशक्तिकरण',
    aboutSubheading: 'एग्रीरेंट उपकरण मालिकों और किसानों के बीच की दूरी मिटाकर आधुनिक कृषि यंत्रों को हर किसान के लिए सुलभ बनाता है।',
    missionTitle: 'हमारा उद्देश्य',
    missionDesc: 'यह सुनिश्चित करना कि किसी भी भारतीय किसान की फसल आधुनिक ट्रैक्टर या यंत्रों के अभाव में प्रभावित न हो।',
    pillar1Title: 'किफायती साधन',
    pillar1Desc: 'कर्ज में डूबे बिना केवल जरूरत के दिनों का किराया देकर आधुनिक मशीनीकरण अपनाएं।',
    pillar2Title: 'पारदर्शिता',
    pillar2Desc: 'स्पष्ट दैनिक किराया, जांची-परखी मशीनें और कोई गुप्त शुल्क नहीं।',
    pillar3Title: 'ग्राम स्तर पर पहुंच',
    pillar3Desc: 'कस्टम हायरिंग केंद्रों की तर्ज पर हर गांव और कस्बे तक आधुनिक यंत्र उपलब्ध कराना।',

    // Contact Page
    contactHeading: 'एग्रीरेंट सहायता केंद्र से संपर्क करें',
    contactSubheading: 'उपकरण किराए पर लेने या सूचीबद्ध करने से संबंधित किसी भी प्रश्न के लिए हमारी टीम तत्पर है।',
    sendMessageTitle: 'हमें संदेश भेजें',
    yourName: 'आपका नाम',
    yourEmail: 'आपकी ईमेल',
    yourPhone: 'आपका मोबाइल नंबर',
    subject: 'विषय',
    message: 'संदेश',
    sendMessageAction: 'संदेश भेजें',
    contactSuccess: 'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम 24 घंटे के भीतर संपर्क करेंगे।',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',

    // General & Status
    loading: 'मशीनरी लोड हो रही है...',
    noResults: 'इस खोज के लिए कोई उपकरण उपलब्ध नहीं है।',
    langEnglish: 'English',
    langHindi: 'हिन्दी'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('agrirent_language');
      return saved === 'hi' ? 'hi' : 'en';
    } catch (e) {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agrirent_language', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
