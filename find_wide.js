const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'file:///D:/master-learning/index.html'
]);

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sendCDP(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  const tabs = await getJson('http://localhost:9222/json');
  const target = tabs.find(t => t.type === 'page');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });

  await sendCDP(ws, 'Runtime.enable');

  const checkWideElements = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const wide = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 390 || el.scrollWidth > 390) {
            wide.push({
              tag: el.tagName,
              id: el.id,
              className: el.className,
              width: rect.width,
              scrollWidth: el.scrollWidth
            });
          }
        }
        return wide.slice(0, 20);
      })()
    `,
    returnByValue: true
  });
  console.log('Wide elements count:', checkWideElements.result.value.length);
  console.log(JSON.stringify(checkWideElements.result.value, null, 2));

  chrome.kill();
}
run();
