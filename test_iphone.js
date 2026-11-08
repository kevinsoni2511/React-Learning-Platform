const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

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
  await new Promise(r => setTimeout(r, 3000));
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
  await sendCDP(ws, 'Emulation.setTouchEmulationEnabled', { enabled: true });

  await sendCDP(ws, 'Runtime.enable');
  await sendCDP(ws, 'Page.enable');

  // Check overflow on Dashboard
  const overflowDashboard = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth
      })
    `,
    returnByValue: true
  });
  console.log('Dashboard overflow check:', overflowDashboard);

  // Take screenshot of dashboard
  const snap1 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('iphone_dashboard.png', Buffer.from(snap1.data, 'base64'));
  console.log('Saved iphone_dashboard.png');

  // Navigate to lesson 3
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      navigateTo('lesson', 'm1-jsx-and-rendering');
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const overflowLessonGuide = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      })
    `,
    returnByValue: true
  });
  console.log('Lesson Guide overflow check:', overflowLessonGuide);

  const snap2 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('iphone_lesson_guide.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved iphone_lesson_guide.png');

  // Switch to Sandbox tab
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      switchLessonTab('sandbox');
      executeSandboxCode();
    `
  });
  await new Promise(r => setTimeout(r, 1000));

  const overflowSandbox = await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      })
    `,
    returnByValue: true
  });
  console.log('Sandbox overflow check:', overflowSandbox);

  const snap3 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('iphone_sandbox.png', Buffer.from(snap3.data, 'base64'));
  console.log('Saved iphone_sandbox.png');

  // Let's also check sidebar toggle on mobile
  await sendCDP(ws, 'Runtime.evaluate', {
    expression: `
      (function() {
        const btn = document.getElementById('toggle-sidebar-btn');
        if (btn) btn.click();
        const sidebar = document.getElementById('left-sidebar');
        return {
          btnExists: !!btn,
          sidebarHidden: sidebar ? sidebar.classList.contains('hidden') : null
        };
      })()
    `,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 500));
  const snap4 = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('iphone_sidebar.png', Buffer.from(snap4.data, 'base64'));
  console.log('Saved iphone_sidebar.png');

  chrome.kill();
}
run();
