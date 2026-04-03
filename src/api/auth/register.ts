import { type RegisterInputs } from "@/schemas/register";
import { RegisterResponse } from "@/types";

export async function registerUser(data: RegisterInputs) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result: RegisterResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Registration failed");
  }

  return result;
}
