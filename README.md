# 🎓 P P Savani University — website 

[![NAAC A+](https://img.shields.io/badge/NAAC-A%2B%20Accredited-8B1A1A?style=for-the-badge)](https://ppsu.ac.in)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

A fully responsive, modern university website for **P P Savani University**, Kosamba, Surat, Gujarat — built with HTML5, CSS3, vanilla JavaScript, and Supabase as the backend database.

---

## 🌐 Live Demo

👉 **[View Live Site](https://YOUR-USERNAME.github.io/ppsu-university-website/)**

> Replace `YOUR-USERNAME` with your actual GitHub username after deployment.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Video Hero** | Full-viewport campus video background with pause/play control |
| 📢 **Live Ticker** | Auto-scrolling live announcements banner |
| 🏫 **12 Schools Grid** | Animated cards for all university schools |
| 📊 **Animated Counters** | Stats that count up when scrolled into view |
| 🗺️ **Interactive Campus Map** | Clickable SVG map with 16 buildings & tooltips |
| 📝 **Admissions Form** | Lead capture form with Supabase database storage |
| 👥 **Visitor Form** | Visitor registration before map access |
| 🏆 **Placements Section** | Top recruiter showcase |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |
| ✨ **Scroll Animations** | Reveal and stagger animations via Intersection Observer |
| 🖱️ **Custom Cursor** | Gold dot + maroon ring cursor effect |

---

## 📁 File Structure

```
ppsu-university-website/
│
├── index.html          ← Main HTML page (all sections)
├── style.css           ← All styles (brand colors, layout, animations)
├── script.js           ← Main JavaScript (interactions, forms, modals)
├── campus-map.js       ← Interactive SVG campus map + tooltip logic
├── supabase-init.js    ← Supabase client initialisation (ES module)
├── README.md           ← This file
│
└── assets/             ← (Create this folder for your media)
    ├── campus-video.mp4    ← Hero background video (add your own)
    └── favicon.ico         ← Browser tab icon (add your own)
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (No Setup)
Just download the files and open `index.html` in your browser. The site works without any build tools.

### Option 2 — Local Dev Server (Recommended)
Use VS Code with the **Live Server** extension:
1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Site opens at `http://127.0.0.1:5500`

### Option 3 — GitHub Pages (Free Hosting)
1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch → `/ (root)`
4. Your site goes live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## 🗄️ Database Setup (Supabase)

The admissions and visitor forms store data in Supabase. To set up:

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and create a free account
- Create a new project

### 2. Run these SQL commands in the Supabase SQL Editor

```sql
-- Registration table (admissions enquiries)
CREATE TABLE registration (
  id            BIGSERIAL PRIMARY KEY,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  mobile        VARCHAR(20)  NOT NULL,
  city          VARCHAR(100),
  programme     VARCHAR(100) NOT NULL,
  qualification VARCHAR(100),
  submitted_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- Visitor table (campus map access)
CREATE TABLE visitor (
  id          BIGSERIAL PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  mobile      VARCHAR(20)  NOT NULL,
  city        VARCHAR(100),
  purpose     VARCHAR(100),
  visited_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE registration ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor      ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (website visitors can submit forms)
CREATE POLICY "allow_anon_insert_registration"
  ON registration FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_anon_insert_visitor"
  ON visitor FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated admins can read data
CREATE POLICY "allow_auth_select_registration"
  ON registration FOR SELECT TO authenticated USING (true);

CREATE POLICY "allow_auth_select_visitor"
  ON visitor FOR SELECT TO authenticated USING (true);
```

### 3. Update Your Keys in `supabase-init.js`
```js
const SUPABASE_URL      = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY-HERE';
```

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Maroon | `#8B1A1A` | Primary brand, headings, buttons |
| Dark Maroon | `#6B1212` | Navbar, footer background |
| Gold | `#C8921A` | Accents, highlights, CTAs |
| Light Gold | `#F5C842` | Hero text, counter numbers |

---

## 🗺️ Campus Map — Buildings

The interactive SVG map includes **16 clickable zones**:

| Zone | Type | Details |
|---|---|---|
| Main Gate | Entrance | NH-8 entry, security, shuttle |
| Admin Block | Administration | VC Office, Registrar, Admission Cell |
| Engineering Block | Academic | Civil, Mech, Electrical, ECE depts |
| Computer Science Block | Academic | BCA, MCA, AI Lab, Cyber Security |
| Central Library | Facility | 50,000+ books, E-Library, 500 seats |
| Medical & Health Block | Medical | MBBS, Nursing, Physiotherapy |
| Pharmacy & Sciences | Medical | B.Pharm, M.Pharm, Biotech |
| Architecture & Design | Academic | B.Arch, B.Des, 3D Printing Lab |
| Management Block | Academic | BBA, MBA, Trading Lab, E-Cell |
| Boys' Hostel | Residence | 400+ beds, Wi-Fi, Gym |
| Girls' Hostel | Residence | 350+ beds, Female security staff |
| Cricket Ground | Sports | Full-size pitch, nets, floodlights |
| Sports Complex | Sports | Basketball, Badminton, Swimming |
| Cafeteria | Facility | 800 seats, Veg/Jain options |
| Auditorium | Facility | 1500 seats, AV system |
| Teaching Hospital | Medical | BAMS, BHMS, OPD/IPD |
| Research Centre | Research | Ph.D. labs, Patent Cell, NISP |

---

## 📦 Technologies Used

- **HTML5** — Semantic markup, video, SVG
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — Intersection Observer, async/await, modules
- **Supabase** — PostgreSQL database, Row Level Security
- **Font Awesome 6** — Icons
- **Google Fonts** — Montserrat + Libre Baskerville

---

## 🔒 Security

- Supabase **Row Level Security (RLS)** is enabled — anonymous users can only INSERT, never read other users' data
- The ANON key is safe to expose publicly (it's restricted by RLS policies)
- All form inputs are validated client-side before submission
- Supabase JS client uses **parameterised queries** — SQL injection is not possible

---

## 📸 Adding Your Campus Video

Replace the placeholder with your actual campus video:

1. Add your video file to the `assets/` folder as `campus-video.mp4`
2. The `<video>` tag in `index.html` already points to `assets/campus-video.mp4`
3. For best performance: compress video to under 10 MB using [HandBrake](https://handbrake.fr/) (720p, H.264)

---

## 🙏 Credits

- Developed by: **Rajwara Amit Davinder** — School of Computer Science, P P Savani University
- Guide: **Khushali Damodiya**, Assistant Professor 
- Academic Year: 2025–2026

---

## 📄 License

This project is developed for academic purposes at P P Savani University.  
© 2026 P P Savani University. All Rights Reserved.
