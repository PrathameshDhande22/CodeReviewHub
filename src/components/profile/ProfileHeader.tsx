import { getOptionalServerSession } from "@/auth";
import { getUserDetails } from "@/services/userprofile.service";
import { User } from "@generated/prisma/client";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { redirect } from "next/navigation";
import { BsCalendar3 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
//#endregion

const ProfileHeader = async () => {
  const user = await getOptionalServerSession();
  const userdetails: User | null = await getUserDetails(String(user?.user.id));

  if (!userdetails) redirect("/");

  return (
    <div className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-6 sm:p-8 backdrop-blur-sm">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-600/50 bg-[#1a2438]">
            <img
              src={
                userdetails.image
                  ? userdetails.image
                  : "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=architect01"
              }
              alt={`${user?.user.name} Avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Level Badge */}
          {/* TODO: Reputation and Level of the user needs to be Implmented */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-[9px] font-bold uppercase tracking-wider text-slate-200 px-2 py-0.5 rounded-sm w-17.5 text-center">
            Level 0
          </span>
        </div>

        {/* Name & Info */}
        <div className="flex-1">
          <p
            className={`${jetbrains_mono.className} text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1`}
          >
            Subject Identity
          </p>
          <h1
            className={`${space_grotesk.className} text-3xl sm:text-4xl font-bold text-slate-200 tracking-tight`}
          >
            {userdetails.username ?? userdetails.name}
          </h1>
          <p
            className={`${jetbrains_mono.className} text-xs text-slate-400 mt-1`}
          >
            ID: {userdetails.id}
          </p>
        </div>

        {/* Action Buttons */}
        {/* TODO: Edit Profile Page Needs to be Implemented */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <button className="flex items-center gap-2 bg-[#1a2a3e] hover:bg-[#223448] border border-slate-600/50 text-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <FiEdit2 className="text-sm" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Bottom Row - Contact Info */}
      <div
        className={`${inter.className} flex flex-wrap items-center gap-x-8 gap-y-3 mt-6 pt-5 border-t border-white/6`}
      >
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <HiOutlineMail className="text-slate-400" />
          <span>{userdetails.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <BsCalendar3 className="text-slate-400 text-xs" />
          <span>
            Joined at{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(userdetails.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
