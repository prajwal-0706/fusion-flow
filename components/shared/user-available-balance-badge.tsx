import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CoinsIcon, Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { getAvailableCredits } from "@/actions/billing/get-available-credits";
import CountUpWrapper from "../globals/countup-wrapper";
import { buttonVariants } from "../ui/button";

export default function UserAvailableBalanceBadge() {
  const query = useQuery({
    queryKey: ["user-available-balance"],
    queryFn: () => getAvailableCredits(),
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });
  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x-2 items-center",
        buttonVariants({ variant: "outline" }),
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && (
          <Loader2Icon
            className="w-4 h-4 animate-spin"
            aria-label="Loading balance"
          />
        )}
        {query.isSuccess && <CountUpWrapper value={query.data} />}
        {query.isError && (query.data ? query.data : "Error")}
      </span>
    </Link>
  );
}
