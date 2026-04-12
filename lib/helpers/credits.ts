import { CustomReactFlowNode } from "@/types/custom-node";
import { TaskRegistry } from "../workflows/tasks/registry";

export function calculateWorkflowCreditCost(nodes: CustomReactFlowNode[]) {
  return nodes.reduce(
    (acc, node) => acc + TaskRegistry[node.data.type]?.credits || 0,
    0,
  );
}
