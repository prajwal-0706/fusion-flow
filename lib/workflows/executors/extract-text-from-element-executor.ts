import * as cheerio from "cheerio";

import { IExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../tasks/extract-text-from-element";

export async function ExtractTextFromElementExecutor(
  environment: IExecutionEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const html = environment.getInput("HTML");

    if (!html) {
      environment.log.error("HTML not defined");
      return false;
    }

    const $ = cheerio.load(html);

    const element = $(selector);

    if (!element) {
      environment.log.error("Element not found for selector:" + selector);
      return false;
    }

    const extractedText = $.text(element);

    if (!extractedText) {
      environment.log.error("No text found in the selected element.");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
