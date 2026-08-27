import { Page, Locator } from '@playwright/test';

export class BasePage{

    protected readonly page: Page;

    //common locators
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;
    protected expectedFooterNames = ['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Contact Us',
                                    'Returns', 'Site Map', 'Brands', 'Gift Certificates', 'Affiliate', 'Specials', 'My Account',
                                    'Order History', 'Wish List', 'Newsletter', 'OpenCart'
                                    ]

    constructor(page: Page){
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('.btn.btn-default.btn-lg');
        this.currency = page.locator('#form-currency');
        this.footerLinks = page.locator('footer a');
        this.cartButton = page.locator('div#cart button');
    }

    //common locator functions
    async isLogoVisible(): Promise<boolean>{
        return await this.logo.isVisible();
    }

    async isSearchBoxVisible(): Promise<boolean>{
        return await this.searchBox.isVisible();
    }

    async isCurrencyVisible(): Promise<boolean>{
        return await this.currency.isVisible();
    }

    async getPageFootersCount(): Promise<number>{
        return await this.footerLinks.count();
    }

    async getPageFooterNames(): Promise<string[]>{
        await this.footerLinks.first().waitFor({'state': 'visible'});
        return await this.footerLinks.allInnerTexts();
    }

    getExpectedFooters(): string[]{
        return this.expectedFooterNames;
    }

    //page level generic methods
    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }

    getPageUrl(): string{
        return this.page.url();
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string){
        await this.page.screenshot({
            fullPage: true,
            path:`reports/screenshot/${name}.png`
        })
    }

}