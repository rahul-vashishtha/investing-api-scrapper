import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer-extra';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

@Injectable()
export class ScrapperJobService {
  private readonly logger = new Logger(ScrapperJobService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async runCron() {
    this.logger.log('Running CRON');
    puppeteer.use(RecaptchaPlugin()).use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: 'new',
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();

    try {
      await page.goto(
        'https://tvc4.investing.com/cbcf0cee02d1779bfeddb3bd6a9c752a/1705298719/56/56/23/history?symbol=8849&resolution=60&from=1700114728&to=1705298788',
      );
      await page.waitForTimeout(2000);

      const data = await page.evaluate(
        (el) => el.innerHTML,
        await page.$('body'),
      );

      fs.writeFileSync('data.json', data.toString());

      await browser.close();
    } catch {}
  }
}
