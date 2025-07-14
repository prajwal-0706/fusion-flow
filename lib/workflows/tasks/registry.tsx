import { TaskType } from "@/types/task";
import { LaunchBrowserTask } from "./launch-browser";

export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
};
