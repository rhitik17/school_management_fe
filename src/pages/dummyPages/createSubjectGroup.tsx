import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../../components/common/FormInput";
import CustomDropdown from "../../components/common/CustomSelect";
import Button from "../../components/common/Button";
import { createPost, listPost } from "../../services/endpoints/postApi";
import { ClassItem } from "../../types/commonTypes";
import { toast } from "react-toastify";

const CreateSubjectGroup = () => {
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      classId: undefined,
      sectionIds: [],
      subjectTeachers: [{ subjectId: undefined, teacherId: undefined }],
    },
  });

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

  const selectedClassId = watch("classId");
  const subjectTeachers = watch("subjectTeachers");

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
    if (subjectTeachers.length > 0) {
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

  // Update section options when classId changes
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

  // Add/remove subject-teacher rows
  const addSubjectTeacher = () => {
    setValue("subjectTeachers", [
      ...subjectTeachers,
      { subjectId: undefined, teacherId: undefined },
    ]);
  };

  const removeSubjectTeacher = (idx: number) => {
    const updated = subjectTeachers.filter((_: any, i: number) => i !== idx);
    setValue("subjectTeachers", updated);
  };

  // Submit
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        class_instance: data.classId,
        description: data.description,
        section_ids: data.sectionIds,
        subject_teacher_mappings: data.subjectTeachers.map((st: any) => ({
          subject: st.subjectId,
          teacher: st.teacherId,
        })),
      };
      const res = await createPost(`subject-groups`, payload);
      toast.success(res.message);
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto space-y-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Create Subject Group</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          name="classId"
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
          name="sectionIds"
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
                    <span>Loading sections...</span>
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
            {subjectTeachers.map((_: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <Controller
                  name={`subjectTeachers.${idx}.subjectId`}
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
                  name={`subjectTeachers.${idx}.teacherId`}
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
                {subjectTeachers.length > 1 && (
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

        <Button
          type="submit"
          text="Create Subject Group"
          variant="primary"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default CreateSubjectGroup;
