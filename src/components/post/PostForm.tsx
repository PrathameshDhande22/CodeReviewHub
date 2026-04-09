"use client";

import { useForm } from "react-hook-form";
import FormField from "../auth/FormField";
import { PostReview } from "@/schemas/post";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MdUploadFile } from "react-icons/md";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Monaco, OnMount } from "@monaco-editor/react";
import CodeSnippet from "../CodeSnippet";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});
//#endregion

//#region Dynamic Import
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
//#endregion

const languages: string[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "C#",
  "Swift",
  "Kotlin",
  "Scala",
  "Perl",
  "Haskell",
  "Lua",
  "Dart",
  "Elixir",
  "Clojure",
  "F#",
  "Erlang",
];

const PostForm = () => {
  //#region React Hook form
  const {
    register,
    formState: { errors },
  } = useForm<PostReview>({
    mode: "onTouched",
  });

  //#endregion

  const monacoRef = useRef<Monaco | null>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    console.log("Editor mounted:", editor);
    monacoRef.current = monaco;
    console.log(monaco);
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(typeof e)
    const language = e.target.value;
    if (monacoRef.current) {
      monacoRef.current?.editor.setModelLanguage(
        monacoRef.current.editor.getModels()[0],
        language.toLowerCase(),
      );
    }
  };

  return (
    <div className="mt-8">
      <div>
        <form action="">
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            {/* Left Side */}
            <div className="space-y-4 w-full">
              {/* Title */}
              <FormField
                label="TITLE"
                htmlFor="title"
                className={`${space_grotesk.className} text-slate-200 tracking-wide`}
                inputProps={{
                  type: "text",
                  className: `w-full ${inter.className} text-sm`,
                  placeholder: "eg. Memory Leak in Rust buffer",
                }}
                register={register("title")}
                extra={
                  <div>
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                }
              />
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className={`${space_grotesk.className} text-sm text-slate-200 tracking-wide`}
                >
                  DESCRIPTION
                </label>
                <div>
                  <textarea
                    id="description"
                    className={`w-full ${inter.className} text-sm w-full p-3 mt-1 rounded-lg bg-[#1c2436] text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="eg. What is the impact of this memory leak?"
                    rows={5}
                    {...register("description", { required: true })}
                  ></textarea>
                  <div>
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Upload File and Code */}
              <div>
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <label
                    htmlFor="code"
                    className={`${space_grotesk.className} text-sm text-slate-200 tracking-wide`}
                  >
                    SOURCE CODE
                  </label>
                  <div>
                    <button
                      type="button"
                      className={`flex flex-row gap-1 py-1.5 text-sm px-4 rounded-2xl items-center bg-[#283349] ${inter.className} text-primary`}
                    >
                      <MdUploadFile size={20} />
                      <span className="ml-2 text-sm">UPLOAD FILE</span>
                    </button>
                  </div>
                </div>
                {/* Code Editor */}
                <CodeSnippet title="">
                  <Editor
                    className="mt-3"
                    height="300px"
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    defaultValue="// add Your Code Snippet Here"
                  />
                </CodeSnippet>
              </div>
            </div>
            {/* Right Side */}
            <div
              className={`${inter.className} bg-[#1c2436] rounded-xl p-4 lg:w-96 w-full h-fit`}
            >
              <h3
                className={`${space_grotesk.className} font-semibold text-sm text-primary tracking-wider`}
              >
                CONFIGURATION
              </h3>
              <div>
                <label
                  htmlFor="language"
                  className="uppercase text-slate-300 text-xs"
                >
                  LANGAUGE
                </label>
                <select
                  className={`block w-full text-xs p-2 mt-1 rounded-lg bg-[#131823] text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary" ${inter.className}`}
                  id="language"
                  {...register("language")}
                  onChange={handleLanguageChange}
                >
                  <option value="" className={inter.className}>
                    Select
                  </option>
                  {languages.map((lang) => (
                    <option key={lang} className={inter.className} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
