import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import CustomDropdown from "../common/CustomSelect";
import { useClassOptions } from "../../hooks/postListHook";
import { dropdownFormat } from "../../utils/dropdownFormat";
import { Section } from "../../types/commonTypes";
import { isValidEmail, isValidPhoneNumber } from "../../utils/validation";

// Dropdown Constants
const tabs = ["Personal Info", "Guardian Info"];
const BLOOD_GROUPS = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];
const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const StudentFields = ({ control, watch }: any) => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loadingSections, setLoadingSections] = useState(false);
  const [sectionList, setSectionList] = useState<Section[]>([]);

  const { postList: classList } = useClassOptions("classes");
  const { postList: academic_years } = useClassOptions("academic-sessions");

  const selectedClassId = watch("current_class");

  // Update section options when class_instance changes
  useEffect(() => {
    if (selectedClassId) {
      setLoadingSections(true);
      const selectedClass = classList.find((cls) => cls.id === selectedClassId);
      setSectionList(selectedClass?.sections || []);
      setTimeout(() => setLoadingSections(false), 300);
    } else {
      setSectionList([]);
    }
  }, [selectedClassId, classList]);

  // Reusable render functions
  const renderInput = (
    name: string,
    label: string,
    placeholder = "",
    type = "text",
    rules: any = { required: `${label} is required` }
  ) => (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
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

  const renderDropdown = (
    name: string,
    label: string,
    options: any[],
    placeholder = "Select",
    rules: any = { required: `${label} is required` }
  ) => (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
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
    <div className="w-full space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Personal Info" && (
        <div className="w-full space-y-6">
          <div className="w-full flex gap-x-8">
            {/* Academic Info */}
            <div className="w-full p-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Academic Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderDropdown(
                  "academic_year",
                  "Academic Session",
                  dropdownFormat(academic_years)
                )}
                {renderDropdown(
                  "current_class",
                  "Class",
                  dropdownFormat(classList),
                  loadingSections ? "..." : "Select Class"
                )}
                {renderDropdown(
                  "section",
                  "Section",
                  dropdownFormat(sectionList)
                )}
                {renderInput(
                  "admission_number",
                  "Admission Number",
                  "Enter admission number"
                )}
                {renderInput("admission_date", "Admission Date", "", "date")}
              </div>
            </div>

            {/* Personal Info */}
            <div className="w-full p-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Personal Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput("full_name", "Full Name", "Enter full name")}
                {renderDropdown("gender", "Gender", GENDER_OPTIONS)}
                {renderInput("date_of_birth", "Date of Birth", "", "date")}
                {renderInput("religion", "Religion", "Enter religion")}
                {renderInput("caste", "Caste", "Enter caste")}
                {/* Profile Photo */}
                <Controller
                  name="student_photo"
                  control={control}
                  defaultValue={null}
                  rules={{ required: "Profile photo is required" }}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <>
                      <FormInput
                        label="Choose Profile"
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
                          alt="Student Preview"
                          className="object-contain w-32 h-32 rounded-md"
                        />
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-x-8">
            {/* Contact Info */}
            <div className="w-full p-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Contact Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderInput("email", "Email Address", "Enter email", "email", {
                  required: "Email is required",
                  validate: (value: string) =>
                    isValidEmail(value) || "Enter a valid email",
                })}
                {renderInput(
                  "phone_number",
                  "Phone Number",
                  "Enter phone number",
                  "text",
                  {
                    required: "Phone number is required",
                    validate: (value: string) =>
                      isValidPhoneNumber(value) || "Enter a valid phone number",
                  }
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

            {/* Medical Info */}
            <div className="w-full p-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Medical Record
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderDropdown("blood_group", "Blood Group", BLOOD_GROUPS)}
                {renderInput("height", "Height (cm)", "Enter height", "number")}
                {renderInput("weight", "Weight (kg)", "Enter weight", "number")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guardian Info Tab */}
      {activeTab === "Guardian Info" && (
        <div className="p-4  rounded-md bg-primary-50 grid gap-4 sm:grid-cols-2 ">
          {renderInput("guardian_name", "Guardian Name", "Enter guardian name")}
          {renderInput(
            "guardian_phone_number",
            "Contact Number",
            "Enter contact number",
            "text",
            {
              required: "Contact number is required",
              validate: (value: string) =>
                isValidPhoneNumber(value) || "Enter a valid contact number",
            }
          )}
          {renderInput(
            "guardian_relationship",
            "Relation",
            "Father / Mother / Other"
          )}
        </div>
      )}
    </div>
  );
};

export default StudentFields;
