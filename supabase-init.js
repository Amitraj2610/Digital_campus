/* ══════════════════════════════════════════════
   PPSU UNIVERSITY WEBSITE — SUPABASE INIT
   Initialises Supabase client and makes it
   available globally as window.supabase
══════════════════════════════════════════════ */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm';

const SUPABASE_URL      = 'https://uhepccnifmnunxvnfryf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoZXBjY25pZm1udW54dm5mcnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjIyMDAsImV4cCI6MjA5MDYzODIwMH0.fTl6xYTB_yzQ64SXUQt57kJVuXKp0aicWdsyMhkqxH0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Make globally accessible for script.js
window.supabase = supabase;

// Test connection on load
async function testConnection() {
  try {
    const { error } = await supabase.from('registration').select('count()').limit(1);
    if (error) {
      console.warn('Supabase: Check your credentials —', error.message);
    } else {
      console.log('%cSupabase connected ✓', 'color:#27ae60;font-weight:bold');
    }
  } catch (err) {
    console.warn('Supabase setup needed:', err.message);
  }
}

testConnection();
