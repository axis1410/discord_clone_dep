import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage: FC<InviteCodePageProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const { inviteCode } = params;
  if (!inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  try {
    const server = await db.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [{ profileId: profile.id }],
        },
      },
    });
    if (server) return redirect(`/servers/${server.id}`);
  } catch (error) {
    // console.error(`invite/[inviteCode]/page.tsx: ${error}`);
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <h2 className="text-4xl font-bold text-center">Invalid invite code</h2>
        <p className="mt-2 text-lg">
          Please ask the server admin to generate a new link.
        </p>
        <Link className="mt-3 hover:underline text-xl" href="/">
          Go back
        </Link>
      </div>
    );
  }

  return null;
};

export default InviteCodePage;
