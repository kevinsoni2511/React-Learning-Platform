const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

let renderedDashboardHtml = '';

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({
      addEventListener: () => {},
      classList: { toggle: () => {}, add: () => {}, remove: () => {} },
      set innerHTML(val) { renderedDashboardHtml = val; },
      get innerHTML() { return renderedDashboardHtml; }
    }),
    querySelectorAll: () => [],
    createElement: () => ({ className: '', set textContent(v) {}, appendChild: () => {} }),
    documentElement: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  confetti: () => {},
  addEventListener: () => {},
  tailwind: {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);
vm.runInContext(scriptMatches[0][1], context);
vm.runInContext(scriptMatches[1][1], context);
vm.runInContext(scriptMatches[2][1], context);

context.renderDashboardView(context.document.getElementById('app'));

console.log('--- Rendered Hero Buttons HTML Check ---');
const btnIdx = renderedDashboardHtml.indexOf('Pichhla Lesson Chalu Karein');
console.log(renderedDashboardHtml.substring(btnIdx - 200, btnIdx + 200));
