/* ══════════════════════════════════════════════
   PPSU CAMPUS MAP — Interactive SVG Map
   Builds SVG, handles click/hover tooltips
══════════════════════════════════════════════ */

/* ── BUILDING DATA ── */
const BUILDINGS = {
  gate: {
    badge: 'Entrance', color: '#C8921A',
    title: 'Main Gate & Security',
    desc: 'Primary NH-8 entrance with 24/7 security, visitor registration, and vehicle management.',
    items: ['24/7 Security Personnel', 'Visitor Registration', 'Vehicle Entry Control', 'CCTV Surveillance', 'University Shuttle Stop']
  },
  admin: {
    badge: 'Administration', color: '#C8921A',
    title: 'Administration Block',
    desc: 'Central administrative hub housing the Vice Chancellor, Registrar, and all university offices.',
    items: ['Vice Chancellor Office', 'Registrar & Dean Offices', 'Admission Cell', 'Accounts & Finance', 'Student Grievance Cell', 'HR Department']
  },
  engineering: {
    badge: 'Academic', color: '#8B1A1A',
    title: 'Engineering & Technology Block',
    desc: 'State-of-the-art block for all engineering disciplines with modern labs and design studios.',
    items: ['Civil Engineering Dept.', 'Mechanical Engineering Dept.', 'Electrical Engineering Dept.', 'Electronics & Comm. Dept.', 'Workshop & Fabrication Lab', 'CAD / CAM Design Studio', 'B.Tech · M.Tech · Ph.D']
  },
  cs: {
    badge: 'Academic', color: '#8B1A1A',
    title: 'Computer Science Block',
    desc: 'Dedicated CS building with high-performance computing labs, server rooms, and innovation hubs.',
    items: ['BCA / MCA / B.Sc CS Dept.', 'AI & Machine Learning Lab', 'Cyber Security Lab', 'Software Engineering Lab', 'Data Science Studio', 'Innovation & Startup Hub', '24×7 Computer Access Lab']
  },
  library: {
    badge: 'Facility', color: '#C8921A',
    title: 'Central Library',
    desc: 'A 4-storey central library with over 50,000 books, digital resources, and quiet study zones.',
    items: ['50,000+ Book Collection', 'E-Library & DELNET Access', 'Reading Rooms (500+ seats)', 'Research Journals & Archives', 'Printing & Photocopy Centre', 'Discussion Rooms', 'Open 8 AM – 10 PM']
  },
  medical: {
    badge: 'Medical', color: '#2a5098',
    title: 'Medical & Health Sciences Block',
    desc: 'Comprehensive medical education facilities with simulation labs and clinical training rooms.',
    items: ['MBBS Programme Dept.', 'Nursing School (B.Sc / M.Sc)', 'Physiotherapy Dept. (BPT/MPT)', 'Anatomy & Physiology Labs', 'Simulation & Skills Lab', 'Clinical Training Rooms', 'Medical Library']
  },
  pharma: {
    badge: 'Medical', color: '#2a5098',
    title: 'Pharmacy & Sciences Block',
    desc: 'Modern block for pharmacy and pure sciences with well-equipped chemistry and biology labs.',
    items: ['B.Pharm / M.Pharm Dept.', 'Pharmaceutical Chemistry Lab', 'Pharmacognosy Lab', 'Biotechnology Lab', 'B.Sc / M.Sc Sciences', 'Agriculture Sciences Dept.', 'Research & Analysis Lab']
  },
  arch: {
    badge: 'Academic', color: '#8B1A1A',
    title: 'Architecture & Design Block',
    desc: 'Creative hub for architecture and design with studios and model-making facilities.',
    items: ['B.Arch / M.Arch Studio', 'Interior Design Studio', 'Communication Design Lab', 'Model Making Workshop', '3D Printing & Fabrication Lab', 'B.Des / M.Des Programme', 'Digital Rendering Suite']
  },
  management: {
    badge: 'Academic', color: '#8B1A1A',
    title: 'Management & Liberal Arts Block',
    desc: 'Business school and liberal arts centre with case study rooms and trading lab.',
    items: ['BBA / MBA Classrooms', 'Finance & Trading Lab', 'HR & Marketing Labs', 'BA / MA Liberal Arts Dept.', 'Seminar & GD Rooms', 'Language Lab', 'Entrepreneurship Cell (E-Cell)']
  },
  hostelboys: {
    badge: 'Residence', color: '#5a0e8a',
    title: "Boys' Hostel",
    desc: "Fully residential boys' hostel with modern rooms, 24/7 security, Wi-Fi, and recreational facilities.",
    items: ['400+ Bed Capacity', 'Single & Twin-Sharing Rooms', '24/7 Security & CCTV', 'High-Speed Wi-Fi', 'Gym & Recreation Room', 'Common Room & TV Lounge', 'Mess & Dining Hall']
  },
  hostelgirls: {
    badge: 'Residence', color: '#5a0e8a',
    title: "Girls' Hostel",
    desc: "Safe and comfortable residential facility for women students with round-the-clock security.",
    items: ['350+ Bed Capacity', 'Single & Twin-Sharing Rooms', 'Female Security Staff', 'High-Speed Wi-Fi', 'Salon & Beauty Services', 'Common Room & TV Lounge', 'Dedicated Mess & Dining Hall']
  },
  cricket: {
    badge: 'Sports', color: '#2d8a2d',
    title: 'Cricket Ground',
    desc: 'Full-size cricket ground with proper pitch, outfield, and practice nets for varsity and recreational play.',
    items: ['Full-Size Cricket Pitch', 'Practice Nets (4 lanes)', 'Seating Pavilion', 'Floodlights for Evening Matches', 'Regular Inter-University Matches', 'Cricket Coaching Academy', 'Groundskeeping Team']
  },
  sports: {
    badge: 'Sports', color: '#1a6b3a',
    title: 'Sports Complex',
    desc: 'Multi-sport complex with indoor and outdoor facilities for athletics, badminton, basketball, and more.',
    items: ['Basketball & Volleyball Courts', 'Badminton Courts (Indoor)', 'Football Ground', 'Athletics Track', 'Table Tennis Hall', 'Swimming Pool', 'Fitness & Gym Centre', 'Yoga & Meditation Centre']
  },
  cafeteria: {
    badge: 'Facility', color: '#C8921A',
    title: 'Cafeteria & Food Court',
    desc: 'Central food hub offering hygienic, affordable meals, snacks and beverages throughout the day.',
    items: ['Main Cafeteria (800 seats)', 'Multiple Food Stalls', 'Vegetarian & Jain Options', 'Open 7 AM – 9 PM', 'Juice Bar & Coffee Kiosk', 'Monthly Meal Plans Available', 'NSS-Certified Hygiene Standards']
  },
  auditorium: {
    badge: 'Facility', color: '#C8921A',
    title: 'Main Auditorium',
    desc: 'A 1500-seat multipurpose auditorium hosting convocations, cultural events, and guest lectures.',
    items: ['1,500-Seat Capacity', 'State-of-the-art AV System', 'AC & Sound-Proofed Hall', 'Backstage & Green Rooms', 'Convocation Hall', 'TEDx & Cultural Events Venue', 'Seminar & Conference Suites']
  },
  hospital: {
    badge: 'Medical', color: '#2a5098',
    title: 'Teaching Hospital (Ayurveda & Homoeopathy)',
    desc: 'On-campus teaching hospital providing BAMS and BHMS students clinical training with OPD and IPD facilities.',
    items: ['OPD & IPD Departments', 'BAMS / Ayurveda Wing', 'BHMS / Homoeopathy Wing', 'Panchakarma Treatment Centre', 'Pharmacy & Dispensary', 'Community Health Outreach', 'Attached College Clinics']
  },
  research: {
    badge: 'Research', color: '#8B1A1A',
    title: 'Research & Innovation Centre',
    desc: 'Interdisciplinary research hub supporting Ph.D. scholars, faculty research, and industry-linked projects.',
    items: ['Ph.D. Research Labs', 'Industry Collaboration Desk', 'Patent & IPR Cell', 'Advanced Testing Equipment', 'Conference & Seminar Hall', 'Research Scholars Lounge', 'NISP – Innovation Startup Policy']
  }
};

/* ── BUILD SVG MAP ── */
function buildCampusMap() {
  const wrap = document.getElementById('campusMapWrap');
  if (!wrap) return;

  wrap.innerHTML = `
    <svg id="campusSvg" viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg">
      <!-- Ground -->
      <rect width="860" height="480" fill="#d4e8c2"/>

      <!-- Roads -->
      <rect x="0"   y="215" width="860" height="18" fill="#c8b89a"/>
      <rect x="140" y="0"   width="16"  height="480" fill="#c8b89a"/>
      <rect x="400" y="0"   width="14"  height="480" fill="#c8b89a"/>
      <rect x="640" y="0"   width="14"  height="480" fill="#c8b89a"/>
      <rect x="0"   y="340" width="860" height="14" fill="#c8b89a"/>

      <!-- Trees -->
      <g fill="#4a9e4a" opacity="0.55">
        <circle cx="60"  cy="60"  r="10"/><circle cx="90"  cy="80"  r="7"/><circle cx="45"  cy="90"  r="8"/>
        <circle cx="750" cy="50"  r="9"/> <circle cx="780" cy="75"  r="7"/><circle cx="820" cy="55"  r="8"/>
        <circle cx="60"  cy="400" r="9"/> <circle cx="85"  cy="430" r="7"/><circle cx="50"  cy="455" r="8"/>
        <circle cx="750" cy="400" r="9"/> <circle cx="800" cy="420" r="7"/><circle cx="820" cy="455" r="8"/>
        <circle cx="200" cy="150" r="7"/> <circle cx="550" cy="140" r="8"/><circle cx="500" cy="420" r="7"/>
        <circle cx="320" cy="420" r="8"/> <circle cx="730" cy="280" r="7"/><circle cx="180" cy="280" r="8"/>
      </g>

      <!-- MAIN GATE -->
      <g class="map-building" data-id="gate" style="cursor:pointer">
        <rect x="2" y="200" width="140" height="34" rx="4" fill="#C8921A" stroke="#9a6e0e" stroke-width="1.5"/>
        <text x="71" y="213" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">MAIN GATE</text>
        <text x="71" y="226" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">NH-8 Entrance · Security</text>
      </g>

      <!-- ADMIN BLOCK -->
      <g class="map-building" data-id="admin" style="cursor:pointer">
        <rect x="156" y="80" width="108" height="70" rx="5" fill="#C8921A" stroke="#9a6e0e" stroke-width="1.5"/>
        <text x="210" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">ADMIN BLOCK</text>
      </g>

      <!-- ENGINEERING -->
      <g class="map-building" data-id="engineering" style="cursor:pointer">
        <rect x="156" y="240" width="110" height="80" rx="5" fill="#8B1A1A" stroke="#5a0e0e" stroke-width="1.5"/>
        <text x="211" y="276" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">ENGINEERING</text>
        <text x="211" y="289" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">&amp; TECH BLOCK</text>
      </g>

      <!-- CS BLOCK -->
      <g class="map-building" data-id="cs" style="cursor:pointer">
        <rect x="156" y="358" width="110" height="70" rx="5" fill="#8B1A1A" stroke="#5a0e0e" stroke-width="1.5"/>
        <text x="211" y="390" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">COMPUTER</text>
        <text x="211" y="403" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">SCIENCE BLOCK</text>
      </g>

      <!-- LIBRARY -->
      <g class="map-building" data-id="library" style="cursor:pointer">
        <rect x="420" y="80" width="120" height="70" rx="5" fill="#C8921A" stroke="#9a6e0e" stroke-width="1.5"/>
        <text x="480" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">CENTRAL</text>
        <text x="480" y="125" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">LIBRARY</text>
      </g>

      <!-- MEDICAL BLOCK -->
      <g class="map-building" data-id="medical" style="cursor:pointer">
        <rect x="420" y="240" width="115" height="85" rx="5" fill="#2a5098" stroke="#1a3a6e" stroke-width="1.5"/>
        <text x="477" y="278" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">MEDICAL &amp;</text>
        <text x="477" y="291" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">HEALTH BLOCK</text>
      </g>

      <!-- PHARMACY -->
      <g class="map-building" data-id="pharma" style="cursor:pointer">
        <rect x="420" y="358" width="115" height="68" rx="5" fill="#2a5098" stroke="#1a3a6e" stroke-width="1.5"/>
        <text x="477" y="389" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">PHARMACY &amp;</text>
        <text x="477" y="402" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">SCIENCE BLOCK</text>
      </g>

      <!-- ARCH & DESIGN -->
      <g class="map-building" data-id="arch" style="cursor:pointer">
        <rect x="656" y="80" width="120" height="70" rx="5" fill="#8B1A1A" stroke="#5a0e0e" stroke-width="1.5"/>
        <text x="716" y="112" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">ARCH &amp; DESIGN</text>
        <text x="716" y="125" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">BLOCK</text>
      </g>

      <!-- MANAGEMENT -->
      <g class="map-building" data-id="management" style="cursor:pointer">
        <rect x="656" y="240" width="120" height="78" rx="5" fill="#8B1A1A" stroke="#5a0e0e" stroke-width="1.5"/>
        <text x="716" y="275" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">MANAGEMENT</text>
        <text x="716" y="288" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">&amp; LIBERAL ARTS</text>
      </g>

      <!-- BOYS HOSTEL -->
      <g class="map-building" data-id="hostelboys" style="cursor:pointer">
        <rect x="656" y="358" width="56" height="68" rx="5" fill="#5a0e8a" stroke="#3d0a60" stroke-width="1.5"/>
        <text x="684" y="389" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="8" font-weight="700" fill="#fff">BOYS</text>
        <text x="684" y="401" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">HOSTEL</text>
      </g>

      <!-- GIRLS HOSTEL -->
      <g class="map-building" data-id="hostelgirls" style="cursor:pointer">
        <rect x="722" y="358" width="54" height="68" rx="5" fill="#5a0e8a" stroke="#3d0a60" stroke-width="1.5"/>
        <text x="749" y="389" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="8" font-weight="700" fill="#fff">GIRLS</text>
        <text x="749" y="401" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">HOSTEL</text>
      </g>

      <!-- CRICKET GROUND -->
      <g class="map-building" data-id="cricket" style="cursor:pointer">
        <ellipse cx="290" cy="155" rx="80" ry="42" fill="#2d8a2d" stroke="#1a5e1a" stroke-width="1.5"/>
        <ellipse cx="290" cy="155" rx="35" ry="18" fill="#3daa3d" stroke="#2a7a2a" stroke-width="1"/>
        <text x="290" y="150" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="8" font-weight="700" fill="#fff">CRICKET</text>
        <text x="290" y="162" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.85)">GROUND</text>
      </g>

      <!-- SPORTS COMPLEX -->
      <g class="map-building" data-id="sports" style="cursor:pointer">
        <rect x="156" y="160" width="110" height="46" rx="5" fill="#1a6b3a" stroke="#0d4a26" stroke-width="1.5"/>
        <text x="211" y="180" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">SPORTS COMPLEX</text>
      </g>

      <!-- CAFETERIA -->
      <g class="map-building" data-id="cafeteria" style="cursor:pointer">
        <rect x="420" y="160" width="115" height="46" rx="5" fill="#C8921A" stroke="#9a6e0e" stroke-width="1.5"/>
        <text x="477" y="180" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">CAFETERIA</text>
        <text x="477" y="193" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">&amp; FOOD COURT</text>
      </g>

      <!-- AUDITORIUM -->
      <g class="map-building" data-id="auditorium" style="cursor:pointer">
        <rect x="656" y="160" width="120" height="66" rx="5" fill="#C8921A" stroke="#9a6e0e" stroke-width="1.5"/>
        <text x="716" y="190" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">AUDITORIUM</text>
        <text x="716" y="203" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">Capacity: 1500</text>
      </g>

      <!-- TEACHING HOSPITAL -->
      <g class="map-building" data-id="hospital" style="cursor:pointer">
        <rect x="280" y="240" width="108" height="78" rx="5" fill="#2a5098" stroke="#1a3a6e" stroke-width="1.5"/>
        <text x="334" y="274" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">TEACHING</text>
        <text x="334" y="287" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">HOSPITAL</text>
      </g>

      <!-- RESEARCH CENTRE -->
      <g class="map-building" data-id="research" style="cursor:pointer">
        <rect x="280" y="358" width="108" height="68" rx="5" fill="#8B1A1A" stroke="#5a0e0e" stroke-width="1.5"/>
        <text x="334" y="390" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="700" fill="#fff">RESEARCH</text>
        <text x="334" y="403" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="7" fill="rgba(255,255,255,.8)">CENTRE</text>
      </g>

      <!-- Compass Rose -->
      <g transform="translate(820,30)">
        <circle cx="0" cy="0" r="18" fill="rgba(255,255,255,.85)" stroke="#8B1A1A" stroke-width="1.5"/>
        <polygon points="0,-14 4,-4 0,2 -4,-4" fill="#8B1A1A"/>
        <polygon points="0,14 4,4 0,-2 -4,4" fill="#aaa"/>
        <text x="0" y="-19" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="800" fill="#8B1A1A">N</text>
      </g>

      <!-- Scale Bar -->
      <g transform="translate(20,462)">
        <rect x="0" y="0" width="80" height="4" fill="#8B1A1A" rx="2"/>
        <text x="0"  y="14" font-family="Montserrat,sans-serif" font-size="7" fill="#555">0</text>
        <text x="60" y="14" font-family="Montserrat,sans-serif" font-size="7" fill="#555">250m</text>
      </g>
    </svg>

    <!-- Tooltip -->
    <div class="map-tooltip" id="mapTooltip">
      <div class="tt-badge" id="ttBadge">Academic</div>
      <h4 id="ttTitle">Building Name</h4>
      <p  id="ttDesc">Description.</p>
      <ul id="ttList"></ul>
      <div class="tt-arrow"></div>
    </div>
  `;

  /* ── TOOLTIP INTERACTIVITY ── */
  const tooltip = document.getElementById('mapTooltip');
  const ttBadge = document.getElementById('ttBadge');
  const ttTitle = document.getElementById('ttTitle');
  const ttDesc  = document.getElementById('ttDesc');
  const ttList  = document.getElementById('ttList');
  const mapWrap = document.getElementById('campusMapWrap');

  let activeBuilding = null;

  // Click handler on each building
  document.querySelectorAll('.map-building').forEach(el => {

    el.addEventListener('click', function(e) {
      e.stopPropagation();
      const id   = this.dataset.id;
      const data = BUILDINGS[id];
      if (!data) return;

      // Toggle off if same building clicked again
      if (activeBuilding === id) {
        tooltip.classList.remove('show');
        activeBuilding = null;
        resetHighlights();
        return;
      }

      activeBuilding = id;

      // Highlight clicked building, dim others
      document.querySelectorAll('.map-building').forEach(b => {
        const shapes = b.querySelectorAll('rect, ellipse');
        if (b === el) {
          shapes.forEach(s => s.style.filter = 'brightness(1.25) drop-shadow(0 0 8px rgba(255,255,255,.6))');
        } else {
          shapes.forEach(s => s.style.filter = 'brightness(0.62)');
        }
      });

      // Populate tooltip
      ttBadge.textContent      = data.badge;
      ttBadge.style.background = data.color;
      ttTitle.textContent      = data.title;
      ttDesc.textContent       = data.desc;
      ttList.innerHTML         = data.items.map(item => `<li>${item}</li>`).join('');

      // Position tooltip relative to map wrapper
      const wrapRect = mapWrap.getBoundingClientRect();
      const elRect   = el.getBoundingClientRect();

      let left = (elRect.left - wrapRect.left) + (elRect.width / 2) - 110;
      let top  = (elRect.top  - wrapRect.top)  - 20;

      // Clamp horizontally
      left = Math.max(8, Math.min(left, wrapRect.width - 290));

      // Flip below building if tooltip goes off top
      if (top < 8) {
        top = (elRect.top - wrapRect.top) + elRect.height + 8;
      }

      tooltip.style.left = left + 'px';
      tooltip.style.top  = top  + 'px';
      tooltip.classList.add('show');
    });

    // Hover glow
    el.addEventListener('mouseenter', function() {
      if (activeBuilding !== this.dataset.id) {
        this.querySelectorAll('rect, ellipse').forEach(s => s.style.filter = 'brightness(1.15)');
      }
    });

    el.addEventListener('mouseleave', function() {
      if (activeBuilding !== this.dataset.id) {
        this.querySelectorAll('rect, ellipse').forEach(s => {
          s.style.filter = activeBuilding ? 'brightness(0.62)' : '';
        });
      }
    });
  });

  // Click on empty map area → close tooltip
  mapWrap.addEventListener('click', function(e) {
    if (!e.target.closest('.map-building')) {
      tooltip.classList.remove('show');
      activeBuilding = null;
      resetHighlights();
    }
  });

  function resetHighlights() {
    document.querySelectorAll('.map-building rect, .map-building ellipse').forEach(s => {
      s.style.filter = '';
    });
  }
}

// Build the map as soon as DOM is ready
document.addEventListener('DOMContentLoaded', buildCampusMap);
