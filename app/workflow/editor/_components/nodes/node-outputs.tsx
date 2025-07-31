"use client";

import { Handle, Position } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { ColorForHandle } from "./common";
import { TaskParams } from "@/types/task";

export default function NodeOutputs({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParams }) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-0.5 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
}
