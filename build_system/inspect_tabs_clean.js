const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');
const idx = html.indexOf('function getLessonTabHtml');
const sIdx = html.indexOf("if (tab === 'sandbox')", idx);
const qIdx = html.indexOf("if (tab === 'quiz')", idx);
const nIdx = html.indexOf("if (tab === 'notes')", idx);

console.log('--- Sandbox tab code in getLessonTabHtml ---');
console.log(html.substring(sIdx, qIdx));

console.log('--- Quiz tab code in getLessonTabHtml ---');
console.log(html.substring(qIdx, nIdx));
