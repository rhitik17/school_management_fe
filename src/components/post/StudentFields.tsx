import { useState } from "react";
import { Controller, } from "react-hook-form";
import FormInput from "../common/FormInput";

const tabs = ["Personal Info", "Guardian Info", "Document Info"];

const StudentFields = ({ control }: any) => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Watch the file input

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
                  name="academicYear"
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
                  name="class"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Class"
                      placeholder="Select class"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="section"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Section"
                      placeholder="Select section"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="admissionNumber"
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
                  name="admissionDate"
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
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="First Name"
                      placeholder="Enter first name"
                      {...field}
                    />
                  )}
                />
                <Controller
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
                />
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      label="Gender"
                      placeholder="Select gender"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="dob"
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
                  name="studentPhoto"
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
                  name="phone"
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
                  name="currentAddress"
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
                  name="permanentAddress"
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
                name="bloodGroup"
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
            name="guardianName"
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
            name="guardianContact"
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
            name="guardianRelation"
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
