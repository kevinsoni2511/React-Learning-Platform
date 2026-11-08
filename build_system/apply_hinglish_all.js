const fs = require('fs');
const vm = require('vm');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('--- Applying comprehensive Hinglish transformations across all views ---');

// 1. Sidebar module listing with Hindi title
html = html.replace(
  '<div class="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">${mod.title}</div>',
  '<div class="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">${mod.hindiTitle || mod.title}</div><div class="text-[10px] text-slate-400 dark:text-slate-500 truncate">${mod.title}</div>'
);

html = html.replace(
  '⚡ Practical Exercises (${mod.exercises.length})',
  '⚡ Practical Exercises (${mod.exercises.length} Karke Dekhein)'
);

// 2. Dashboard View Hero
html = html.replace(
  'Complete React Developer Master System',
  'Complete React, TypeScript & Redux Master System (A to Z)'
);

html = html.replace(
  'Namaste! Welcome back to your React Mastery Journey.',
  'Namaste! React Mastery Journey Me Aapka Swagat Hai.'
);

html = html.replace(
  'Study concepts step-by-step with simple English + Hinglish explanations, run live code, test your knowledge, build 10 capstone projects, and prepare for high-paying developer interviews.',
  'Har concept ko aasan Hinglish + English me step-by-step samjhein, browser me hi live code run karein, 10 capstone production projects banayein, aur high-paying developer interviews ke liye 100% ready ho jayein.'
);

html = html.replace(
  '<span>Resume Last Lesson</span>',
  '<span>Pichhla Lesson Chalu Karein</span>'
);

html = html.replace(
  '<span>View Full Roadmap</span>',
  '<span>Seekhne Ka Poora Roadmap Dekhein</span>'
);

// 3. Dashboard Metrics
html = html.replace(
  '<span class="text-xs font-bold uppercase">Course Progress</span>',
  '<span class="text-xs font-bold uppercase">Kul Course Ki Pragati</span>'
);

html = html.replace(
  'items completed</div>',
  'items pura hua</div>'
);

html = html.replace(
  '<span class="text-xs font-bold uppercase">Quiz Points</span>',
  '<span class="text-xs font-bold uppercase">Quiz Score & Points</span>'
);

html = html.replace(
  'quizzes completed</div>',
  'quizzes attempt kiye</div>'
);

html = html.replace(
  '<span class="text-xs font-bold uppercase">Active Streak</span>',
  '<span class="text-xs font-bold uppercase">Lagatar Padhai Ka Streak</span>'
);

html = html.replace(
  'Consistency Champion! 🔥',
  'Consistency Hi Kamyabi Hai! 🔥'
);

html = html.replace(
  'Study daily to maintain momentum',
  'Daily padhkar momentum banaye rakhein'
);

html = html.replace(
  '<span class="text-xs font-bold uppercase">Projects Built</span>',
  '<span class="text-xs font-bold uppercase">Capstone Projects</span>'
);

html = html.replace(
  'Portfolio Ready',
  'Portfolio Ke Liye Ready'
);

html = html.replace(
  'Real-world production apps',
  'Asli production standard apps'
);

html = html.replace(
  'Curriculum Modules (12 Parts)',
  'Sabhi 12 Curriculum Modules (Shuru Se Advanced Tak)'
);

html = html.replace(
  'Explore all topics from beginner to professional enterprise standards',
  'Beginner se lekar advanced enterprise standards tak ke sabhi topics aasan Hinglish me'
);

html = html.replace(
  '<div class="font-bold text-base text-slate-900 dark:text-white">${m.title}</div>',
  '<div class="font-bold text-base text-slate-900 dark:text-white">${m.hindiTitle || m.title}</div><div class="text-xs text-sky-600 dark:text-sky-400 font-medium mb-1">${m.title}</div>'
);

// 4. Roadmap View
html = html.replace(
  '<h2>🗺️ Complete Developer Career Roadmap</h2>',
  '<h2>🗺️ Complete Developer Career Roadmap (Step-by-Step Rasta)</h2>'
);

html = html.replace(
  'Follow this step-by-step 12-stage milestone roadmap. Each module builds directly upon the concepts learned in the previous one.',
  'Yeh 12-stage milestone roadmap aapko absolute beginner se professional industry-ready developer banata hai. Har module pichhle concepts par aadharit hai.'
);

html = html.replace(
  'Jump into Stage ${m.number} →',
  'Stage ${m.number} Me Dakhil Hon →'
);

// 5. Lesson View Breadcrumbs & Badges
html = html.replace(
  '<span class="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">\n                  English + Hinglish\n                </span>',
  '<span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300/40">\n                  🇮🇳 Hinglish + Simple English Margdarshak\n                </span>'
);

// 6. 4-Tab Navigation
html = html.replace(
  '<span>13-Step Comprehensive Guide</span>',
  '<span>13-Step Sampurna Guide (Hinglish)</span>'
);

html = html.replace(
  '<span>Interactive Code Sandbox</span>',
  '<span>Interactive Code Sandbox (Live Run)</span>'
);

html = html.replace(
  '<span>Quiz & Knowledge Check</span>',
  '<span>Quiz & Knowledge Check (+10 Pts)</span>'
);

html = html.replace(
  '<span>My Personal Notes</span>',
  '<span>Aapke Personal Notes (Yahan Likhein)</span>'
);

// 7. 13-Point Section Headers
html = html.replace(
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">1. Topic Introduction</span>',
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">1. Topic Introduction (Vishay Ka Parichay)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">2. What is it? (Hinglish + Simple English)</span>',
  '<span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">2. What is it? (Yeh Kya Hai - Aasan Shabdo Me)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">3. Why do we need it? (Problem Solved)</span>',
  '<span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">3. Why do we need it? (Iski Zaroorat Kyun Hai? Problem Solved)</span>'
);

html = html.replace(
  '<span>💡 4. Real-Life Analogy (Asan Shabdo Me)</span>',
  '<span>💡 4. Real-Life Analogy (Asli Zindagi Ka Example / Mazedaar Analogy)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">5. Technical Explanation & Internal Architecture</span>',
  '<span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">5. Technical Explanation & Internal Architecture (Under the Hood: Fiber, VDOM & Reconciliation Kaise Kaam Karta Hai)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">6. Syntax Explanation</span>',
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">6. Syntax Explanation (Code Likhne Ka Niyam)</span>'
);

html = html.replace(
  '<i class="fa-regular fa-copy"></i> Copy Syntax',
  '<i class="fa-regular fa-copy"></i> Syntax Copy Karein'
);

html = html.replace(
  '<strong>7. Step-by-Step Breakdown:</strong>',
  '<strong>7. Step-by-Step Breakdown (Line-by-Line Code Ka Matlab):</strong>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">8. Expected Output</span>',
  '<span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">8. Expected Output (Screen Par Kya Output Dikhega)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mt-4 mb-2">9. Practical Implementation</span>',
  '<span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mt-4 mb-2">9. Practical Implementation (Real Project Implementation Code)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">10. Common Mistakes & How to Fix Them</span>',
  '<span class="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">10. Common Mistakes & How to Fix Them (Bohot Log Yeh Galti Karte Hain - Kaise Bachen)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">11. Frequently Asked Interview Questions</span>',
  '<span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">11. Top Interview Questions (Interview Me Poochhe Jane Wale Sawaal-Jawaab)</span>'
);

html = html.replace(
  '<span class="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">12. Mini Assignment (Action Task)</span>',
  '<span class="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">12. Mini Assignment (Aapke Liye Practice Task)</span>'
);

html = html.replace(
  '<span>Take 60-Second Quiz (+10 Pts) →</span>',
  '<span>Quiz Attempt Karein (+10 Points Kamayein) →</span>'
);

// 8. Bottom Navigation
html = html.replace('<span>Previous Lesson</span>', '<span>← Pichhla Lesson (Previous)</span>');
html = html.replace('<span>Next Lesson</span>', '<span>Agla Lesson (Next) →</span>');

// 9. Sandbox Tab UI
html = html.replace(
  '<h3 class="font-bold text-sm text-slate-900 dark:text-white">React 18 Live Code Editor</h3>',
  '<h3 class="font-bold text-sm text-slate-900 dark:text-white">React 18 Live Code Sandbox (Code Likho, Modify Karo, Output Dekho)</h3>'
);

html = html.replace(
  '<i class="fa-solid fa-play"></i> Run Code',
  '<i class="fa-solid fa-play"></i> ▶ Run Code (Live Chalao)'
);

html = html.replace(
  '<i class="fa-solid fa-rotate-left"></i> Reset',
  '<i class="fa-solid fa-rotate-left"></i> Reset (Pehle Jaisa)'
);

html = html.replace(
  '<i class="fa-regular fa-copy"></i> Copy',
  '<i class="fa-regular fa-copy"></i> Code Copy Karein'
);

html = html.replace(
  '<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Live Component Preview:</span>',
  '<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Live Component Preview (Yahan Live Output Dikhega):</span>'
);

// 10. Quiz Tab UI
html = html.replace(
  '🎉 Correct Answer! (+10 Points)',
  '🎉 Zabardast! Bilkul Sahi Jawaab (+10 Points)! 🎉'
);

html = html.replace(
  '❌ Incorrect Answer. Review explanation and try again!',
  '❌ Galat Jawaab! Niche di gayi explanation padhein aur dubara koshish karein.'
);

// 11. Projects View
html = html.replace(
  '<h2>\n                💻 10 Capstone Production Projects\n              </h2>',
  '<h2>\n                💻 10 Capstone Production Projects (Portfolio Ready Apps)\n              </h2>'
);

html = html.replace(
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Requirements:</h4>',
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📋 Project Ki Zarooratein (Requirements):</h4>'
);

html = html.replace(
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Folder Structure:</h4>',
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">📁 File & Folder Structure (Project Ka Dhancha):</h4>'
);

html = html.replace(
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Step-by-Step Implementation:</h4>',
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🛠️ Kadam-Dar-Kadam Banayein (Step-by-Step Implementation):</h4>'
);

html = html.replace(
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What This Teaches:</h4>',
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">💡 Yeh Project Kya Sikhata Hai? (Deep Concepts Learned):</h4>'
);

html = html.replace(
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verification Checklist:</h4>',
  '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">✅ Project Completion Checklist (Sabhi Features Check Karein):</h4>'
);

html = html.replace(
  '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600">Runnable In-Browser Demo</span>',
  '<span class="text-xs font-bold uppercase tracking-wider text-emerald-600">⚡ Live Runnable Project Playground (Browser Me Live Chala Kar Dekhein)</span>'
);

// 12. Interview Hub
html = html.replace(
  '<h2>\n                🎯 React Developer Interview Preparation\n              </h2>',
  '<h2>\n                🎯 React, TypeScript & Redux Interview Hub (Interview Ki Taiyari)\n              </h2>'
);

html = html.replace(
  'Career & Job Readiness',
  'Career & Job Readiness (Top MNCs & Startups)'
);

html = html.replace(
  '⚡ <strong>Pro Tip:</strong>',
  '⚡ <strong>Pro Tip (Interview Me Select Hone Ke Tips):</strong>'
);

// 13. Tests View
html = html.replace(
  '<h2>\n              🧪 Tests & Topic-Wise Diagnosis\n            </h2>',
  '<h2>\n              🧪 Abhyas Pariksha & Topic Diagnostics (Knowledge Evaluation)\n            </h2>'
);

html = html.replace(
  '<span class="text-xs font-bold text-slate-400 uppercase">Total Quizzes Attempted</span>',
  '<span class="text-xs font-bold text-slate-400 uppercase">Kul Quizzes Attempted</span>'
);

html = html.replace(
  '<span class="text-xs font-bold text-slate-400 uppercase">Pass Rate</span>',
  '<span class="text-xs font-bold text-slate-400 uppercase">Pass Rate (Sahi Answer %)</span>'
);

html = html.replace(
  '<span class="text-xs font-bold text-slate-400 uppercase">Knowledge Level</span>',
  '<span class="text-xs font-bold text-slate-400 uppercase">Gyan Ka Level (Knowledge Level)</span>'
);

html = html.replace(
  '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">Weak Area Diagnostics:</h3>',
  '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">Kamzor Topics Ka Vishleshan (Weak Area Diagnostics):</h3>'
);

html = html.replace(
  '<p class="text-xs text-slate-500 mb-4">The platform automatically analyzes topics where you scored under 50% and recommends review lessons.</p>',
  '<p class="text-xs text-slate-500 mb-4">Platform un topics ko automatically identify karta hai jahan score 50% se kam hai aur revision suggest karta hai.</p>'
);

html = html.replace(
  'Take lesson quizzes to populate your personalized weak area analysis!',
  'Apna kamzor topics analysis dekhne ke liye lessons ke quizzes attempt karein!'
);

html = html.replace(
  '✓ Great performance! Keep practicing code examples in the interactive sandbox to reinforce your retention.',
  '✓ Zabardast performance! Concepts par pakad majboot rakhne ke liye interactive sandbox me code run karte rahein.'
);

// 14. Consolidated Notes View
html = html.replace(
  'Consolidated Personal Notes',
  'Aapke Sabhi Lessons Ke Notes (Consolidated Notebook)'
);

html = html.replace(
  "You haven't written any notes yet. Open any lesson and click on the 'My Personal Notes' tab to add notes!",
  "Aapne abhi tak koi notes nahi likhe hain. Kisi bhi lesson me 'Aapke Personal Notes' tab par click karke apne zaroori points yahan save karein!"
);

// Save updated template
fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ All Hinglish UI transformations applied successfully to template_extracted.html');

// Validate JS scripts in updated template
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`Checking ${scriptMatches.length} script blocks...`);
scriptMatches.forEach((m, idx) => {
  let code = m[1];
  code = code.replace('__MODULES_DATA__', '[]');
  code = code.replace('__PROJECTS_DATA__', '[]');
  code = code.replace('__INTERVIEW_DATA__', '[]');
  try {
    new vm.Script(code);
    console.log(`  ✓ Script ${idx + 1}: Valid!`);
  } catch (e) {
    console.error(`  ✕ Script ${idx + 1} Error:`, e.message);
  }
});
