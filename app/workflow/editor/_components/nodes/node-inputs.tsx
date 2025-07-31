import { Handle, Position } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { TaskParams } from "@/types/task";
import NodeParamField from "./node-param-field";
import { ColorForHandle } from "./common";

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
  return (
    <div className="flex justify-start relative bg-secondary w-full p-3">
      <NodeParamField nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
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
