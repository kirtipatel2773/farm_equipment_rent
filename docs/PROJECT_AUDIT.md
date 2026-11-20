# AgriRent Project Audit Report

**Project Name:** AgriRent — Farm Equipment Rental System  
**Tagline:** Rent the Right Farm Equipment. Grow More.  
**Audit Date:** October 2026  
**Auditor:** Senior Full-Stack Developer & Database Architect  
**Audit Status:** Completed  

---

## 1. Executive Summary

AgriRent is a web application designed for the Indian agricultural marketplace to connect small/marginal farmers with farm equipment owners (tractors, harvesters, rotavators, cultivators, seed drills, sprayers). The current frontend is built using **React 18**, **Vite 6**, **React Router v6**, and **Tailwind CSS**.

While the frontend has an appealing UI layout and components, the audit identified that **it currently operates entirely as a client-side mockup**:
- Data is seeded from a static JavaScript array (`src/data/equipment.js`).
- State modifications are temporarily saved into the browser's `localStorage` via `AppContext.jsx`.
- There is **no backend server**, **no Express API**, and **no MySQL database connection**.
- Passwords are not encrypted or securely authenticated.
- Role management (Farmer vs. Owner) is simulated purely in client-side state.
- Several pages and features (such as a dedicated Farming Guide, genuine bilingual Hindi/English localization, and video hero fallback) are either incomplete or missing.

This audit provides a comprehensive breakdown of the existing architecture, data storage locations, incomplete features, security vulnerabilities, and the concrete implementation plan to elevate AgriRent into a production-grade, college-viva-ready full-stack application.

---

## 2. Existing Project Structure & Architecture

```text
rentel_system/
├── index.html                    # HTML entry point with Poppins font & SVG leaf favicon
├── package.json                  # Frontend dependencies (React, Vite, React Router, Lucide)
├── postcss.config.js             # PostCSS Tailwind plugins
├── tailwind.config.js            # Design system tokens (#087F3E, #064E3B, #EAF7EF, etc.)
├── vite.config.js                # Vite build config
├── src/
│   ├── main.jsx                  # React DOM mount with BrowserRouter & AppProvider
│   ├── App.jsx                   # Route declarations
│   ├── index.css                 # Tailwind directives, custom scrollbars, glass utilities
│   ├── context/
│   │   └── AppContext.jsx        # Monolithic context managing equipment, user, bookings, favorites
│   ├── data/
│   │   └── equipment.js          # Static mock array of 12 equipment items, categories & initial bookings
│   ├── components/               # 18 UI components
│   │   ├── Navbar.jsx            # Sticky header with location dropdown & mobile drawer
│   │   ├── Footer.jsx            # Multi-column footer
│   │   ├── Hero.jsx              # Hero section with tractor image and floating glass cards
│   │   ├── SearchBar.jsx         # Search bar with keyword, category, location
│   │   ├── CategoryCard.jsx      # Individual category card
│   │   ├── CategorySection.jsx   # Grid of equipment categories
│   │   ├── EquipmentCard.jsx     # Equipment card with specs, price, bookmark
│   │   ├── EquipmentGrid.jsx     # Card grid with empty state
│   │   ├── FilterSidebar.jsx     # Category, price slider, rating, availability filters
│   │   ├── HowItWorks.jsx        # 4-step workflow
│   │   ├── Benefits.jsx          # Statistics & value proposition
│   │   ├── Testimonial.jsx       # Demo testimonials
│   │   ├── CTASection.jsx        # Call to action banner
│   │   ├── Modal.jsx             # Reusable modal
│   │   ├── EmptyState.jsx        # Empty state component
│   │   ├── Rating.jsx            # Star rating
│   │   ├── Button.jsx            # Reusable button
│   │   └── ScrollToTop.jsx       # Reset scroll on route changes
│   └── pages/                    # 11 React pages
│       ├── Home.jsx              # Landing page
│       ├── Equipment.jsx         # Catalog browsing with filters & sorting
│       ├── EquipmentDetails.jsx  # Machinery specs, owner info, rental price calculator
│       ├── Booking.jsx           # Checkout page with delivery options & mock payment
│       ├── Login.jsx             # Login with demo quick-buttons
│       ├── Signup.jsx            # Registration with Farmer/Owner toggle
│       ├── Dashboard.jsx         # Farmer dashboard (bookings, favorites, profile)
│       ├── OwnerDashboard.jsx    # Owner dashboard (fleet, requests accept/reject, earnings)
│       ├── AddEquipment.jsx      # Machinery listing form with preset photos
│       ├── About.jsx             # About AgriRent mission & pillars
│       └── Contact.jsx           # Support form & FAQ accordion
```

---

## 3. Data Storage & State Audit

| Data Entity | Current Storage Location | Mechanism | Problems / Limitations |
| :--- | :--- | :--- | :--- |
| **Machinery Catalog** | `src/data/equipment.js` + `localStorage['agrirent_equipment']` | In-memory JavaScript array copied to browser localStorage | No persistent database; new listings created by one user are invisible to other devices/users; clearing cache erases additions. |
| **User Authentication** | `localStorage['agrirent_user']` | Hardcoded default user (`Ramesh Patel`) in `AppContext.jsx` | Plaintext user object stored in localStorage; no password hashing; no JWT tokens; no backend session or role verification. |
| **Bookings / Reservations** | `localStorage['agrirent_bookings']` | Synchronized to browser localStorage | No backend validation; price calculation done exclusively in browser; overlapping date booking conflicts are not prevented in a database transaction. |
| **Owner Rental Requests** | `localStorage['agrirent_owner_requests']` | Synchronized to browser localStorage | Owner and renter data live in the same browser storage; no multi-tenant isolation. |
| **Favorites / Bookmarks** | `localStorage['agrirent_favorites']` | Array of string IDs in localStorage | Not tied to a registered user account in a database. |
| **Contact Messages** | Transient React state (`Contact.jsx`) | Form submit triggers 4-second timeout | Messages disappear into thin air upon page reload; no database storage or admin view. |
| **Farming Articles** | Non-existent | No guide section or database table | Missing core farmer-education requirement. |

---

## 4. UI/UX & Design Audit

### Strengths:
1. **Design System & Palette**: Tailored Tailwind configuration with agricultural colors:
   - Primary Green: `#087F3E`
   - Dark Green: `#064E3B`
   - Light Green: `#EAF7EF`
   - Page Background: `#F7FAF8`
   - Main Text: `#102A2A`
   - Secondary Text: `#64748B`
   - Accent: `#E8B04A`
2. **Typography**: Google Font **Poppins** loaded correctly in `index.html`.
3. **Card Radii & Shadows**: Clean 14–16px border radius, soft custom shadows (`shadow-soft`, `shadow-card`).
4. **Icons**: Consistent usage of `lucide-react`.

### Deficiencies Identified:
1. **Hero Section**:
   - Currently uses a static Unsplash image with floating cards.
   - Lacks an agricultural video background/embed with fallback image.
   - Missing explicit prefers-reduced-motion accessibility handling.
2. **Missing Farming Guide**:
   - The navigation bar lacks a link to a Farming Guide.
   - There is no Farming Guide page or home section to help farmers choose tractors, implements, or seasonal maintenance tips.
3. **Language Selector / Bilingual Support**:
   - The UI is currently English-only.
   - No language toggle exists in the Navbar.
   - Indian farmers require accessible Hindi / English bilingual terminology (e.g., "कृषि उपकरण देखें", "उपकरण खोजें").
4. **Owner vs. Farmer Role Isolation**:
   - A single client-side toggle ("Switch to Owner View") flips roles without authentication barriers.
   - Farmers can navigate directly to `/owner-dashboard` without server-side verification.
5. **Add Equipment Image Upload**:
   - Currently relies on external image URLs or 6 preset sample buttons.
   - No backend file upload or server-side MIME type / file size validation.

---

## 5. Security & Backend Architecture Audit

1. **Authentication**:
   - Passwords submitted in `Login.jsx` and `Signup.jsx` are never validated against a hashed database secret.
   - In `Login.jsx`, checking `email.toLowerCase().includes('owner')` determines whether someone is an owner! This is insecure and unsuitable for a college demonstration.
2. **No Server-Side Validation**:
   - Price, date ranges, and authorization checks are done exclusively on the client side.
   - End dates preceding start dates or booking date overlaps are not prevented by ACID database transactions.
3. **No Centralized API Service**:
   - The frontend communicates directly with `AppContext.jsx` methods.
   - There is no `src/services/api.js` abstraction for HTTP calls (`axios` or `fetch`).

---

## 6. Implementation Action Plan

To address all findings, the project will be upgraded through the following six phases:

- **Phase 1: UI & Homepage Improvements**:
  - Implement video-ready Hero section with smooth fallback poster, video overlay, and accessibility tags.
  - Add Farming Guide section on the homepage and update the Navbar with Farming Guide link and bilingual Language selector.
- **Phase 2: Database Architecture & Setup**:
  - Create `database/agrirent_db.sql` with MySQL 8+ syntax, utf8mb4 encoding, strict foreign keys, indexes, decimal precision, and seed data.
  - Create `docs/DATABASE_SETUP.md` with beginner-friendly Hinglish step-by-step instructions for MySQL Workbench.
  - Create `server/.env.example` and root `.gitignore`.
- **Phase 3: Node.js + Express REST API**:
  - Build `server/` with Express, `mysql2/promise`, `dotenv`, `cors`, `bcryptjs`, and `jsonwebtoken`.
  - Implement endpoints for Auth, Equipment, Categories, Bookings, Favorites, Contact, and Farming Articles.
  - Implement server-side validation and date conflict transaction locks.
- **Phase 4: Frontend API Integration & State Modernization**:
  - Create `src/services/api.js` with centralized API calls and graceful fallback mode.
  - Update `AppContext.jsx`, `Login.jsx`, `Signup.jsx`, `AddEquipment.jsx`, `Equipment.jsx`, `EquipmentDetails.jsx`, `Booking.jsx`, and `Contact.jsx` to consume the real API.
- **Phase 5: Bilingual Support & Farming Guide**:
  - Create `src/context/LanguageContext.jsx` with full English/Hindi dictionary.
  - Build `src/pages/FarmingGuide.jsx` with category filters and article reading modal.
  - Integrate language switcher in Navbar.
- **Phase 6: Testing, Documentation & Viva Preparation**:
  - Create `docs/DATA_FLOW.md`, `docs/API_DOCUMENTATION.md`, and `docs/VIVA_GUIDE_HINGLISH.md` (20+ viva Q&As).
  - Verify frontend build and backend startup.
