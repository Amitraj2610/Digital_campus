/* ══════════════════════════════════════════════
   PPSU UNIVERSITY WEBSITE — MAIN SCRIPT
   Handles: cursor, navbar, video, counters,
   scroll reveal, modals, forms, toast
══════════════════════════════════════════════ */

/* ── 1. CUSTOM CURSOR ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  // Ring trails slightly behind
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 60);
});

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .s-card, .hc-item, .logo-pill, .map-building').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; });
});

/* ── 2. NAVBAR SCROLL SHADOW ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── 3. MOBILE HAMBURGER ── */
document.getElementById('hamburger').addEventListener('click', toggleMobile);

function toggleMobile() {
  const nl = document.getElementById('navLinks');
  const isOpen = nl.style.display === 'flex';
  nl.style.display     = isOpen ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position    = 'absolute';
  nl.style.top         = '70px';
  nl.style.left        = '0';
  nl.style.right       = '0';
  nl.style.background  = '#fff';
  nl.style.padding     = '16px';
  nl.style.boxShadow   = '0 8px 24px rgba(0,0,0,.1)';
  nl.style.zIndex      = '999';
}

/* ── 4. HERO VIDEO CONTROL ── */
const heroVideo  = document.getElementById('heroVideo');
const videoIcon  = document.getElementById('videoIcon');
const videoCtrl  = document.getElementById('videoCtrl');
let   videoPaused = false;

videoCtrl.addEventListener('click', toggleVideo);

function toggleVideo() {
  if (videoPaused) {
    heroVideo.play();
    videoIcon.className = 'fas fa-pause';
    videoCtrl.innerHTML = '<i class="fas fa-pause" id="videoIcon"></i> Pause Video';
    videoPaused = false;
  } else {
    heroVideo.pause();
    videoIcon.className = 'fas fa-play';
    videoCtrl.innerHTML = '<i class="fas fa-play" id="videoIcon"></i> Play Video';
    videoPaused = true;
  }
}

/* ── 5. ANIMATED COUNTERS ── */
let counted = false;

function animateCount(el, target, suffix = '') {
  let current = 0;
  const step  = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + (current === target ? suffix : '');
    if (current >= target) clearInterval(timer);
  }, 28);
}

function runCounters() {
  if (counted) return;
  counted = true;
  document.querySelectorAll('[data-target]').forEach(el => {
    animateCount(el, parseInt(el.dataset.target), '+');
  });
}

// Hero stats animate on load
setTimeout(() => {
  document.querySelectorAll('.hero [data-target]').forEach(el => {
    animateCount(el, parseInt(el.dataset.target), '+');
  });
}, 600);

/* ── 6. SCROLL REVEAL (Intersection Observer) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      // Trigger counters when counter strip enters view
      if (entry.target.id === 'counters' || entry.target.closest('#counters')) {
        runCounters();
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

/* ── 7. FORM PROGRESS BARS ── */
const regFields = ['reg_fname', 'reg_lname', 'reg_email', 'reg_mobile', 'reg_programme'];

function updateRegProgress() {
  const filled = regFields.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim();
  }).length;
  document.getElementById('regfp1').classList.toggle('active', filled >= 0);
  document.getElementById('regfp2').classList.toggle('active', filled >= 3);
  document.getElementById('regfp3').classList.toggle('active', filled >= 5);
}

regFields.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateRegProgress);
});

const visFields = ['vis_fname', 'vis_lname', 'vis_email', 'vis_mobile'];

function updateVisProgress() {
  const filled = visFields.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim();
  }).length;
  document.getElementById('visfp1').classList.toggle('active', filled >= 0);
  document.getElementById('visfp2').classList.toggle('active', filled >= 2);
  document.getElementById('visfp3').classList.toggle('active', filled >= 4);
}

visFields.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateVisProgress);
});

/* ── 8. MODAL OPEN / CLOSE FUNCTIONS ── */
function openRegistrationForm() {
  document.getElementById('registrationOverlay').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeRegistrationForm() {
  document.getElementById('registrationOverlay').classList.remove('on');
  document.body.style.overflow = '';
}

function openVisitorForm() {
  document.getElementById('visitorOverlay').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeVisitorForm() {
  document.getElementById('visitorOverlay').classList.remove('on');
  document.body.style.overflow = '';
}

function openMap() {
  document.getElementById('mapModal').classList.add('on');
}

function closeMap() {
  document.getElementById('mapModal').classList.remove('on');
  document.body.style.overflow = '';
}

/* ── 9. BUTTON EVENT LISTENERS ── */
// Apply buttons → open registration
document.getElementById('navApplyBtn').addEventListener('click', e => { e.preventDefault(); openRegistrationForm(); });
document.getElementById('heroCardApplyBtn').addEventListener('click', e => { e.preventDefault(); openRegistrationForm(); });
document.getElementById('admitApplyBtn').addEventListener('click', openRegistrationForm);

// Map button → open visitor form first
document.getElementById('mapBtn').addEventListener('click', openVisitorForm);

// Close buttons
document.getElementById('closeRegBtn').addEventListener('click', closeRegistrationForm);
document.getElementById('closeVisBtn').addEventListener('click', closeVisitorForm);
document.getElementById('closeMapBtn').addEventListener('click', closeMap);

// Close on overlay click
['registrationOverlay', 'visitorOverlay', 'mapModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('on');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeRegistrationForm();
    closeVisitorForm();
    closeMap();
  }
});

/* ── 10. REGISTRATION FORM SUBMIT ── */
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validate required fields
  const required = ['reg_fname', 'reg_lname', 'reg_email', 'reg_mobile', 'reg_programme'];
  let isValid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('err');
      isValid = false;
    } else {
      el.classList.remove('err');
    }
  });

  if (!isValid) return;

  // Set loading state
  const btn = document.getElementById('regSubmitBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled = true;

  const registrationData = {
    first_name:    document.getElementById('reg_fname').value.trim(),
    last_name:     document.getElementById('reg_lname').value.trim(),
    email:         document.getElementById('reg_email').value.trim(),
    mobile:        document.getElementById('reg_mobile').value.trim(),
    city:          document.getElementById('reg_city').value.trim(),
    programme:     document.getElementById('reg_programme').value,
    qualification: document.getElementById('reg_qualification').value,
    submitted_at:  new Date().toISOString()
  };

  try {
    const { error } = await window.supabase
      .from('registration')
      .insert([registrationData]);

    if (error) {
      showToast('Error: ' + error.message, 'error');
    } else {
      showToast(`Welcome, ${registrationData.first_name}! Application submitted successfully.`, 'success');
      closeRegistrationForm();
      document.getElementById('registrationForm').reset();
      updateRegProgress();
    }
  } catch (err) {
    console.error('Submission error:', err);
    showToast('Error submitting application. Please try again.', 'error');
  }

  // Reset button state
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
  btn.disabled = false;
});

/* ── 11. VISITOR FORM SUBMIT ── */
document.getElementById('visitorForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Validate required fields
  const required = ['vis_fname', 'vis_lname', 'vis_email', 'vis_mobile'];
  let isValid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('err');
      isValid = false;
    } else {
      el.classList.remove('err');
    }
  });

  if (!isValid) return;

  // Set loading state
  const btn = document.getElementById('visSubmitBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled = true;

  const visitorData = {
    first_name: document.getElementById('vis_fname').value.trim(),
    last_name:  document.getElementById('vis_lname').value.trim(),
    email:      document.getElementById('vis_email').value.trim(),
    mobile:     document.getElementById('vis_mobile').value.trim(),
    city:       document.getElementById('vis_city').value.trim(),
    purpose:    document.getElementById('vis_purpose').value,
    visited_at: new Date().toISOString()
  };

  try {
    const { error } = await window.supabase
      .from('visitor')
      .insert([visitorData]);

    if (error) {
      showToast('Error: ' + error.message, 'error');
    } else {
      showToast(`Welcome, ${visitorData.first_name}! Here's the campus map.`, 'success');
      closeVisitorForm();
      document.getElementById('visitorForm').reset();
      updateVisProgress();
      setTimeout(openMap, 300);
    }
  } catch (err) {
    console.error('Submission error:', err);
    showToast('Error submitting form. Please try again.', 'error');
  }

  // Reset button state
  btn.innerHTML = '<i class="fas fa-map-pin"></i> Open Campus Map';
  btn.disabled = false;
});

/* ── 12. CLEAR ERROR ON INPUT ── */
document.querySelectorAll('.fg input, .fg select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('err'));
});

/* ── 13. TOAST NOTIFICATION ── */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = message;

  if (type === 'error') {
    toast.style.background = 'linear-gradient(135deg,#c33030,#e53935)';
  } else {
    toast.style.background = 'linear-gradient(135deg,#1a6b3a,#27ae60)';
  }

  toast.classList.add('on');
  setTimeout(() => toast.classList.remove('on'), 4000);
}
