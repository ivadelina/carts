import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(50000);

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
    const form = await page.$('#form');
    const input = await form.$('#card_number');
    await input.type('2221003413074827');
    const submit = await form.$('#submitform');
    submit.click();
    const result = await page.evaluate(() => document.querySelector('.paySystemResult').textContent); 
    expect(result).toBe('МИР');
  });

  test('check the card number is correct', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#form');
    const input = await form.$('#card_number');
    await input.type('2221003413074827');
    const submit = await form.$('#submitform');
    submit.click();
    const result = await page.evaluate(() => document.querySelector('.validateBox').textContent);
    expect(result).toBe('Проверка номера карты пройдена успешно');
  });

  test('check the card number is incorrect', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#form');
    const input = await form.$('#card_number');
    await input.type('2221003413074827');
    const submit = await form.$('#submitform');
    submit.click();
    const result = await page.evaluate(() => document.querySelector('.validateBox').textContent);
    expect(result).toBe('Некорректный номер карты');
  });
});
