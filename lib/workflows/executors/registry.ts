import { LaunchBrowserExecutor } from "./launch-browser-executor";

export const ExecuteRegistry = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: () => Promise.resolve(true),
  EXTRACT_TEXT_FROM_ELEMENT: () => Promise.resolve(true),
};
