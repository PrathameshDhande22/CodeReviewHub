"use client";

import { updateProfileApi } from "@/api/profile";
import FormField from "@/components/auth/FormField";
import { updateProfileSchema, type UpdateProfileInputs } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
//#endregion

const FALLBACK_AVATAR =
  "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=architect01";

type Props = {
  currentName?: string | null;
  currentImage?: string | null;
  standalone?: boolean;
};

const UpdateProfileModal = ({
  currentName,
  currentImage,
  standalone = false,
}: Props) => {
  const router = useRouter();
  const { update } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage ?? null,
  );

  const nameParts = (currentName ?? "").trim().split(" ");
  const defaultFirstName = nameParts[0] ?? "";
  const defaultLastName = nameParts.slice(1).join(" ");

  //#region React Hook Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInputs>({
    shouldFocusError: true,
    mode: "onTouched",
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      image: null,
    },
  });

  const watchedImage = useWatch({ control, name: "image" });

  const onSubmit = async (data: UpdateProfileInputs) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    if (data.image) {
      formData.append("image", data.image);
    }

    const result = await updateProfileApi(formData);

    if (result.status !== "success") {
      toast.error(result.message);
      return;
    }

    await update();
    toast.success("Profile updated successfully");
    router.back();
  };
  //#endregion

  const formContent = (
    <div
      className={`${inter.className} w-full max-w-md bg-[#0d1424]/95 border border-white/8 rounded-xl p-6 sm:p-8 space-y-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`${jetbrains_mono.className} text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1`}
          >
            Edit Profile
          </p>
          <h2
            className={`${space_grotesk.className} text-xl font-bold text-slate-200`}
          >
            Update your profile
          </h2>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Avatar upload */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-600/50 bg-[#1a2438] cursor-pointer hover:border-slate-400/60 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={imagePreview ?? FALLBACK_AVATAR}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`${jetbrains_mono.className} text-[11px] uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors`}
        >
          Change Photo
        </button>

        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, onBlur, ref, name } }) => (
            <input
              ref={(element) => {
                ref(element);
                fileInputRef.current = element;
              }}
              name={name}
              type="file"
              accept="image/png"
              className="hidden"
              onBlur={onBlur}
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                onChange(file);
                if (file) setImagePreview(URL.createObjectURL(file));
              }}
            />
          )}
        />

        {watchedImage && (
          <p className={`${inter.className} text-xs text-slate-300`}>
            {watchedImage.name}
          </p>
        )}

        {errors.image && (
          <p className="text-red-500 text-xs">{errors.image.message as string}</p>
        )}

        <p
          className={`${jetbrains_mono.className} text-[10px] text-slate-500 tracking-wide`}
        >
          PNG only · max 2 MB
        </p>
      </div>

      {/* Name fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="FIRST NAME"
          htmlFor="firstName"
          inputProps={{ type: "text", placeholder: "Linus" }}
          register={register("firstName")}
          extra={
            <div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          }
        />

        <FormField
          label="LAST NAME"
          htmlFor="lastName"
          inputProps={{ type: "text", placeholder: "Torvalds" }}
          register={register("lastName")}
          extra={
            <div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          }
        />

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className={`${space_grotesk.className} flex-1 py-3 rounded-lg border border-slate-600/50 text-slate-300 text-sm font-medium hover:bg-slate-700/30 transition-colors cursor-pointer`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${space_grotesk.className} flex-1 py-3 rounded-lg bg-linear-to-r from-primary to-primary-dark text-black text-sm font-bold disabled:opacity-50 cursor-pointer`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );

  if (standalone) {
    return formContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {formContent}
    </div>
  );
};

export default UpdateProfileModal;
