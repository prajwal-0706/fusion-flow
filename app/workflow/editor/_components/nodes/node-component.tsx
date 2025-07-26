import { memo } from "react";
import { NodeProps } from "@xyflow/react";

import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { TaskType } from "@/types/task";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";
import NodeInputs, { NodeInput } from "./node-inputs";

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const taskType = data.type as TaskType;
  const { inputs: taskInputs } = TaskRegistry[taskType];

  return (
    <NodeCard nodeId={id} isSelected={selected}>
      <NodeHeader taskType={taskType} />
      <NodeInputs>
        {taskInputs.map((input, index) => (
          <NodeInput nodeId={id} input={input} key={input.name} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
