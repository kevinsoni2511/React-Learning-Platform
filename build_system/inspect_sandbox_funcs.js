const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');
const sIdx = html.indexOf('function initLiveSandbox');
const eIdx = html.indexOf('function handleQuizSubmit');
const qEndIdx = html.indexOf('function handleNoteChange');

console.log('--- Sandbox Functions ---');
console.log(html.substring(sIdx, eIdx));

console.log('--- Quiz Functions ---');
console.log(html.substring(eIdx, qEndIdx));
