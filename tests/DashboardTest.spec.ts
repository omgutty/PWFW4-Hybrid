import { test ,expect} from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';



test.describe('Dashboard verification', ()=>{

    test('verify pending timesheets',async ({dashboardPage})=>{
        await dashboardPage.isLogoVisible();

        const pendingCount = await dashboardPage.pendingtimesheetnumber();

        console.log(pendingCount);

        expect(pendingCount).toBe('1');
       // console.log(await dashboardPage.paidleavenumber())
        //console.log(await dashboardPage.emptyleavenumber())
        
     // await dashboardPage.assertDashboardLoaded();
    });
})