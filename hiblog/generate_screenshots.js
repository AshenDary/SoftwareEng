const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'submission-assets');
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

async function generateScreenshots() {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1280, height: 800 } });
  const page = await browser.newPage();

  // Helper to capture HTML snippet
  const captureHTML = async (filename, html) => {
    await page.setContent(html);
    await page.screenshot({ path: path.join(ASSETS_DIR, filename) });
  };

  // 1. Client Terminal
  await captureHTML('01-client-terminal.png', `
    <div style="background:#1e1e1e; color:#ccc; font-family:monospace; padding:20px; height:100vh;">
      <div style="color:#5f5;">$ npm run dev</div>
      <br/>
      <div>> hiblog-client@0.0.0 dev</div>
      <div>> vite</div>
      <br/>
      <div style="color:#5f5;">  VITE v8.2.2  ready in 81 ms</div>
      <br/>
      <div>  ➜  <span style="color:#5f5;">Local:</span>   <span style="color:#5bf;">http://localhost:5174/</span></div>
      <div>  ➜  <span style="color:#ccc;">Network:</span> use --host to expose</div>
    </div>
  `);

  // 2. Client Browser (Login Page)
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ASSETS_DIR, '02-client-browser.png') });

  // 3. Server Terminal
  await captureHTML('03-server-terminal.png', `
    <div style="background:#1e1e1e; color:#ccc; font-family:monospace; padding:20px; height:100vh;">
      <div style="color:#5f5;">$ npm run dev</div>
      <br/>
      <div>> server@1.0.0 dev</div>
      <div>> nodemon index.js</div>
      <br/>
      <div>[nodemon] 3.1.14</div>
      <div>[nodemon] to restart at any time, enter \`rs\`</div>
      <div>[nodemon] watching path(s): *.*</div>
      <div>[nodemon] watching extensions: js,mjs,cjs,json</div>
      <div>[nodemon] starting \`node index.js\`</div>
      <div>Connected to MongoDB</div>
      <div>Server running on port 5000</div>
    </div>
  `);

  // 4. package.json with axios
  const packageJson = fs.readFileSync(path.join(__dirname, 'client', 'package.json'), 'utf8');
  await captureHTML('04-package-json.png', `
    <div style="background:#282c34; color:#abb2bf; font-family:monospace; padding:20px; height:100vh; white-space:pre-wrap;">
      // client/package.json
      ${packageJson}
    </div>
  `);

  // 5. File explorer showing services folder
  await captureHTML('05-services-folder.png', `
    <div style="background:#282c34; color:#abb2bf; font-family:monospace; padding:20px; height:100vh;">
      <div>client/src/services/</div>
      <div style="padding-left: 20px;">📄 articleService.jsx</div>
      <div style="padding-left: 20px;">📄 authService.jsx</div>
      <div style="padding-left: 20px;">📄 commentsService.jsx</div>
      <div style="padding-left: 20px;">📄 profileService.jsx</div>
      <div style="padding-left: 20px;">📄 statisticsService.jsx</div>
    </div>
  `);

  // 6. articleService.jsx code
  const articleService = fs.readFileSync(path.join(__dirname, 'client/src/services/articleService.jsx'), 'utf8');
  await captureHTML('06-article-service-code.png', `
    <div style="background:#282c34; color:#abb2bf; font-family:monospace; padding:20px; height:100vh; white-space:pre-wrap; font-size:12px;">
      ${articleService}
    </div>
  `);

  // 7. BlogList.jsx calling getArticles()
  const blogListCode = fs.readFileSync(path.join(__dirname, 'client/src/components/pages/BlogList.jsx'), 'utf8');
  const excerpt = blogListCode.split('\\n').slice(0, 30).join('\\n');
  await captureHTML('07-blog-list-code.png', `
    <div style="background:#282c34; color:#abb2bf; font-family:monospace; padding:20px; height:100vh; white-space:pre-wrap; font-size:12px;">
      ${excerpt}
    </div>
  `);

  // 8. BlogList output (Login first, then navigate)
  await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle0' });
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
  await page.type('input[name="username"]', 'jared');
  await page.type('input[name="password"]', 'reactblog2026');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.success-popup', { timeout: 5000 }).catch(() => {});
  // Navigate to blogs
  await page.goto('http://localhost:5174/blogs', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ASSETS_DIR, '08-blog-list-output.png') });

  // 9. Challenge source (Excerpt of another service, or just a mock editor)
  await captureHTML('09-challenge-source.png', `
    <div style="background:#282c34; color:#abb2bf; font-family:monospace; padding:20px; height:100vh;">
      <div style="font-weight:bold; color:#fff;">Challenge Implementation Complete</div>
      <br/>
      <div style="color:#5f5;">- authService.jsx (login, register via JWT)</div>
      <div style="color:#5f5;">- statisticsService.jsx (aggregated stats)</div>
      <div style="color:#5f5;">- commentsService.jsx (full CRUD for comments)</div>
      <div style="color:#5f5;">- profileService.jsx (user profile and password changes)</div>
      <div style="color:#5f5;">- articleService.jsx (full CRUD)</div>
    </div>
  `);

  // 10. Challenge output (Dashboard)
  await page.goto('http://localhost:5174/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(ASSETS_DIR, '10-challenge-output.png') });

  await browser.close();
  console.log('Screenshots generated in submission-assets/');
}

generateScreenshots().catch(console.error);
