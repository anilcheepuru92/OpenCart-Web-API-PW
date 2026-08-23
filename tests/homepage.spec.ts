import {test, expect} from "@playwright/test";
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { log } from "node:console";

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('anil.kumar@gmail.com', '@7jiKHUgUJzcekG');
    homePage = new HomePage(page);
})

test('home page title test', async({}) => {
    const pageTitle = await homePage.getPageTitle();
    console.log("Home Page Title => "+ pageTitle);
    expect(pageTitle).toBe('My Account');
})

test('verify logout link test', async({}) => {
    let status = await homePage.isLogoutLinkPresent();
    expect(status).toBeTruthy();
})

test('home page headers test', async({}) => {
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