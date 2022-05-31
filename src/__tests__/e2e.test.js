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
    const form = await page.$('[data-id = id-form]');
    const input = await form.$('[data-id = card_number]');
    await input.type('2221003413074827');
    const submit = await form.$('[data-id = card_number]');
    submit.click();
    const result = await page.evaluate(() => {
      const title = document.querySelector('.paySystemResult').textContent;
      return title;
    });
    expect(result).toBe('MasterCard');

    test('check the card number is correct', async () => {
      await page.goto(baseUrl);
      const form1 = await page.$('[data-id = id-form]');
      const input1 = await form.$('[data-id = card_number]');
      await input1.type('2221003413074827');
      const submit1 = await form1.$('[data-id = card_number]');
      submit1.click();
      const result1 = await page.evaluate(() => {
        const title1 = document.querySelector('.validateBox').textContent;
        return title1;
      });
      expect(result1).toBe('Проверка номера карты пройдена успешно');
    });

    test('check the card number is incorrect', async () => {
      await page.goto(baseUrl);
      const form2 = await page.$('[data-id = id-form]');
      const input2 = await form.$('[data-id = card_number]');
      await input2.type('2221003413074827');
      const submit2 = await form2.$('[data-id = card_number]');
      submit2.click();
      const result2 = await page.evaluate(() => {
        const title2 = document.querySelector('.validateBox').textContent;
        return title2;
      });
      expect(result2).toBe('Некорректный номер карты');
    });
  });
});
