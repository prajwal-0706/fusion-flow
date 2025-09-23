import { LucideProps } from "lucide-react";

import { TaskParams, TaskType } from "./task";
import { CustomReactFlowNode } from "./custom-node";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParams[];
  outputs: TaskParams[];
  credits: number;
};

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: CustomReactFlowNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];
