import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } },
) => {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const channelId = params.channelId;
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Bad Request", { status: 400 });
    if (!channelId) return new NextResponse("Bad Request", { status: 400 });
    if (!name) return new NextResponse("Bad Request", { status: 400 });
    if (!type) return new NextResponse("Bad Request", { status: 400 });
    if (name.toLowerCase() === "general") {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: { id: channelId, NOT: { name: "general" } },
            data: { name, type },
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error(`[PATCH /api/channels/${params.channelId}] ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } },
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const channelId = params.channelId;
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Bad Request", { status: 400 });
    if (!channelId) return new NextResponse("Bad Request", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error(`[DELETE /api/channels/${params.channelId}] ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
