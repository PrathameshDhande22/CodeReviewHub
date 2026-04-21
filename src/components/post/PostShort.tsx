"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface PostShortProps {
  title: string;
  description: string;
  language: string;
  tag: string[];
  createdTime: Date;
  code: string;
}

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
//#endregion

const PostShort = ({
  title,
  description,
  code,
  createdTime,
  language,
  tag,
}: PostShortProps) => {
  return (
    <div>
      <article className="rounded-xl border border-white/8 bg-[#0d1424]/90 p-5 backdrop-blur-sm">
        {/* Tag & Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span
              className={`${jetbrains_mono.className} text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border`}
            >
              {tag}
            </span>
            <span className={`${inter.className} text-xs text-slate-500`}>
              {}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
              <FiEdit2 className="text-sm" />
            </button>
            <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`${space_grotesk.className} text-base font-bold text-white mb-2 leading-snug`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`${inter.className} text-sm text-slate-400 leading-relaxed`}
        >
          {description}
        </p>
      </article>
    </div>
  );
};

export default PostShort;
