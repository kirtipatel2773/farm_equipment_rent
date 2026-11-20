-- ============================================================================
-- AGRIRENT — FARM EQUIPMENT RENTAL SYSTEM
-- DATABASE INITIALIZATION AND SEEDING SCRIPT
-- MySQL 8.0+ Compatible | Character Set: utf8mb4
-- Database Name: agrirent_db
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `agrirent_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `agrirent_db`;

-- Set session variables for consistent import
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

-- ----------------------------------------------------------------------------
-- 1. Table: users
-- Roles: 'farmer' (renter), 'owner' (equipment host), 'admin'
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('farmer', 'owner', 'admin') NOT NULL DEFAULT 'farmer',
  `preferred_language` VARCHAR(10) NOT NULL DEFAULT 'en',
  `location` VARCHAR(150) DEFAULT 'Indore, MP',
  `avatar_url` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Table: equipment_categories
-- Master categories of agricultural implements & machinery
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `equipment_categories`;
CREATE TABLE `equipment_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_categories_slug` (`slug`),
  KEY `idx_categories_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Table: equipment
-- Farm machinery listed by verified owners
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `price_per_day` DECIMAL(10, 2) NOT NULL,
  `security_deposit` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `location` VARCHAR(150) NOT NULL,
  `state` VARCHAR(100) NOT NULL DEFAULT 'Madhya Pradesh',
  `horsepower` VARCHAR(50) DEFAULT NULL,
  `manufacturing_year` SMALLINT UNSIGNED DEFAULT NULL,
  `condition` VARCHAR(50) NOT NULL DEFAULT 'Excellent',
  `fuel_type` VARCHAR(50) NOT NULL DEFAULT 'Diesel',
  `availability_status` ENUM('available', 'rented', 'maintenance', 'inactive') NOT NULL DEFAULT 'available',
  `image_url` VARCHAR(500) NOT NULL,
  `rating` DECIMAL(3, 2) NOT NULL DEFAULT 5.00,
  `reviews_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_equipment_owner` (`owner_id`),
  KEY `idx_equipment_category` (`category_id`),
  KEY `idx_equipment_location` (`location`),
  KEY `idx_equipment_price` (`price_per_day`),
  KEY `idx_equipment_status` (`availability_status`),
  CONSTRAINT `fk_equipment_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_equipment_category` FOREIGN KEY (`category_id`) REFERENCES `equipment_categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Table: equipment_images
-- Secondary gallery photos for machinery detail pages
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `equipment_images`;
CREATE TABLE `equipment_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `equipment_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) DEFAULT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_equipment_images_eq` (`equipment_id`),
  CONSTRAINT `fk_images_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Table: bookings
-- Rental reservations with price snapshots and date protection
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_reference` VARCHAR(50) NOT NULL,
  `farmer_id` INT UNSIGNED NOT NULL,
  `equipment_id` INT UNSIGNED NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `rental_days` INT UNSIGNED NOT NULL,
  `price_per_day_snapshot` DECIMAL(10, 2) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `delivery_fee` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `platform_fee` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `security_deposit` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `booking_status` ENUM('pending', 'confirmed', 'in_field', 'completed', 'cancelled', 'rejected') NOT NULL DEFAULT 'pending',
  `payment_status` ENUM('unpaid', 'paid', 'escrow_held', 'refunded') NOT NULL DEFAULT 'paid',
  `delivery_option` ENUM('delivery', 'pickup') NOT NULL DEFAULT 'delivery',
  `delivery_address` TEXT NOT NULL,
  `farmer_name` VARCHAR(150) NOT NULL,
  `farmer_phone` VARCHAR(20) NOT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_booking_ref` (`booking_reference`),
  KEY `idx_booking_farmer` (`farmer_id`),
  KEY `idx_booking_equipment` (`equipment_id`),
  KEY `idx_booking_dates` (`start_date`, `end_date`),
  KEY `idx_booking_status` (`booking_status`),
  CONSTRAINT `fk_booking_farmer` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_booking_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Table: favorites
-- Farmer bookmarks for favorite machinery
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `equipment_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_equipment_fav` (`user_id`, `equipment_id`),
  KEY `idx_fav_equipment` (`equipment_id`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fav_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Table: reviews
-- Machinery performance ratings and farmer feedback
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `booking_id` INT UNSIGNED DEFAULT NULL,
  `farmer_id` INT UNSIGNED NOT NULL,
  `equipment_id` INT UNSIGNED NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `comment` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reviews_equipment` (`equipment_id`),
  KEY `idx_reviews_farmer` (`farmer_id`),
  CONSTRAINT `fk_review_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_review_farmer` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Table: contact_messages
-- Inquiries sent from the Contact Us form
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `subject` VARCHAR(200) DEFAULT 'General Inquiry',
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'read', 'resolved') NOT NULL DEFAULT 'new',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_status` (`status`),
  KEY `idx_contact_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Table: farming_articles
-- Knowledge hub guides for machinery selection and maintenance
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `farming_articles`;
CREATE TABLE `farming_articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `summary` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `language` VARCHAR(10) NOT NULL DEFAULT 'en',
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_article_slug` (`slug`),
  KEY `idx_article_category` (`category`),
  KEY `idx_article_published` (`published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. Table: notifications
-- In-app alert messages for bookings and status updates
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_notifications_user` (`user_id`, `is_read`),
  CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- SEED DATA INSERTIONS
-- ============================================================================

-- 1. Demo Users
-- Passwords are set to 'password123' (bcrypt hashed with 10 salt rounds)
-- Hash: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW
INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password_hash`, `role`, `preferred_language`, `location`, `avatar_url`) VALUES
(1, 'manoj meena', 'manoj.owner@agrirent.in', '+91 98260 11234', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'owner', 'en', 'Indore, MP', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'),
(2, 'Ramesh Patel', 'ramesh.farmer@gmail.com', '+91 98765 43210', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'farmer', 'en', 'Dewas, MP', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'),
(3, 'Admin User', 'admin@agrirent.in', '+91 98930 99887', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'admin', 'en', 'Indore, MP', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80');

-- 2. Equipment Categories
INSERT INTO `equipment_categories` (`id`, `name`, `slug`, `description`, `image_url`) VALUES
(1, 'Tractor', 'tractor', 'Heavy-duty 4WD and 2WD tractors for plowing, haulage and field preparation.', 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80'),
(2, 'Harvester', 'harvester', 'Combine and paddy harvesters for rapid multi-crop grain threshing.', 'https://images.unsplash.com/photo-1595244535352-7bfb34c2bb82?auto=format&fit=crop&w=600&q=80'),
(3, 'Rotavator', 'rotavator', 'Rotary tillers for soil pulverization, clod crushing and seedbed preparation.', 'https://images.unsplash.com/photo-1589876527568-19760bf05b63?auto=format&fit=crop&w=600&q=80'),
(4, 'Cultivator', 'cultivator', 'Spring loaded tines for soil aeration, weed eradication and moisture holding.', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'),
(5, 'Seed Drill', 'seed-drill', 'Precision seed-cum-fertilizer drills for row-to-row uniform planting.', 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80'),
(6, 'Boom Sprayer', 'sprayer', 'High-pressure tractor mounted sprayers for pesticide and foliar fertilizer application.', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'),
(7, 'Plough & Tillage', 'plough', 'Reversible MB ploughs, disc harrows and subsoilers for primary hardpan tillage.', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'),
(8, 'Other Implements', 'other', 'Laser land levelers, balers, post hole diggers and trailer haulage carts.', 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80');

-- 3. Realistic Demo Equipment
INSERT INTO `equipment` (`id`, `owner_id`, `category_id`, `name`, `brand`, `model`, `description`, `price_per_day`, `security_deposit`, `location`, `state`, `horsepower`, `manufacturing_year`, `condition`, `fuel_type`, `availability_status`, `image_url`, `rating`, `reviews_count`) VALUES
(1, 1, 1, 'John Deere 5050 D 4WD', 'John Deere', '5050 D PowerTech', '50 HP heavy-duty utility tractor with power steering, dual clutch, and oil-immersed disc brakes. Fully maintained for deep ploughing and haulage.', 1500.00, 3000.00, 'Indore, MP', 'Madhya Pradesh', '50 HP', 2023, 'Excellent', 'Diesel', 'available', 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80', 4.90, 42),
(2, 1, 2, 'Mahindra Combine Harvester', 'Mahindra', 'Applitrac 400', 'Self-propelled combine harvester equipped with heavy cutter bar for wheat, paddy, soybean and grams. Includes expert operator.', 3500.00, 7000.00, 'Dewas, MP', 'Madhya Pradesh', '101 HP', 2022, 'Like New', 'Diesel', 'available', 'https://images.unsplash.com/photo-1595244535352-7bfb34c2bb82?auto=format&fit=crop&w=1200&q=80', 4.70, 28),
(3, 1, 3, 'Shaktiman Regular Light Rotavator', 'Shaktiman', 'SRT-6 (6 Feet)', '42 L-type boron steel blades designed for wet and dry pulverization. Perfectly matches 45-55 HP tractor PTO for weed-free seedbed preparation.', 750.00, 1500.00, 'Indore, MP', 'Madhya Pradesh', '45-55 HP Required', 2023, 'Excellent', 'PTO Driven', 'available', 'https://images.unsplash.com/photo-1589876527568-19760bf05b63?auto=format&fit=crop&w=1200&q=80', 4.85, 34),
(4, 1, 4, 'Fieldking 9-Tine Heavy Cultivator', 'Fieldking', 'FKCT-9 Spring Loaded', 'Heavy-duty steel channel frame with 9 high-tensile spring loaded forged tines. Ideal for breaking hard soil crusts and summer cultivation.', 450.00, 900.00, 'Ujjain, MP', 'Madhya Pradesh', '35+ HP Required', 2021, 'Good', 'Trailed Ground Drive', 'available', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', 4.60, 19),
(5, 1, 5, 'National Seed Cum Fertilizer Drill', 'National Agro', 'NSD-11 Row Planter', '11-row precision seed-cum-fertilizer drill with fluted roller metering mechanism for uniform wheat, soybean and chickpea placement.', 600.00, 1200.00, 'Ratlam, MP', 'Madhya Pradesh', '40+ HP Required', 2022, 'Excellent', 'Trailed Ground Drive', 'available', 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=80', 4.75, 15),
(6, 1, 6, 'Aspee Tractor Mounted Boom Sprayer', 'Aspee', 'HTP-400 Litres', '400L chemical tank with 12-meter folding spray booms and anti-drip brass nozzles. Uniform pesticide and foliar nutrition coverage.', 800.00, 1600.00, 'Indore, MP', 'Madhya Pradesh', 'PTO Driven', 2023, 'Like New', 'PTO Driven', 'available', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80', 4.90, 22),
(7, 1, 1, 'Swaraj 855 FE Heavy Duty Tractor', 'Swaraj', '855 FE 55 HP', '55 HP legendary rugged tractor with multi-speed forward and reverse PTO. Built for heavy soil puddling, deep subsoiling and trolley transit.', 1600.00, 3200.00, 'Mandsaur, MP', 'Madhya Pradesh', '55 HP', 2023, 'Excellent', 'Diesel', 'available', 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1200&q=80', 4.80, 31),
(8, 1, 7, 'Lemken 2-Bottom Reversible MB Plough', 'Lemken', 'Opal 080 Hydraulic', 'German-engineered reversible mouldboard plough with shear-bolt safety and bar points for complete soil inversion and trash burial.', 950.00, 2000.00, 'Bhopal, MP', 'Madhya Pradesh', '50+ HP Required', 2022, 'Excellent', 'Hydraulic Link', 'available', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80', 4.88, 18);

-- 4. Equipment Gallery Images
INSERT INTO `equipment_images` (`equipment_id`, `image_url`, `alt_text`, `sort_order`) VALUES
(1, 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80', 'John Deere Tractor front view', 1),
(1, 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1200&q=80', 'John Deere Tractor operating in field', 2),
(1, 'https://images.unsplash.com/photo-1589876527568-19760bf05b63?auto=format&fit=crop&w=1200&q=80', 'Rear PTO connection view', 3),
(2, 'https://images.unsplash.com/photo-1595244535352-7bfb34c2bb82?auto=format&fit=crop&w=1200&q=80', 'Combine Harvester cutting grain', 1),
(3, 'https://images.unsplash.com/photo-1589876527568-19760bf05b63?auto=format&fit=crop&w=1200&q=80', 'Shaktiman rotavator tilling black soil', 1);

-- 5. Seed Bookings
INSERT INTO `bookings` (`id`, `booking_reference`, `farmer_id`, `equipment_id`, `start_date`, `end_date`, `rental_days`, `price_per_day_snapshot`, `subtotal`, `delivery_fee`, `platform_fee`, `security_deposit`, `total_amount`, `booking_status`, `payment_status`, `delivery_option`, `delivery_address`, `farmer_name`, `farmer_phone`, `notes`) VALUES
(1, 'BK-2026-101', 2, 1, '2026-10-25', '2026-10-27', 2, 1500.00, 3000.00, 450.00, 150.00, 3000.00, 3600.00, 'confirmed', 'paid', 'delivery', 'Village Hatod, Tehsil Depalpur, Indore, MP - 453111', 'Ramesh Patel', '+91 98765 43210', 'Call before arrival at farm entrance near tube well.'),
(2, 'BK-2026-102', 2, 3, '2026-11-01', '2026-11-02', 1, 750.00, 750.00, 0.00, 37.50, 1500.00, 787.50, 'pending', 'paid', 'pickup', 'Self pickup from Vikram Yard, Indore, MP', 'Ramesh Patel', '+91 98765 43210', 'Need hitch pin included.');

-- 6. Seed Favorites
INSERT INTO `favorites` (`user_id`, `equipment_id`) VALUES
(2, 1),
(2, 3);

-- 7. Seed Contact Message
INSERT INTO `contact_messages` (`name`, `email`, `phone`, `subject`, `message`, `status`) VALUES
('Dharmendra Patidar', 'dharmendra.p@kisan.in', '+91 98270 33445', 'Harvester Booking Inquiry', 'Looking to book combine harvester for 40 acres of soybean harvest starting next week in Dewas.', 'new');

-- 8. Seed Farming Articles
INSERT INTO `farming_articles` (`id`, `title`, `slug`, `category`, `summary`, `content`, `language`, `published`) VALUES
(1, 'Choosing the Right Tractor for Your Acreage & Soil Type', 'choosing-right-tractor', 'Machinery Selection', 'A complete breakdown of horsepower classes (35 HP to 65 HP) required for black cotton vs sandy soils.', 'Tractor horsepower selection must match acreage and draft resistance. For 1-5 acres, 25-35 HP handles inter-cultivation and spraying. For 5-15 acres, 35-45 HP handles 36-blade rotavators and cultivators. For heavy black cotton soils, 50+ HP with dual clutch is essential.', 'en', 1),
(2, 'Selecting Equipment for Sowing: Seed Drills vs Super Seeders', 'sowing-equipment-guide', 'Sowing & Planting', 'Evaluate precision seed-cum-fertilizer drills and zero-till seeders for maximum germination.', 'Seed placement at uniform 3-5 cm depth prevents bird damage and guarantees high germination. Seed-cum-fertilizer drills place nutrients 2 cm below seed to avoid seedling burn.', 'en', 1),
(3, 'Combine Harvester Best Practices: Minimizing Grain Loss', 'harvesting-machinery-basics', 'Harvesting', 'Adjust reel speed, cutter bar height, and blower fan settings to reduce threshing loss below 1.5%.', 'Grain losses occur when harvesting too dry or running cylinder speeds too fast. Maintain 13-15% moisture window and inspect straw hood discharge regularly.', 'en', 1);

-- Seed Notifications
INSERT INTO `notifications` (`user_id`, `title`, `message`, `is_read`) VALUES
(1, 'New Rental Request Received', 'Farmer Ramesh Patel requested John Deere 5050 D for Oct 25-27.', 0),
(2, 'Booking Confirmed', 'Your reservation BK-2026-101 for John Deere 5050 D has been confirmed by owner Vikram Singh.', 1);

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================
