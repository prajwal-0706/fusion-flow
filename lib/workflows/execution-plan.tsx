import { Edge } from "@xyflow/react";

import {
  CustomReactFlowNode,
  CustomReactFlowNodeMissingInputs,
  FlowToExecutionPlanTypeError,
  FlowToExecutionPlanValidationError,
} from "@/types/custom-node";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflows";
import { TaskRegistry } from "./tasks/registry";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: FlowToExecutionPlanTypeError;
};

export default function FlowToExecutionPlan(
  nodes: CustomReactFlowNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const inputsWithErrors: CustomReactFlowNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const inValidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (inValidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: inValidInputs,
    });
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      // if node is already pushed in execution flow
      if (planned.has(currentNode.id)) continue;

      const inValidInputs = getInvalidInputs(currentNode, edges, planned);

      if (inValidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);

        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // if all incoming incomers/edges are planned and there are still invalid inputs
          // this means that this particular node has invalid inputs
          // which means that workflow is invalid
          console.error("Invalid Inputs", currentNode.id, inValidInputs);
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: inValidInputs,
          });
        } else {
          // skip the step for now!
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    // Now add all nodes from this phase to planned set
    for (const currentNode of nextPhase.nodes) {
      planned.add(currentNode.id);
    }

    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        inValidElements: inputsWithErrors,
      },
    };
  }

  return { executionPlan };
}

function getInvalidInputs(
  node: CustomReactFlowNode,
  edges: Edge[],
  planned: Set<string>
) {
  const inValidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    if (inputValueProvided) {
      // this input is fine, so we can move on to the next input
      continue;
    }

    // if a value is not provided by user then we need to check:
    //  if it's coming from output of another node
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedNode =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedNode) {
      //  the input is required and we have a valid value for it
      //  provided by a task that is already planned to be executed
      continue;
    } else if (!input.required) {
      //  if the input is not required but there is an output linked to it
      // then we need to be sure that output is already planned

      if (!inputLinkedToOutput) {
        // if there is no edge linked to this input and it's not required
        // then it's fine, we can move on to the next input
        continue;
      }

      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // The Output is providing a value to the input: (the output is already planned and valid)
        continue;
      }
    }

    inValidInputs.push(input.name);
  }

  return inValidInputs;
}

// There is getIncomers function in @xyflow/react but it's not working on server side
// so need to re-implement it here
function getIncomers(
  node: CustomReactFlowNode,
  nodes: CustomReactFlowNode[],
  edges: Edge[]
) {
  if (!node.id) return [];

  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });

  // return all the nodes who has the id in incomersIds
  return nodes.filter((n) => incomersIds.has(n.id));
}
