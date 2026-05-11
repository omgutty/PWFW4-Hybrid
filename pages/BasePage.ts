import {Page,Locator,expect} from '@playwright/test';



/**
 * BasePage — the root of the Page Object inheritance tree.
 *
 * Contains only methods that are genuinely reusable across ALL pages:
 * navigation, assertions, waiting, dialogs, logout.
 *
 * DO NOT add page-specific locators here.
 * DO NOT add methods that only apply to one or two pages here.
 *
 * Architecture rule: if a method lives here, it must be usable by
 * LoginPage, DashboardPage, CategoryPage, CoursePage equally. etc
 */

export  class BasePage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ─── Navigation ────────
    /**
   * Navigates to a path relative to the baseURL configured in playwright.config.ts.
   * Example: goto('/login') → navigates to https://your-env.com/login
   */
    async goto(path:string):Promise<void>{
       await this.page.goto(path);
    }

    async refreshApplication():Promise<void>{
        await this.page.reload();
    }
    async goBack():Promise<void>{
        await this.page.goBack();
    }
    async goForward():Promise<void>{
        await this.page.goForward();
    }
    async getCurrentURL() : Promise<String>{
        return this.page.url();
    }
    async getCurrentTitle(): Promise<string> {
        return this.page.title();
    }

    // ─── Assertions ──────────────────────────────────────────────────────────

    async assertUrlContains(pattern: string | RegExp): Promise<void> {
         await expect(this.page).toHaveURL(pattern);
    }

    async assertURLNotContains(pattern:string | RegExp){
        await expect(this.page).not.toHaveURL(pattern);
    }
    async assertVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }
    async assertNotVisible(locator: Locator): Promise<void> {
        await expect(locator).not.toBeVisible();
    }

    async assertText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
    }

    // ─── Waiting ─────────────────────────────────────────────────────────────

    async waitForVisible(locator: Locator, timeout: number = 10_000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async waitForHidden(locator: Locator, timeout: number = 10_000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    /**
   * Hard wait. Use ONLY when no better alternative exists.
   * Document WHY you need it when you use it.
   * Prefer waitForVisible, waitForHidden, or waitForResponse instead.
   */
    
    async wait(ms: number = 2_000): Promise<void> {
        await this.page.waitForTimeout(ms);
    }

    // ─── Dialog handling ─────────────────────────────────────────────────────

  /**
   * Registers a one-time listener that accepts the next JS dialog (alert/confirm/prompt).
   * IMPORTANT: Call this BEFORE the action that triggers the dialog.
   * The listener is registered on the next event loop tick — calling it and then
   * immediately clicking is safe because JS dialogs are synchronous in the browser
   * and the Playwright event is queued.
   *
   * Fix for Issue #5: renamed from acceptDialog to registerDialogAccept
   * to make the intent explicit — this REGISTERS a listener, not accepts an open dialog.
   */

    registerDialogAccept(responseText: string = ''): void {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(responseText);
    });
    }

  /**
   * Registers a one-time listener that dismisses the next JS dialog.
   */
    registerDialogDismiss(): void {
        this.page.once('dialog', async (dialog) => {
        await dialog.dismiss();
    });
    }

    // ─── Tab management ──────────────────────────────────────────────────────

    /**
   * Switches focus back to the first tab (index 0) and closes the current tab.
   * Used when a feature opens a popup/new tab and you need to return to the main window.
   */
    
    async switchToMainPage():Promise<void>{
        const pages=this.page.context().pages();
        await this.page.close();
        await pages[0].bringToFront();
    }

    // ─── Common actions ──────────────────────────────────────────────────────

  /**
   * Logs out of the application.
   * Placed on BasePage because logout is available from any authenticated page.
   * If different pages have different logout flows, override this method in that subclass.
   */
    async logout(): Promise<void> {
        await this.page.getByAltText('menu').click();
        await this.page.getByText('Sign out', { exact: true }).click();
    }


}


 






 