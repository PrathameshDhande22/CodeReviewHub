"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import FormField from "@/components/auth/FormField";
import Divider from "../Divider";
import { signIn } from "next-auth/react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (!result?.ok) {
      setError(result?.error ?? "Invalid credentials");
      return;
    }

    router.push("/");
  };

  return (
    <div className="">
      <div className="space-y-5">
        {/* Login Form */}
        <form onSubmit={handleSubmit} className={`${inter.className} text-gray-400 space-y-5`}>
          <FormField
            label="EMAIL"
            htmlFor="email"
            inputProps={{
              type: "email",
              name: "email",
              value: email,
              onChange: (evt) => setEmail(evt.target.value),
              placeholder: "dev@codereview.hub",
            }}
          />

          <FormField
            label="PASSWORD"
            htmlFor="password"
            inputProps={{
              type: showPassword ? "text" : "password",
              name: "password",
              value: password,
              onChange: (evt) => setPassword(evt.target.value),
              placeholder: "••••••••",
            }}
            extra={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineVisibility size={20} />}
              </button>
            }
          />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${space_grotesk.className} text-black w-full py-4 rounded-xs bg-linear-to-r from-primary to-primary-dark space-x-3 font-bold`}
            >
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              <FaArrowRight className="inline-block" size={15} />
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
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
