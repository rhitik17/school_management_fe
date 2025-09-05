import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useEffect, useState } from "react";
import { listPost } from "../../services/endpoints/postApi";
import { ClassItem } from "../../types/commonTypes";
import CustomDropdown from "../common/CustomSelect";
import Button from "../common/Button";
import  { SpinningLoader2 } from "../common/loading/SpinningLoader";

const SubjectGroupFields = ({ control, data, watch, setValue }: any) => {
  // State
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [classOptions, setClassOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [sectionOptions, setSectionOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [subjectOptions, setSubjectOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [teacherOptions, setTeacherOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingSections, setLoadingSections] = useState(false);

  const selectedClassId = watch("class_instance");
  const subject_teacher_mappings = watch("subject_teacher_mappings");

  // Only fetch classes initially
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await listPost(`classes`);
        setClasses(res?.data.results);
        setClassOptions(
          (res?.data?.results || []).map((item: any) => ({
            value: item.id,
            label: item.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch subjects/teachers only when needed
  useEffect(() => {
    if (subject_teacher_mappings?.length > 0) {
      const fetchData = async () => {
        try {
          const [subjectsRes, teachersRes] = await Promise.all([
            listPost("subjects"),
            listPost("teachers"),
          ]);
          setSubjectOptions(
            (subjectsRes?.data?.results || []).map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
          setTeacherOptions(
            (teachersRes?.data?.results || []).map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching subjects/teachers:", error);
        }
      };
      fetchData();
    }
  }, [classes]);

  // Update section options when class_instance changes
  useEffect(() => {
    if (selectedClassId) {
      setLoadingSections(true);
      const selectedClass = classes.find((cls) => cls.id === selectedClassId);
      if (selectedClass) {
        setSectionOptions(
          (selectedClass.sections || []).map((section: any) => ({
            value: section.id,
            label: section.name,
          }))
        );
      }
      setTimeout(() => setLoadingSections(false), 300);
    } else {
      setSectionOptions([]);
    }
  }, [selectedClassId, classes]);

  // if contains data, for editing
  const ready = data && sectionOptions && subjectOptions && teacherOptions
useEffect(() => {
  if (ready) {
    setValue("name", data.name || "");
    setValue("class_instance", data.class_instance || null);
    setValue("description", data.description || "");
    setValue(
      "section_ids",
      data.sections?.map((s: any) => s.id) || []
    );
    setValue(
      "subject_teacher_mappings",
      data.subjects?.map((sub: any) => ({
        subject: sub.id,
        teacher: sub.teacher_id,
      })) || []
    );
  }
}, [ready, setValue]);


  // Add/remove subject-teacher rows
  const addSubjectTeacher = () => {
    setValue("subject_teacher_mappings", [
      ...subject_teacher_mappings,
      { subject: undefined, teacher: undefined },
    ]);
  };

  const removeSubjectTeacher = (idx: number) => {
    const updated = subject_teacher_mappings.filter(
      (_: any, i: number) => i !== idx
    );
    setValue("subject_teacher_mappings", updated);
  };

  return (
    <div className="space-y-6">
      {/* Name */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <FormInput
            label="Name"
            placeholder="Enter group name"
            required
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      {/* Class Dropdown */}
      <Controller
        name="class_instance"
        control={control}
        rules={{ required: "Class is required" }}
        render={({ field, fieldState }) => (
          <CustomDropdown
            label="Class"
            options={classOptions}
            placeholder="Select Class"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            dropDownClass="w-full"
            required
          />
        )}
      />

      {/* Section Checkboxes */}
      <Controller
        name="section_ids"
        control={control}
        render={({ field }) => {
          const value: string[] = field.value || [];
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
                      key={section.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={section.value}
                        checked={value.includes(section.value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          if (isChecked) {
                            field.onChange([...value, section.value]);
                          } else {
                            field.onChange(
                              value.filter((id) => id !== section.value)
                            );
                          }
                        }}
                      />
                      {section.label}
                    </label>
                  ))
                )}
              </div>
            </div>
          );
        }}
      />

      {/* Subject-Teacher Pairs */}
      <div className="space-y-3">
        <label className="block mb-2 text-sm font-medium">
          Subject-Teacher Mapping
        </label>

        <div className="space-y-3">
          {subject_teacher_mappings?.map((_: any, idx: number) => (
            <div key={idx} className="flex items-center gap-4">
              <Controller
                name={`subject_teacher_mappings.${idx}.subject`}
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field, fieldState }) => (
                  <CustomDropdown
                    label="Subject"
                    options={subjectOptions}
                    placeholder="Select Subject"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    dropDownClass="w-full"
                    required
                  />
                )}
              />
              <Controller
                name={`subject_teacher_mappings.${idx}.teacher`}
                control={control}
                rules={{ required: "Teacher is required" }}
                render={({ field, fieldState }) => (
                  <CustomDropdown
                    label="Teacher"
                    options={teacherOptions}
                    placeholder="Select Teacher"
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    dropDownClass="w-full"
                    required
                  />
                )}
              />
              {subject_teacher_mappings.length > 1 && (
                <button
                  type="button"
                  className="px-2 text-lg font-bold text-red-500 hover:text-red-700"
                  onClick={() => removeSubjectTeacher(idx)}
                >
                  &minus;
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add field button */}
        <div className="flex justify-end">
          <Button
            text="Add +"
            type="button"
            variant="primary"
            className="h-8"
            action={addSubjectTeacher}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectGroupFields;
