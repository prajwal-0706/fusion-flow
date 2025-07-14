"use client";

import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ParamProps } from "@/types/custom-node";

export default function StringParam({ param }: ParamProps) {
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-400 px-1">*</span>}
      </Label>
      <Input id={id} />
      {param.helperText && (
        <p className="text-xs text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}
