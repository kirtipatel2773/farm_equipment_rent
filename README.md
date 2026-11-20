# AgriRent – Farm Equipment Rental System

> **"Rent the Right Farm Equipment. Grow More."**

AgriRent is a modern, responsive agriculture equipment rental marketplace web application tailored for farmers and machinery owners across India. It connects farmers who need machinery (tractors, combine harvesters, rotavators, cultivators, seed drills, sprayers) with verified local equipment owners, eliminating middlemen brokerage and reducing farming capital expenditure.

---

## 🌾 Key Highlights & Brand Identity

- **Brand Aesthetic**: Modern Agriculture Technology (AgTech) SaaS Startup. Clean white backgrounds with subtle light-green accents (`#087F3E`, `#EAF7EF`), earthy highlights (`#E8B04A`), deep forest footer (`#064E3B`), rounded 14px cards, soft multi-layer shadows, and Poppins typography.
- **Dual Experience**:
  - **Farmer / Renter**: Browse machinery, search by keyword and location, filter by category and price, review full specifications, dynamic day & cost calculation, checkout booking flow with mock UPI/COD, and monitor reservations on the Farmer Dashboard.
  - **Equipment Owner**: Dedicated Owner Hub with fleet management, toggle live availability, accept/reject incoming rental requests, track rental payouts, and list new machinery with instant catalog publication.

---

## 🚀 Technologies Used

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Routing**: React Router v6 (`react-router-dom`)
- **Styling**: Tailwind CSS (with custom brand tokens & Google Fonts Poppins)
- **Icons**: Lucide React (`lucide-react`)
- **State Management & Persistence**: React Context API (`AppContext`) synchronized with browser `localStorage`

---

## 📁 Folder & Project Structure

```text
rentel_system/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── AppContext.jsx          # Central state: equipment, user session, bookings, requests, favorites
│   ├── data/
│   │   └── equipment.js            # 12+ preloaded Indian agricultural machinery items, categories & initial data
│   ├── components/
│   │   ├── Navbar.jsx              # Sticky header with location selector & mobile drawer
│   │   ├── Footer.jsx              # Dark green 5-column footer with contact and social links
│   │   ├── Hero.jsx                # High-impact hero with tractor visual & 4 floating glass UI cards
│   │   ├── SearchBar.jsx           # Multi-criteria search bar (Keyword, Category, Location)
│   │   ├── CategoryCard.jsx        # Category card with hover lift & equipment count
│   │   ├── CategorySection.jsx     # Showcase grid of popular equipment categories
│   │   ├── EquipmentCard.jsx       # Machinery card with heart toggle, specs, rating, price & rent button
│   │   ├── EquipmentGrid.jsx       # Responsive grid (4 desktop / 2 tablet / 1 mobile) + empty state
│   │   ├── FilterSidebar.jsx       # Category checklist, price slider, rating filter & availability toggle
│   │   ├── HowItWorks.jsx          # 4 connected visual steps with circular green badges
│   │   ├── Benefits.jsx            # Why choose AgriRent & stats panel (5,000+ equipment, 10,000+ farmers)
│   │   ├── Testimonial.jsx         # Farmer reviews with avatars and star ratings
│   │   ├── CTASection.jsx          # Conversion banner with quick location picker
│   │   ├── Modal.jsx               # Accessible dialog modal
│   │   ├── EmptyState.jsx          # User-friendly empty state card
│   │   ├── Rating.jsx              # Star rating component
│   │   ├── Button.jsx              # Styled reusable button component
│   │   └── ScrollToTop.jsx         # Automatic viewport scroll reset on route change
│   └── pages/
│       ├── Home.jsx                # Complete landing page
│       ├── Equipment.jsx           # Catalog with search, multi-filters, sorting & mobile drawer
│       ├── EquipmentDetails.jsx    # Machine gallery, technical specs, owner info & dynamic rental calculator
│       ├── Booking.jsx             # 2-step checkout with delivery choices, breakdown & confirmation modal
│       ├── Login.jsx               # Auth page with 1-click demo farmer and owner logins
│       ├── Signup.jsx              # Registration with Farmer vs Owner role selector
│       ├── Dashboard.jsx           # Farmer portal with active rentals, booking history & saved equipment
│       ├── OwnerDashboard.jsx      # Owner hub with fleet stats, request accept/reject & payout history
│       ├── AddEquipment.jsx        # Publishing form with photo presets and live preview
│       ├── About.jsx               # Mission, economic impact & 4 pillars of trust
│       └── Contact.jsx             # Support form, helpline in Indore MP & FAQ accordion
```

---

## 🛠️ Installation & Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production
```bash
npm run build
```
The optimized production build will be generated in the `dist/` directory.

---

## 🚜 Application Features Walkthrough

1. **Home Page (`/`)**:
   - Sticky navbar with brand leaf logo, regional location selector (`Indore, MP`, `Dewas, MP`, `Ujjain, MP`, etc.), and quick role switchers.
   - Hero section with bold typography, search bar, and tractor imagery with 4 floating glass UI cards (Equipment Name, Price/Day, Rating, Distance).
   - Popular machinery categories (Tractor, Harvester, Rotavator, Cultivator, Seed Drill, Sprayer).
   - "Get Your Equipment in 4 Simple Steps" pipeline.
   - Featured top-rated machinery grid.
   - Why Choose AgriRent benefits and stats counter (5,000+ Equipment, 10,000+ Farmers, 200+ Locations).
   - Farmer testimonials (Ramesh Patel, Harpal Singh, Dharmendra Patidar).
   - Deep green footer with 24/7 farmer helpline and quick links.

2. **Equipment Catalog (`/equipment`)**:
   - Keyword search across machinery name, brand, model, and description.
   - Location filtering.
   - Multi-category checkboxes.
   - Max daily price slider (₹500 to ₹5,000).
   - Minimum rating filter (All, 4.0★, 4.5★, 4.8★).
   - Immediate availability toggle.
   - Sorting by Recommended, Price Low to High, Price High to Low, and Highest Rated.
   - Responsive grid (4 cols on wide screens, 2 cols on tablet, 1 col on mobile).
   - Dedicated mobile filter slide-over drawer.

3. **Equipment Details (`/equipment/:id`)**:
   - Multi-image gallery with clickable thumbnail previews.
   - Live availability badge and distance indicator.
   - Technical specifications grid (Horsepower, Fuel type, Condition, Mfg Year, Brand, Model).
   - Verified owner profile with phone call and direct inquiry message modal.
   - Interactive Rental Calculator: Choose start and end dates to dynamically calculate duration, daily subtotal, platform fee, security deposit, and total payable amount.
   - Similar machinery recommendations carousel.

4. **Booking Flow (`/booking`)**:
   - Summary of chosen machinery.
   - Choice of Trailer Delivery (+₹450) vs Self-Pickup (Free).
   - Farmer address details (Village, Tehsil, District, Landmark).
   - Mock payment methods (UPI / QR, Cash on Delivery, Net Banking).
   - Instant booking confirmation modal with receipt, reference ID, and direct link to Farmer Dashboard.

5. **Farmer Dashboard (`/dashboard`)**:
   - Active rentals tracker with date ranges and machine photos.
   - Rental history and status badges (Confirmed, In Field, Completed).
   - Bookmarked / saved equipment collection.
   - Farmer profile details and Kisan Aadhaar status.

6. **Owner Dashboard (`/owner-dashboard`)**:
   - Key fleet metrics: Total Machinery, Active Rentals, Pending Inquiries, Total Earnings (₹).
   - Incoming rental requests with interactive **Accept** and **Reject** buttons that immediately update state and revenue in real-time.
   - Fleet equipment table with toggleable live availability status and machinery deletion.
   - Monthly net revenue and payout history.

7. **Add Equipment (`/add-equipment`)**:
   - Machine listing form with category, horsepower, year, fuel type, condition, daily price, and deposit.
   - One-click realistic photo presets + live image preview.
   - Direct publishing into the live catalog and owner fleet.

8. **Authentication (`/login`, `/signup`)**:
   - Form validation with role selection (Farmer vs Equipment Owner).
   - Quick 1-click demo logins ("Demo Farmer", "Demo Owner") for instant testing.

---

## 🔒 Notes & Limitations

- **Backend**: As requested for this frontend phase, the platform uses browser `localStorage` and client-side React Context to persist catalog additions, bookings, favorite bookmarks, and owner request updates without requiring a backend database server.
- **Payment Gateway**: The checkout uses a mock payment simulation (UPI ID / Cash on Delivery / NetBanking) without charging real financial accounts.
