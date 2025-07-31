"use client";

import { useEffect, useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ParamProps } from "@/types/custom-node";
import { Textarea } from "@/components/ui/textarea";

export default function StringParam({
  param,
  value,
  disabled,
  updateNodeParamValue,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  let Component: any = Input;

  if (param.variant === "textarea") {
    Component = Textarea;
  }

  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-400 px-1">*</span>}
      </Label>
      <Component
        className="text-xs"
        value={internalValue}
        placeholder="Enter value here"
        disabled={disabled}
        id={id}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setInternalValue(e.target.value)}
        onBlur={() => updateNodeParamValue(internalValue)}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}
