export type RegisterResponse = {
  success: boolean;
  error?: string;
};

export type APIResponse<T> = {
  message: string;
  data?: T;
  status: "success" | "error" | "invalid";
};
