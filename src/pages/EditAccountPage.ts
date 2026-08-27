

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { text } from 'node:stream/consumers';

export class EditAccountPage extends BasePage{

    //private locators
    private readonly accountInfoHeader: Locator ;
    private readonly emailField: Locator ;

    //initializing the locators inside the constructor
    constructor(page: Page) {
        super(page);
        this.accountInfoHeader = page.getByRole('heading', { level: 1 });
        this.emailField = page.getByRole('textbox', { name: '* E-Mail' });
    }

    async getSectionHeader(): Promise<string>{
        return await this.accountInfoHeader.innerText();
    }

    async getCurrentEmail(): Promise<string>{
        return await this.emailField.inputValue();
    }

}