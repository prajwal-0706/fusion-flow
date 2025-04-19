"use client";

import Link from "next/link";
import React from "react";
import { ZapIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HEADER_ROUTES } from "@/lib/constants";

export default function Navbar() {
  const scrollIntoView = (ele: string) => {
    let element = document.getElementById(ele.substring(1));

    if (!element) return;

    element!.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center max-w-screen-xl mx-auto w-full text-primary py-10 sticky top-0 backdrop-blur-sm z-50">
      <Link href="#" className="flex items-center justify-center">
        <ZapIcon className="h-8 w-8" />
        <span className="ml-2 text-white">Fusion Flow</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {HEADER_ROUTES.map(({ className, href, title, button }) =>
          button ? (
            <Link
              className="text-sm font-medium text-white group-hover:text-primary"
              href={href}
              key={title}
            >
              <Button className="hover:bg-white group text-white hover:text-primary">
                {title}
              </Button>
            </Link>
          ) : (
            <span
              className="text-sm font-medium hover:text-white cursor-pointer select-none"
              key={href}
              onClick={() => {
                scrollIntoView(href);
              }}
            >
              {title}
            </span>
          )
        )}
      </nav>
    </header>
  );
}
