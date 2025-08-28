import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icons } from "../../assets/icons";
import { toast } from "react-toastify";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import { useAuthStore } from "../../stores/userStore";
import CustomDropdown from "../common/CustomSelect";
import { listPost, switchSession } from "../../services/endpoints/postApi";
import { Session } from "../../types/commonTypes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionOptions, setSessionOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { userData, setUserData, clearUserData, setActiveSession } =
    useAuthStore();
  const token = userData?.access;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingSessions(true);
      const res = await listPost(`/academic-sessions`);
      const results = res?.data?.results || [];
      setSessions(results);
      setSessionOptions(
        results.map((item: any) => ({
          value: item.id.toString(),
          label: item.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingSessions(false);
    }
  };

  // switch session
  const handleSwitchSession = async (value: string | string[]) => {
    try {
      const payload = {
        session_id: Number(value),
      };
      const res = await switchSession(payload);
      if (res.code === 200) {
        const selectedSession = sessions?.find(
          (item) => item.id === Number(value)
        );

        if (selectedSession) {
          setActiveSession(selectedSession);
        }
        navigate(0);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.detail || error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
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
      // const response = await logout();
      // console.log(response);
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
    <header className="flex items-center justify-between h-20 pr-8 text-red-600 bg-primary_bg">
      <div className="w-3/12">
        <FormInput
          className="w-full border-0 outline-none"
          InputClassName="border-0 px-2"
          placeholder="Search..."
          iconPosition="start"
        >
          <Icons.Search className="ml-2" />
        </FormInput>
      </div>

      {/* switch Academic session */}
      <div className="min-w-40">
        <CustomDropdown
          label="Current Session"
          options={sessionOptions}
          value={String(userData?.active_session?.id)}
          onChange={(value) => handleSwitchSession(value)}
          placeholder={loadingSessions ? "..." : "Select Session"}
          dropDownClass="w-full"
        />
      </div>
      <div className="flex items-center justify-end">
        {token ? (
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <button
              type="button"
              className="relative p-2 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Icons.Contact className="w-5 h-5 text-gray-600" />
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
              <Icons.Mail className="w-5 h-5 text-gray-600" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </button>

            <div className="relative p-1 border rounded-full" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 bg-white border-0 rounded-full hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <span className="text-sm font-medium text-gray-600">
                    {userData?.email?.split("@")[0].slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.email}
                  </p>
                  <p className="text-xs text-gray-500">{userData?.user_type}</p>
                </div>
              </button>

              {isOpen && (
                <div className="absolute right-0 z-40 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    type="button"
                    onClick={handleProfile}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  >
                    <Icons.User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  >
                    <Icons.FileUpload className="w-4 h-4 -rotate-90" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button
            text="Login"
            variant="primary"
            action={() => navigate("/login")}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
