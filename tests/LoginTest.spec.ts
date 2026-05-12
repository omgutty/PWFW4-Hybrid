import { test ,expect}        from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';

test.describe('Login tests', () => {

  test('Login with valid credentials should redirect to Dashboard',
    async ({ loginPage }) => {
      await loginPage.goto('/login');
      const dashboardPage = await loginPage.loginToApplication(credentials.username, credentials.password);
      // Single clear assertion — we arrived at the Dashboard
      await loginPage.assertUrlContains(/Dashboard\/Index/);
      // one validation from dashboard page
      expect(await dashboardPage.isLogoVisible())
  });

});

