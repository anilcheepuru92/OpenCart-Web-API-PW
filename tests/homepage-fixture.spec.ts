import {test, expect} from "../src/fixtures/page-fixtures";

test.beforeEach(async({loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('anil.kumar@gmail.com', '@7jiKHUgUJzcekG');
})

test('home page title test', async({homePage}) => {
    const pageTitle = await homePage.getPageTitle();
    console.log("Home Page Title => "+ pageTitle);
    expect(pageTitle).toBe('My Account');
})

test('verify logout link test', async({homePage}) => {
    let status = await homePage.isLogoutLinkPresent();
    expect(status).toBeTruthy();
})

test('home page headers test', async({homePage}) => {
    let allHeaders:string[] = await homePage.getHomePageHeaders();
    console.log("HEADERS => "+allHeaders);
    expect(allHeaders).toHaveLength(4);
    expect(allHeaders).toEqual([
        'My Account', 
        'My Orders', 
        'My Affiliate Account', 
        'Newsletter'
    ]);
})