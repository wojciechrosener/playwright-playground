import { test, expect } from '@playwright/test';

test('AirHelp Plus Membership from website', async ({ browser }) => {

    const context = await browser.newContext({
      httpCredentials: {
        username: 'airhelp-sta',
        password: 'EnterDemoEnvironment'
      }
    });
  
    const page = await context.newPage();
    await page.goto('https://www-sta.airhelp.com/en/airhelp-plus/');
    await page.locator('[data-testid="top-navbar-join-airhelp-plus"]').click();
    await expect(page).toHaveURL('https://www-sta.airhelp.com/en/airhelp-plus/#pricing-plans');
    await page.locator('[data-testid="pricing-choose-essential"]').click();
  
    await page.locator('text=Type your email email can\'t be blank >> input[type="email"]').fill('wojciech.rosener+TC003-PlayWright01@airhelp.com');
    await page.locator('span[role="button"]').click();
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://app-sta.airhelp.com/plus-membership/checkout?channel=lp_essential' }*/),
      page.locator('#ember24').click()
    ]);
  
    await page.frameLocator('[aria-label="Card Number"]').locator('[placeholder="Card Number"]').fill('4111 1111 1111 1111');
    await page.locator('[placeholder="MM \\/ YY"]').fill('05 / 25');
    await page.frameLocator('[aria-label="CVV"]').locator('[placeholder="CVV"]').fill('123');
    await page.locator('[placeholder="Card holder"]').fill('Lewis Hamilton');
    await page.locator('select[name="billing\\.country"]').selectOption('PL');
    await page.locator('[placeholder="State\\/Province"]').fill('Pomorskie');
    await page.locator('[placeholder="City"]').fill('Gdansk');
    await page.locator('[placeholder="ZIP\\/Postal Code"]').fill('80-330');
    await page.locator('[placeholder="Street Address Line 1"]').fill('Opacka 37');
  
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://app-sta.airhelp.com/plus-membership/confirmation?id=5E9FA48CCFBB3FEED37C5510BCCEDEFE.uat01-vm-tx01&resourcePath=%2Fv1%2Fcheckouts%2F5E9FA48CCFBB3FEED37C5510BCCEDEFE.uat01-vm-tx01%2Fpayment' }*/),
      page.locator('text=Start AirHelp Plus Essential').click()
    ]);
  
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://app-sta.airhelp.com/plus/' }*/),
      page.locator('text=Go to your dashboard').click()
    ]);
    await expect(page.locator('[data-testid="dashboard-header"]')).toContainText('You are covered by AirHelp Plus Essential until');
  });