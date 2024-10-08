"use client";

import { CreateChannelMoodal } from "@/components/modals/CreateChannelModal";
import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { EditServerModal } from "@/components/modals/EditServerModal";
import { InviteModal } from "@/components/modals/InviteModal";
import { MembersModal } from "@/components/modals/MembersModal";
import { useEffect, useState } from "react";
import { DeleteServerModal } from "../modals/DeleteServerModal";
import { LeaveServerModal } from "../modals/LeaveServerModal";

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
    </>
  );
};
