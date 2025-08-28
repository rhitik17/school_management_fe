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

interface EmailState {
  email: string | null;
  password: string | null;
  setEmail: (email: string | null) => void;
  setPassword: (password: string | null) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  email: null,
  setEmail: (email: string | null) => set({ email }),
  password: null,
  setPassword: (password: string | null) => set({ password }),
}));

