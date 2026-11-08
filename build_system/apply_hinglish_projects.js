const fs = require('fs');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

// Projects view detailed headings
html = html.replace(
  '💻 10 Capstone Production Projects',
  '💻 10 Capstone Production Projects (Portfolio Ready Apps)'
);

html = html.replace(
  'Project Requirements:',
  '📋 Project Ki Zarooratein (Requirements):'
);

html = html.replace(
  'Folder Structure:',
  '📁 File & Folder Structure (Project Ka Dhancha):'
);

html = html.replace(
  'Step-by-Step Implementation:',
  '🛠️ Kadam-Dar-Kadam Banayein (Step-by-Step Implementation):'
);

html = html.replace(
  'Complete Source Code:',
  '💻 Poora Source Code (Complete Project Code):'
);

html = html.replace(
  "Mark as Built'",
  "Pura Hua (Mark as Built ✓)'"
);

html = html.replace(
  "'✓ Project Finished'",
  "'✓ Project Pura Ho Gaya'"
);

// Interview View detailed headings
html = html.replace(
  'React Developer Interview Preparation',
  'React, TypeScript & Redux Interview Hub (Interview Ki Taiyari)'
);

html = html.replace(
  'Comprehensive Q&A Artifacts',
  'MNCs & Startups Ke Sawaal-Jawaab'
);

// Write to template
fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Project and Interview Hinglish updates applied to template_extracted.html');
