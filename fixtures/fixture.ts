import{test as base,expect} from '@playwright/test'

import { LoginPage }        from '../pages/LoginPage';
/**
 * Type definition for all custom fixtures.
 * TypeScript enforces that every fixture used in tests matches this shape.
 * This also powers VS Code autocomplete when you destructure fixtures in tests.
 */

type CustomFixtures = {
  loginPage: LoginPage;
};

/**
 * Extended test object with our custom fixtures injected.
 *
 * The pattern is: test.extend<CustomFixtures>({ ... })
 * Each key in the object becomes an injectable fixture parameter.
 * Tests import THIS `test`, not the base Playwright `test`.
 *
 * Lifecycle rule:
 *   Code BEFORE `await use(...)` runs before the test body (like beforeEach).
 *   Code AFTER `await use(...)` runs after the test body (like afterEach).
 *   Code after use() is GUARANTEED to run even if the test throws — this is the
 *   critical advantage over putting cleanup in the test body with try/finally.
 */

const test= base.extend<CustomFixtures>({
    // ---loginPage ---
  loginPage: async ({ page }, use) => {
    // `page` here is the Playwright-managed Page for this test worker.
    // We wrap it in our POM class and inject it.
    await use(new LoginPage(page));
    // No teardown needed — Playwright manages the page lifecycle via browser context.
    // NEVER call page.close() here — it closes the shared page used by ALL fixtures.
  },




  // ─── categoryPage ─────────────────────────────────────────────────────────
  //
  // Fix for Issue #1: categoryPage is now a proper fixture, chained from dashboardPage.
  //
  // WHY it chains from dashboardPage and not page:
  //   CategoryPage wraps a POPUP TAB (a new browser tab), not the main page.
  //   The popup tab doesn't exist until dashboardPage.navigateToManageCategories()
  //   opens it. So we cannot inject it from `page` directly.
  //   Instead we depend on `dashboardPage` and call the navigation method
  //   inside the fixture setup — giving us:
  //     1. Proper DI (tests request `categoryPage` like any other fixture)
  //     2. Guaranteed teardown of the popup tab (code after use())
  //     3. Consistent fixture pattern across the entire framework
  //
 
//   categoryPage: async ({ dashboardPage }, use) => {
//     // This opens the new tab and wraps it in CategoryPage
//     const categoryPage = await dashboardPage.navigateToManageCategories();

//     await use(categoryPage);

    // Teardown: explicitly close the popup tab after the test.
    // We own this tab — it was created by us, not by Playwright's base fixture.
    // isClosed() guard prevents errors on tests where the tab was already closed.
  
//     if (!categoryPage.page.isClosed()) {
//       await categoryPage.page.close();
//     }
//   },
 
})

// Export both test and expect — tests import from here, never from @playwright/test directly
export { test, expect };