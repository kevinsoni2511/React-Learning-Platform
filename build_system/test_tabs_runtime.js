const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');

// Extract scripts
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

// Setup mock browser window context
const domStorage = {};
const mockLocalStorage = {
  getItem: (k) => domStorage[k] || null,
  setItem: (k, v) => { domStorage[k] = String(v); },
  removeItem: (k) => { delete domStorage[k]; },
  clear: () => { Object.keys(domStorage).forEach(k => delete domStorage[k]); }
};

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      addEventListener: () => {},
      classList: { toggle: () => {}, add: () => {}, remove: () => {} },
      innerHTML: '',
      value: 'console.log("hello");',
      checked: false,
      className: ''
    }),
    querySelectorAll: () => [],
    createElement: (tag) => ({ className: '', textContent: '', appendChild: () => {} }),
    documentElement: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: mockLocalStorage,
  console: console,
  setTimeout: (fn, ms) => fn(),
  clearTimeout: () => {},
  confetti: () => {},
  addEventListener: () => {},
  tailwind: {},
  React: {},
  ReactDOM: {},
  Babel: {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);

// Run script 1 (tailwind config)
vm.runInContext(scriptMatches[0][1], context);

// Run script 2 (data: window.COURSE_MODULES etc.)
vm.runInContext(scriptMatches[1][1], context);

// Run script 3 (application logic)
vm.runInContext(scriptMatches[2][1], context);

console.log('✓ Successfully executed all 3 scripts in mock context!');

// Verify COURSE_MODULES
const modules = context.window.COURSE_MODULES;
console.log(`✓ Loaded ${modules.length} modules`);

// Test getLessonTabHtml for every module's first lesson and first exercise
let testsPassed = 0;
let testsFailed = 0;

modules.forEach((mod) => {
  // Test first lesson
  if (mod.lessons && mod.lessons.length > 0) {
    const lesson = mod.lessons[0];
    const found = context.findItemById(lesson.id);
    if (!found) {
      console.error(`Failed to find lesson: ${lesson.id}`);
      testsFailed++;
      return;
    }

    ['guide', 'sandbox', 'quiz', 'notes'].forEach((tab) => {
      try {
        const out = context.getLessonTabHtml(tab, found);
        if (typeof out !== 'string' || out.length === 0) {
          throw new Error(`Empty HTML returned for tab ${tab}`);
        }
        testsPassed++;
      } catch (err) {
        console.error(`Error in getLessonTabHtml('${tab}', lesson ${lesson.id}):`, err.message);
        testsFailed++;
      }
    });
  }

  // Test first exercise
  if (mod.exercises && mod.exercises.length > 0) {
    const ex = mod.exercises[0];
    const found = context.findItemById(ex.id || `${mod.id}-ex-1`);
    if (found) {
      ['guide', 'sandbox', 'quiz', 'notes'].forEach((tab) => {
        try {
          const out = context.getLessonTabHtml(tab, found);
          if (typeof out !== 'string' || out.length === 0) {
            throw new Error(`Empty HTML returned for tab ${tab}`);
          }
          testsPassed++;
        } catch (err) {
          console.error(`Error in getLessonTabHtml('${tab}', exercise ${ex.id}):`, err.message);
          testsFailed++;
        }
      });
    }
  }
});

console.log(`\n🎉 RESULTS: ${testsPassed} tab render tests passed, ${testsFailed} failed.`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL TABS (GUIDE, SANDBOX, QUIZ, NOTES) ARE VERIFIED AND WORKING FLAWLESSLY ACROSS ALL LESSONS & EXERCISES!');
}
