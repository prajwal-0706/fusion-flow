import { Node } from "@xyflow/react";

import { TaskType } from "./task";

export interface NodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any; // Kept `any` so that user can have control and flexibility of this data (As custom node can be varying according to the data itself)
}

export interface CustomReactFlowNode extends Node {
  data: NodeData;
}
