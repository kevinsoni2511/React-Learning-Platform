const fs = require('fs');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('--- Upgrading Views to 16-Point Guide, Enriched Projects & Interview Format ---');

// 1. Update 13-Step to 16-Step in Tabs
html = html.replace('13-Step Sampurna Guide (Hinglish)', '16-Step Sampurna Guide (Hinglish)');

// 2. Expand Concept Guide with all 16 points in getLessonTabHtml
const oldGuideReturn = `            <!-- 5. Technical Explanation & Internal Architecture (Under the Hood: Fiber, VDOM & Reconciliation Kaise Kaam Karta Hai) -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">5. Technical Explanation & Internal Architecture (Under the Hood: Fiber, VDOM & Reconciliation Kaise Kaam Karta Hai)</span>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                \${item.technicalExplanation}
              </p>
            </div>

            <!-- 6. Syntax Explanation (Code Likhne Ka Niyam) & 7. Step-by-Step Breakdown -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">6. Syntax Explanation (Code Likhne Ka Niyam)</span>
                <button onclick="copyCodeText('\${escapeQuotes(item.syntax)}')" class="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition">
                  <i class="fa-regular fa-copy"></i> <i class="fa-regular fa-copy"></i> Syntax Copy Karein
                </button>
              </div>
              <pre class="p-4 rounded-xl bg-slate-950 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 mb-4">\${escapeHtml(item.syntax)}</pre>
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>7. Step-by-Step Breakdown (Line-by-Line Code Ka Matlab):</strong> \${item.codeExplanation}
              </div>
            </div>`;

const newGuideReturn = `            <!-- 5. Technical Explanation & Internal Architecture -->
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

            <!-- 7. Syntax Explanation & 8. Step-by-Step Code Explanation -->
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
            </div>`;

html = html.replace(oldGuideReturn, newGuideReturn);

// 3. Add Point 11 (Real-World Use Cases) & Point 13 (Debugging & Solutions)
const oldOutputAndImpl = `            <!-- 8. Expected Output (Screen Par Kya Output Dikhega) & 9. Practical Implementation (Real Project Implementation Code) -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">8. Expected Output (Screen Par Kya Output Dikhega)</span>
              <div class="p-3 my-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono">
                \${item.expectedOutput}
              </div>
              <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mt-4 mb-2">9. Practical Implementation (Real Project Implementation Code)</span>
              <pre class="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">\${escapeHtml(item.practicalImplementation)}</pre>
            </div>

            <!-- 10. Common Mistakes & How to Fix Them (Bohot Log Yeh Galti Karte Hain - Kaise Bachen) -->
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">10. Common Mistakes & How to Fix Them (Bohot Log Yeh Galti Karte Hain - Kaise Bachen)</span>
              <div class="mt-2 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200 whitespace-pre-line leading-relaxed">
                \${item.commonMistakes}
              </div>
            </div>`;

const newOutputAndImpl = `            <!-- 9. Expected Output & 10. Practical Implementation -->
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

            <!-- 13. Debugging & Solutions -->
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
            </div>`;

html = html.replace(oldOutputAndImpl, newOutputAndImpl);

// 4. Update numbering of Interview questions, Assignment, Quiz to 14, 15, 16
html = html.replace(
  '11. Top Interview Questions (Interview Me Poochhe Jane Wale Sawaal-Jawaab)',
  '14. Top Interview Questions (Interview Me Poochhe Jane Wale Sawaal-Jawaab)'
);

html = html.replace(
  '12. Mini Assignment (Aapke Liye Practice Task)',
  '15. Mini Assignment (Aapke Liye Practice Task)'
);

html = html.replace(
  '<span>Quiz Attempt Karein (+10 Points Kamayein) →</span>',
  '<span>16. Quick Knowledge-Check Quiz Attempt Karein (+10 Pts) →</span>'
);

// 5. Update renderInterviewsView to show: Question, Answer, Hinglish, Code Example, Follow-ups, Pro-Tip
const oldInterviewCard = `<div id="iq-\${i}" class="hidden p-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
                  <div class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                    \${escapeHtml(q.answer)}
                  </div>
                  <div class="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200/60 text-xs text-amber-800 dark:text-amber-300 font-medium">
                    ⚡ <strong>Pro Tip (Interview Me Select Hone Ke Tips):</strong> \${q.proTip}
                  </div>
                </div>`;

const newInterviewCard = `<div id="iq-\${i}" class="hidden p-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
                  <!-- 1. Professional Answer in English -->
                  <div>
                    <span class="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">1. Professional Answer (English):</span>
                    <div class="text-xs text-slate-700 dark:text-slate-200 leading-relaxed mt-1 font-medium">
                      \${escapeHtml(q.answer)}
                    </div>
                  </div>

                  <!-- 2. Simple Hinglish Explanation -->
                  <div class="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                    <span class="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300 tracking-wider">2. Simple Hinglish Explanation (Aasan Shabdo Me):</span>
                    <div class="text-xs text-purple-900 dark:text-purple-200 leading-relaxed mt-1">
                      \${escapeHtml(q.hinglish || q.answer)}
                    </div>
                  </div>

                  <!-- 3. Practical Code Example -->
                  \${q.codeExample ? \`
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 tracking-wider">3. Practical Code Example:</span>
                        <button onclick="copyCodeText('\${escapeQuotes(q.codeExample)}')" class="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition">
                          Copy Code
                        </button>
                      </div>
                      <pre class="p-3 rounded-xl bg-slate-950 text-sky-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">\${escapeHtml(q.codeExample)}</pre>
                    </div>
                  \` : ''}

                  <!-- 4. Follow-up Questions -->
                  \${q.followUp ? \`
                    <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                      <strong class="text-slate-800 dark:text-slate-200">🔍 Follow-Up Questions (Jo Interviewer Agla Pooch Sakta Hai):</strong>
                      <div class="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">\${escapeHtml(q.followUp)}</div>
                    </div>
                  \` : ''}

                  <!-- 5. Pro Tip -->
                  <div class="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200/60 text-xs text-amber-800 dark:text-amber-300 font-medium">
                    ⚡ <strong>Pro Tip (Interview Me Kamyabi Ka Raaz):</strong> \${q.proTip}
                  </div>
                </div>`;

html = html.replace(oldInterviewCard, newInterviewCard);

// 6. Update renderProjectsView to render Concepts Required, Common Errors, and Final Assessment
const oldProjectSteps = `            <!-- Step by Step Guide -->
            <div>
              <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2">🛠️ Kadam-Dar-Kadam Banayein (Step-by-Step Implementation):</h4>
              <div class="space-y-1.5">
                \${activeProj.steps.map(s => \`
                  <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                    \${s}
                  </div>
                \`).join('')}
              </div>
            </div>`;

const newProjectSteps = `            <!-- Concepts Required -->
            \${activeProj.conceptsRequired ? \`
              <div>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2">🎯 Concepts Required (Zaroori Concepts):</h4>
                <div class="flex flex-wrap gap-2">
                  \${activeProj.conceptsRequired.map(c => \`<span class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">\${c}</span>\`).join('')}
                </div>
              </div>
            \` : ''}

            <!-- Step by Step Guide -->
            <div>
              <h4 class="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2">🛠️ Kadam-Dar-Kadam Banayein (Step-by-Step Implementation):</h4>
              <div class="space-y-1.5">
                \${activeProj.steps.map(s => \`
                  <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                    \${s}
                  </div>
                \`).join('')}
              </div>
            </div>

            <!-- Common Errors & Pitfalls -->
            \${activeProj.commonErrors ? \`
              <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200">
                <strong class="text-rose-700 dark:text-rose-300 uppercase tracking-wider text-[11px] block mb-1">⚠️ Common Project Errors & Solutions:</strong>
                <div class="leading-relaxed">\${activeProj.commonErrors}</div>
              </div>
            \` : ''}

            <!-- Final Assessment Challenge -->
            \${activeProj.finalAssessment ? \`
              <div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-900 dark:text-purple-200">
                <strong class="text-purple-700 dark:text-purple-300 uppercase tracking-wider text-[11px] block mb-1">🚀 Final Assessment Challenge (Aapke Liye Challenge):</strong>
                <div class="leading-relaxed font-medium">\${activeProj.finalAssessment}</div>
              </div>
            \` : ''}`;

html = html.replace(oldProjectSteps, newProjectSteps);

fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Views successfully upgraded with 16-point guide, enriched projects and interview cards!');
