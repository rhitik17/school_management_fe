import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEmailStore } from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../services/endpoints/authService";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/common/PasswordInput";
import CustomDropdown from "../../components/common/CustomSelect";
import Button from "../../components/common/Button";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "super_admin" },
  { label: "Teacher", value: "teacher" },
  { label: "Accountant", value: "accountant" },
  { label: "Reception", value: "reception" },
];

interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const { email, setEmail, setPassword } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const response = await registerApi(data); // payload matches API
      setEmail(data.email);
      setPassword(data.password)
      toast.success(response.message);
      router("/otp-verify");
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.detail || error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-full max-w-lg p-6 space-y-8 bg-white shadow-lg rounded-xl sm:p-8 md:p-10">
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <h2 className="text-3xl font-semibold text-zinc-900">Register</h2>
          <p className="text-base text-gray-600">
            Sign up has never been this easy
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4 bg-white"
        >
          <Controller
            name="full_name"
            control={control}
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={field.value}
                onChange={field.onChange}
                InputClassName="h-11"
                required
                error={errors.full_name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
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
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <PasswordInput
                label="Password"
                placeholder="*******"
                onChange={field.onChange}
                InputClassName="h-11"
                required
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <CustomDropdown
                label="Role"
                options={roleOptions}
                placeholder="Select Role"
                value={field.value}
                onChange={field.onChange}
                dropDownClass="w-full"
                required
                error={errors.role?.message}
              />
            )}
          />

          <Button
            text="Get started"
            className="flex items-center justify-center w-full text-center h-11"
            disable={loading}
            loading={loading}
            variant="primary"
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-gray-800">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
