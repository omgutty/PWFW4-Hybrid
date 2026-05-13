import { Page,Locator ,expect} from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyprofilePage extends BasePage{
    private readonly myprofilepic= this.page.locator('#MainContent_UcMyProfile1_imgEmployee');


    constructor(page:Page){
        super(page);
    }

    async isMyprofilepicvisible(): Promise<boolean> {
        await this.myprofilepic.waitFor();
        return await this.myprofilepic.isVisible();
    }


}