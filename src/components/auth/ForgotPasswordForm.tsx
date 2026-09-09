"use client";

import FormField from "@/components/auth/FormField";
import { forgotPasswordApi } from "@/api/auth";
import {
  forgotPasswordSchema,
  OTP_EXPIRY_MINUTES,
  type ForgotPasswordInputs,
} from "@/schemas/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { toast } from "react-toastify";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

const ForgotPasswordForm = () => {
  const [sentTo, setSentTo] = useState<string | null>(null);

  //#region React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    shouldFocusError: true,
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInputs) => {
    try {
      const result = await forgotPasswordApi(data);
      if (result.status !== "success") {
        toast.error(result.message || "Failed to process password reset");
        return;
      }
      setSentTo(data.email);
    } catch {
      toast.error("Something went wrong");
    }
  };
  //#endregion

  if (sentTo) {
    return (
      <div className={`${inter.className} space-y-5`}>
        <div className="bg-[#1c2436] rounded-xl p-6 text-center border border-primary/20">
          <MdOutlineMarkEmailRead
            size={40}
            className="text-primary mx-auto mb-3"
          />
          <p className="text-gray-400 text-sm">We sent a 6-digit reset code to</p>
          <p className="text-white font-medium break-all mt-1">{sentTo}</p>
          <p className="text-gray-500 text-xs mt-3">
            The code expires in {OTP_EXPIRY_MINUTES} minutes
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <p className="text-yellow-400 text-xs text-center">
            Not in your inbox? Check the spam folder before requesting a new
            code.
          </p>
        </div>

        <Link
          href={`/reset-password?email=${encodeURIComponent(sentTo)}`}
          className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark flex items-center justify-center space-x-3 font-bold`}
        >
          <span>Continue to Reset Password</span>
          <FaArrowRight size={15} />
        </Link>

        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="w-full text-gray-400 text-sm hover:text-primary"
        >
          Use a different email
        </button>
      </div>
    );
  }

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

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold disabled:opacity-50`}
      >
        <span>{isSubmitting ? "Sending code..." : "Send Reset Code"}</span>
        <FaArrowRight className="inline-block" size={15} />
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
