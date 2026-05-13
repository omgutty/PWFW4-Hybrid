import { test }        from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';

test.describe('Timesheet Tests', () => {

  test('Navigate to AddTimesheet and verify page heading',
    async ({ loginPage, dashboardPage }) => {

      // Step 1 — Login
      await loginPage.goto('/Login');
      await loginPage.loginToApplication(credentials.username, credentials.password);

      // Step 2 — Click AddTimesheet, get back the new tab wrapped in TimesheetPage
      // No Promise.all, no waitForEvent, no tab management in the test
      // DashboardPage handles all of that internally
      const timesheetPage = await dashboardPage.navigateToAddTimesheet();

      // Step 3 — Verify we landed on the right page
      await timesheetPage.verifyPageHeading('View/Edit TimeSheet');

      // Step 4 — Work on the timesheet page
      // await timesheetPage.fillTimesheetDate('2025-01-01');
      // await timesheetPage.submitTimesheet();

      // Step 5 — Click Home (stays in same tab — no tab switching needed)
      await timesheetPage.clickHome();

      // Step 6 — Verify we're back on dashboard within the same tab
      await timesheetPage.assertUrlContains(/Dashboard/);
  });

});