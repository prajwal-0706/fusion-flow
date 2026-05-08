import { IExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../tasks/click-element";

export async function ClickElementExecutor(
  environment: IExecutionEnvironment<typeof ClickElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    await environment.getPage()?.click(selector);
    environment.log.info(`Clicked element with selector: ${selector}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
