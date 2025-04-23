import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}
