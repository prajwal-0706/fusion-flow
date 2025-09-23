"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

import useExecutionPlan from "@/hooks/use-execution-plan";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  return (
    <Button
      onClick={() => {
        const plan = generate();
        console.log("---- plan ----");
        console.table(plan);
      }}
      variant="outline"
      className="flex items-center gap-2"
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
