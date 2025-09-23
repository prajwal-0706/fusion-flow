import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";

import FlowToExecutionPlan from "@/lib/workflows/execution-plan";
import {
  CustomReactFlowNode,
  FlowToExecutionPlanTypeError,
  FlowToExecutionPlanValidationError,
} from "@/types/custom-node";
import useFlowValidation from "./use-flow-validation";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const { setInValidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: FlowToExecutionPlanTypeError) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No Entry Point found.");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("Some nodes have invalid or missing inputs.");
          setInValidInputs(error.inValidElements || []);
          break;
        default:
          toast.error("Something went wrong. Please try again.");
          break;
      }
    },
    [setInValidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as CustomReactFlowNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
}
