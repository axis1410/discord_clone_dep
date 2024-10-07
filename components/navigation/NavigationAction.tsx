"use client";

import { ActionTooltip } from "@/components/ActionnTooltip";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="Create a server" side="right" align="center">
        <button
          onClick={() => onOpen("createServer")}
          className="flex items-center group"
        >
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
         group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center
         bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"
          >
            <Plus
              className="transition group-hover:text-white text-emerald-500"
              size={25}
            ></Plus>
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
