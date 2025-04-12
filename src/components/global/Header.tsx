import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LanguageSwitcher from "./LanguageSwitcher";
import { useAuthStore } from "../../stores/tokenStore";
import { Icons } from "../../assets/icons";
import { logout } from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import FormInput from "../common/FormInput";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { userData, setUserData, clearUserData } = useAuthStore();
  const token = userData?.access_token;

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      console.log(response);
      toast.success("Logout Successfully!");
      setUserData(null);
      clearUserData();
      setIsOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [navigate, setUserData]);

  const handleProfile = useCallback(() => {
    try {
      setIsOpen(false);
      navigate("/profile");
    } catch (error) {
      console.error("Profile navigation error:", error);
    }
  }, [navigate]);

  return (
    <header className="h-20  bg-primary_bg text-red-600 flex items-center justify-between  pr-8">
      <div className="w-3/12">
        <FormInput
          className="border-0 outline-none w-full"
          InputClassName="border-0 px-2"
          placeholder="Search..."
          iconPosition="start"
        >
          <Icons.Search className="ml-2"/>
        </FormInput>
      </div>
      <div className="flex  items-center justify-end">
        {token ? (
          <div className="flex items-center gap-4">
            {/* <LanguageSwitcher /> */}

            <button
              type="button"
              className="relative p-2 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Icons.Contact className="h-5 w-5 text-gray-600" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </button>

            <button
              type="button"
              className="relative p-2 hover:bg-gray-100"
              aria-label="Notifications"
              onClick={() => navigate("/mail")}
            >
              <Icons.Mail className="h-5 w-5 text-gray-600" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </button>

            <div className="relative border  rounded-full p-1" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 border-0 bg-white p-2 hover:bg-gray-50 rounded-full"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-sm font-medium text-gray-600">
                    {userData?.user?.email
                      ?.split("@")[0]
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.user?.role}
                  </p>
                </div>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-40">
                  <button
                    type="button"
                    onClick={handleProfile}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icons.User className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icons.FileUpload className="h-4 w-4 -rotate-90" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mr-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
