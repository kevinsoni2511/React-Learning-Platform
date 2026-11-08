const fs = require('fs');

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');

// Check all occurrences of 'navigateTo'
const regex = /<button[^>]*onclick="navigateTo\('[^']*'[^"]*"[^>]*>([\s\S]*?)<\/button>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  count++;
  const fullTag = match[0];
  const tagOpen = fullTag.substring(0, fullTag.indexOf('>') + 1);
  const content = match[1].trim().replace(/\s+/g, ' ');
  console.log(`Button ${count}:`);
  console.log(`  Tag: ${tagOpen}`);
  console.log(`  Content: ${content.substring(0, 80)}`);
}
