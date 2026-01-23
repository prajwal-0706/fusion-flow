import { IExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../tasks/page-to-html";

export async function PageToHtmlExecutor(
  environment: IExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const webSiteUrl = environment.getInput("Website URL");

    return true;
  } catch (error) {
    console.error("Error launching browser:", error);
    return false;
  }
}
