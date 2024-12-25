import axiosWithConfig from "./axiosWithConfig";
import type {
  ListUserResponse,
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from "./types";

export const loginApi = async (
  body: LoginBody
): Promise<LoginResponse> => {
  try {
    const response = await axiosWithConfig.post("/login", body);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const registerApi = async (
  body: RegisterBody
): Promise<RegisterResponse> => {
  try {
    const response = await axiosWithConfig.post("/register", body);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getListUserApi = async (
  page: number
): Promise<ListUserResponse> => {
  try {
    const response = await axiosWithConfig.get(
      `https://reqres.in/api/users?page=${page}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
