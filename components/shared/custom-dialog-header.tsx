import React from "react";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface CustomDialogHeaderProps {
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function CustomDialogHeader({
  icon: Icon,
  title,
  subtitle,
  iconClassName,
  titleClassName,
  subtitleClassName,
}: CustomDialogHeaderProps) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex  flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon size={30} className={cn("stroke-primary", iconClassName)} />
          )}
          {title && (
            <p className={cn("text-xl font-bold text-primary", titleClassName)}>
              {title}
            </p>
          )}
          {subtitle && (
            <p
              className={cn("text-sm text-muted-foreground", subtitleClassName)}
            >
              {subtitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}
