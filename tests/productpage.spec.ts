
import { Assert } from "node:assert";
import {test, expect} from "../src/fixtures/page-fixtures";
import { CsvHelper } from "../src/utils/csv-util";

test.beforeEach(async({loginPage}) => {
    await loginPage.goToLoginPage();
    // await loginPage.doLogin('anil.kumar@gmail.com', '@7jiKHUgUJzcekG');
    await loginPage.doLogin(process.env.LOGINID!, process.env.PASSWORD!);
})

test(`@regression verify product images count`, async({homePage, searchResultsPage, productDetailsPage}) => {
    await homePage.performSearch('macbook');
    // let searchResultCount = await searchResultsPage.getSearchResultsCount();
    await searchResultsPage.selectProduct('MacBook Air');
    let imageCount: number = await productDetailsPage.getProductImagesCount();
    console.log(`** This product has ${imageCount} images **`);
    expect(imageCount).toBe(4);
})

test(`@regression verify product data -- MacBook Air`, async({homePage, searchResultsPage, productDetailsPage}) => {
    await homePage.performSearch('macbook');
    // let searchResultCount = await searchResultsPage.getSearchResultsCount();
    await searchResultsPage.selectProduct('MacBook Air');
    let fullProductData = await productDetailsPage.getAllProductData();
    console.log("Full product details ==>", fullProductData);

    expect.soft(fullProductData.get('ProductHeader')).toBe('MacBook Air');
    expect.soft(fullProductData.get('Brand')).toBe('Apple');
    expect.soft(fullProductData.get('Product Code')).toBe('Product 17');
    expect.soft(fullProductData.get('Reward Points')).toBe('700');
    expect.soft(fullProductData.get('ProductPrice')).toBe('$1,202.00');
    expect.soft(fullProductData.get('exTaxPrice')).toBe('$1,000.00');
})

test(`@smoke verify logo on product page`, async({homePage, searchResultsPage, productDetailsPage}) => {
    await homePage.performSearch('macbook');
    // let searchResultCount = await searchResultsPage.getSearchResultsCount();
    await searchResultsPage.selectProduct('MacBook Air');
    expect(productDetailsPage.isLogoVisible()).toBeTruthy();
})

test(`@smoke verify footers on product page`, async({homePage, searchResultsPage, productDetailsPage}) => {
    await homePage.performSearch('macbook');
    // let searchResultCount = await searchResultsPage.getSearchResultsCount();
    await searchResultsPage.selectProduct('MacBook Air');
    let actualFooterNames: string[] = await productDetailsPage.getPageFooterNames();
    console.log("Actual Footers ==>", actualFooterNames);
    expect(actualFooterNames).toEqual(productDetailsPage.getExpectedFooters());
})