"use client";

import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormField from "@/components/auth/FormField";
import Divider from "../Divider";

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
  // TODO: use the react hook form for better form handling and validation
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("Registration successful. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${space_grotesk.className}`}>
      <div className="flex flex-col gap-5">
        <div className="space-y-3">
          <h2 className="text-gray-300 font-bold text-2xl">Create Your Account</h2>
          <h4 className={`${inter.className} text-gray-300 text-md font-light`}>
            Start Architecting better Software Today.
          </h4>
        </div>

        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="bg-[#232d44] cursor-pointer text-white px-6 py-4 w-full rounded-xl text-sm flex flex-row items-center justify-center gap-2"
            onClick={() => window.alert('Vendor login not implemented yet')}
          >
            <FaGoogle size={20} />
            Continue with Google
          </button>
        </div>

        <Divider text="OR USE CREDENTIALS" className={`${jetbrains_mono.className} text-gray-400 text-sm font-light tracking-widest`} />

        <form onSubmit={handleSubmit} className={`${inter.className} text-gray-400 space-y-5`}>
          <FormField
            label="FULL NAME"
            htmlFor="fullname"
            inputProps={{
              type: "text",
              name: "fullname",
              value: fullname,
              onChange: (evt) => setFullname(evt.target.value),
              placeholder: "Linus Torvalds",
            }}
          />

          <FormField
            label="USERNAME"
            htmlFor="username"
            inputProps={{
              type: "text",
              name: "username",
              value: username,
              onChange: (evt) => setUsername(evt.target.value),
              placeholder: "architect_01",
            }}
          />

          <FormField
            label="EMAIL"
            htmlFor="email"
            inputProps={{
              type: "email",
              name: "email",
              value: email,
              onChange: (evt) => setEmail(evt.target.value),
              placeholder: "dev@hub.io",
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
              <span>{isLoading ? "Creating account..." : "Create Account"}</span>
              <FaArrowRight className="inline-block" size={15} />
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}
        </form>

        <div className={`${inter.className} text-gray-400 text-sm text-center`}>
          <p className="space-x-1">
            <span>Already have an account?</span>
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
