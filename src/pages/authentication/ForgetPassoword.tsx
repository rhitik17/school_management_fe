"use client";
import FormInput from "../../components/common/FormInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgetPassowrd } from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../stores/userStore";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    input: "",
  });

  //@ts-ignore
  const { userData, setUserData } = useAuthStore();

  const router = useNavigate();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors: any = {};
    if (!formData.input) {
      errors.input = "Email or Phone is required.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await forgetPassowrd(formData);

      toast.success(response?.data?.message);

      // setUserData({
      //   id: response.User_id || null,
      //   otp_verified: userData?.otp_verified ?? "",
      //   user_type: userData?.user_type ?? null,
      //   email: userData?.email ?? null,
      //   permissions: userData?.permissions ?? [],
      //   access: userData?.access ?? null,
      //   refresh: userData?.refresh ?? null,
      // });
      router(`/otp-verify/${response?.user_id}`);
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-xl gap-8">
        <Icons.Lock className="w-12 h-12 p-2 text-gray-600 border border-gray-200 rounded-lg shadow-md" />
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Forgot Password?
          </h2>
          <p className="text-base text-gray-600">
            No worries,we'll send you reset instructions.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-sm gap-4 bg-white"
        >
          <FormInput
            label="Email / Phone"
            name="input"
            type="text"
            placeholder="Enter your email"
            value={formData.input}
            onChange={handleInputChange}
            InputClassName="h-11"
            required={true}
            error={errors?.input}
          />

          <Button
            text="Reset Password"
            className="flex items-center justify-center w-full h-11"
            disable={loading}
            loading={loading}
            variant="primary"
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className="flex flex-row items-center justify-center gap-2 text-sm text-gray-600">
          <a href="/login">
            <Icons.ArrowRight className="rotate-180" />
          </a>
          <span className="font-semibold"> Back to Login</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
