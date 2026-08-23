
import {test, expect} from '@playwright/test'
import { json } from 'node:stream/consumers';

//intercept the network calls
test('intercept and log requests', async({page})=> {

    await page.route('**/*', async(route)=> {
        console.log(route.request().method(), route.request().url());
        await route.continue();
    });
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
})

//intercept with mocking
test('mock search data API', async({page})=> {
    let fakeProducts = [
        {name: 'Fake MacBook Pro', price: '$919'},
        {name: 'Fake iPhone 20', price: '$430'}
    ];
    await page.route('**/index.php?route=product/search&search=macbook', async(route)=> {
        route.fulfill({
            status: 200, 
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        })
    })
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
    
    let fakeJson = await page.evaluate(async()=> {
        let fakeRes = fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
        return (await fakeRes).json()
    })
    console.log("FAKE JSON =>", fakeJson);
})