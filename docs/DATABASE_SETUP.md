# AgriRent — MySQL Database Setup Guide (Hinglish)

> **"Rent the Right Farm Equipment. Grow More."**  
> Yeh guide beginner students ke liye specially design ki gayi hai taaki aap bina kisi confusion ke MySQL Server, MySQL Workbench, aur Backend API ko connect karke college viva aur project demonstration mein 100% confidence ke sath present kar sakein.

---

## 📌 Index / Vishay-Suchi
1. [MySQL aur MySQL Workbench kya hai?](#1-mysql-aur-mysql-workbench-kya-hai)
2. [MySQL Server kaise start karein?](#2-mysql-server-kaise-start-karein)
3. [MySQL Workbench mein SQL Script kaise import karein?](#3-mysql-workbench-mein-sql-script-kaise-import-karein)
4. [Tables aur Rows verify kaise karein?](#4-tables-aur-rows-verify-kaise-karein)
5. [Dedicated Database User kaise banayein? (Best Practice)](#5-dedicated-database-user-kaise-banayein)
6. [Backend `.env` Configuration](#6-backend-env-configuration)
7. [Backend aur Frontend run kaise karein?](#7-backend-aur-frontend-run-kaise-karein)
8. [Form Data Database mein verify kaise karein?](#8-form-data-database-mein-verify-kaise-karein)
9. [Common Errors aur unka Troubleshooting](#9-common-errors-aur-unka-troubleshooting)

---

## 1. MySQL aur MySQL Workbench kya hai?

- **MySQL kya hai?**  
  MySQL ek world-famous **Relational Database Management System (RDBMS)** hai. Iska kaam aapke application ka data (users, equipment details, rental bookings, messages) permanently rows aur tables ke form mein store karna hota hai. React state ya localStorage page refresh hone par temporary hote hain, lekin MySQL data computer hard drive par securely save rehta hai.

- **MySQL Workbench kya hai?**  
  MySQL Workbench ek visual graphical user interface (GUI) tool hai. Isme aap bina terminal command yaad kiye buttons se tables dekh sakte hain, SQL queries chala sakte hain, aur database records inspect kar sakte hain.

- **Seed Data vs Form Submissions:**  
  - `database/agrirent_db.sql` file ke andar **Database Schema** (table structure) aur **Initial Seed Data** (demo tractors, harvesters, sample bookings) hota hai.  
  - Jab koi farmer website par naya equipment add karta hai ya booking confirm karta hai, tab **running Express backend** us naye data ko MySQL ke andar `INSERT` query ke through permanently save karta hai.

---

## 2. MySQL Server kaise start karein?

Aapke Windows computer par MySQL Server service installed hoti hai (service name: `MySQL80`).

### Method A: Windows Services se start karna (Graphical)
1. Keyboard par `Win + R` dabayein, type karein `services.msc` aur Enter dabayein.
2. List mein niche scroll karein aur **MySQL80** dhoondhein.
3. Agar uska status "Stopped" hai, toh right-click karke **Start** par click karein.
4. Status **"Running"** dikhai dega.

### Method B: PowerShell / Command Prompt se start karna (Admin)
Administrator mode mein PowerShell kholein aur yeh command run karein:
```powershell
net start MySQL80
```
Output aayega: `The MySQL80 service was started successfully.`

---

## 3. MySQL Workbench mein SQL Script kaise import karein?

1. **MySQL Workbench open karein.**  
2. Home screen par **Local instance MySQL80** connection par click karein aur apna MySQL root password dalein.
3. Top menu bar mein jayein:  
   `File` ➔ `Open SQL Script...` (ya shortcut `Ctrl + Shift + O`).
4. File dialog box mein project folder browse karein:  
   `database/agrirent_db.sql` select karke **Open** karein.
5. Workbench ke editor window mein pura SQL script load ho jayega:
   - Script ke shuru mein `CREATE DATABASE IF NOT EXISTS agrirent_db;` likha hoga.
   - 10 required tables (`users`, `equipment_categories`, `equipment`, `equipment_images`, `bookings`, `favorites`, `reviews`, `contact_messages`, `farming_articles`, `notifications`) banenge.
6. Top toolbar par **Lightning Bolt (⚡) icon** (Execute all) par click karein.
7. Niche **Output Window** mein green checkmarks dikhai denge, jiska matlab hai saare tables aur initial records successfully create aur insert ho gaye hain!

---

## 4. Tables aur Rows verify kaise karein?

1. Left sidebar mein **Navigator** panel ke andar **Schemas** tab par click karein.
2. Schemas list ke top-right corner par **Refresh icon (गोल तीर)** dabayein.
3. Ab aapko `agrirent_db` schema dikhai dega. Usko expand karein:
   - `Tables` dropdown par click karein.
   - Aapko saare 10 tables dikhai denge:
     - `users`
     - `equipment`
     - `equipment_categories`
     - `equipment_images`
     - `bookings`
     - `favorites`
     - `reviews`
     - `contact_messages`
     - `farming_articles`
     - `notifications`
4. Kisi bhi table par right-click karein, for example `equipment` par, aur choose karein:  
   **Select Rows - Limit 1000**.
5. Result Grid mein John Deere, Mahindra Harvester, Shaktiman Rotavator ke records display ho jayenge!

---

## 5. Dedicated Database User kaise banayein? (Best Practice)

Production security ke liye hum directly `root` user se connection nahi banate. Ek dedicated application user banate hain:

MySQL Workbench ke SQL Query tab mein yeh 3 lines execute karein:
```sql
-- Dedicated AgriRent user banayein
CREATE USER IF NOT EXISTS 'agrirent_app'@'localhost' IDENTIFIED BY 'AgriRentPass@2026';

-- Is user ko sirf agrirent_db par permissions dein
GRANT ALL PRIVILEGES ON agrirent_db.* TO 'agrirent_app'@'localhost';

-- Privileges apply karein
FLUSH PRIVILEGES;
```
*(Note: Agar aap college viva demo ke liye simply apne `root` user ka password use karna chahte hain, toh wo bhi backend `.env` mein work karega).*

---

## 6. Backend `.env` Configuration

Project ke `server/` folder mein ek `.env` file banayein:
Path: `server/.env`

Example configuration:
```env
# Server Port
PORT=5000

# Allowed Frontend URL (CORS Security)
FRONTEND_URL=http://localhost:5173

# MySQL Database Connection Details
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=agrirent_db

# JWT Secret for Session Tokens
JWT_SECRET=agrirent_super_secure_jwt_token_key_2026_xyz
JWT_EXPIRES_IN=7d
```
> **Important:** `DB_PASSWORD` mein wahi password daalein jo aapne MySQL install karte waqt set kiya tha. Kisi bhi public repository mein apna actual password commit na karein!

---

## 7. Backend aur Frontend run kaise karein?

College viva mein do alag-alag terminals open karein:

### Terminal 1: Backend Express Server
```powershell
# Server folder mein jayein
cd c:\Users\darsh\Downloads\rentel_system\rentel_system\server

# Dependencies install karein (sirf pehli baar)
npm.cmd install

# Backend server start karein
npm.cmd run dev
```
Terminal mein yeh message aana chahiye:
```text
[Server] AgriRent Express API running on port 5000
[Database] Connected successfully to MySQL database 'agrirent_db'
```

### Terminal 2: Frontend Vite React Server
```powershell
# Frontend project root mein jayein
cd c:\Users\darsh\Downloads\rentel_system\rentel_system

# Dependencies verify karein (already installed)
npm.cmd install

# Vite dev server start karein
npm.cmd run dev
```
Browser mein open karein: `http://localhost:5173`

---

## 8. Form Data Database mein verify kaise karein?

Jab aap website par koi action lete hain, toh dekhein ki data database mein kaise save hota hai:

1. **New Equipment Add karke check karna:**
   - Website par `List Your Equipment` (`/add-equipment`) page par jayein.
   - Title: "Swaraj 744 FE 48 HP Tractor", Price: ₹1400, Location: "Indore, MP" fill karein aur **Publish Equipment** dabayein.
   - MySQL Workbench mein query run karein:
     ```sql
     SELECT * FROM equipment ORDER BY id DESC LIMIT 1;
     ```
   - Aapka naya tractor turant MySQL table mein visible ho jayega!

2. **New Booking karke check karna:**
   - Kisi tractor par click karke **Rent Now** dabayein.
   - Sowing dates select karein aur form submit karein.
   - Workbench mein run karein:
     ```sql
     SELECT * FROM bookings ORDER BY id DESC LIMIT 1;
     ```
   - Naya `BK-2026-XXX` reference, calculated amount, aur dates table mein insert ho chuke honge!

---

## 9. Common Errors aur unka Troubleshooting

| Error Code / Message | Reason / Wajah | Solution / Hal |
| :--- | :--- | :--- |
| `ECONNREFUSED 127.0.0.1:3306` | MySQL Server band hai ya service start nahi hui hai. | Admin PowerShell mein `net start MySQL80` chalayein ya Services app se MySQL80 ko Start karein. |
| `ER_ACCESS_DENIED_ERROR` | `DB_PASSWORD` ya `DB_USER` galat likha hai. | `server/.env` file check karein aur wahan sahi MySQL password enter karein. |
| `ER_BAD_DB_ERROR: Unknown database 'agrirent_db'` | Database create nahi hua hai. | Workbench mein `database/agrirent_db.sql` open karke Lightning Bolt (⚡) icon se execute karein. |
| `Port 5000 is already in use` | Purana server background mein chal raha hai. | Task Manager se purani node process kill karein ya `.env` mein `PORT=5001` set karein. |
| Frontend par red error: "Failed to fetch" | Backend server start nahi hai. | Terminal 1 mein `cd server` karke `npm.cmd run dev` chalayein. |
