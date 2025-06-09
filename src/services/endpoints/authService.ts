import { api } from "../api";


//------------------> Login API <--------------------------
interface LoginData {
  email: string;
  password: string;
}

export const loginApi = async (formData: LoginData) => {
  try {
    const response = await api.post("auth/login/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


//------------------> Logout API <--------------------------
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

//------------------> Register API <--------------------------
export const registerApi = async (formData: RegisterFormData) => {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
      role: "ADMIN",
    };
    const response = await api.post("auth/signup/", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

//------------------> OTP Verify API <--------------------------
interface OtpData {
  otp: string;
  userId?: string;
}

export const otpVerify = async (formData: OtpData) => {
  try {
    const response = await api.post("auth/validate-otp/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const resendOtp = async (formData: any) => {
  try {
    const response = await api.post("/resend-otp/", formData, {});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

//------------------> Create School API <--------------------------
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

//------------------> Password Reset API <--------------------------
interface ForgetPasswordData {
  input: string;
}

export const forgetPassowrd = async (formData: ForgetPasswordData) => {
  try {
    const payload ={
      email:formData.input,
    }
    const response = await api.post("auth/request-password-reset/", payload, );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface ResetPasswordData {
  user_id: number;
  otp_id:number;
  password:string;
}

export const resetPassword = async (payload: ResetPasswordData) => {
  try {
  
    const response = await api.post("auth/reset-password/", payload, );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};



//------------------> Verify Forgot Password OTP API <--------------------------
export const verifyForgotPasswordOTP = async (formData: OtpData) => {
  try {
    const response = await api.post("auth/verify-forgot-password-otp/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};