import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";

const subjectTypes = [
  { label: "Theory", value: "theory" },
  { label: "Practical", value: "practical" },
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
      <label className="block mb-2 font-medium">Subject Type</label>
      <div className="flex gap-6">
        <Controller
          name="subject_type"
          control={control}
          defaultValue="theory"
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
        name="subject_code"
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
