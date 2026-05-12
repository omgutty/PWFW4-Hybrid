import { test ,expect} from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';



test.describe('Dashboard verification', ()=>{

    test('verify pending timesheets',async ({dashboardPage})=>{
      await dashboardPage.isLogoVisible();
     // await dashboardPage.assertDashboardLoaded();
    });
})