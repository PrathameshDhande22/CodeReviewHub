"use client";

import { useEffect, useRef, useState } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { VscClose, VscComment } from "react-icons/vsc";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/UI/popover";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

interface LineCommentPopoverProps {
  startLine: number;
  endLine: number;
  onClose: () => void;
  onSubmit: (startLine: number, endLine: number, content: string) => void;
}

const LineCommentPopover = ({
  startLine,
  endLine,
  onClose,
  onSubmit,
}: LineCommentPopoverProps) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineLabel =
    startLine === endLine
      ? `Line ${startLine}`
      : `Lines ${startLine}–${endLine}`;

  // Auto-focus the textarea when popover opens
  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  // Submit the comment
  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(startLine, endLine, comment.trim());
    setComment("");
  };

  // Ctrl+Enter shortcut
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Popover open onOpenChange={(open) => !open && onClose()}>
      <PopoverAnchor asChild>
        <div className="h-0 w-full" />
      </PopoverAnchor>

      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className={`${inter.className} w-105 p-0 bg-[#131c2e] border-slate-700/50 shadow-2xl shadow-black/40`}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/30 bg-[#0f1825] rounded-t-xl">
          <div className="flex items-center gap-2">
            <VscComment className="text-primary text-sm" />
            <span className="text-slate-300 text-xs font-medium">
              Add Comment
            </span>
            <span
              className={`${jetbrains_mono.className} text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded`}
            >
              {lineLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 rounded hover:bg-slate-700/40 cursor-pointer"
          >
            <VscClose className="text-sm" />
          </button>
        </div>

        {/* Comment input */}
        <div className="p-3">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your comment..."
            rows={3}
            className={`${jetbrains_mono.className} w-full bg-[#0a1220] border border-slate-700/40 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`}
          />

          {/* Buttons */}
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[10px] text-slate-600">
              Ctrl+Enter to submit
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-700/40 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!comment.trim()}
                className="px-3 py-1.5 text-xs font-medium bg-primary/90 hover:bg-primary text-slate-900 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LineCommentPopover;
