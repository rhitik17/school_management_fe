import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useTokenStore, {
  useAuthStore,
  useEmailStore,
} from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  registerApi,
  RegisterFormData,
} from "../../services/endpoints/authService";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/common/PasswordInput";
import CustomDropdown from "../../components/common/CustomSelect";
import Button from "../../components/common/Button";

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Teacher", value: "TEACHER" },
  { label: "Accountant", value: "ACCOUNTANT" },
  { label: "Reception", value: "RECEPTION" },
];

const Register = () => {
  const { email, setEmail } = useEmailStore();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const { setToken } = useTokenStore();
  const { userData, setUserData } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      school: {
        name: "",
        establishedYear: "",
        schoolLogo: "",
      },
    },
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const response = await registerApi(data);
      setEmail(data.email);
      setUserData({
        ...userData,
        user: {
          ...userData?.user,
          id: response.userId,
        },
      });
      toast.success(response.message);

      router("/otp-verify");
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-8">
        {/* Welcome Section */}
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <h2 className="text-3xl font-semibold text-zinc-900">Register</h2>
          <p className="text-base text-gray-600">
            Sign up has never been this easy
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 bg-white"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormInput
                label="Name"
                type="text"
                placeholder=""
                value={field.value}
                onChange={field.onChange}
                InputClassName="h-11"
                required={true}
                error={errors.name?.message}
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
                placeholder=""
                value={field.value}
                onChange={field.onChange}
                InputClassName="h-11"
                required={true}
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
                required={true}
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
                className="h-11"
                dropDownClass="w-full"
                required={true}
                error={errors.role?.message}
              />
            )}
          />

          {/* Sign In Button */}
          <Button
            text="Get started"
            className="h-11 w-full flex items-center text-center justify-center"
            disable={loading}
            loading={loading}
            variant="primary"
            loadingPosition="back"
          />
        </form>

        {/* Footer */}
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-gray-800 font-semibold">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
