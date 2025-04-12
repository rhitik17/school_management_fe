import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//@ts-ignore
import Cookies from "js-cookie";

interface TokenState {
  token: string | null;
  setToken: (token: string | null) => void;
  language: string | null;
  setLanguage: (token: string | null) => void;
}

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      language: null,

      setToken: (token) => set({ token }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "school",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useTokenStore;

// Types
interface User {
  id?: string;
  email?: string;
  schoolId?: string | null;
  isOtpVerified?: boolean;
  role?: string;
}

interface UserData {
  id: string;
  access_token: string;
  refresh_token: string;
  user: User;
}

interface UserStore {
  userData: UserData | null;
  setUserData: (data: Partial<UserData | null>) => void;
  clearUserData: () => void;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
  getUser: () => User | undefined;
  isAuthenticated: () => boolean;
}

// Cookie name constant
const AUTH_COOKIE_NAME = "auth_data";

export const useAuthStore = create<UserStore>()((set, get) => ({
  userData: Cookies.get(AUTH_COOKIE_NAME)
    ? JSON.parse(Cookies.get(AUTH_COOKIE_NAME)!)
    : null,

  // Set auth data (partial update supported)
  setUserData: (data) => {
    const currentData = get().userData;
    const updatedData = currentData
      ? {
          ...currentData,
          ...data,
          user: {
            ...currentData.user,
            ...data?.user,
          },
        }
      : {
          id: "",
          access_token: "",
          refresh_token: "",
          user: {
            id: "",
            email: "",
            schoolId: "",
            isOtpVerified: false,
            role: "",
          },
          ...data,
        };

    set({ userData: updatedData as UserData });
    Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(updatedData), {
      expires: 7, // Expires in 7 days
      secure: true,
      sameSite: "strict",
    });
  },

  // Clear all auth data
  clearUserData: () => {
    set({ userData: null });
    Cookies.remove(AUTH_COOKIE_NAME);
  },

  // Helper getters
  getAccessToken: () => get().userData?.access_token,
  getRefreshToken: () => get().userData?.refresh_token,
  getUser: () => get().userData?.user,

  // Authentication check
  isAuthenticated: () => {
    const userData = get().userData;
    return !!userData?.access_token && !!userData.user?.id;
  },
}));

interface EmailState {
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  email: null,
  setEmail: (email: string | null) => set({ email }),
}));
