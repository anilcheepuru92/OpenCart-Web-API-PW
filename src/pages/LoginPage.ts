

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{

    //private locators
    private readonly emailField: Locator ;
    private readonly passwordField: Locator ;
    private readonly forgotPasswordLink: Locator;
    private readonly loginBtn: Locator ;
    private readonly loginErrorMsg: Locator;

    //initializing the locators inside the constructor
    constructor(page: Page) {
        super(page);
        this.emailField = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.forgotPasswordLink = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.loginErrorMsg = page.locator('.alert.alert-danger.alert-dismissible');
    }

    //public page actions
    async goToLoginPage(): Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async isForgotPwdLinkPresent(): Promise<boolean>{
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void>{
        await this.emailField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }

    async isLoginErrorMsgPresent(): Promise<boolean>{
        return await this.loginErrorMsg.isVisible();
    }
}