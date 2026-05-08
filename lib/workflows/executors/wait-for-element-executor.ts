import { IExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../tasks/wait-for-element";

export async function WaitForElementExecutor(
  environment: IExecutionEnvironment<typeof WaitForElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      environment.log.error("Selector not defined");
      return false;
    }

    const visibility = environment.getInput("Visibility");

    if (!visibility) {
      environment.log.error("Visibility not defined");
      return false;
    }

    await environment.getPage()?.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });
    environment.log.info(`Element "${selector}" is now ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
