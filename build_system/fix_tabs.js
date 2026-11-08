const fs = require('fs');
const vm = require('vm');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('--- Fixing Interactive Code Sandbox & Quiz Tabs ---');

// 1. Ensure `const isExercise = type === 'exercise';` is at the top of getLessonTabHtml
const oldGetLessonTabHtmlHeader = `function getLessonTabHtml(tab, found) {
      const { item, module, type } = found;`;

const newGetLessonTabHtmlHeader = `function getLessonTabHtml(tab, found) {
      const { item, module, type } = found;
      const isExercise = type === 'exercise';`;

if (html.includes(oldGetLessonTabHtmlHeader)) {
  html = html.replace(oldGetLessonTabHtmlHeader, newGetLessonTabHtmlHeader);
  console.log('✓ Injected const isExercise into getLessonTabHtml');
} else {
  console.log('Header already had isExercise or differed slightly');
}

// 2. Fix the Sandbox HTML in getLessonTabHtml to use robust resetSandboxCode() and copyCurrentSandboxCode()
const oldSandboxTabHtml = html.substring(
  html.indexOf("if (tab === 'sandbox') {"),
  html.indexOf("if (tab === 'quiz') {")
);

const newSandboxTabHtml = `if (tab === 'sandbox') {
        const initialCode = isExercise ? item.solutionCode : item.codeTemplate;
        return \`
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-terminal text-sky-500"></i>
                <span>React 18 In-Browser Live Execution Engine</span>
              </span>
              <div class="flex items-center gap-2">
                <button onclick="resetSandboxCode()" class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold transition flex items-center gap-1.5">
                  <i class="fa-solid fa-arrow-rotate-left"></i>
                  <span>Reset Code</span>
                </button>
                <button onclick="copyCurrentSandboxCode()" class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold transition flex items-center gap-1.5">
                  <i class="fa-regular fa-copy"></i>
                  <span>Copy Code</span>
                </button>
                <button onclick="executeSandboxCode()" class="text-xs px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition shadow-md shadow-sky-600/20 flex items-center gap-1.5">
                  <i class="fa-solid fa-play"></i>
                  <span>▶ Run Code (Live Chalao)</span>
                </button>
              </div>
            </div>

            <!-- Editor + Live Preview Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Code Editor Box -->
              <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex flex-col shadow-lg">
                <div class="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span class="ml-2 font-bold text-slate-300">LiveComponent.jsx</span>
                  </div>
                  <span class="text-[11px] text-sky-400">Babel JSX Transpiler</span>
                </div>
                <textarea
                  id="code-editor-textarea"
                  class="w-full h-80 lg:h-96 p-4 bg-transparent text-sky-200 font-mono text-xs focus:outline-none resize-none leading-relaxed vscode-editor"
                  spellcheck="false"
                >\${escapeHtml(initialCode)}</textarea>
              </div>

              <!-- Live Render Frame Box -->
              <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-lg">
                <div class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span class="flex items-center gap-1.5">
                    <i class="fa-solid fa-display text-emerald-500"></i>
                    <span>Live Interactive Component Output</span>
                  </span>
                  <span id="sandbox-status-badge" class="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">Ready</span>
                </div>
                <div id="live-react-preview" class="flex-1 p-4 overflow-auto min-h-[280px]">
                  <!-- Rendered dynamically -->
                </div>
                <div id="sandbox-console" class="p-3 bg-slate-950 border-t border-slate-800 font-mono text-[11px] text-slate-400 max-h-24 overflow-y-auto">
                  <div class="text-slate-500">// Console output logs appear here:</div>
                </div>
              </div>
            </div>
          </div>
        \`;
      }

      `;

html = html.replace(oldSandboxTabHtml, newSandboxTabHtml);
console.log('✓ Sandbox tab HTML upgraded');

// 3. Fix the Quiz Tab HTML in getLessonTabHtml
const oldQuizTabHtml = html.substring(
  html.indexOf("if (tab === 'quiz') {"),
  html.indexOf("if (tab === 'notes') {")
);

const newQuizTabHtml = `if (tab === 'quiz') {
        const quiz = isExercise ? {
          question: \`What did you learn from \${item.title}?\`,
          options: [
            "It showed how to implement the requirement step-by-step",
            "It had no real-world value",
            "It should only be run on Internet Explorer",
            "It requires Redux for basic state"
          ],
          answer: 0,
          explanation: "Every practical exercise demonstrates an essential real-world pattern required in technical interviews."
        } : (item.quiz || {
          question: \`What is the primary concept of \${item.title}?\`,
          options: [
            "React declarative architecture and state handling",
            "Direct Real DOM manipulation",
            "Writing inline assembly instructions",
            "HTML4 table layout patterns"
          ],
          answer: 0,
          explanation: "React components manage UI declaratively through state and unidirectional data flow."
        });

        const previousScore = appState.quizScores[found.id || item.id];

        return \`
          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                16. Knowledge Check Quiz (+10 Points Challenge)
              </span>
              \${previousScore ? \`
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Completed: +\${previousScore.score} pts
                </span>
              \` : ''}
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              \${quiz.question}
            </h3>

            <div class="space-y-2.5" id="quiz-options-container">
              \${quiz.options.map((opt, i) => \`
                <button
                  onclick="handleQuizOptionClick(\${i})"
                  class="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-slate-800/50 text-sm font-medium text-slate-700 dark:text-slate-200 transition flex items-center gap-3"
                  id="quiz-opt-\${i}"
                >
                  <span class="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                    \${String.fromCharCode(65 + i)}
                  </span>
                  <span>\${opt}</span>
                </button>
              \`).join('')}
            </div>

            <div id="quiz-feedback-box" class="hidden p-4 rounded-xl text-xs leading-relaxed"></div>
          </div>
        \`;
      }

      `;

html = html.replace(oldQuizTabHtml, newQuizTabHtml);
console.log('✓ Quiz tab HTML upgraded');

// 4. Update handleQuizOptionClick, resetSandboxCode, copyCurrentSandboxCode, executeSandboxCode
const oldSandboxExecutionBlock = html.substring(
  html.indexOf('// --- INTERACTIVE CODE SANDBOX EXECUTION ---'),
  html.indexOf('// --- NOTES HANDLER ---')
);

const newSandboxExecutionBlock = `// --- INTERACTIVE CODE SANDBOX EXECUTION ---
    function initLiveSandbox() {
      setTimeout(() => {
        executeSandboxCode();
      }, 50);
    }

    function resetSandboxCode() {
      if (!currentActiveLesson) return;
      const isExercise = currentActiveLesson.type === 'exercise';
      const defaultCode = isExercise ? currentActiveLesson.item.solutionCode : currentActiveLesson.item.codeTemplate;
      const editor = document.getElementById('code-editor-textarea');
      if (editor && defaultCode) {
        editor.value = defaultCode;
        executeSandboxCode();
      }
    }

    function copyCurrentSandboxCode() {
      const editor = document.getElementById('code-editor-textarea');
      if (editor) {
        copyCodeText(editor.value);
      }
    }

    function executeSandboxCode() {
      const editor = document.getElementById('code-editor-textarea');
      const preview = document.getElementById('live-react-preview');
      const consoleBox = document.getElementById('sandbox-console');
      const statusBadge = document.getElementById('sandbox-status-badge');

      if (!editor || !preview) return;

      const userCode = editor.value;
      if (consoleBox) consoleBox.innerHTML = '<div class="text-slate-500">// Console logs:</div>';

      if (!userCode.trim()) {
        preview.innerHTML = '<div class="p-4 text-slate-400 text-xs font-mono">Editor is empty. Write or reset code and click Run Code.</div>';
        return;
      }

      try {
        if (typeof Babel === 'undefined') {
          preview.innerHTML = '<div class="p-4 text-amber-500 text-xs font-mono">⏳ Loading Babel compiler... Please wait 2 seconds and click Run Code again.</div>';
          return;
        }

        // Transpile JSX using Babel Standalone
        const transpiled = Babel.transform(userCode, {
          presets: ['react', 'env'],
          plugins: []
        }).code;

        // Clean preview target
        preview.innerHTML = '<div id="live-target-root"></div>';
        const rootContainer = document.getElementById('live-target-root');

        // Safe render function
        const render = (componentInstance) => {
          try {
            if (typeof ReactDOM !== 'undefined') {
              if (ReactDOM.createRoot) {
                const root = ReactDOM.createRoot(rootContainer);
                root.render(componentInstance);
              } else if (ReactDOM.render) {
                ReactDOM.render(componentInstance, rootContainer);
              }
            }
          } catch (rErr) {
            console.error(rErr);
            preview.innerHTML = \`<div class="p-3 text-rose-500 text-xs font-mono">Render Error: \${rErr.message}</div>\`;
          }
        };

        // Custom console interceptor
        const customConsole = {
          log: (...args) => {
            console.log(...args);
            if (consoleBox) {
              const line = document.createElement('div');
              line.className = 'text-sky-400 mt-0.5';
              line.textContent = '• ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
              consoleBox.appendChild(line);
            }
          },
          warn: (...args) => {
            console.warn(...args);
            if (consoleBox) {
              const line = document.createElement('div');
              line.className = 'text-amber-400 mt-0.5';
              line.textContent = '▲ ' + args.join(' ');
              consoleBox.appendChild(line);
            }
          },
          error: (...args) => {
            console.error(...args);
            if (consoleBox) {
              const line = document.createElement('div');
              line.className = 'text-rose-400 mt-0.5';
              line.textContent = '✕ ' + args.join(' ');
              consoleBox.appendChild(line);
            }
          }
        };

        const runner = new Function('React', 'ReactDOM', 'render', 'console', transpiled);
        runner(React, ReactDOM, render, customConsole);

        if (statusBadge) {
          statusBadge.textContent = 'Rendered Successfully ✓';
          statusBadge.className = 'text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold';
        }

        const chk = document.getElementById('chk-ran-code');
        if (chk) chk.checked = true;

      } catch (err) {
        console.error(err);
        preview.innerHTML = \`
          <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-mono leading-relaxed">
            <div class="font-bold mb-1">⚠️ Compilation / Runtime Error:</div>
            <div>\${err.message}</div>
          </div>
        \`;
        if (statusBadge) {
          statusBadge.textContent = 'Execution Error';
          statusBadge.className = 'text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded font-mono font-bold';
        }
      }
    }

    // --- QUIZ SUBMISSION HANDLER ---
    function handleQuizOptionClick(selectedIndex) {
      if (!currentActiveLesson) return;
      const isExercise = currentActiveLesson.type === 'exercise';
      const item = currentActiveLesson.item;
      const quiz = isExercise ? {
        question: \`What did you learn from \${item.title}?\`,
        options: [
          "It showed how to implement the requirement step-by-step",
          "It had no real-world value",
          "It should only be run on Internet Explorer",
          "It requires Redux for basic state"
        ],
        answer: 0,
        explanation: "Every practical exercise demonstrates an essential real-world pattern required in technical interviews."
      } : (item.quiz || {
        question: \`What is the primary concept of \${item.title}?\`,
        options: [
          "React declarative architecture and state handling",
          "Direct Real DOM manipulation",
          "Writing inline assembly instructions",
          "HTML4 table layout patterns"
        ],
        answer: 0,
        explanation: "React components manage UI declaratively through state and unidirectional data flow."
      });

      const feedback = document.getElementById('quiz-feedback-box');
      if (!feedback) return;

      const isCorrect = selectedIndex === quiz.answer;
      feedback.classList.remove('hidden');

      // Visual feedback on all option buttons
      for (let i = 0; i < quiz.options.length; i++) {
        const optBtn = document.getElementById(\`quiz-opt-\${i}\`);
        if (optBtn) {
          if (i === quiz.answer) {
            optBtn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-sm font-bold text-emerald-800 dark:text-emerald-300 transition flex items-center gap-3';
          } else if (i === selectedIndex && !isCorrect) {
            optBtn.className = 'w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-sm font-bold text-rose-800 dark:text-rose-300 transition flex items-center gap-3';
          } else {
            optBtn.className = 'w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 opacity-50 flex items-center gap-3';
          }
        }
      }

      const itemId = currentActiveLesson.id || item.id;
      if (isCorrect) {
        if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        feedback.className = 'p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs leading-relaxed block';
        feedback.innerHTML = \`<strong>🎉 Zabardast! Bilkul Sahi Jawaab (+10 Points)!</strong><br /><p class="mt-1">\${quiz.explanation}</p>\`;

        appState.quizScores[itemId] = { score: 10, date: new Date().toISOString() };
        persistState();

        const chk = document.getElementById('chk-quiz-done');
        if (chk) chk.checked = true;
      } else {
        feedback.className = 'p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs leading-relaxed block';
        feedback.innerHTML = \`<strong>❌ Galat Jawaab!</strong><br /><p class="mt-1">\${quiz.explanation}</p>\`;
        appState.quizScores[itemId] = { score: 0, date: new Date().toISOString() };
        persistState();
      }
    }

    // Legacy fallback for any direct calls
    function handleQuizSubmit(selectedIndex, correctIndex, explanation, itemId) {
      handleQuizOptionClick(selectedIndex);
    }

    `;

html = html.replace(oldSandboxExecutionBlock, newSandboxExecutionBlock);
console.log('✓ Sandbox execution and Quiz option click handlers updated');

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ template_extracted.html saved successfully');
