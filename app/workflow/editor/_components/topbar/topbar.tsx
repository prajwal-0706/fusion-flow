"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import TooltipWrapper from "@/components/globals/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import SaveBtn from "./save-btn";
import ExecuteBtn from "./execute-btn";

interface TopbarProps {
  title: string;
  subtitle?: string;
  workflowId: string;
}

export default function Topbar({ title, subtitle, workflowId }: TopbarProps) {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button size="icon" variant="ghost" onClick={() => router.back()}>
            <ChevronLeft size={20} />
          </Button>
        </TooltipWrapper>
        <div className="">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-muted-foreground text-xs text-ellipsis truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <ExecuteBtn workflowId={workflowId} />
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
}
