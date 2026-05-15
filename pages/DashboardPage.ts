import { Page,Locator ,expect} from "@playwright/test";
import { BasePage } from "@pages/BasePage";
import { MyprofilePage } from "@pages/MyprofilePage";
import{TimesheetPage} from './TimesheetPage';

export class DashboardPage extends BasePage{
    private readonly dashboardlogo= this.page.getByText('Logo');
    private readonly pendingtimesheet= this.page.locator('div[data-value="1"]');
    private readonly paidleave= this.page.locator(".count paid-leave-bg cursor-pointer");
    private readonly emptyleave= this.page.locator(".count empthy-leave-bg cursor-pointer");
    private readonly dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    private readonly profilelink= this.page.locator('img.img-responsive.profile-thumb.img-thumbnail');
    private readonly myprofile= this.page.locator('a').filter({ hasText: 'My Profile' }).first();
    private readonly addTimesheetBtn= this.page.locator('#lnkTimesheet').last();


    constructor (page:Page){
        super(page);
    }

    async isLogoVisible(): Promise<boolean> {
        return await this.dashboardlogo.isVisible();
    }

    async assertDashboardLoaded(): Promise<void> {
        // URL validation
        await this.assertUrlContains(/Dashboard\/Index/);
       // Unique element validation
        await this.assertVisible(this.dashboardHeader);
    }


    async pendingtimesheetnumber(): Promise<string> {

    await expect(this.pendingtimesheet).toBeVisible();

    return (await this.pendingtimesheet.innerText()).trim();
    }

    async paidleavenumber():Promise<string|null>{{
       return await this.paidleave.textContent();
    }}
    async emptyleavenumber():Promise<string|null>{{
       return await this.emptyleave.textContent();
    }}

    async clickOnMyProfile():Promise<MyprofilePage>{
       await  this.profilelink.click();
       await this.myprofile.click()
       return new MyprofilePage(this.page);
    }
    
/**
   * Clicks AddTimesheet button, waits for new tab, returns TimesheetPage.
   * The caller receives a fully loaded TimesheetPage ready to interact with.
   * No tab management needed in the test — it is handled here.
   */
  async navigateToAddTimesheet(): Promise<TimesheetPage> {
    const newTab = await this.clickAndWaitForNewTab(this.addTimesheetBtn);
    return new TimesheetPage(newTab);
  }
    


}