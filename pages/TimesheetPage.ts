import { Page,Locator ,expect} from "@playwright/test";
import { BasePage } from "./BasePage";

export class TimesheetPage extends BasePage{
    private readonly dashboardlogo= this.page.getByText('Logo');
    private readonly timehseetpagetitle=this.page.getByRole('heading', { name: 'View/Edit TimeSheet' });
    
    constructor (page:Page){
        super(page);
    }

    async verifyTitleOfTimeSheetpage(){
        const title= await  this.timehseetpagetitle.textContent();
        expect(title).toContain('View/Edit TimeShee');
    }

    // Verify the page heading after navigation
  async verifyPageHeading(expectedHeading: string): Promise<void> {
    await this.assertText(this.timehseetpagetitle, expectedHeading);
  }

  async clickHome(): Promise<void> {
    await this.dashboardlogo.click();
  }
}