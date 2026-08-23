


import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { text } from 'node:stream/consumers';

export class ProductDetailsPage extends BasePage{

    //private locators
    private readonly infoTabs: Locator ;
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly map: Map<string, string|number>;

    //initializing the locators inside the constructor
    constructor(page: Page) {
        super(page);
        this.infoTabs = page.locator('.nav.nav-tabs li a');
        this.header = page.getByRole('heading', {level: 1});
        this.productImages = page.locator('#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string|number>();
    }

    async getProductInfoTabsCount(): Promise<number>{
        await this.infoTabs.first().waitFor({state: 'visible'});
        return await this.infoTabs.count();
    }

    async getProductHeader(): Promise<string>{
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number>{
        await this.productImages.first().waitFor({state: 'visible'});
        return this.productImages.count();
    }

    private async getProductMetaData(): Promise<void>{
        let metaData: string[] = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let rowData: string[] = data.split(':');
            let key = rowData[0].trim();
            let value = rowData[1].trim();
            this.map.set(key, value);
        }
    }

    private async getProductPricingData(): Promise<void>{
        let priceData: string[] = await this.productPricing.allInnerTexts();
        let productPrice: string = priceData[0].trim();
        let exTaxPrice: string = (priceData[1].split(':')[1]).trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('exTaxPrice', exTaxPrice);
    }

    /**
     * 
     * @returns Whole Product Data: Header, Images, Meta Data, Pricing Data
     */
    async getAllProductData(): Promise<Map<string, string|number>>{
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData(); 
        return this.map;
    }

}