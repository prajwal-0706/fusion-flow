import { IExecutionEnvironment } from "@/types/executor";
import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflows";

import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ExtractTextFromElementExecutor } from "./extract-text-from-element-executor";
import { FillInputExecutor } from "./fill-input-executor";
import { ClickElementExecutor } from "./click-element-executor";

type ExecutorFn<T extends WorkflowTask> = (
  environment: IExecutionEnvironment<T>,
) => Promise<boolean>;

type ExecuteRegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecuteRegistry: ExecuteRegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
};
