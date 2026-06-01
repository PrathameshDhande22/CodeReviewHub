"use client";

import { addReviewForPostApi } from "@/api/review";
import { Button } from "@/components/UI/button";
import { Spinner } from "@/components/UI/spinner";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import {
  bold,
  checkedListCommand,
  code,
  codeBlock,
  divider,
  group,
  heading,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  image,
  italic,
  link,
  orderedListCommand,
  PreviewType,
  quote,
  strikethrough,
  unorderedListCommand,
} from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { Inter, Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaMarkdown, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
//#endregion

//#region Dynamic Imports
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Spinner className="text-3xl" />,
});
//#endregion

interface ReviewEditorProps {
  postId: string;
}

const ReviewEditor = ({ postId }: ReviewEditorProps) => {
  //#region React State Hooks
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<PreviewType>("edit");
  const [posting, setPosting] = useState<boolean>(false);
  const queryclient = useQueryClient();
  const router = useRouter();
  //#endregion

  const handleValueChange = (value: string | undefined) => {
    setValue(value ?? "");
  };

  const handlePostReviewClick = useCallback(async () => {
    setPosting(true);
    const response = await addReviewForPostApi(postId, {
      content: value,
    });
    if (response.status === "success") {
      setPosting(false);
      toast.success("Review Added for the Post");
      setValue("");
      router.refresh();
      queryclient.invalidateQueries({
        queryKey: ["reviews", postId],
        exact: false,
      });
    } else {
      toast.error(response.message);
      setPosting(false);
    }
  }, [value, postId]);

  return (
    <div>
      <div className="flex flex-row items-center gap-4 mt-4 mb-2">
        <div
          className={cn(
            space_grotesk.className,
            "text-slate-300 flex flex-row gap-2 font-medium text-sm",
          )}
        >
          <FaRegEdit size={14} />
          <span>Write a Review</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex flex-row gap-1 bg-slate-800/80 p-1 rounded-md border border-slate-700/50">
          <button
            onClick={() => setMode("edit")}
            className={cn(
              inter.className,
              "px-3 py-1 text-xs font-medium rounded-sm transition-all",
              mode === "edit"
                ? "bg-slate-700 text-slate-200 shadow-sm"
                : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50",
            )}
          >
            Write
          </button>
          <button
            onClick={() => setMode("preview")}
            className={cn(
              inter.className,
              "px-3 py-1 text-xs font-medium rounded-sm transition-all",
              mode === "preview"
                ? "bg-slate-700 text-slate-200 shadow-sm"
                : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50",
            )}
          >
            Preview
          </button>
        </div>

        <MDEditor
          value={value}
          preview={mode}
          aria-disabled={posting}
          hideToolbar={mode === "preview"}
          visibleDragbar={false}
          onChange={handleValueChange}
          fullscreen={false}
          extraCommands={[]}
          commands={[
            group(
              [heading1, heading2, heading3, heading4, heading5, heading6],
              {
                name: "title",
                groupName: "title",
                buttonProps: { "aria-label": "Insert title" },
                icon: heading.icon,
              },
            ),
            bold,
            italic,
            unorderedListCommand,
            orderedListCommand,
            checkedListCommand,
            codeBlock,
            divider,
            strikethrough,
            link,
            quote,
            code,
            image,
          ]}
        />
        <div className="flex flex-row gap-2 bg-slate-800/80 p-1 px-2 rounded-md border border-slate-700/50 justify-between">
          <div className="flex flex-row gap-2 items-center">
            <span>
              <FaMarkdown className="text-slate-400" />
            </span>
            <span
              className={cn(space_grotesk.className, "text-slate-400 text-xs")}
            >
              Markdown Supported
            </span>
          </div>
          <div>
            <Button
              type="button"
              className={cn(
                space_grotesk.className,
                "text-sm py-4 cursor-pointer px-3 rounded-sm",
              )}
              onClick={handlePostReviewClick}
              disabled={posting}
            >
              {posting ? <Spinner /> : <span>Post Review</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEditor;
