import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } },
) => {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.serverId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error(`[PATCH /api/servers/{serverId}/invite] ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
