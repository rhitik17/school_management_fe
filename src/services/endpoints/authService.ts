import { api } from "../api";

interface LoginData {
  email: string;
  password: string;
}

export const loginApi = async (formData: LoginData) => {
  try {
    const response = await api.post("login/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.get("logout/");
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export interface RegisterFormData {
  name: string;
  email: string;
  role: string;
  password: string;
  school: {
    name: string;
    establishedYear: string;
    schoolLogo: string;
  };
}

export const registerApi = async (formData: RegisterFormData) => {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
      role: "ADMIN",
    };
    const response = await api.post("signup/", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface OtpData {
  otp: string;
  userId?: string;
}

export const otpVerify = async (formData: OtpData) => {
  try {
    const response = await api.post("validate-otp/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const resendOtp = async (formData: any) => {
  try {
    const response = await api.post("/otpverify", formData, {});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createSchool = async (formData: any) => {
  try {
    const payload = {
      name: formData.schoolName,
      establishedYear: new Date(formData.establishedYear),
    };
    const response = await api.post("schools", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface ForgetPasswordData {
  input: string;
}

export const forgetPassowrd = async (formData: ForgetPasswordData) => {
  try {
    const payload ={
      email:formData.input,
    }
    const response = await api.post("forgot-password", payload, );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};



export const verifyForgotPasswordOTP = async (formData: OtpData) => {
  try {
    const response = await api.post("verify-forgot-password-otp", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};