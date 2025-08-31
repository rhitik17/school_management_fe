import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useClassOptions } from "../../hooks/postListHook";
import CustomDropdown from "../common/CustomSelect";
import { dropdownFormat } from "../../utils/dropdownFormat";
import { Section } from "../../types/commonTypes";

const tabs = ["Personal Info", "Guardian Info", "Document Info"];

const StudentFields = ({ control, watch }: any) => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loadingSections, setLoadingSections] = useState(false);
  const [sectionList, setSectionList] = useState<Section[] >([]);

  const { postList: classList } = useClassOptions("classes");

  const selectedClassId = watch("current_class");
  // Update section options when class_instance changes
  useEffect(() => {
    if (selectedClassId) {
      setLoadingSections(true);
      const selectedClass = classList.find((cls) => cls.id === selectedClassId);
      if (selectedClass) {
        setSectionList(selectedClass.sections);
        console.log("aayo hai", selectedClass.sections);
      }
      setTimeout(() => setLoadingSections(false), 300);
    } else {
      setSectionList([]);
    }
  }, [selectedClassId, classList]);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Personal Info" && (
        <div className="w-full space-y-8">
          <div className="flex gap-x-8">
            {/* Academic Information */}
            <div className="w-1/2 px-4 py-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Academic Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="academic_year"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Academic Year"
                      placeholder="Select academic year"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="current_class"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomDropdown
                      label="Select Class"
                      options={dropdownFormat(classList)}
                      {...field}
                      dropDownClass="w-full"
                      placeholder={loadingSections ? "..." : "Select Section"}
                    />
                  )}
                />
                <Controller
                  name="section"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomDropdown
                      label="Select Section"
                      options={dropdownFormat(sectionList)}
                      {...field}
                      dropDownClass="w-full"
                    />
                  )}
                />
                <Controller
                  name="admission_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Admission Number"
                      placeholder="Enter admission number"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="admission_date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput label="Admission Date" type="date" {...field} />
                  )}
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="w-1/2 px-4 py-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Personal Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="full_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Full Name"
                      placeholder="Enter full name"
                      {...field}
                    />
                  )}
                />
                {/* <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Last Name"
                      placeholder="Enter last name"
                      {...field}
                    />
                  )}
                /> */}
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomDropdown
                      label="Gender"
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" },
                      ]}
                      placeholder="Select gender"
                      dropDownClass="w-full"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="date_of_birth"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput label="Date of Birth" type="date" {...field} />
                  )}
                />
                <Controller
                  name="religion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Religion"
                      placeholder="Enter religion"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="caste"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Caste"
                      placeholder="Enter caste"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="student_photo"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange } }) => (
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
                    />
                  )}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Student Preview"
                    className="object-contain w-32 h-32 rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-x-8">
            {/* Contact Information */}
            <div className="w-1/2 px-4 py-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Contact Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="Enter email"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Phone Number"
                      placeholder="Enter phone number"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Student Address Info */}
            <div className="w-1/2 px-4 py-4 space-y-4 rounded-md bg-primary-50">
              <h2 className="text-lg font-semibold border-b border-black w-fit">
                Student Address Info
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="current_address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Current Address"
                      placeholder="Enter current address"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="permanent_address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Permanent Address"
                      placeholder="Enter permanent address"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Medical Record */}
          <div className="w-1/2 px-4 py-4 space-y-4 rounded-md bg-primary-50">
            <h2 className="text-lg font-semibold border-b border-black w-fit">
              Medical Record
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="blood_group"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormInput
                    label="Blood Group"
                    placeholder="Select blood group"
                    {...field}
                  />
                )}
              />
              <Controller
                name="height"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormInput
                    label="Height (cm)"
                    type="number"
                    placeholder="Enter height"
                    {...field}
                  />
                )}
              />
              <Controller
                name="weight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormInput
                    label="Weight (kg)"
                    type="number"
                    placeholder="Enter weight"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Guardian Info" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="guardian_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Guardian Name"
                placeholder="Enter guardian name"
                {...field}
              />
            )}
          />
          <Controller
            name="guardian_phone_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Contact Number"
                placeholder="Enter contact number"
                {...field}
              />
            )}
          />
          <Controller
            name="guardian_relationship"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Relation"
                placeholder="Father / Mother / Other"
                {...field}
              />
            )}
          />
        </div>
      )}

      {activeTab === "Document Info" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="documentType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Document Type"
                placeholder="e.g., Citizenship, Passport"
                {...field}
              />
            )}
          />
          <Controller
            name="documentNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Document Number"
                placeholder="Enter document number"
                {...field}
              />
            )}
          />
          <Controller
            name="documentIssueDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput type="date" label="Issue Date" {...field} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default StudentFields;
