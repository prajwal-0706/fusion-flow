import Logo from "@/components/globals/logo";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col w-screen items-center justify-center gap-4 !shadow-none">
      <Logo />
      {children}
    </div>
  );
}

export default AuthLayout;
