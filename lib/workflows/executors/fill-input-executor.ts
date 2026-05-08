import { IExecutionEnvironment } from "@/types/executor";

import { FillInputTask } from "../tasks/fill-input";

export async function FillInputExecutor(
  environment: IExecutionEnvironment<typeof FillInputTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput("Input Selector");
    if (!selector) {
      environment.log.error("Input Selector is not provided.");
      return false;
    }
    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Value is not provided.");
      return false;
    }

    await environment.getPage()!.type(selector, value);
    environment.log.info(`Filled input ${selector} with value: ${value}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
