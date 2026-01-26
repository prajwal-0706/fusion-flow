import { IExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../tasks/page-to-html";

export async function PageToHtmlExecutor(
  environment: IExecutionEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
