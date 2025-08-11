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

// ------------------> Types <--------------------------
export interface RegisterFormData {
  full_name: string;
  email: string;
  role: string;
  password: string;
}

// ------------------> Register API <--------------------------
export const registerApi = async (formData: RegisterFormData) => {
  try {
  

    const response = await api.post("auth/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


//------------------> OTP Verify API <--------------------------
interface OtpData {
  otp: string;

}

export const otpVerify = async (formData: OtpData) => {
  try {
    const response = await api.post("auth/verify-otp/", formData);
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

interface OtpData {
  otp: string;
  email:string | null;

}

export const verifyPasswordResetOtp = async (formData: OtpData) => {
  try {
    const response = await api.post("auth/verify-password-reset-otp/", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface ResetPasswordData {
 email:string | null;
  new_password:string;
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



