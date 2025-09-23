import { Handle, Position, useEdges } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { TaskParams } from "@/types/task";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/hooks/use-flow-validation";

export default function NodeInputs({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParams;
  nodeId: string;
}) {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const { inValidInputs } = useFlowValidation();
  const hasErrors = inValidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.includes(input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative bg-secondary w-full p-3",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField disabled={isConnected} nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-0.5 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
