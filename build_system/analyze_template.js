const fs = require('fs');
const content = fs.readFileSync(__dirname + '/ui_template.py', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('${${')) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
