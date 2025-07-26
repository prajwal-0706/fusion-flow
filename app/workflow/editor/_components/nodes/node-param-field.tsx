"use client";

import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import StringParam from "./param/string-param";
import { TaskParams, TaskParamType } from "@/types/task";
import { CustomReactFlowNode } from "@/types/custom-node";

export default function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParams;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as CustomReactFlowNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node?.data.inputs, nodeId, param.name, updateNodeData]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented Yet!</p>
        </div>
      );
  }
}
