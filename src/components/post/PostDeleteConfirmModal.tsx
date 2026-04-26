import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/UI/alert-dialog";
import { Inter, Space_Grotesk } from "next/font/google";
import { FiTrash2 } from "react-icons/fi";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
//#endregion

interface PostDeleteConfirmModalProps {
  postId: string;
  onDelete: () => void;
}

const PostDeleteConfirmModal = ({
  onDelete,
}: PostDeleteConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
          <FiTrash2 className="text-sm" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1c2539] py-6 px-5">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`text-lg ${space_grotesk.className} text-slate-200`}
          >
            Delete Post
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`mt-2 ${inter.className} text-sm text-slate-400`}
          >
            This action cannot be undone. This will permanently delete your Post
            and along with its review and comments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 py-3">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="px-4 py-3 bg-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostDeleteConfirmModal;
