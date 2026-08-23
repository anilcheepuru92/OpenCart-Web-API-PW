
import { Assert } from "node:assert";
import {test, expect} from "../src/fixtures/page-fixtures";
import { CsvHelper } from "../src/utils/csv-util";

test.beforeEach(async({loginPage}) => {
    await loginPage.goToLoginPage();
    // await loginPage.doLogin('anil.kumar@gmail.com', '@7jiKHUgUJzcekG');
    await loginPage.doLogin(process.env.LOGINID!, process.env.PASSWORD!);
})


let csvData = CsvHelper.readCsv("src/data/product.csv");
for(let row of csvData){
    test(`product search results test with ${row.productname}`, async({homePage, searchResultsPage}) => {
        await homePage.performSearch(row.searchkey);
        let searchResultCount = await searchResultsPage.getSearchResultsCount();
        expect(searchResultCount).toEqual(Number(row.resultcount));
    })
}


for(let row of csvData){  
    test(`basic product details test with ${row.productname}`, async({homePage, searchResultsPage, productDetailsPage, page}) => {
        await homePage.performSearch(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        let pageTitle = await page.title();
        expect(pageTitle).toBe(row.productname);
        let tabCount = await productDetailsPage.getProductInfoTabsCount();
        expect(tabCount).toBeGreaterThan(0);
    })
}