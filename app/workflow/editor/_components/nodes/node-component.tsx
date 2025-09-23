import { memo } from "react";
import { NodeProps } from "@xyflow/react";

import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { TaskType } from "@/types/task";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";
import NodeInputs, { NodeInput } from "./node-inputs";
import NodeOutputs, { NodeOutput } from "./node-outputs";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const taskType = data.type as TaskType;
  const { inputs: taskInputs, outputs: taskOutputs } = TaskRegistry[taskType];

  return (
    <NodeCard nodeId={id} isSelected={selected}>
      {DEV_MODE && (
        <Badge>
          DEV: id: {id}, type: {taskType}
        </Badge>
      )}
      <NodeHeader nodeId={id} taskType={taskType} />
      <NodeInputs>
        {taskInputs.map((input) => (
          <NodeInput nodeId={id} input={input} key={input.name} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {taskOutputs.map((output) => (
          <NodeOutput output={output} key={output.name} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
