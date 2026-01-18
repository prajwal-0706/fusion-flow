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
      headless: false, // For Testing
    });

    await waitFor(5000); // Simulate some work with the browser

    await browser.close();

    return true;
  } catch (error) {
    console.error("Error launching browser:", error);
    return false;
  }
}
