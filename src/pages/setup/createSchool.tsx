import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/common/FormInput";
import { toast } from "react-toastify";
import { createSchool } from "../../services/endpoints/authService";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../stores/userStore";

interface SchoolFormData {
  schoolName: string;
  establishedYear: string;
}

const CreateSchool = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const { setUserData, userData } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchoolFormData>({
    defaultValues: {
      schoolName: "",
      establishedYear: "",
    },
  });

  const onSubmit = async (data: SchoolFormData) => {
    try {
      const response = await createSchool(data);

      toast.success(response.message);
      // setUserData({
      //   ...userData,
      //   user: {
      //     ...userData?.user,
      //     schoolId: response.data.id,
      //   },
      // });
      reset();
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create school");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-8 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl">
        <div className="p-6 space-y-8 sm:p-8 md:p-10">
          {/* Header Section */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Create New School
            </h2>
            <p className="text-base text-gray-600">
              Please fill in the school details
            </p>
          </div>

          {/* School Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="schoolName"
              control={control}
              rules={{
                required: "School name is required",
                minLength: {
                  value: 3,
                  message: "School name must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "School name must not exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <FormInput
                  label="School Name"
                  type="text"
                  placeholder="Enter school name"
                  value={field.value}
                  onChange={field.onChange}
                  InputClassName="h-11"
                  required
                  error={errors.schoolName?.message}
                />
              )}
            />

            <Controller
              name="establishedYear"
              control={control}
              rules={{
                required: "Established date is required",
                validate: (value) => {
                  if (!value) return true;

                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const selectedYear = selectedDate.getFullYear();

                  if (isNaN(selectedDate.getTime()))
                    return "Please enter a valid date";
                  if (selectedYear < 1900) return "Year must be 1900 or later";
                  if (selectedDate > today)
                    return "Date cannot be in the future";

                  return true;
                },
              }}
              render={({ field }) => (
                <FormInput
                  label="Established Year"
                  type="date"
                  placeholder="Enter established year"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  InputClassName="h-11"
                  required
                  error={errors.establishedYear?.message}
                />
              )}
            />

            <Button
              text="Create School"
              className="w-full text-base font-semibold h-11"
              disable={isSubmitting}
              loading={isSubmitting}
              variant="primary"
              loadingPosition="back"
            />
          </form>

          {/* Footer */}
          <div className="text-sm text-center text-gray-600">
            Changed your mind?{" "}
            <button
              onClick={() => navigate(-1)}
              className="font-semibold text-gray-900 transition-colors hover:text-gray-700"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchool;
