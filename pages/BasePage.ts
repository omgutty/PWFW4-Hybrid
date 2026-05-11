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
    
}


 






 