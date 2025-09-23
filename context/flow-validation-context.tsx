import { createContext, Dispatch, SetStateAction, useState } from "react";

import { CustomReactFlowNodeMissingInputs } from "@/types/custom-node";

type FlowValidationContextType = {
  inValidInputs: CustomReactFlowNodeMissingInputs[];
  setInValidInputs: Dispatch<
    SetStateAction<CustomReactFlowNodeMissingInputs[]>
  >;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export function FlowValidationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inValidInputs, setInValidInputs] = useState<
    CustomReactFlowNodeMissingInputs[]
  >([]);
  const clearErrors = () => setInValidInputs([]);
  return (
    <FlowValidationContext.Provider
      value={{ inValidInputs, setInValidInputs, clearErrors }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
}
