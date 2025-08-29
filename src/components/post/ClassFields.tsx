import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useEffect, useState } from "react";
import { listPost } from "../../services/endpoints/postApi";
import { SpinningLoader2 } from "../common/loading/SpinningLoader";

const ClassFields = ({ control, setValue, data }: any) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listPost(`sections`);
      setSections(res?.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //if contains data, for editing
  const ready = !loading && data;
  useEffect(() => {
    if (ready) {
      setValue("section_ids", data.sections?.map((s: any) => s.id) || []);
      setValue("name", data.name || "");
      setValue("description", data.description || "");
    }
  }, [ready, data, setValue]);

  console.log(data);
  return (
    <div className="space-y-4">
      {/* Class Name Field */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Class Name is required" }}
        defaultValue=""
        render={({ field, fieldState }) => (
          <FormInput
            label="Class Name"
            placeholder="Class Name"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* description */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Class Description is required" }}
        defaultValue=""
        render={({ field, fieldState }) => (
          <FormInput
            label="Class Description"
            placeholder="Class Description"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Section Checkboxes */}
      <Controller
        name="section_ids"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (value) => {
            if (sections.length > 0 && (!value || value.length === 0)) {
              return "Select at least one section";
            }
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <div>
            <label className="block font-medium mb-2 text-sm">
              Select Sections
            </label>

            {loading ? (
              <SpinningLoader2 className="h-6 w-6 ml-6 " />
            ) : (
              <div className="grid gap-2">
                {sections.map((section) => (
                  <label
                    key={section.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={section.id}
                      checked={field.value.includes(section.id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          field.onChange([...field.value, section.id]);
                        } else {
                          field.onChange(
                            field.value.filter((id: any) => id !== section.id)
                          );
                        }
                      }}
                    />
                    {section.name}
                  </label>
                ))}
                {sections.length === 0 && !loading && (
                  <p className="text-xs text-gray-500">No sections found.</p>
                )}
              </div>
            )}

            {fieldState.error && (
              <p className="text-xs text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ClassFields;
