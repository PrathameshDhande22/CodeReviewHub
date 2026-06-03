"use client";

import { resetPasswordApi } from "@/api/auth";
import FormField from "@/components/auth/FormField";
import { resetPasswordSchema, type ResetPasswordInputs } from "@/schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter, Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

type ResetPasswordFormProps = {
  prefillEmail?: string;
};

const ResetPasswordForm = ({ prefillEmail = "" }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  //#region React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    shouldFocusError: true,
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: prefillEmail },
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    try {
      const result = await resetPasswordApi(data);
      if (result.status !== "success") {
        toast.error(result.message || "Failed to reset password");
        return;
      }
      toast.success("Password reset successfully! Please log in.");
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    }
  };
  //#endregion

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${inter.className} text-gray-400 space-y-5`}
    >
      <FormField
        label="EMAIL"
        htmlFor="email"
        inputProps={{
          type: "email",
          placeholder: "dev@codereview.hub",
          readOnly: !!prefillEmail,
          className: prefillEmail ? "opacity-60 cursor-not-allowed" : "",
        }}
        register={register("email")}
        extra={
          <div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        }
      />

      <FormField
        label="RESET CODE"
        htmlFor="otp"
        inputProps={{
          type: "text",
          placeholder: "123456",
          maxLength: 6,
        }}
        register={register("otp")}
        extra={
          <div>
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>
        }
      />

      <FormField
        label="NEW PASSWORD"
        htmlFor="password"
        inputProps={{
          type: showPassword ? "text" : "password",
          placeholder: "••••••••",
        }}
        register={register("password")}
        extra={
          <>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <MdOutlineVisibilityOff size={20} />
              ) : (
                <MdOutlineVisibility size={20} />
              )}
            </button>
            <div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </>
        }
      />

      <FormField
        label="CONFIRM PASSWORD"
        htmlFor="confirmPassword"
        inputProps={{
          type: showConfirm ? "text" : "password",
          placeholder: "••••••••",
        }}
        register={register("confirmPassword")}
        extra={
          <>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirm ? (
                <MdOutlineVisibilityOff size={20} />
              ) : (
                <MdOutlineVisibility size={20} />
              )}
            </button>
            <div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </>
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold disabled:opacity-50`}
      >
        <span>{isSubmitting ? "Resetting..." : "Reset Password"}</span>
        <FaArrowRight className="inline-block" size={15} />
      </button>
    </form>
  );
};

export default ResetPasswordForm;
