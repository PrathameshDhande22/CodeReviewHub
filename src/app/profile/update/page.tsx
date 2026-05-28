"use server";

import { getOptionalServerSession } from "@/auth";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import { getUserDetails } from "@/services/userprofile.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Profile",
};

const ProfileUpdatePage = async () => {
  const session = await getOptionalServerSession();
  if (!session) redirect("/login");

  const user = await getUserDetails(session.user.id);
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <UpdateProfileModal
        currentName={user.name}
        currentImage={user.image}
        standalone
      />
    </div>
  );
};

export default ProfileUpdatePage;
