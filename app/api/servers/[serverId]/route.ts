import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { serverId: string } },
) => {
  try {
    const profile = await currentProfile();
    const { serverId } = params;

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Bad request", { status: 400 });

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error(`[DELETE /api/servers/%5BserverId%5D/route.ts]: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } },
) => {
  try {
    const profile = await currentProfile();
    const { serverId } = params;

    const { name, imageUrl } = await req.json();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) return new NextResponse("Bad request", { status: 400 });
    if (!name || !imageUrl)
      return new NextResponse("Bad request", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.error(`[PATCH /api/servers/%5BserverId%5D/route.ts]: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
