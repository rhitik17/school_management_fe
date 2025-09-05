import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Section } from "../../types/commonTypes";
import CustomDropdown from "../common/CustomSelect";
import { usePostList } from "../../hooks/postListHook";
import { dropdownFormat } from "../../utils/dropdownFormat";
import { SpinningLoader2 } from "../common/loading/SpinningLoader";

const ClassTeacherFields = ({ control, data, watch, setValue }: any) => {
  // State
  const [sectionOptions, setSectionOptions] = useState<Section[]>([]);

  const [loadingSections, setLoadingSections] = useState(false);

  const selectedClassId = watch("school_class");

  const { postList: classList } = usePostList("classes");
  const { postList: teacherList } = usePostList("teachers");

  // Update section options when class_instance changes
  useEffect(() => {
    if (selectedClassId) {
      setLoadingSections(true);
      const selectedClass = classList.find((cls) => cls.id === selectedClassId);
      if (selectedClass) {
        setSectionOptions(selectedClass.sections);
      }
      setTimeout(() => setLoadingSections(false), 300);
    } else {
      setSectionOptions([]);
    }
  }, [selectedClassId, classList]);

  // if contains data, for editing
  const ready = data;
  useEffect(() => {
    if (ready) {
      setValue("name", data.name || "");
      setValue("class_instance", data.class_instance || null);
      setValue("description", data.description || "");
      setValue("section_ids", data.sections?.map((s: any) => s.id) || []);
    }
  }, [ready, setValue]);

  return (
    <div className="space-y-6">
      {/* Class Dropdown */}
      <Controller
        name="school_class"
        control={control}
        rules={{ required: "Class is required" }}
        render={({ field, fieldState }) => (
          <CustomDropdown
            label="Class"
            options={dropdownFormat(classList)}
            placeholder="Select Class"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            dropDownClass="w-full"
            required
          />
        )}
      />

      {/* Section Dropdown */}
      <Controller
        name="section"
        control={control}
        rules={{ required: "Section is required" }}
        render={({ field, fieldState }) => (
          <CustomDropdown
            label="Section"
            options={dropdownFormat(sectionOptions)}
            placeholder={loadingSections ? <SpinningLoader2 className="ml-4"/> : "Select"}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            dropDownClass="w-full"
            required
          />
        )}
      />

      {/* Section Checkboxes
            <Controller
              name="section"
              control={control}
              render={({ field }) => {
                const value: number[] = field.value || [];
                return (
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Select Sections
                    </label>
                    <div className="grid gap-2">
                      {loadingSections ? (
                        <SpinningLoader2 className="h-6 w-6 ml-4"/>
                      ) : sectionOptions.length === 0 ? (
                        <span className="text-xs text-gray-500">
                          No sections found.
                        </span>
                      ) : (
                        sectionOptions.map((section) => (
                          <label
                            key={section.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              value={section.id}
                              checked={value.includes(section.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  field.onChange([...value, section.id]);
                                } else {
                                  field.onChange(
                                    value.filter((id) => id !== section.id)
                                  );
                                }
                              }}
                            />
                            {section.name}
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                );
              }}
            /> */}

      {/* Teacher Radio Buttons */}
      <Controller
        name="teacher"
        control={control}
        rules={{ required: "Please select a teacher" }}
        render={({ field, fieldState }) => (
          <CustomDropdown
            label="Section"
            options={dropdownFormat(teacherList)}
            placeholder="Select Section"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            dropDownClass="w-full"
            required
          />
        )}
      />
    </div>
  );
};

export default ClassTeacherFields;
