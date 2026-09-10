import { RegisterInputs } from "@/schemas/register";
import {
  ChangePasswordInputs,
  ForgotPasswordInputs,
  ResetPasswordInputs,
} from "@/schemas/password";
import { APIResponse, RegisterResponse } from "@/types";

export async function registerApi(data: RegisterInputs): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function forgotPasswordApi(
  data: ForgotPasswordInputs,
): Promise<APIResponse> {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function resetPasswordApi(
  data: ResetPasswordInputs,
): Promise<APIResponse> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function changePasswordApi(
  data: ChangePasswordInputs,
): Promise<APIResponse> {
  const response = await fetch("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}
