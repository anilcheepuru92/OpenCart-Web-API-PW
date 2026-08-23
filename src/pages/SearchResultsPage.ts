

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { text } from 'node:stream/consumers';

export class SearchResultsPage extends BasePage{

    //private locators
    private readonly resultTiles: Locator ;
    private readonly createLink = ()=> this.page.locator('.product-thumb');

    //initializing the locators inside the constructor
    constructor(page: Page) {
        super(page);
        this.resultTiles = page.locator('.product-thumb');
    }

    async getSearchResultsCount(): Promise<number>{
        return await this.resultTiles.count();
    }

    async selectProduct(productName: string): Promise<void>{
        await this.page.getByRole('link', { name: productName, exact: true}).first().click();
    }


}