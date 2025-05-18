"use client";
import FormInput from "../../components/common/FormInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgetPassowrd } from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";
import Button from "../../components/common/Button";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    input: "",
  });

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

      toast.success(response.message);
      router(`/otp-verify/${response?.data?.id}`);
    } catch (error: any) {
      toast.error(
        error?.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col gap-8 items-center justify-center h-screen">
        <Icons.Lock className="border border-gray-200 h-12 w-12 p-2 rounded-lg text-gray-600 shadow-md" />
        {/* Welcome Section */}
        <div className="w-full flex flex-col justify-center items-center gap-3">
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
          className="w-full flex flex-col gap-4 max-w-sm bg-white"
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
            className="h-11 w-full flex items-center justify-center"
            disable={loading}
            loading={loading}
            variant="primary"
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className="text-sm text-gray-600 flex flex-row justify-center items-center gap-2">
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
