import { IExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../tasks/page-to-html";

export async function PageToHtmlExecutor(
  environment: IExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    console.log("Page HTML content extracted successfully.", html);
    return true;
  } catch (error) {
    console.error("Error launching browser:", error);
    return false;
  }
}
