"use client";

import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/auth/FormField";
import Divider from "../Divider";
import { registerUser } from "@/api/auth/register";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type RegisterInputs } from "@/schemas/register";
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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  //#region React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    shouldFocusError: true,
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInputs) => {
    try {
      const result = await registerUser(data);
      router.push("/login");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
    }
  };
  //#endregion

  return (
    <div className={`${space_grotesk.className}`}>
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <h2 className="text-gray-300 font-bold text-2xl">
            Create Your Account
          </h2>
          <h4 className={`${inter.className} text-gray-300 text-md font-light`}>
            Start Architecting better Software Today.
          </h4>
        </div>

        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="bg-[#232d44] cursor-pointer text-white px-6 py-4 w-full rounded-xl text-sm flex flex-row items-center justify-center gap-2"
            onClick={() => signIn("google")}
          >
            <FaGoogle size={20} />
            Continue with Google
          </button>
        </div>

        <Divider
          text="OR USE CREDENTIALS"
          className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${inter.className} text-gray-400 space-y-3`}
        >
          <FormField
            label="FULL NAME"
            htmlFor="fullname"
            inputProps={{
              type: "text",
              placeholder: "Linus Torvalds",
            }}
            register={register("fullname")}
            extra={
              <div>
                {errors.fullname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
            }
          />

          <FormField
            label="USERNAME"
            htmlFor="username"
            inputProps={{
              type: "text",
              placeholder: "architect_01",
            }}
            register={register("username")}
            extra={
              <div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            }
          />

          <FormField
            label="EMAIL"
            htmlFor="email"
            inputProps={{
              type: "email",
              placeholder: "dev@hub.io",
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
              className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold cursor-pointer`}
            >
              <span>Create Account</span>
              <FaArrowRight className="inline-block" size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
