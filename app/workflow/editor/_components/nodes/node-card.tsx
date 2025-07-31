"use client";

import { useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";

interface NodeCardProps {
  nodeId: string;
  isSelected: boolean;
  children: React.ReactNode;
}

export default function NodeCard({
  nodeId,
  isSelected,
  children,
}: NodeCardProps) {
  const { getNode, setCenter } = useReactFlow();

  const handleDoubleClick = () => {
    const node = getNode(nodeId);
    if (!node) return;

    const { position, measured } = node;
    if (!position || !measured) return;

    const { height, width } = measured;

    const x = position.x + width! / 2;
    const y = position.y + height! / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex gap-1 flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
}
