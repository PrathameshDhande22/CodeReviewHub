import { getOptionalServerSession } from "@/auth";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import { getUserDetails } from "@/services/userprofile.service";
import { redirect } from "next/navigation";

const ProfileUpdateModalPage = async () => {
  const session = await getOptionalServerSession();
  if (!session) redirect("/login");

  const user = await getUserDetails(session.user.id);
  if (!user) redirect("/login");

  return (
    <UpdateProfileModal currentName={user.name} currentImage={user.image} />
  );
};

export default ProfileUpdateModalPage;
