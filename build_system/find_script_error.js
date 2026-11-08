const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync(__dirname + '/template_extracted.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];

const code = scriptMatches[2][1];

try {
  new vm.Script(code, { filename: 'script3.js' });
} catch (err) {
  console.log('Error caught:');
  console.log(err.stack);
}
