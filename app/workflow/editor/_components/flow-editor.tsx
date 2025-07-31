"use client";

import { Workflow } from "@prisma/client";
import { useCallback, useEffect } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import NodeComponent from "./nodes/node-component";
import { CreateWorkflowNode } from "@/lib/workflows/create-workflow-node";
import { TaskType } from "@/types/task";
import { CustomReactFlowNode } from "@/types/custom-node";
import DeletableEdge from "./edges/deletable-edge";
import { TaskRegistry } from "@/lib/workflows/tasks/registry";

const nodeTypes = {
  FusionFlowNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

// This is the grid size for snapping nodes in the flow editor for better alignment.
const snapGrid: [number, number] = [50, 50];

// FitViewOptions can be adjusted to change the initial zoom and position of the view.
const fitViewOptions = {
  padding: 2,
};

export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomReactFlowNode>(
    []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error("Failed to parse workflow definition:", error);
    }
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (!taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateWorkflowNode(taskType as TaskType, position);
      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      if (!connection.targetHandle) return;

      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No Self-connection allowed
      if (connection.source === connection.target) {
        return false;
      }

      // Same TaskParams type Connection
      const source = nodes.find((n) => n.id === connection.source);
      const target = nodes.find((n) => n.id === connection.target);
      if (!source || !target) {
        console.error("Source or target not found - (Invalid Connection)");
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      if (input?.type !== output?.type) {
        return false;
      }

      const hasCycle = (node: CustomReactFlowNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);

      return !detectedCycle;
    },
    [nodes, edges]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        snapToGrid
        fitView /* 
        This prop ensures that the initial view fits the nodes and edges in the flow editor.

        If you want to change the restore the previous viewport, you can remove this prop.
        */
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls fitViewOptions={fitViewOptions} position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </main>
  );
}
