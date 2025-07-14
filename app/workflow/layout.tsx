import Logo from "@/components/globals/logo";
import { ModeToggle } from "@/components/globals/mode-toggle";
import { Separator } from "@/components/ui/separator";

function WorkFlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex justify-between items-center p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  );
}

export default WorkFlowLayout;
