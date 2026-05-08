import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflows";

import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { ExtractTextFromElementTask } from "./extract-text-from-element";
import { FillInputTask } from "./fill-input";
import { ClickElementTask } from "./click-element";

type Registry = {
  [key in TaskType]: WorkflowTask & {
    type: key;
  };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
};
