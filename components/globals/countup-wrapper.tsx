"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function CountUpWrapper({
  value,
  duration = 0.5,
}: {
  value: number;
  duration?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "-";

  return <CountUp duration={duration} preserveValue end={value} decimals={0} />;
}
