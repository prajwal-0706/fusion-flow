"use client";

import { TaskParams, TaskParamType } from "@/types/task";
import StringParam from "./param/string-param";

export default function NodeParamField({ param }: { param: TaskParams }) {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented Yet!</p>
        </div>
      );
  }
}
