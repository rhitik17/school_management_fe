import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../stores/userStore";
import PasswordInput from "../../components/common/PasswordInput";

interface OtpFormData {
  password: string;
  confirmPassword?: string;
}

const SetNewPassword = () => {
  const [formData, setFormData] = useState<OtpFormData>({
    password: "",
    confirmPassword: "",
  });

  const { input } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { userData, setUserData } = useAuthStore();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;
    const newErrors: any = {};

    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm password.";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must include a special character.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        user_id: Number(userData?.id),
        otp_id: Number(input),
        password: formData.password,
      };

      const response = await resetPassword(payload);
      if (response) {
        toast.success(response.message);
        setUserData(response);
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const rules = [
    "Must be at least 8 characters",
    "Must contain one special character",
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-xl gap-8">
        {/* Heading */}
        <div className="w-full space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Set New Password
          </h2>
          <p className="text-base text-gray-600">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 bg-white"
        >
          <PasswordInput
            label="Password"
            name="password"
         
            placeholder=""
            onChange={handleInputChange}
            InputClassName="h-11"
            required
            error={errors?.password}
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
         
            placeholder=""
            onChange={handleInputChange}
            InputClassName="h-11"
            required
            error={errors?.confirmPassword}
          />

          {/* Password rules */}
          {rules.map((rule, index) => (
            <p
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                readOnly
                checked={
                  rule.includes("8 characters")
                    ? formData.password.length >= 8
                    : /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                }
                className="w-4 h-4"
              />
              <span>{rule}</span>
            </p>
          ))}

          <Button
            text="Reset Password"
            className="flex items-center justify-center w-full text-center h-11"
            disable={loading}
            loading={loading}
            variant="primary"
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <a href="/login">
            <Icons.ArrowRight className="rotate-180" />
          </a>
          <span className="font-semibold">Back to Login</span>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
