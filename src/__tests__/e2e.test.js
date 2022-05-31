import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('check pay system', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-id = id-form]');
    const input = await form.$('[data-id = card_number]');
    await input.type('2221003413074827');
    const submit = await form.$('[data-id = card_number]');
    submit.click();
    const result = await page.evaluate(() => {
      let title = document.querySelector('.paySystemResult').textContent;
      return title
    });  
    expect(result).toBe('MasterCard');
  });
});
