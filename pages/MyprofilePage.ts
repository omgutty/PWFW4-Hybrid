import { Page,Locator ,expect} from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyprofilePage extends BasePage{
    private readonly myprofilepic= this.page.locator('#MainContent_UcMyProfile1_imgEmployee');


    constructor(page:Page){
        super(page);
    }

   async validateMyProfilePageLoaded() {
    await expect(this.myprofilepic).toBeVisible();
}


}