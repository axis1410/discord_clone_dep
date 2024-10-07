"use client";

import { ActionTooltip } from "@/components/ActionnTooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface NavigationItemProps {
	id: string;
	imageUrl: string;
	name: string;
}

export const NavigationItem: FC<NavigationItemProps> = ({
	id,
	name,
	imageUrl,
}) => {
	const params = useParams();
	const router = useRouter();

	const onClick = () => {
		router.push(`/servers/${id}`);
	};

	return (
		<ActionTooltip label={name} side="right" align="center">
			<button onClick={onClick} className="relative flex items-center group">
				<div
					className={cn(
						`
            absolute left-0 bg-primary rounded-r-full transition-all w-[4px]
          `,
						params?.serverId !== id && "group-hover:h-[20px]",
						params?.serverId === id ? "h-[36px]" : "h-[8px]"
					)}
				/>
				<div
					className={cn(
						`relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] 
            group-hover:rounded-[16px] transition-all overflow-hidden`,
						params?.serverId === id &&
							"bg-primary/10 text-primary rounded-[16px]"
					)}
				>
					<Image src={imageUrl} fill alt="channel" />
				</div>
			</button>
		</ActionTooltip>
	);
};
