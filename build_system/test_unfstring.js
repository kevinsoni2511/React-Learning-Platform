const fs = require('fs');

let pyContent = fs.readFileSync(__dirname + '/ui_template.py', 'utf8');

const startIdx = pyContent.indexOf('<!DOCTYPE html>');
const endIdx = pyContent.lastIndexOf('</html>');

let htmlPart = pyContent.substring(startIdx, endIdx + '</html>'.length);

// Placeholders first
htmlPart = htmlPart.replace('{modules_json}', '__MODULES_DATA__');
htmlPart = htmlPart.replace('{projects_json}', '__PROJECTS_DATA__');
htmlPart = htmlPart.replace('{interview_json}', '__INTERVIEW_DATA__');

// Fix the exact lines where ${${ was used in ui_template.py
htmlPart = htmlPart.replace(/\$\{\$\{i\}\}/g, '${{i}}');
htmlPart = htmlPart.replace(/\$\{\$\{quiz\.answer\}\}/g, '${{quiz.answer}}');
htmlPart = htmlPart.replace(/\$\{\$\{escapeQuotes\(quiz\.explanation\)\}\}/g, '${{escapeQuotes(quiz.explanation)}}');
htmlPart = htmlPart.replace(/\$\{\$\{found\.id \|\| item\.id\}\}/g, '${{found.id || item.id}}');
htmlPart = htmlPart.replace(/\$\{\$\{String\.fromCharCode\(65 \+ i\)\}\}/g, '${{String.fromCharCode(65 + i)}}');
htmlPart = htmlPart.replace(/\$\{\$\{opt\}\}/g, '${{opt}}');

// Now replace {{ with { and }} with }
htmlPart = htmlPart.replace(/\{\{/g, '{');
htmlPart = htmlPart.replace(/\}\}/g, '}');

fs.writeFileSync(__dirname + '/template_extracted.html', htmlPart, 'utf8');
console.log('Regenerated template_extracted.html successfully!');
