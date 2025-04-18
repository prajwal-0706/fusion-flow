"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import Logo from "../globals/logo";
import { buttonVariants } from "@/components/ui/button";

export default function DesktopSidebar() {
  const pathName = usePathname();

  // const activeRoute =
  //   ROUTES.find(({ href }) => href.length > 0 && pathName.includes(href)) ||
  //   ROUTES[0];

  return (
    <div className="hidden relative md:block max-w-[280px] min-w-[280px] h-screen overflow-auto w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      {/* TODO: Add Credits Display.. */}
      <div className="flex flex-col p-2 gap-y-2">
        {ROUTES.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={buttonVariants({
              variant: pathName === href ? "sidebarItemActive" : "sidebarItem",
            })}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
