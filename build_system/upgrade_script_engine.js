const fs = require('fs');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('--- Upgrading JS Engine in template_extracted.html ---');

// 1. Update getInitialState to support unlockAll and studentName
const oldGetInitialState = `function getInitialState() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
      return {
        completedLessons: [],
        completedExercises: [],
        completedProjects: [],
        bookmarks: [],
        notes: {},
        quizScores: {},
        streakDays: 3,
        lastStudiedId: 'm1-what-is-react',
        theme: 'dark'
      };
    }`;

const newGetInitialState = `function getInitialState() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
      return {
        completedLessons: [],
        completedExercises: [],
        completedProjects: [],
        bookmarks: [],
        notes: {},
        quizScores: {},
        streakDays: 3,
        lastStudiedId: 'm1-what-is-react',
        theme: 'dark',
        unlockAll: false,
        studentName: 'React Developer'
      };
    }

    // Helper: All ordered item IDs for sequential locking
    function getAllItemIds() {
      const allIds = [];
      window.COURSE_MODULES.forEach(m => {
        m.lessons.forEach(l => allIds.push(l.id));
        if (m.exercises) m.exercises.forEach(ex => allIds.push(\`\${m.id}-ex-\${ex.num}\`));
      });
      return allIds;
    }

    // Helper: Check if an item is unlocked
    function isItemUnlocked(id) {
      if (appState.unlockAll) return true;
      const allIds = getAllItemIds();
      const idx = allIds.indexOf(id);
      if (idx <= 0) return true; // First lesson is always unlocked!
      const prevId = allIds[idx - 1];
      const isPrevDone = appState.completedLessons.includes(prevId) || appState.completedExercises.includes(prevId);
      return isPrevDone;
    }

    // Toggle Explore Mode vs Strict Sequential Learning
    function toggleUnlockAllMode() {
      appState.unlockAll = !appState.unlockAll;
      persistState();
      updateUnlockButtonUI();
      renderSidebarModules();
      alert(appState.unlockAll
        ? '🔓 Explore Mode On: Sabhi 12 modules aur lessons unlock ho chuke hain! Aap kisi bhi topic par freely jump kar sakte hain.'
        : '🔒 Strict Sequential Mode On: Ab lessons step-by-step unlock honge jaise aap pichhle lessons ko complete karenge.');
      if (currentActiveLesson) {
        navigateTo('lesson', currentActiveLesson.id || currentActiveLesson.item.id);
      }
    }

    function updateUnlockButtonUI() {
      const btn = document.getElementById('explore-mode-btn');
      const icon = document.getElementById('unlock-mode-icon');
      const text = document.getElementById('unlock-mode-text');
      if (btn && icon && text) {
        if (appState.unlockAll) {
          icon.className = 'fa-solid fa-lock-open text-emerald-500';
          text.textContent = 'Explore Mode';
          btn.className = 'flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition hover:bg-emerald-100';
        } else {
          icon.className = 'fa-solid fa-lock text-purple-500';
          text.textContent = 'Strict Mode';
          btn.className = 'flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition hover:bg-purple-100';
        }
      }
    }

    // Export progress JSON
    function exportProgressJSON() {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', 'react_mastery_learning_progress.json');
      document.body.appendChild(a);
      a.click();
      a.remove();
      alert('✓ Progress Exported! react_mastery_learning_progress.json download ho chuka hai.');
    }

    // Import progress JSON
    function importProgressJSON() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed && typeof parsed === 'object') {
              appState = { ...getInitialState(), ...parsed };
              persistState();
              alert('✓ Zabardast! Aapka learning progress safaltapoorvak restore ho chuka hai.');
              navigateTo('dashboard');
            } else {
              alert('✕ Invalid progress file format.');
            }
          } catch (err) {
            alert('✕ Error parsing JSON: ' + err.message);
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }

    // Certificate of Completion handlers
    function openCertificateModal() {
      const modal = document.getElementById('certificate-modal');
      if (!modal) return;
      const nameInput = document.getElementById('cert-student-name');
      if (nameInput) nameInput.value = appState.studentName || 'React Developer';
      updateCertificateDisplay();
      modal.classList.remove('hidden');
    }

    function closeCertificateModal() {
      const modal = document.getElementById('certificate-modal');
      if (modal) modal.classList.add('hidden');
    }

    function updateCertificateDisplay() {
      const nameInput = document.getElementById('cert-student-name');
      const nameDisplay = document.getElementById('cert-display-name');
      const dateDisplay = document.getElementById('cert-display-date');
      const scoreDisplay = document.getElementById('cert-display-score');

      if (nameInput && nameDisplay) {
        appState.studentName = nameInput.value || 'React Developer';
        nameDisplay.textContent = appState.studentName;
        persistState();
      }
      if (dateDisplay) {
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      if (scoreDisplay) {
        const totalLessons = window.COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length + (m.exercises ? m.exercises.length : 0), 0);
        const totalCompleted = appState.completedLessons.length + appState.completedExercises.length;
        const percent = Math.round((totalCompleted / (totalLessons || 1)) * 100);
        const pts = Object.values(appState.quizScores).reduce((acc, q) => acc + (q.score || 0), 0);
        scoreDisplay.textContent = \`\${percent}% Curriculum Finished • \${pts} Quiz Points\`;
      }
    }`;

html = html.replace(oldGetInitialState, newGetInitialState);
console.log('✓ getInitialState and helpers injected');

// 2. Update renderSidebarModules with sequential locking indicators
const oldSidebarInner = html.substring(
  html.indexOf('<!-- Topic Lessons -->'),
  html.indexOf('</div>\n          </div>\n        `;\n      }).join(\'\');')
);

const newSidebarInner = `<!-- Topic Lessons -->
              \${mod.lessons.map(l => {
                const isDone = appState.completedLessons.includes(l.id);
                const isBookmarked = appState.bookmarks.includes(l.id);
                const isCurrent = currentActiveLesson && currentActiveLesson.item.id === l.id;
                const unlocked = isItemUnlocked(l.id);
                return \`
                  <div
                    onclick="\${unlocked ? \`navigateTo('lesson', '\${l.id}')\` : \`alert('🔒 Yeh lesson abhi locked hai! Sequential learning ke mutabiq pehle pichhla lesson complete karein, ya upar se \"Explore Mode\" toggle karein.')\`}"
                    class="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition \${
                      !unlocked ? 'opacity-40 hover:opacity-75' :
                      isCurrent
                        ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }"
                  >
                    <div class="flex items-center space-x-2 truncate">
                      <span class="\${isDone ? 'text-emerald-500' : (!unlocked ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600')}">
                        <i class="fa-\${isDone ? 'solid fa-circle-check' : (!unlocked ? 'solid fa-lock text-[10px]' : 'regular fa-circle')}"></i>
                      </span>
                      <span class="truncate">\${l.title}</span>
                    </div>
                    \${isBookmarked ? '<i class="fa-solid fa-bookmark text-[10px] text-amber-500 shrink-0"></i>' : ''}
                  </div>
                \`;
              }).join('')}

              <!-- Practical Exercises -->
              \${mod.exercises ? \`
                <div class="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800/40">
                  <div class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 px-2 mb-1">
                    ⚡ Practical Exercises (\${mod.exercises.length} Karke Dekhein)
                  </div>
                  \${mod.exercises.map(ex => {
                    const exId = \`\${mod.id}-ex-\${ex.num}\`;
                    const isDone = appState.completedExercises.includes(exId);
                    const isCurrent = currentActiveLesson && currentActiveLesson.id === exId;
                    const unlocked = isItemUnlocked(exId);
                    return \`
                      <div
                        onclick="\${unlocked ? \`navigateTo('lesson', '\${exId}')\` : \`alert('🔒 Yeh exercise locked hai! Pichhla step pura karein ya Explore Mode use karein.')\`}"
                        class="flex items-center justify-between px-2.5 py-1 rounded-lg text-xs cursor-pointer transition \${
                          !unlocked ? 'opacity-40 hover:opacity-75' :
                          isCurrent
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }"
                      >
                        <div class="flex items-center space-x-2 truncate">
                          <span class="\${isDone ? 'text-emerald-500' : (!unlocked ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600')}">
                            <i class="fa-\${isDone ? 'solid fa-circle-check' : (!unlocked ? 'solid fa-lock text-[10px]' : 'regular fa-circle')}"></i>
                          </span>
                          <span class="truncate">Ex \${ex.num}: \${ex.title.replace(/^Exercise \\d+:\\s*/i, '')}</span>
                        </div>
                      </div>
                    \`;
                  }).join('')}
                </div>
              \` : ''}`;

html = html.replace(oldSidebarInner, newSidebarInner);
console.log('✓ Sidebar sequential locking logic injected');

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Script engine upgrades saved');
