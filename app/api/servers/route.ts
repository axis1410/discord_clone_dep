import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Bad Request", { status: 400 });
    if (!imageUrl) return new NextResponse("Bad Request", { status: 400 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(
      { server, message: "Server created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(`[POST /api/servers]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
