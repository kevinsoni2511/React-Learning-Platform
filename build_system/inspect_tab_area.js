const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');
const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
const code = scripts[2][1];

console.log('Does code contain "tab === \'guide\'":', code.includes("tab === 'guide'"));
console.log('Does code contain "renderLessonView":', code.includes("renderLessonView"));
console.log('Does code contain "getLessonTabHtml":', code.includes("getLessonTabHtml"));

const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.includes('renderLessonView') || l.includes('switchLessonTab') || l.includes('getLessonTabHtml')) {
    console.log(`Line ${i + 1}: ${l.substring(0, 80)}`);
  }
});
