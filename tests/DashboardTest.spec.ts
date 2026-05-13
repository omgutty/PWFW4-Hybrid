import { test ,expect} from '../fixtures/fixture';
import { credentials } from '../testdata/credentials';
import { DashboardPage } from '../pages/DashboardPage';




test.describe('Dashboard verification', ()=>{

    test('verify pending timesheets',async ({dashboardPage})=>{
        await dashboardPage.isLogoVisible();
        const pendingCount = await dashboardPage.pendingtimesheetnumber();
        console.log("Pending time sheet count : "+pendingCount);
        expect(pendingCount).toBeGreaterThanOrEqual(0)
    });
})

test('Navigating to Myprofile from dashboardpage', async  ({dashboardPage})=>{
    const myprofilepage=await dashboardPage.clickOnMyProfile();
    await myprofilepage.validateMyProfilePageLoaded(); 
    const loginpage=await myprofilepage.logout();  
    await loginpage.validateTitle();
});


