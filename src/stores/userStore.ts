import { create } from "zustand";
//@ts-ignore
import Cookies from "js-cookie";
import { Session } from "../types/commonTypes";

// Cookie name
const AUTH_COOKIE_NAME = "auth_data";

// Define the user data shape based on your exact API response
interface UserData {
  id: string | null;
  otp_verified: string;
  user_type: string | null;
  email: string | null;
  permissions: string[] | null;
  access: string;
  refresh: string;
  active_session:Session | null;
}

interface UserStore {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  setActiveSession: (session: Session | null) => void;
  clearUserData: () => void;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
  getUser: () => UserData | null;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<UserStore>()((set, get) => ({
  userData:
    Cookies.get(AUTH_COOKIE_NAME) &&
    Cookies.get(AUTH_COOKIE_NAME) !== "undefined"
      ? JSON.parse(Cookies.get(AUTH_COOKIE_NAME)!)
      : null,

  // Set auth data
  setUserData: (data) => {
    set({ userData: data });
    Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(data), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  },

  // Set active session
  setActiveSession: (session) => {
    const currentData = get().userData;
    if (!currentData) return;

    const updatedData = { ...currentData, active_session: session };

    set({ userData: updatedData });
    Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(updatedData), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  },

  // Clear auth data
  clearUserData: () => {
    set({ userData: null });
    Cookies.remove(AUTH_COOKIE_NAME);
  },

  // Helpers
  getAccessToken: () => get().userData?.access,
  getRefreshToken: () => get().userData?.refresh,
  getUser: () => get().userData,
  isAuthenticated: () => {
    const data = get().userData;
    return !!data?.access && !!data?.id;
  },
}));
