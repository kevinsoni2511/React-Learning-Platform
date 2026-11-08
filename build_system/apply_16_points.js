const fs = require('fs');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

const targetBlockStart = '<!-- 5. Technical Explanation (Internals) -->';
const targetBlockEnd = '<!-- 12. Mini Assignment -->';

const idxStart = html.indexOf(targetBlockStart);
const idxEnd = html.indexOf(targetBlockEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Could not find target block for 16 points');
  process.exit(1);
}

// Find end of assignment card
const assignmentEnd = html.indexOf('</div>\n          </div>\n        `;\n      }\n\n      if (tab === \'sandbox\') {', idxEnd);

if (assignmentEnd === -1) {
  console.error('Could not find assignment card end');
  process.exit(1);
}

const replacement16Points = `<!-- 5. Technical Explanation & Internal Architecture -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">5. Technical Explanation & Internal Architecture (Under the Hood: Fiber, VDOM & Reconciliation)</span>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                \${item.technicalExplanation}
              </p>
            </div>

            <!-- 6. Important Terminology -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">6. Important Terminology (Zaroori Technical Shabd & Definitions)</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <strong class="text-indigo-600 dark:text-indigo-400">Virtual DOM & Fiber:</strong> In-memory tree structure jise React real browser DOM se pehle modify aur batch karta hai.
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <strong class="text-indigo-600 dark:text-indigo-400">Immutability:</strong> State ko direct mutate na karke hamesha naya object ya array reference return karna.
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <strong class="text-indigo-600 dark:text-indigo-400">Reconciliation / Diffing:</strong> React ka heuristic algorithm jo purani aur nayi state ke beech minimal changes calculate karta hai.
                </div>
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <strong class="text-indigo-600 dark:text-indigo-400">Declarative UI:</strong> Hum batate hain UI kaisa DIKHNA chahiye, DOM manipulation React khud sambhalta hai.
                </div>
              </div>
            </div>

            <!-- 7. Syntax Explanation & 8. Step-by-Step Code -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">7. Syntax Explanation (Code Likhne Ka Niyam)</span>
                <button onclick="copyCodeText('\${escapeQuotes(item.syntax)}')" class="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition">
                  <i class="fa-regular fa-copy"></i> Syntax Copy Karein
                </button>
              </div>
              <pre class="p-4 rounded-xl bg-slate-950 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 mb-4">\${escapeHtml(item.syntax)}</pre>
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>8. Step-by-Step Breakdown (Line-by-Line Code Ka Matlab):</strong> \${item.codeExplanation}
              </div>
            </div>

            <!-- 9. Expected Output & 10. Practical Implementation -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">9. Expected Output (Screen Par Kya Output Dikhega)</span>
              <div class="p-3 my-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
                \${item.expectedOutput}
              </div>
              <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mt-4 mb-2">10. Practical Implementation (Real Project Implementation Code)</span>
              <pre class="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">\${escapeHtml(item.practicalImplementation)}</pre>
            </div>

            <!-- 11. Real-World Use Cases -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">11. Real-World Enterprise Use Cases (Asli Projects Me Kahan Use Hota Hai)</span>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                🏢 E-commerce (Amazon, Flipkart), SaaS dashboards (Notion, Linear), aur streaming apps (Netflix, Spotify) is pattern ka use karke high-traffic dynamic data ko bina latency render karte hain.
              </p>
            </div>

            <!-- 12. Common Mistakes -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">12. Common Mistakes & Pitfalls (Bohot Log Yeh Galti Karte Hain - Kaise Bachen)</span>
              <div class="mt-2 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200 whitespace-pre-line leading-relaxed">
                \${item.commonMistakes}
              </div>
            </div>

            <!-- 13. Debugging Strategies & Error Solutions -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">13. Debugging Strategies & Error Solutions (Problem Solving Guide)</span>
              <div class="space-y-2 mt-2 text-xs text-slate-600 dark:text-slate-300">
                <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                  ⚠️ <strong>Error: "Cannot update a component while rendering a different component"</strong><br />
                  Fix: State updates ko event handlers ya <code>useEffect</code> ke andar karein, direct component body me render phase par set function call na karein.
                </div>
                <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                  ⚠️ <strong>Error: "Each child in a list should have a unique 'key' prop"</strong><br />
                  Fix: List items par array index ke bajay stable unique ID (jaise <code>item.id</code>) pass karein.
                </div>
              </div>
            </div>

            <!-- 14. Top Interview Questions -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">14. Top Interview Questions (Interview Me Poochhe Jane Wale Sawaal-Jawaab)</span>
              <div class="mt-3 space-y-3">
                \${item.interviewQuestions.map((iq, i) => \`
                  <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div class="font-bold text-xs text-slate-900 dark:text-white mb-1">Q\${i + 1}: \${iq.q}</div>
                    <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">\${iq.a}</div>
                  </div>
                \`).join('')}
              </div>
            </div>

            <!-- 15. Mini Assignment -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">15. Mini Assignment (Aapke Liye Practice Task)</span>
              <p class="text-sm text-slate-700 dark:text-slate-300 mt-2 font-medium">
                🎯 \${item.assignment}
              </p>
            </div>

            <!-- 16. Quick Knowledge-Check Quiz Card -->
            <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent border border-emerald-500/30 dark:bg-slate-900 flex items-center justify-between">
              <div>
                <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">16. Quick Knowledge-Check Quiz</span>
                <h4 class="font-bold text-base text-slate-900 dark:text-white mt-1">Ready to test your concept retention?</h4>
                <p class="text-xs text-slate-500">Attempt this lesson's MCQ to earn +10 points and verify mastery.</p>
              </div>
              <button onclick="switchLessonTab('quiz')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20">
                Take Quiz (+10 Pts) →
              </button>
            </div>
          </div>
        \`;
      }

      if (tab === 'sandbox') {`;

html = html.substring(0, idxStart) + replacement16Points + html.substring(assignmentEnd + `</div>\n          </div>\n        \`;\n      }\n\n      if (tab === 'sandbox') {`.length);

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Successfully applied all 16 points to template_extracted.html!');
