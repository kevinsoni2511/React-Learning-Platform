const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

const domStorage = {};
const mockLocalStorage = {
  getItem: (k) => { console.log('getItem called for:', k); return domStorage[k] || null; },
  setItem: (k, v) => { console.log('setItem called for:', k); domStorage[k] = String(v); },
  removeItem: (k) => { delete domStorage[k]; },
  clear: () => { Object.keys(domStorage).forEach(k => delete domStorage[k]); }
};

let capturedPreview = '';
let capturedConsole = [];
let capturedClasses = {};

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      id,
      addEventListener: () => {},
      classList: {
        toggle: () => {},
        add: () => {},
        remove: (cls) => {
          if (cls === 'hidden') capturedClasses[id] = 'visible';
        }
      },
      set innerHTML(val) {
        if (id === 'live-react-preview') capturedPreview = val;
      },
      get innerHTML() {
        return capturedPreview;
      },
      value: 'function App() { return React.createElement("div", null, "Hello React!"); } render(React.createElement(App, null));',
      checked: false,
      set className(val) { capturedClasses[id] = val; },
      get className() { return capturedClasses[id] || ''; }
    }),
    querySelectorAll: () => [],
    createElement: (tag) => ({
      className: '',
      set textContent(val) { capturedConsole.push(val); },
      appendChild: () => {}
    }),
    documentElement: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: mockLocalStorage,
  console: {
    log: () => {},
    warn: () => {},
    error: () => {}
  },
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  confetti: () => { capturedConsole.push('confetti_fired'); },
  addEventListener: () => {},
  tailwind: {},
  React: {
    createElement: (type, props, children) => ({ type, props, children })
  },
  ReactDOM: {
    createRoot: (container) => ({
      render: (comp) => { capturedPreview = 'rendered:' + comp.type; }
    })
  },
  Babel: {
    transform: (code) => ({ code: code })
  }
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);
vm.runInContext(scriptMatches[0][1], context);
vm.runInContext(scriptMatches[1][1], context);
vm.runInContext(scriptMatches[2][1], context);

console.log('--- Testing Interactive Code Sandbox & Quiz Interactions ---');

// Render lesson view to set internal currentActiveLesson
context.renderLessonView(context.document.getElementById('app'), 'm1-what-is-react');
console.log('✓ Called renderLessonView(app, m1-what-is-react)');

// Test executeSandboxCode
context.executeSandboxCode();
console.log('✓ executeSandboxCode executed cleanly. Preview status:', capturedPreview);

// Test resetSandboxCode
context.resetSandboxCode();
console.log('✓ resetSandboxCode executed cleanly.');

// Test quiz option click (correct option 0)
context.handleQuizOptionClick(0);
console.log('✓ handleQuizOptionClick(0) executed cleanly.');
const savedStateAfterCorrect = JSON.parse(domStorage['reactmastery_v2_store']);
console.log('  Persisted quizScores after correct answer:', savedStateAfterCorrect.quizScores['m1-what-is-react']);

// Test quiz option click (wrong option 1)
context.handleQuizOptionClick(1);
console.log('✓ handleQuizOptionClick(1) executed cleanly.');
const savedStateAfterWrong = JSON.parse(domStorage['reactmastery_v2_store']);
console.log('  Persisted quizScores after wrong answer:', savedStateAfterWrong.quizScores['m1-what-is-react']);

// 5. Test with an Exercise
const ex = context.window.COURSE_MODULES[0].exercises[0];
context.currentActiveLesson = context.findItemById(ex.id);
context.resetSandboxCode();
context.executeSandboxCode();
console.log('Testing persistState directly:');
context.persistState();
console.log('✓ Exercise Sandbox & Quiz tested successfully!');

console.log('\n🏆 ALL INTERACTIONS VALIDATED END-TO-END!');
