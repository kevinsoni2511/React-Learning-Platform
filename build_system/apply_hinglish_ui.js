const fs = require('fs');
const path = require('path');
const vm = require('vm');

let html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

console.log('Transforming UI template into rich Hinglish version...');

// 1. Title & Header
html = html.replace(
  '<title>ReactMastery 🚀 Interactive React, TypeScript & Redux Learning Suite</title>',
  '<title>ReactMastery Pro 🚀 Complete React, TypeScript & Redux Learning Platform (Hinglish)</title>'
);

html = html.replace(
  'placeholder="Search all 12 modules, exercises, projects, interview questions... (Ctrl+K)"',
  'placeholder="React, TypeScript, Redux ke topics, exercises, projects search karein... (Ctrl+K)"'
);

html = html.replace(
  'placeholder="Type to instantly find React, TypeScript, Redux concepts..."',
  'placeholder="React, TypeScript, Redux ke topics, exercises, projects type karein..."'
);

html = html.replace(
  'Type keywords like "useState", "Redux Toolkit", "Portal", "JWT"...',
  'Jaise type karein: "useState", "Redux Toolkit", "Portal", "JWT", "Virtual DOM"...'
);

html = html.replace(
  'title="Learning Streak">',
  'title="Lagatar Padhai Ka Streak">'
);

html = html.replace(
  '<span id="streak-counter">3 Day Streak</span>',
  '<span id="streak-counter">3 Din Ka Streak</span>'
);

html = html.replace(
  '<span id="total-points-counter">0 pts</span>',
  '<span id="total-points-counter">0 Kul Pts</span>'
);

html = html.replace(
  'title="Toggle Dark/Light Mode"',
  'title="Theme Badlein (Dark / Light Mode)"'
);

html = html.replace(
  'title="Reset Course Progress"',
  'title="Apna Course Progress Reset Karein"'
);

// 2. Left Sidebar Navigation
html = html.replace('<span>Dashboard & Analytics</span>', '<span>Dashboard (Pragati Hub)</span>');
html = html.replace('<span>Learning Roadmap</span>', '<span>Seekhne Ka Roadmap</span>');
html = html.replace('<span>10 Capstone Projects</span>', '<span>10 Live Projects</span>');
html = html.replace('<span>Interview Preparation Hub</span>', '<span>Interview Ki Taiyari (Hub)</span>');
html = html.replace('<span>Practice Tests & Quizzes</span>', '<span>Abhyas Pariksha (Tests)</span>');
html = html.replace('<span>My Bookmarks</span>', '<span>Save Kiye Gaye Lessons</span>');
html = html.replace('<span>My Personal Notes</span>', '<span>Aapke Likhe Notes</span>');
html = html.replace('<span>Curriculum Modules (12)</span>', '<span>12 CURRICULUM MODULES (SHURU SE PRO)</span>');

// 3. Right Sidebar
html = html.replace('<span>Lesson Checklist</span>', '<span>Aapne Kya Kya Sikha?</span>');
html = html.replace('<span>Read Core Concept</span>', '<span>Core Concept Padha (Guide)</span>');
html = html.replace('<span>Ran Live Code Sandbox</span>', '<span>Live Code Run Karke Dekha</span>');
html = html.replace('<span>Completed Lesson Quiz</span>', '<span>Quiz Pura Kiya (+10 Pts)</span>');
html = html.replace('<span>Interview Gold Tip</span>', '<span>Interview Ka Sunehra Niyam</span>');
html = html.replace(
  'In MNC interviews, always explain the internal mechanism (Fiber, Reconciliation, or Closure) before jumping to basic syntax!',
  'Top MNC interviews me pehle internal mechanism (Fiber, Reconciliation, Closures) explain karein, direct syntax par jump na karein!'
);
html = html.replace('Quick Reference', 'Zaroori Baatein (Quick Reference)');
html = html.replace('<span id="mark-complete-text">Mark as Completed</span>', '<span id="mark-complete-text">Pura Ho Gaya ✓</span>');
html = html.replace('<span id="bookmark-text">Bookmark Lesson</span>', '<span id="bookmark-text">Lesson Save Karein 📌</span>');

// Save intermediate and verify
fs.writeFileSync(__dirname + '/template_extracted.html', html, 'utf8');
console.log('✓ Header and Sidebars updated to Hinglish!');
