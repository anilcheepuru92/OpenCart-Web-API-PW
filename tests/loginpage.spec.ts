import {test, expect} from "@playwright/test";
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage:LoginPage;
let homePage: HomePage;

test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
})

test('login page title test', async({}) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log("Login Page Title => "+ pageTitle);
    expect(pageTitle).toBe('Account Login');
})

test('forgot password link test', async({}) => {
    let status = await loginPage.isForgotPwdLinkPresent();
    expect(status).toBeTruthy();
})

test('valid login test', async({}) => {
    await loginPage.doLogin(process.env.LOGINID!, process.env.PASSWORD!);
    let status = await homePage.isLogoutLinkPresent();
    expect.soft(status).toBeTruthy();
    let homePageTitle = await homePage.getPageTitle();
    expect.soft(homePageTitle).toBe('My Account');
})