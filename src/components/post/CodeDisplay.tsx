"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { highlightCodeByLine, type Token } from "@/lib/shiki";
import CodeSnippet from "@/components/CodeSnippet";
import CodeLine from "./CodeLine";
import LineCommentPopover from "./LineCommentPopover";

//#region Font Declaration
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

interface CodeDisplayProps {
  code: string;
  language: string;
  owner: boolean;
  onCommentSubmit?: (
    startLine: number,
    endLine: number,
    content: string,
  ) => void;
}

const CodeDisplay = ({
  code,
  language,
  owner,
  onCommentSubmit,
}: CodeDisplayProps) => {
  const [lines, setLines] = useState<Token[][] | null>(null);

  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<number | null>(null);

  const [showPopover, setShowPopover] = useState(false);

  // Track if user is currently dragging across line numbers
  const dragging = useRef(false);
  const dragFrom = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (code) {
      highlightCodeByLine(code, language).then((tokens) => {
        if (!cancelled) setLines(tokens);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const onLineMouseDown = useCallback((line: number) => {
    if (!owner) {
      dragging.current = true;
      dragFrom.current = line;
      setSelectedStart(line);
      setSelectedEnd(line);
      setShowPopover(false);
    }
  }, []);

  const onLineMouseEnter = useCallback((line: number) => {
    if (!dragging.current || dragFrom.current === null) return;
    setSelectedStart(Math.min(dragFrom.current, line));
    setSelectedEnd(Math.max(dragFrom.current, line));
  }, []);

  useEffect(() => {
    const onMouseUp = () => {
      if (dragging.current) {
        dragging.current = false;
        setShowPopover(true);
      }
    };

    const prevent = (e: Event) => {
      if (dragging.current) e.preventDefault();
    };

    if (!owner) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("selectstart", prevent);
    }
    return () => {
      if (!owner) {
        document.removeEventListener("selectstart", prevent);
        document.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, []);

  const onAddComment = useCallback((line: number) => {
    setSelectedStart(line);
    setSelectedEnd(line);
    setShowPopover(true);
  }, []);

  const closePopover = useCallback(() => {
    setShowPopover(false);
    setSelectedStart(null);
    setSelectedEnd(null);
  }, []);

  const submitComment = useCallback(
    (startLine: number, endLine: number, content: string) => {
      onCommentSubmit?.(startLine, endLine, content);
      closePopover();
    },
    [onCommentSubmit, closePopover],
  );

  const isSelected = (line: number) => {
    if (selectedStart === null || selectedEnd === null) return false;
    return line >= selectedStart && line <= selectedEnd;
  };

  const plainLines = code.split("\n");

  return (
    <CodeSnippet title={language}>
      <div className="overflow-x-auto -mx-4 -mb-4 custom-scrollbar">
        {lines
          ? lines.map((tokens, i) => {
              const lineNum = i + 1;
              return (
                <div key={i}>
                  <CodeLine
                    lineNumber={lineNum}
                    tokens={tokens}
                    owner={owner}
                    isSelected={isSelected(lineNum)}
                    onLineMouseDown={onLineMouseDown}
                    onLineMouseEnter={onLineMouseEnter}
                    onAddComment={onAddComment}
                  />

                  {/* Show popover right below the last selected line */}
                  {!owner &&
                    showPopover &&
                    selectedEnd === lineNum &&
                    selectedStart !== null && (
                      <LineCommentPopover
                        startLine={selectedStart}
                        endLine={selectedEnd}
                        onClose={closePopover}
                        onSubmit={submitComment}
                      />
                    )}
                </div>
              );
            })
          : plainLines.map((line, i) => (
              <div
                key={i}
                className={`${jetbrains_mono.className} flex items-stretch`}
              >
                <div className="w-13 shrink-0 flex items-center justify-end pr-2 select-none text-slate-600 text-xs border-r border-slate-700/30">
                  {i + 1}
                </div>
                <div className="w-9 shrink-0" />
                <div className="flex-1 px-3 py-px whitespace-pre">
                  <span className="text-sm leading-6 text-slate-300">
                    {line || "\n"}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </CodeSnippet>
  );
};

export default CodeDisplay;
