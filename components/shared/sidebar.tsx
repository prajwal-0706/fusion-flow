"use client";

import Logo from "../globals/logo";

export default function DesktopSidebar() {
  return (
    <div className="hidden relative md:block max-w-[280px] min-w-[280px] h-screen overflow-auto w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
    </div>
  );
}
