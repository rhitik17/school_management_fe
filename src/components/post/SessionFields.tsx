import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useEffect } from "react";

const SessionFields = ({ control, data, setValue }: any) => {
  //if contains data, for editing
  useEffect(() => {
    if (data) {
      setValue("name", data.name || "");
      setValue("start_date", data.start_date ?? "", { shouldValidate: true });
      setValue("end_date", data.end_date ?? "", { shouldValidate: true });
      setValue("is_current", data.is_current ?? false, {
        shouldValidate: true,
      });
    }
  }, [data, setValue]);
  return (
    <>
      {/* Session Name */}
      <div>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Session Name"
              placeholder="Enter session name"
              {...field}
            />
          )}
        />
      </div>

      {/* Start Date */}
      <div>
        <Controller
          name="start_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput label="Start Date" type="date" {...field} />
          )}
        />
      </div>

      {/* End Date */}
      <div>
        <Controller
          name="end_date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput label="End Date" type="date" {...field} />
          )}
        />
      </div>

      {/* Is Current Session */}
      <div className="flex items-center gap-2 mt-2">
        <Controller
          name="is_current"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="w-4 h-4"
            />
          )}
        />
        <label className="text-sm text-gray-700">Is Current Session</label>
      </div>
    </>
  );
};

export default SessionFields;
