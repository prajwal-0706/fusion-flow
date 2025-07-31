"use client";

import { ParamProps } from "@/types/custom-node";

export default function BrowserInstanceParam({
  param,
  updateNodeParamValue,
}: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}
