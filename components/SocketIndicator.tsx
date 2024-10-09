"use client";

import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { useSocket } from "./providers/SocketProvider";

interface SocketIndicatorProps {}

export const SocketIndicator: FC<SocketIndicatorProps> = ({}) => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Connected
    </Badge>
  );
};
