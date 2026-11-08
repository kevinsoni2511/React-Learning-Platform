const fs = require('fs');

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');

const regex = /class="([^"]*bg-white[^"]*)"/g;
let match;
const found = new Set();
while ((match = regex.exec(html)) !== null) {
  const cls = match[1];
  if (cls.includes('text-slate-900') || cls.includes('text-slate-800') || cls.includes('text-slate-700') || cls.includes('text-gray-900') || cls.includes('text-black')) {
    found.add(cls);
  }
}

console.log('Found instances of bg-white with dark text:');
found.forEach(c => console.log('• ' + c));
