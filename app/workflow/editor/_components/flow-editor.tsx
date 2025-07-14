"use client";

import { CreateWorkflowNode } from "@/lib/workflows/create-workflow-node";
import { TaskType } from "@/types/task";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import NodeComponent from "./nodes/node-component";

const nodeTypes = {
  FusionFlowNode: NodeComponent,
};

// This is the grid size for snapping nodes in the flow editor for better alignment.
const snapGrid: [number, number] = [50, 50];

// FitViewOptions can be adjusted to change the initial zoom and position of the view.
const fitViewOptions = {
  padding: 2,
};

export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateWorkflowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        fitView
      >
        <Controls fitViewOptions={fitViewOptions} position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
}
