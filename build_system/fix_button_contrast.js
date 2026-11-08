const fs = require('fs');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('--- Fixing Button Contrast & Dark Mode Style Override ---');

// 1. Fix CSS override in <style>
const oldStyleRule = '.dark .bg-slate-900, .dark .bg-white { background-color: #151D2E !important; }';
const newStyleRule = `.dark .bg-slate-900, .dark .dark\\:bg-slate-900 { background-color: #151D2E !important; }

    /* Crisp High-Contrast Hero Primary Button */
    .resume-lesson-btn {
      background-color: #FFFFFF !important;
      color: #0F172A !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3) !important;
    }
    .resume-lesson-btn:hover {
      background-color: #F8FAFC !important;
      color: #0284C7 !important;
    }
    .resume-lesson-btn i {
      color: #0284C7 !important;
    }`;

if (!html.includes(oldStyleRule)) {
  console.error('ERROR: oldStyleRule not found!');
  process.exit(1);
}
html = html.replace(oldStyleRule, newStyleRule);
console.log('✓ Fixed CSS rule in <style>: removed harmful .dark .bg-white override');

// 2. Update Hero Button in renderDashboardView
const oldHeroBtn = `<button onclick="navigateTo('lesson', '\${appState.lastStudiedId || 'm1-what-is-react'}')" class="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-sky-50 transition shadow-lg flex items-center gap-2">
                <i class="fa-solid fa-play text-sky-600"></i>
                <span>Pichhla Lesson Chalu Karein</span>
              </button>`;

const newHeroBtn = `<button onclick="navigateTo('lesson', '\${appState.lastStudiedId || 'm1-what-is-react'}')" class="resume-lesson-btn px-6 py-3 rounded-xl font-extrabold text-sm transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer" style="background-color: #ffffff !important; color: #0f172a !important;">
                <i class="fa-solid fa-circle-play text-sky-600 text-base"></i>
                <span style="color: #0f172a !important; font-weight: 800;">Pichhla Lesson Chalu Karein</span>
              </button>`;

if (!html.includes(oldHeroBtn)) {
  console.error('ERROR: oldHeroBtn not found!');
  process.exit(1);
}
html = html.replace(oldHeroBtn, newHeroBtn);
console.log('✓ Upgraded Hero "Pichhla Lesson Chalu Karein" button with guaranteed contrast');

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ template_extracted.html updated successfully!');
