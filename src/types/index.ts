export type RegisterResponse = {
  success: boolean;
  error?: string;
};

export type APIResponse<T = null> = {
  message: string;
  data?: T;
  status: "success" | "error" | "invalid";
};
