import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  forgetPassowrd,
  resendOtp,
} from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import FormInput from "../../components/common/FormInput";
import { Icons } from "../../assets/icons";
import Button from "../../components/common/Button";

interface OtpFormData {
  otp: string[];
  password: string;
}

const SetNewPassoword = () => {
  const [formData, setFormData] = useState<OtpFormData>({
    otp: Array(6).fill(""),
    password: "",
  });
  const { input } = useParams();
  const decodedInput =
    typeof input === "string" ? decodeURIComponent(input) : "";
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [resendTimer, setResendTimer] = useState(0);

  const router = useNavigate();

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //to handle change for otp input
  // @ts-ignore
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedOtp = [...prev.otp];
      updatedOtp[index] = value.slice(0, 1);
      return { ...prev, otp: updatedOtp };
    });

    // Move focus to next input
    if (value !== "" && index < formData.otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // @ts-ignore
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && formData.otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const validateForm = () => {
    const { password, otp } = formData;
    let errors: any = {};

    // Validate Permanent Address
    if (!password) errors.password = "Password is required.";
    if (!otp || otp.some((otpValue) => otpValue === ""))
      errors.otp = "OTP is required.";

    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const otp = formData.otp.join("");

    try {
      const payload = {
        input: decodedInput,
        otp: otp,
        password: formData.password,
      };
      const response = await forgetPassowrd(payload);

      if (response?.message) {
        toast.success(response.message);
        router("/login");
      }
    } catch (err: any) {
      toast.error(
        err?.message || "Failed to verify your details. Please try again."
      );
    } finally {
      setLoading(false);
    }

    console.log(errors);
  };

  //resend otp
  // @ts-ignore
  const handleResendCode = async () => {
    try {
      const payload = {
        otp: decodedInput,
      };
      const response = await resendOtp(payload);
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to verify OTP. Please try again.");
    }
    setResendTimer(30);
  };

  // @ts-ignore
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    // @ts-ignore
    index: number
  ) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setFormData((prev) => ({
        ...prev,
        otp: newOtp,
      }));

      // @ts-ignore
      newOtp.forEach((digit, index) => {
        document.getElementById(`otp-${index}`)?.focus();
      });
    }
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-xl gap-8 ">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center w-full gap-3 text-center ">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Set new Password
          </h2>
          <p className="text-base text-gray-600">
            Your new passowrd must be different from previous used passwords.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4 bg-white "
        >
          <div className="flex flex-col gap-4">
            <FormInput
              label="Enter your OTP code"
              name="otp"
              type="text"
              placeholder=""
              onChange={handleInputChange}
              InputClassName="h-11"
              required={true}
              error={errors?.otp}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder=""
              onChange={handleInputChange}
              InputClassName="h-11"
              required={true}
              error={errors?.password}
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder=""
              onChange={handleInputChange}
              InputClassName="h-11"
              required={true}
              error={errors?.confirmPassword}
            />
          </div>

          <p className="flex flex-row items-center justify-start gap-2">
            <FormInput
              type="checkbox"
              className="p-1 text-white bg-gray-300 rounded-full"
            />
            <span>Must be at least 8 characters</span>{" "}
          </p>
          <p className="flex flex-row items-center justify-start gap-2">
            <FormInput
              type="checkbox"
              className="p-1 text-white bg-gray-300 rounded-full"
            />{" "}
            <span> Must contain one special character</span>
          </p>

          {/* otp resend */}
          {/* <div className="flex items-center justify-end ">
                        <div className="flex items-center justify-end w-full">
                            <button
                                type="button"
                                className="text-sm text-red-600 hover:text-red-500"
                                onClick={handleResendCode}
                                disabled={resendTimer > 0}
                            >
                                Resend OTP{resendTimer > 0 && ` (${resendTimer}s)`}
                            </button>
                        </div>
                    </div> */}

          {/* Sign In Button */}

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

export default SetNewPassoword;
