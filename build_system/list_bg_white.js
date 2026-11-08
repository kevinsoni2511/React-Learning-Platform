const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

const regex = /class="([^"]*bg-white[^"]*)"/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  console.log(`${count}: ${match[1]}`);
}
