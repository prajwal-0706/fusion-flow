import { CustomReactFlowNode } from "@/types/custom-node";
import { TaskType } from "@/types/task";

export function CreateWorkflowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): CustomReactFlowNode {
  return {
    id: crypto.randomUUID(),
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}
