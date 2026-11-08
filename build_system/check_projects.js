const fs = require('fs');
let content = fs.readFileSync(__dirname + '/data_projects.js', 'utf8');

// Replace any unescaped ${ with \${
// But be careful: if it's already \${, leave it.
// We can use a regex: (?<!\\)\$\{
content = content.replace(/(?<!\\)\$\{/g, '\\${');

fs.writeFileSync(__dirname + '/data_projects.js', content, 'utf8');
console.log('Successfully escaped all unescaped template expressions in data_projects.js');
