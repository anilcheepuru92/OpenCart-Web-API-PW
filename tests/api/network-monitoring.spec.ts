
import {test, expect} from '@playwright/test'

test('network monitoring test', async({page})=> {

    page.on('request', async(req) => {
        console.log(`Outgoing request: ${req.method()}, ${req.url()}`);
    })

    page.on('response', async(res) => {
        console.log(`Incoming response: ${res.status()}, ${res.url()}`);
    })
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
    await page.waitForSelector("//a[text()='iPhone']");
    await page.getByRole('img', { name: 'iPhone', exact: true }).click();
    console.log("************ CLICK HAPPENED ************");
})