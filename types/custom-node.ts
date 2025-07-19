import { Node } from "@xyflow/react";

import { TaskParams, TaskType } from "./task";

export interface NodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: unknown; // Kept `unknown` so that user can have control and flexibility of this data (As custom node can be varying according to the data itself)
}

export interface CustomReactFlowNode extends Node {
  data: NodeData;
}

export interface ParamProps {
  param: TaskParams;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}
