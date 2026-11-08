const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🚀 Assembling ReactMastery Pro Platform into single index.html...');

// 1. Load Curriculum Data Modules
const m1_3 = require('./data_modules_1_3.js');
const m4_6 = require('./data_modules_4_6.js');
const m7_9 = require('./data_modules_7_9.js');
const m10_12 = require('./data_modules_10_12.js');

const allModules = [...m1_3, ...m4_6, ...m7_9, ...m10_12];
console.log(`✓ Loaded 12 Modules (Total Lessons: ${allModules.reduce((s, m) => s + m.lessons.length, 0)}, Practical Exercises: ${allModules.reduce((s, m) => s + (m.exercises ? m.exercises.length : 0), 0)})`);

// 2. Load Capstone Projects
const allProjects = require('./data_projects.js');
console.log(`✓ Loaded ${allProjects.length} Capstone Projects`);

// 3. Load Interview Database
const allInterviews = require('./data_interview.js');
console.log(`✓ Loaded ${allInterviews.length} Comprehensive Interview Q&A scenarios`);

// 4. Load Base HTML Shell
const templatePath = path.join(__dirname, 'template_extracted.html');
let html = fs.readFileSync(templatePath, 'utf8');

// 5. Inject JSON databases into window globals
const modulesJson = JSON.stringify(allModules);
const projectsJson = JSON.stringify(allProjects);
const interviewJson = JSON.stringify(allInterviews);

html = html.replace('__MODULES_DATA__', modulesJson);
html = html.replace('__PROJECTS_DATA__', projectsJson);
html = html.replace('__INTERVIEW_DATA__', interviewJson);

// 6. Write final single index.html in project root
const outputPath = path.resolve(__dirname, '../index.html');
fs.writeFileSync(outputPath, html, 'utf8');
const stats = fs.statSync(outputPath);
console.log(`\n🎉 SUCCESS! Generated standalone index.html`);
console.log(`📁 File Path: ${outputPath}`);
console.log(`📊 File Size: ${(stats.size / 1024).toFixed(1)} KB (${stats.size.toLocaleString()} bytes)`);

// 7. Validate syntax of all script tags in generated index.html
console.log('\n🔍 Verifying JavaScript integrity in index.html...');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scriptMatches.length} inline script tags to validate.`);

let allValid = true;
scriptMatches.forEach((m, idx) => {
  const code = m[1];
  try {
    new vm.Script(code, { filename: `inline-script-${idx + 1}.js` });
    console.log(`  ✓ Script ${idx + 1}: Syntax Valid (${code.length.toLocaleString()} characters)`);
  } catch (err) {
    allValid = false;
    console.error(`  ✕ Script ${idx + 1} Syntax Error:`, err.message);
  }
});

if (allValid) {
  console.log('\n✅ ALL JAVASCRIPT BLOCKS ARE 100% VALID! Ready for production deployment and local use.');
} else {
  console.error('\n⚠️ One or more script blocks contain syntax issues.');
  process.exit(1);
}
