"use client";

import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import StringParam from "./param/string-param";
import { TaskParams, TaskParamType } from "@/types/task";
import { CustomReactFlowNode } from "@/types/custom-node";
import BrowserInstanceParam from "./param/browser-instance-param";

export default function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParams;
  nodeId: string;
  disabled?: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as CustomReactFlowNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      if (!node) return;
      updateNodeData(nodeId, {
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node, nodeId, param.name, updateNodeData]
  );

  if (!node) return null;

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
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
