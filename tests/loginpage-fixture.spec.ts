import { Assert } from 'node:assert';
import { test, expect } from '../src/fixtures/page-fixtures';
import { log } from 'node:console';
import { CsvHelper } from '../src/utils/csv-util';
import { ExcelHelper } from '../src/utils/excel.util';
import { JsonHelper } from '../src/utils/json-util';

test.beforeEach(async({loginPage, homePage}) => {
    await loginPage.goToLoginPage();
})

test('login page title test', async({loginPage}) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log("Login Page Title => "+ pageTitle);
    expect(pageTitle).toBe('Account Login');
})

test('forgot password link test', async({loginPage}) => {
    let status = await loginPage.isForgotPwdLinkPresent();
    expect(status).toBeTruthy();
})

test('valid login test', async({loginPage, homePage, editAccountPage}) => {
    console.log(`Username =>${process.env.LOGINID!}, Password =>${process.env.PASSWORD!}`);
    await loginPage.doLogin(process.env.LOGINID!, process.env.PASSWORD!);
    let status = await homePage.isLogoutLinkPresent();
    expect.soft(status).toBeTruthy();
    let homePageTitle = await homePage.getPageTitle();
    expect.soft(homePageTitle).toBe('My Account');
    await homePage.goToEditAccInfoPage();
    let editAccInfoPageTitle = await editAccountPage.getSectionHeader();
    expect.soft(editAccInfoPageTitle).toBe('My Account Information');
    let currentEmail = await editAccountPage.getCurrentEmail();
    console.log("CURRENT E-MAIL => ", currentEmail);
})

//with fixtures: runs in sequential mode
test('log in with invalid credentials -- data-driven with fixtures', async ({loginPage, testData})=> {

    for(let row of testData){
        await loginPage.doLogin(row.username, row.password); //read using the headers
        let errorStatus = await loginPage.isLoginErrorMsgPresent();
        expect(errorStatus).toBeTruthy();
    }
})



let csvData = CsvHelper.readCsv("src/data/loginData.csv");
//without fixtures: runs in parallel mode
for(let row of csvData){  
    test(`log in with invalid credentials -- data-driven with ${row.username}, ${row.password} `, async ({loginPage})=> {
        await loginPage.doLogin(row.username, row.password); //read using the headers
        let errorStatus = await loginPage.isLoginErrorMsgPresent();
        expect(errorStatus).toBeTruthy();
    })
}

let excelData = ExcelHelper.readExcel("src/data/OpenCartTestData.xlsx", "login");
//without fixtures: runs in parallel mode
for(let row of excelData){ 
    console.log(`Credentials =>${row.username},${row.password}`);
    test(`log in with invalid credentials -- excel data-driven with ${row.username}, ${row.password} `, async ({loginPage})=> {
        await loginPage.doLogin(row.username, row.password); //read using the headers
        let errorStatus = await loginPage.isLoginErrorMsgPresent();
        expect(errorStatus).toBeTruthy();
    })
}

let jsonData = JsonHelper.readJson("src/data/logindata.json");
//without fixtures: runs in parallel mode
for(let row of jsonData){ 
    console.log(`Credentials =>${row.username},${row.password}`);
    test(`log in with invalid credentials -- JSON data-driven with ${row.username}, ${row.password} `, async ({loginPage})=> {
        await loginPage.doLogin(row.username, row.password); //read using the headers
        let errorStatus = await loginPage.isLoginErrorMsgPresent();
        expect(errorStatus).toBeTruthy();
    })
}