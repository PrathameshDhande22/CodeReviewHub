"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import FormField from "@/components/auth/FormField";
import Divider from "../Divider";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login";
import { type LoginInputs } from "@/schemas/login";
import { toast } from "react-toastify";

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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  //#region React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    shouldFocusError: true,
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInputs) => {
    const result = await signIn("CodeReviewLogin", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success("Login successful!");
    router.push("/");
  };
  //#endregion

  return (
    <div className="">
      <div className="space-y-5">
        {/* Login Form */}
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

          <FormField
            label="PASSWORD"
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

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold disabled:opacity-50`}
            >
              <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
              <FaArrowRight className="inline-block" size={15} />
            </button>
          </div>
        </form>

        {/* Divider */}
        <Divider
          className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`}
          text="OR CONTINUE WITH"
        />

        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="bg-[#232d44] text-white px-6 py-4 w-full rounded-xl text-sm flex flex-row items-center justify-center gap-2 cursor-pointer"
            onClick={() => signIn("google")}
          >
            <FaGoogle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
