import { memo } from "react";
import { NodeProps } from "@xyflow/react";

import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { TaskType } from "@/types/task";

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  return (
    <NodeCard nodeId={id} isSelected={selected}>
      <NodeHeader taskType={data.type as TaskType} />
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
