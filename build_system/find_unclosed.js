const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');
const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
const code = scripts[2][1];

console.log('Script 3 total length:', code.length);

// Let's check where the replacement happened
console.log('Includes getLessonTabHtml:', code.includes('function getLessonTabHtml'));
console.log('Includes handleQuizOptionClick:', code.includes('handleQuizOptionClick'));
console.log('Includes initLiveSandbox:', code.includes('initLiveSandbox'));

// Check line numbers around getLessonTabHtml
const lines = code.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('function getLessonTabHtml')) {
    console.log('getLessonTabHtml start at line:', idx + 1);
  }
  if (line.includes("if (tab === 'sandbox')")) {
    console.log("tab === 'sandbox' at line:", idx + 1);
  }
  if (line.includes("if (tab === 'quiz')")) {
    console.log("tab === 'quiz' at line:", idx + 1);
  }
  if (line.includes("if (tab === 'notes')")) {
    console.log("tab === 'notes' at line:", idx + 1);
  }
  if (line.includes('// --- INTERACTIVE CODE SANDBOX EXECUTION ---')) {
    console.log('Sandbox execution block at line:', idx + 1);
  }
  if (line.includes('// --- NOTES HANDLER ---')) {
    console.log('Notes handler at line:', idx + 1);
  }
});

// Let's use Babel parser if available or a simple tokenizer
try {
  const babel = require('@babel/parser');
  babel.parse(code, { sourceType: 'script' });
  console.log('Babel parse succeeded!');
} catch (e) {
  console.log('Parse error at:', e.loc, e.message);
  if (e.loc) {
    const errorLine = e.loc.line;
    console.log('Lines around error:');
    for (let i = Math.max(0, errorLine - 10); i < Math.min(lines.length, errorLine + 10); i++) {
      console.log((i + 1 === errorLine ? '>>> ' : '    ') + (i + 1) + ': ' + lines[i]);
    }
  }
}
