import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useState } from "react";
import CustomDropdown from "../common/CustomSelect";

// Dropdown Options
const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Accountant", value: "accountant" },
  { label: "Librarian", value: "librarian" },
  { label: "Receptionist", value: "receptionist" },
];

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const MARITAL_STATUS_OPTIONS = [
  { label: "Unmarried", value: "unmarried" },
  { label: "Married", value: "married" },
];

const EmployeeFields = ({ control }: any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const renderInput = (
    name: string,
    label: string,
    placeholder: string,
    options?: { type?: string; isRequired?: boolean }
  ) => {
    const { type = "text", isRequired = true } = options || {};
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={isRequired ? { required: `${label} is required` } : {}}
        render={({ field, fieldState: { error } }) => (
          <FormInput
            {...field}
            label={label}
            placeholder={placeholder}
            type={type}
            error={error?.message}
          />
        )}
      />
    );
  };

  const renderDropdown = (
    name: string,
    label: string,
    options: any[],
    placeholder: string
  ) => (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: `${label} is required` }}
      render={({ field, fieldState: { error } }) => (
        <CustomDropdown
          {...field}
          label={label}
          options={options}
          placeholder={placeholder}
          dropDownClass="w-full"
          error={error?.message}
        />
      )}
    />
  );

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div className="p-4 rounded-md bg-primary-50 space-y-4">
        <h2 className="text-lg font-semibold border-b border-black w-fit">
          Personal Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderInput("full_name", "Full Name", "Enter full name")}
          {renderDropdown("gender", "Gender", GENDER_OPTIONS, "Select gender")}
          {renderInput("date_of_birth", "Date of Birth", "", { type: "date" })}
          {renderDropdown(
            "marital_status",
            "Marital Status",
            MARITAL_STATUS_OPTIONS,
            "Select status"
          )}
          {renderInput("father_name", "Father Name", "Enter father's name")}
          {renderInput("mother_name", "Mother Name", "Enter mother's name")}
          {/* Profile Photo */}
          <Controller
            name="photo"
            control={control}
            defaultValue={null}
            rules={{ required: "Profile photo is required" }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <FormInput
                  label="Upload Profile Photo"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                      onChange(file);
                    }
                  }}
                  error={error?.message}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Staff Preview"
                    className="object-contain w-32 h-32 rounded-md"
                  />
                )}
              </>
            )}
          />
        </div>
      </div>

      {/* Job Info */}
      <div className="p-4 rounded-md bg-primary-50 space-y-4">
        <h2 className="text-lg font-semibold border-b border-black w-fit">
          Job Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderInput("staff_id", "Staff ID", "Enter Staff ID")}
          {renderDropdown("role", "Role", ROLE_OPTIONS, "Select role")}
          {renderInput("date_of_joining", "Date of Joining", "", {
            type: "date",
          })}
          {renderInput("experience", "Experience", "Enter experience")}
          {renderInput("qualification", "Qualification", "Enter qualification")}
          {renderInput("contract_type", "Contract Type", "Enter contract type")}
          {renderInput("note", "Note", "Add note")}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 rounded-md bg-primary-50 space-y-4">
        <h2 className="text-lg font-semibold border-b border-black w-fit">
          Contact Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderInput("email", "Email", "Enter email", { type: "email" })}
          {renderInput("phone_number", "Phone Number", "Enter phone number")}
          {renderInput(
            "emergency_contact_number",
            "Emergency Contact Number",
            "Enter emergency contact"
          )}
          {renderInput(
            "current_address",
            "Current Address",
            "Enter current address"
          )}
          {renderInput(
            "permanent_address",
            "Permanent Address",
            "Enter permanent address"
          )}
        </div>
      </div>

      {/* Social & IDs */}
      <div className="p-4 rounded-md bg-primary-50 space-y-4">
        <h2 className="text-lg font-semibold border-b border-black w-fit">
          Social & IDs
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderInput("pan_number", "PAN Number", "Enter PAN number")}
          {renderInput("epf_number", "EPF Number", "Enter EPF number")}
          {renderInput("facebook_url", "Facebook URL", "Enter Facebook URL", {
            isRequired: false,
          })}
          {renderInput("twitter_url", "Twitter URL", "Enter Twitter URL", {
            isRequired: false,
          })}
          {renderInput(
            "instagram_url",
            "Instagram URL",
            "Enter Instagram URL",
            { isRequired: false }
          )}
          {renderInput("linkedin_url", "LinkedIn URL", "Enter LinkedIn URL", {
            isRequired: false,
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeFields;
