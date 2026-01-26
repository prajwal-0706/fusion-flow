import * as cheerio from "cheerio";

import { IExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../tasks/extract-text-from-element";

export async function ExtractTextFromElementExecutor(
  environment: IExecutionEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) return false;

    const html = environment.getInput("HTML");

    if (!html) return false;

    const $ = cheerio.load(html);

    const element = $(selector);

    if (!element) {
      console.error("Element not found for selector:", selector);
      return false;
    }

    const extractedText = $.text(element);

    if (!extractedText) {
      console.error("No text found in the selected element.");
      return false;
    }

    environment.setOutput("Extracted Text", extractedText);

    return true;
  } catch (error) {
    console.error("Error launching browser:", error);
    return false;
  }
}
