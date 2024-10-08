"use client";

import { CreateChannelMoodal } from "@/components/modals/CreateChannelModal";
import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { DeleteChannelModal } from "@/components/modals/DeleteChannelModal";
import { DeleteServerModal } from "@/components/modals/DeleteServerModal";
import { EditServerModal } from "@/components/modals/EditServerModal";
import { InviteModal } from "@/components/modals/InviteModal";
import { LeaveServerModal } from "@/components/modals/LeaveServerModal";
import { MembersModal } from "@/components/modals/MembersModal";
import { useEffect, useState } from "react";
import { EditChannelModal } from "../modals/EditChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelMoodal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
