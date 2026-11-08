const fs = require('fs');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');

const targetHeader = `function getLessonTabHtml(tab, found) {
      const { item, module, type } = found;`;

console.log('targetHeader found:', html.includes(targetHeader));

const sandboxStart = "      if (tab === 'sandbox') {\n        const initialCode = isExercise ? item.solutionCode : item.codeTemplate;";
console.log('sandboxStart found:', html.includes(sandboxStart));

const quizStart = "      if (tab === 'quiz') {\n        const quiz = isExercise ? {";
console.log('quizStart found:', html.includes(quizStart));

const notesStart = "      if (tab === 'notes') {";
console.log('notesStart found:', html.includes(notesStart));

const funcsStart = "    function initLiveSandbox() {";
console.log('funcsStart found:', html.includes(funcsStart));

const funcsEnd = "    // --- NOTES HANDLER ---";
console.log('funcsEnd found:', html.includes(funcsEnd));
