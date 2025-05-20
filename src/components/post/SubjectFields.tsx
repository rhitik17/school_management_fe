import React from "react";
import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";

const subjectTypes = [
  { label: "Theory", value: "Theory" },
  { label: "Practical", value: "Practical" },
];

const SubjectFields = ({ control }: { control: any }) => (
  <>
    <div>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Subject Name"
            placeholder="Subject Name"
            {...field}
          />
        )}
      />
    </div>

    <div className="mt-4">
      <label className="block font-medium mb-2">Subject Type</label>
      <div className="flex gap-6">
        <Controller
          name="type"
          control={control}
          defaultValue="Theory"
          render={({ field }) => (
            <>
              {subjectTypes.map((type) => (
                <label key={type.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={type.value}
                    checked={field.value === type.value}
                    onChange={() => field.onChange(type.value)}
                  />
                  {type.label}
                </label>
              ))}
            </>
          )}
        />
      </div>
    </div>

    <div className="mt-4">
      <Controller
        name="code"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Subject Code"
            placeholder="Subject Code"
            {...field}
          />
        )}
      />
    </div>
  </>
);

export default SubjectFields;
