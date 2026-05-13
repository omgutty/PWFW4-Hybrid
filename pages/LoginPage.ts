import { Page, Locator, expect } from '@playwright/test';
import {BasePage} from './BasePage'
import { DashboardPage } from './DashboardPage';

export class LoginPage extends BasePage {
    // Locators are private — only this class's methods should interact with them.
    // Tests never access locators directly — they call methods.
    private readonly usernameField    = this.page.locator('#username');
    private readonly passwordField= this.page.locator('#password');
    private readonly changepasswordLink= this.page.locator('#ChangePassword');
    private readonly loginbutton= this.page.getByRole('button',{name:'Login'});

    constructor(page: Page) {
    super(page);
    // No need to re-assign this.page — BasePage constructor handles it.
    // Locators are defined as field initializers above, which is cleaner
    // than assigning in the constructor body.
    }
    
    // ─── Atomic actions (used when you need step-by-step control in tests) ───
    async enterUsername(email: string): Promise<void> {
    // Fix for Issue #3: using fill() not the deprecated type()
    await this.usernameField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginbutton.click();
    }

    // ─── Composite action (preferred in most tests) ──────────────────────────

  /**
   * Performs the full login sequence in one call.
   * Use this in tests where login is a prerequisite, not the subject under test.
   * Use the atomic methods above when the test IS testing login behaviour.
   */
    async loginToApplication(email: string, password: string): Promise<DashboardPage> {
        await this.usernameField.fill(email);
        await this.passwordField.fill(password);
        await this.loginbutton.click();
        return new DashboardPage(this.page);
    }

    async validateTitle(){
       const loginpagetitle=await this.page.title()
       expect(loginpagetitle).toContain('Login');
    }
}

