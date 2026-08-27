
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { text } from 'node:stream/consumers';

export class HomePage extends BasePage{

    //private locators
    private readonly logoutLink: Locator ;
    private readonly headers: Locator;
    private readonly editAccInfoLink: Locator;

    //initializing the locators inside the constructor
    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', {level: 2});
        this.editAccInfoLink = page.getByText('Edit your account information', {exact: true})
    }

    async isLogoutLinkPresent(): Promise<boolean>{
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async performSearch(textToSearch: string): Promise<void>{
        console.log(`Searching for ${textToSearch}`);
        await this.searchBox.fill(textToSearch);
        await this.searchIcon.click();
    }

    async goToEditAccInfoPage(): Promise<void>{
        await this.editAccInfoLink.click();
    }

}