
import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CsvHelper } from '../utils/csv-util';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { BasePage } from '../pages/BasePage';

//define the types for page fixtures
type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage,
    productDetailsPage : ProductDetailsPage,
    testData: Record<string, string>[]
}

//extend Playwright baseTest
export let test = baseTest.extend<pageFixtures>({

    basePage: async ({page}, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({page}, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({page}, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({page}, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productDetailsPage: async ({page}, use) => {
        let productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage);
    },

    testData: async({}, use) => {
        let testData = CsvHelper.readCsv("src/data/loginData.csv");
        await use(testData);
    }
});

export {expect} from '@playwright/test';