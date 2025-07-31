import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";
import { TaskType } from "@/types/task";
import { CustomReactFlowNode } from "@/types/custom-node";
import { CreateWorkflowNode } from "@/lib/workflows/create-workflow-node";

export default function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="flex gap-2 items-center text-xs">
            <CoinsIcon size={16} />
            {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                onClick={() =>
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  })
                }
                variant="ghost"
                size="icon"
              >
                <TrashIcon size={12} />
              </Button>
              <Button
                onClick={() => {
                  const node = getNode(nodeId) as CustomReactFlowNode;
                  const newX = node.position.x;
                  const newY = node.position.y + node.measured?.height! + 20;

                  const newNode = CreateWorkflowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  addNodes([newNode]);
                }}
                variant="ghost"
                size="icon"
              >
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
