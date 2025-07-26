"use client";

import { Workflow } from "@prisma/client";
import { useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setNodes, setEdges, setViewport]);

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
        fitView /* 
        This prop ensures that the initial view fits the nodes and edges in the flow editor.

        If you want to change the restore the previous viewport, you can remove this prop.
        */
      >
        <Controls fitViewOptions={fitViewOptions} position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
}
