import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage{
    private readonly dashboardlogo= this.page.getByText('Logo');
    private readonly pendingtimesheet= this.page.locator(".count.pending-timesheet-leave-bg.cursor-pointer")
    private readonly paidleave= this.page.locator(".count paid-leave-bg cursor-pointer");
    private readonly emptyleave= this.page.locator(".count empthy-leave-bg cursor-pointer");
    private readonly dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });

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


    async pendingtimesheetnumber():Promise<string|null>{{
       return await this.pendingtimesheet.textContent();
    }}
    

    


}