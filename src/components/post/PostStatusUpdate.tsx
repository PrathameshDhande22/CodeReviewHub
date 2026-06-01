"use client";

import { updatePostStatusApi } from "@/api/postcode";
import { cn } from "@/lib/utils";
import { CodeStatus } from "@generated/prisma/enums";
import { useMutation } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { GoIssueReopened } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
//#endregion

interface PostStatusUpdateProps {
  status: CodeStatus;
  postId: string;
}

const PostStatusUpdate = ({ status, postId }: PostStatusUpdateProps) => {
  const router = useRouter();

  //#region React Query Hooks
  const postStatusMutation = useMutation({
    mutationKey: ["update-post-status", postId],
    mutationFn: (newStatus: CodeStatus) => {
      return updatePostStatusApi(postId, {
        status: newStatus,
      });
    },
  });
  //#endregion

  const handleStatusChange = useCallback(() => {
    postStatusMutation.mutate(status === "OPEN" ? "CLOSED" : "OPEN", {
      onSuccess: (data) => {
        if (data.status === "success") {
          router.refresh();
        }
      },
    });
  }, []);

  return (
    <div className={cn(inter.className, "text-slate-300")}>
      <button
        className="bg-[#1c263b] px-4 py-2 rounded-sm cursor-pointer hover:bg-[#2c3b5b] transition-colors duration-200 flex items-center gap-2"
        onClick={handleStatusChange}
      >
        {status === "OPEN" && (
          <div className="flex flex-row gap-1 items-center text-sm">
            <IoMdCloseCircle className="text-primary" size={20} />
            <span>Mark as Closed</span>
          </div>
        )}
        {status === "CLOSED" && (
          <div className="flex flex-row gap-1 items-center text-sm">
            <GoIssueReopened className="text-primary" size={20} />
            <span>ReOpened</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default PostStatusUpdate;
