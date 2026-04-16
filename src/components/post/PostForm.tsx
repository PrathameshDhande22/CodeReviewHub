"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormField from "../auth/FormField";
import { PostReviewInput, PostSchema } from "@/schemas/post";
import { Inter, Space_Grotesk } from "next/font/google";
import { MdUploadFile } from "react-icons/md";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Monaco, OnMount } from "@monaco-editor/react";
import CodeSnippet from "../CodeSnippet";
import { getLanguages } from "@/api/language";
import Select from "react-select";
import Creatable from "react-select/creatable";
import type { MultiValue } from "react-select";
import Switch from "../UI/Switch";
import { getTags } from "@/api/tag";
import type { Languages, Tag } from "@generated/prisma/client";
import { DevTool } from "@hookform/devtools";
import { createPostApi } from "@/api/postcode";
import { toast } from "react-toastify";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

//#region Dynamic Import
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
//#endregion

type SelectOption = {
  value: string;
  label: string;
};

const PostForm = () => {
  //#region React Hook form
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostReviewInput>({
    mode: "onTouched",
    resolver: zodResolver(PostSchema),
    defaultValues: {
      code: "",
      codefile: null,
      language: "",
      requireReview: true,
      inlineFeedback: true,
      draft: false,
      tags: [],
    },
  });

  //#endregion

  //#region State
  const [languages, setLanguages] = useState<Languages[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  //#endregion

  const uploadedCodeFile = useWatch({ control, name: "codefile" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLanguageChangeOnFileUpload = (filename: string) => {
    const extension = "." + filename.split(".")[1];
    const language = languages.find((lang) => lang.extension === extension);

    if (language) {
      setValue("language", language.name, {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
      handleLanguageChange(language.name);
    }
  };

  //#region Use Effects
  useEffect(() => {
    // fetch the languages
    getLanguages()
      .then(setLanguages)
      .catch((err) => {
        console.error("Failed to fetch languages:", err);
      });

    // fetch the tags
    getTags()
      .then(setTags)
      .catch((err) => {
        console.error("Failed to fetch tags:", err);
      });
  }, []);
  //#endregion

  //#region Monaco Editor
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount: OnMount = (_editor, monaco: Monaco) => {
    monacoRef.current = monaco;
  };

  const handleLanguageChange = (language: string) => {
    if (monacoRef.current) {
      monacoRef.current?.editor.setModelLanguage(
        monacoRef.current.editor.getModels()[0],
        language.toLowerCase(),
      );
    }
  };

  const handleCodeEditorValueChange = (value: string | undefined) => {
    setValue("code", String(value ?? ""), {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  //#endregion

  const languageOptions = languages.map((language) => ({
    value: language.name,
    label: language.name.toUpperCase(),
  }));

  const allowedExtensions = languages
    .map((language) => language.extension)
    .join(",");

  const tagOptions: SelectOption[] = tags.map((tag) => ({
    value: String(tag.id),
    label: tag.name,
  }));

  const getSelectedTagOptions = (selectedTags: string[] = []) =>
    selectedTags.map((tag) => {
      const selectedTagOption = tagOptions.find(
        (option) => option.value === tag,
      );

      return selectedTagOption ?? { value: tag, label: tag };
    });

  const onSubmit = (data: PostReviewInput) => {
    console.log("Form Data:", data);

    // Build the from data
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description ?? "");
    if (data.code) {
      formdata.append("code", data.code);
    }
    if (data.codefile) {
      formdata.append("codefile", data.codefile);
    }
    formdata.append("language", data.language);
    formdata.append("inlineFeedback", String(data.inlineFeedback));
    formdata.append("requireReview", String(data.requireReview));
    formdata.append("draft", String(data.draft));
    data.tags.forEach((tag) => {
      formdata.append("tags", tag);
    });

    // call the create post api
    createPostApi(formdata).then((response) => {
      // TODO: redirect to the newly created post
      if (response.status === "success") {
        toast.success("Post created Successfully");
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="mt-8">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("description")}
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
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex flex-row gap-1 py-1.5 text-sm px-4 rounded-2xl items-center bg-[#283349] ${inter.className} text-primary cursor-pointer hover:bg-[#283349]/80`}
                    >
                      <MdUploadFile size={20} />
                      <span className="ml-2 text-sm">UPLOAD FILE</span>
                    </button>
                  </div>
                </div>
                <Controller
                  name="codefile"
                  control={control}
                  render={({ field: { onChange, onBlur, ref, name } }) => (
                    <input
                      ref={(element) => {
                        ref(element);
                        fileInputRef.current = element;
                      }}
                      name={name}
                      accept={allowedExtensions}
                      type="file"
                      className="hidden"
                      onBlur={onBlur}
                      onChange={(event) => {
                        handleLanguageChangeOnFileUpload(
                          event.target.files?.[0]?.name ?? "",
                        );
                        onChange(event.target.files?.[0] ?? null);
                      }}
                    />
                  )}
                />
                {uploadedCodeFile && (
                  <p
                    className={`${inter.className} text-xs text-slate-300 mt-2`}
                  >
                    Selected file: {uploadedCodeFile.name}
                  </p>
                )}
                {(errors.code || errors.codefile) && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.code?.message ?? errors.codefile?.message}
                  </p>
                )}
                {/* Code Editor */}
                <CodeSnippet title="">
                  <Editor
                    className="mt-3"
                    height="300px"
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    defaultValue=""
                    onChange={handleCodeEditorValueChange}
                  />
                </CodeSnippet>
              </div>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className={`py-3 px-8 bg-linear-to-r from-primary to-primary-dark ${inter.className} cursor-pointer text-black text-sm rounded-md font-semibold uppercase`}
                >
                  Deploy to Hub
                </button>
              </div>
            </div>
            {/* Right Side */}
            <div
              className={`${inter.className} bg-[#1c2436] rounded-xl p-4 lg:w-96 w-full h-fit space-y-4`}
            >
              <h3
                className={`${space_grotesk.className} font-semibold text-sm text-primary tracking-wider mb-7`}
              >
                CONFIGURATION
              </h3>
              {/* Language Selection */}
              <div>
                <label
                  htmlFor="language"
                  className="uppercase text-slate-300 text-xs"
                >
                  LANGAUGE
                </label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select
                      inputId="language"
                      options={languageOptions}
                      value={
                        languageOptions.find(
                          (option) => option.value === field.value,
                        ) ?? null
                      }
                      onChange={(selectedOption) => {
                        const language = selectedOption?.value ?? "";
                        field.onChange(language);
                        handleLanguageChange(language);
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select a language"
                      unstyled
                      className={`mt-1 ${inter.className} text-sm`}
                      classNames={{
                        control: (state) =>
                          `bg-[#191f2c] text-white rounded-lg h-[35px] px-3 ${
                            state.isFocused
                              ? "ring-2 ring-primary outline-none"
                              : ""
                          }`,
                        valueContainer: () => "gap-2 py-0",
                        singleValue: () => "text-white",
                        placeholder: () => "text-slate-400",
                        input: () => "text-white",
                        indicatorsContainer: () => "text-slate-300",
                        indicatorSeparator: () => "hidden",
                        dropdownIndicator: () =>
                          "text-slate-300 hover:text-white",
                        clearIndicator: () => "text-slate-300 hover:text-white",
                        menu: () =>
                          "mt-2 overflow-hidden rounded-lg border border-slate-700 bg-[#191f2c] shadow-lg",
                        menuList: () => "py-1",
                        option: (state) =>
                          `cursor-pointer px-3 py-2 text-sm text-white ${
                            state.isFocused ? "bg-[#33415c]" : ""
                          } ${state.isSelected ? "bg-primary text-black" : ""}`,
                        noOptionsMessage: () => "px-3 py-2 text-slate-400",
                      }}
                    />
                  )}
                />
                {errors.language && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.language.message}
                  </p>
                )}
              </div>
              {/* Boolean Checks */}
              <div className="flex flex-row items-center justify-between gap-2">
                <label htmlFor="review" className="text-slate-300 text-sm">
                  Require Review
                </label>
                <Controller
                  name="requireReview"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="review"
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              {/* Inline Comments */}
              <div className="flex flex-row items-center justify-between gap-2">
                <label htmlFor="inline" className="text-slate-300 text-sm">
                  Enable Inline Comments
                </label>
                <Controller
                  name="inlineFeedback"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="inline"
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="text-slate-300 text-xs uppercase"
                >
                  Tags
                </label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Creatable
                      inputId="tags"
                      options={tagOptions}
                      value={getSelectedTagOptions(field.value)}
                      isMulti
                      isClearable
                      onChange={(selectedOption) => {
                        const selectedTags = (
                          selectedOption as MultiValue<SelectOption>
                        ).map((option) => option.value);
                        field.onChange(selectedTags);
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select tags"
                      unstyled
                      className={`mt-1 ${inter.className} text-sm`}
                      classNames={{
                        control: () =>
                          `bg-[#191f2c] text-white rounded-lg min-h-[35px] px-3`,
                        valueContainer: () => "gap-2 py-0",
                        multiValue: () => "bg-slate-300 px-2 py-1",
                        multiValueLabel: () =>
                          `text-xs text-black ${inter.className} uppercase`,
                        multiValueRemove: () => "text-black text-xs ps-1",
                        placeholder: () => "text-slate-400",
                        input: () => "text-white",
                        indicatorsContainer: () => "text-slate-300",
                        indicatorSeparator: () => "hidden",
                        dropdownIndicator: () =>
                          "text-slate-300 hover:text-white",
                        clearIndicator: () => "text-slate-300 hover:text-white",
                        menu: () =>
                          "mt-2 overflow-hidden rounded-lg border border-slate-700 bg-[#191f2c] shadow-lg",
                        menuList: () => "py-1",
                        option: (state) =>
                          `cursor-pointer px-3 py-2 text-sm text-white ${
                            state.isFocused ? "bg-[#33415c]" : ""
                          } ${state.isSelected ? "bg-primary text-black" : ""}`,
                        noOptionsMessage: () => "px-3 py-2 text-slate-400",
                      }}
                    />
                  )}
                />
                {errors.tags && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>
              {/* Draft */}
              <div className="flex flex-row items-center justify-between gap-2">
                <label htmlFor="draft" className="text-slate-300 text-sm">
                  Draft
                </label>
                <Controller
                  name="draft"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="draft"
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
