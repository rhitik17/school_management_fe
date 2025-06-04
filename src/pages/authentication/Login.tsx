import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useAuthStore,
  useEmailStore,
} from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/common/PasswordInput";
import { loginApi } from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import Button from "../../components/common/Button";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { email } = useEmailStore();
  const navigate = useNavigate();
  const {setUserData } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Pre-fill email if available in the store
  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginApi(data);

      if (response) {
        toast.success(response.message);
        setUserData(response.results);
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Invalid response from server");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl">
        <div className="p-6 space-y-8 sm:p-8 md:p-10">
          {/* Welcome Section */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome back
            </h2>
            <p className="text-base text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={field.value}
                  onChange={field.onChange}
                  InputClassName="h-11"
                  required
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={field.value}
                  onChange={field.onChange}
                  InputClassName="h-11"
                  required
                  error={errors.password?.message}
                />
              )}
            />

            <div className="flex items-center justify-end">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                Forgot password?
              </a>
            </div>

            <Button
              text="Sign In"
              className="w-full text-base font-semibold h-11"
              disable={isSubmitting}
              loading={isSubmitting}
              variant="primary"
              loadingPosition="back"
            />
          </form>

          {/* Footer */}
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-gray-900 transition-colors hover:text-gray-700"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
