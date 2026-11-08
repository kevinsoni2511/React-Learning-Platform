const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Upgrading template_extracted.html to Full Master Prompt Standards ---');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

// 1. Update Tailwind config & dark theme palette to exact prompt specifications:
// Background: #0B0F19, Sidebar: #111827, Cards: #151D2E, Primary: #8B5CF6, Secondary: #6366F1, Success: #22C55E
const oldTailwindScript = html.substring(
  html.indexOf('<script>\n    tailwind.config'),
  html.indexOf('</script>\n\n  <style>') + 9
);

const newTailwindScript = `<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['Fira Code', 'monospace']
          },
          colors: {
            darkBg: '#0B0F19',
            darkSidebar: '#111827',
            darkCard: '#151D2E',
            darkBorder: '#1E293B',
            primary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              400: '#a78bfa',
              500: '#8B5CF6',
              600: '#7c3aed',
              700: '#6d28d9'
            },
            secondary: {
              500: '#6366F1',
              600: '#4f46e5'
            },
            brandSuccess: '#22C55E'
          }
        }
      }
    };
  </script>`;

if (oldTailwindScript && html.includes(oldTailwindScript)) {
  html = html.replace(oldTailwindScript, newTailwindScript);
  console.log('✓ Tailwind configuration upgraded with exact #0B0F19 / #8B5CF6 theme palette');
}

// 2. Add dark theme CSS overrides in <style>
const cssInsertion = `
    /* Master Prompt Dark-First Palette Override */
    .dark body { background-color: #0B0F19 !important; color: #F8FAFC !important; }
    .dark aside#left-sidebar { background-color: #111827 !important; border-color: #1E293B !important; }
    .dark aside#right-sidebar { background-color: #111827 !important; border-color: #1E293B !important; }
    .dark header { background-color: rgba(17, 24, 39, 0.95) !important; border-color: #1E293B !important; }
    .dark main { background-color: #0B0F19 !important; }
    .dark .bg-slate-900, .dark .bg-white { background-color: #151D2E !important; }
    .dark .border-slate-800, .dark .border-slate-700, .dark .border-slate-200 { border-color: #1E293B !important; }
    .dark .bg-slate-950 { background-color: #0B0F19 !important; }
`;

html = html.replace('/* Custom Scrollbar */', cssInsertion + '\n    /* Custom Scrollbar */');
console.log('✓ Dark mode CSS rules applied');

// 3. Add Export/Import & Certificate buttons to the Header
const oldHeaderRight = html.substring(
  html.indexOf('<!-- Quick Stats & Controls -->'),
  html.indexOf('</header>')
);

const newHeaderRight = `<!-- Quick Stats & Controls -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <!-- Unlock / Explore Mode Pill -->
      <button onclick="toggleUnlockAllMode()" id="explore-mode-btn" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition hover:bg-purple-100" title="Toggle Strict Sequential or Free Exploration Mode">
        <i class="fa-solid fa-lock" id="unlock-mode-icon"></i>
        <span id="unlock-mode-text">Strict Mode</span>
      </button>

      <!-- Streak Pill -->
      <div class="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-bold" title="Lagatar Padhai Ka Streak">
        <span>🔥</span>
        <span id="streak-counter">3 Din Ka Streak</span>
      </div>

      <!-- Quiz Score Pill -->
      <div class="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
        <span>🏆</span>
        <span id="total-points-counter">0 Kul Pts</span>
      </div>

      <!-- Certificate Button -->
      <button onclick="openCertificateModal()" class="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition" title="View / Print Completion Certificate">
        <i class="fa-solid fa-award"></i>
        <span class="hidden md:inline">Certificate</span>
      </button>

      <!-- Export / Import Progress -->
      <button onclick="exportProgressJSON()" class="p-2 rounded-xl text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition" title="Export Progress JSON (Backup)">
        <i class="fa-solid fa-cloud-arrow-down text-sm"></i>
      </button>
      <button onclick="importProgressJSON()" class="p-2 rounded-xl text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition" title="Import Progress JSON (Restore)">
        <i class="fa-solid fa-cloud-arrow-up text-sm"></i>
      </button>

      <!-- Theme Toggle -->
      <button id="theme-toggle-btn" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Theme Badlein (Dark / Light Mode)">
        <i class="fa-solid fa-moon text-base dark:hidden"></i>
        <i class="fa-solid fa-sun text-base hidden dark:inline-block text-amber-400"></i>
      </button>

      <!-- Reset Progress -->
      <button onclick="promptResetProgress()" class="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition" title="Apna Course Progress Reset Karein">
        <i class="fa-solid fa-arrow-rotate-left text-sm"></i>
      </button>
    </div>`;

html = html.replace(oldHeaderRight, newHeaderRight);
console.log('✓ Header updated with Explore Mode toggle, Certificate button, and Export/Import');

// 4. Add Certificate Modal before </body>
const certificateModalHtml = `
  <!-- CERTIFICATE OF COMPLETION MODAL -->
  <div id="certificate-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white dark:bg-slate-900 border-4 border-amber-500/60 rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200">
      <button onclick="closeCertificateModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl">✕</button>
      
      <!-- Certificate Header -->
      <div class="text-center space-y-2 border-b-2 border-amber-500/30 pb-6">
        <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-amber-500/30">
          <i class="fa-solid fa-award"></i>
        </div>
        <span class="text-xs font-black tracking-widest uppercase text-amber-600 dark:text-amber-400">Official Certification of Achievement</span>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">CERTIFICATE OF COMPLETION</h2>
        <p class="text-xs text-slate-500">ReactMastery Pro • Advanced Agentic & Job-Ready Curriculum</p>
      </div>

      <!-- Certificate Body -->
      <div class="py-6 text-center space-y-4">
        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">This certificate is proudly awarded to:</p>
        <div class="max-w-md mx-auto">
          <input
            id="cert-student-name"
            oninput="updateCertificateDisplay()"
            type="text"
            placeholder="Aapka Poora Naam (Enter Your Full Name)"
            class="text-2xl sm:text-3xl font-black text-center text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 focus:outline-none bg-transparent w-full pb-1"
          />
        </div>
        <h3 id="cert-display-name" class="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 hidden">React Developer</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          for successfully demonstrating competence and mastery in <strong>React 18 Architecture, TypeScript Core & Generics, Advanced Hooks, Context API, Redux Toolkit State Management, Performance Optimization, and Production Cloud Deployment</strong>.
        </p>

        <!-- Metrics & Verification Details -->
        <div class="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-4 text-center">
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Issued Date</div>
            <div id="cert-display-date" class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">November 8, 2026</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Curriculum</div>
            <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">12 Modules Completed</div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Verification ID</div>
            <div class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 mt-0.5">RM-9942-PRO</div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <span id="cert-display-score" class="text-xs text-slate-500 font-semibold">100% Curriculum Finished</span>
        <div class="flex gap-2">
          <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md flex items-center gap-1.5">
            <i class="fa-solid fa-print"></i>
            <span>Print / Save as PDF</span>
          </button>
          <button onclick="closeCertificateModal()" class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
`;

html = html.replace('</body>', certificateModalHtml + '\n</body>');
console.log('✓ Certificate of completion modal injected');

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Stage 1 modifications saved');
