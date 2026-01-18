import { Browser } from "puppeteer";
import { WorkflowTask } from "./workflows";

export type IEnvironment = {
  browser?: Browser;
  phases: Record<
    string,
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
};

export type IExecutionEnvironment<T extends WorkflowTask> = {
  getInput: (name: T["inputs"][number]["name"]) => string;
};
