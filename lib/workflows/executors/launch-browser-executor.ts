import puppeteer from "puppeteer";

import { IExecutionEnvironment } from "@/types/executor";
import { waitFor } from "@/lib/helpers/wait-for";
import { LaunchBrowserTask } from "../tasks/launch-browser";

export async function LaunchBrowserExecutor(
  environment: IExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const webSiteUrl = environment.getInput("Website URL");
    const browser = await puppeteer.launch({
      headless: true,
    });
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(webSiteUrl);
    environment.setPage(page);
    return true;
  } catch (error) {
    console.error("Error launching browser:", error);
    return false;
  }
}
