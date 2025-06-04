import  { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../components/common/FormInput";
import CustomDropdown from "../components/common/CustomSelect";
import Button from "../components/common/Button";


const CreateSubjectGroup = () => {
  const { control, handleSubmit, watch, setValue,  } = useForm({
    defaultValues: {
      name: "",
      classId: "",
      sectionIds: [],
      subjectTeachers: [{ subjectId: "", teacherId: "" }],
    },
  });

  // Dropdown options
  // @ts-ignore
  const [classOptions, setClassOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [sectionOptions, setSectionOptions] = useState<
    { value: string; label: string }[]
  >([]);
  // @ts-ignore
  const [subjectOptions, setSubjectOptions] = useState<
    { value: string; label: string }[]
  >([]);
  // @ts-ignore
  const [teacherOptions, setTeacherOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingSections, setLoadingSections] = useState(false);

  // Dummy data for development/demo
  const dummyClasses = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
  ];
  const dummySections = [
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
  ];
  const dummySubjects = [
    { value: "s1", label: "Mathematics" },
    { value: "s2", label: "Science" },
    { value: "s3", label: "English" },
  ];
  const dummyTeachers = [
    { value: "t1", label: "Mr. Smith" },
    { value: "t2", label: "Ms. Johnson" },
    { value: "t3", label: "Mrs. Lee" },
  ];

  // Always use dummy data for development/demo
  useEffect(() => {
    setClassOptions(dummyClasses);
    setSubjectOptions(dummySubjects);
    setTeacherOptions(dummyTeachers);
  }, []);

  // Set sections to dummy on class change
  const selectedClassId = watch("classId");
  useEffect(() => {
    if (!selectedClassId) {
      setSectionOptions([]);
      setValue("sectionIds", []);
      return;
    }
    setLoadingSections(true);
    setTimeout(() => {
      setSectionOptions(dummySections);
      setLoadingSections(false);
    }, 300); // simulate loading
  }, [selectedClassId, setValue]);

  // Subject-Teacher dynamic rows
  const subjectTeachers = watch("subjectTeachers");

  const addSubjectTeacher = () => {
    setValue("subjectTeachers", [
      ...subjectTeachers,
      { subjectId: "", teacherId: "" },
    ]);
  };

  const removeSubjectTeacher = (idx: number) => {
    const updated = subjectTeachers.filter((_: any, i: number) => i !== idx);
    setValue("subjectTeachers", updated);
  };

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form Data:", data);
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
              options={dummyClasses}
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
            {/* @ts-ignore */}
            {subjectTeachers.map((row: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <Controller
                  name={`subjectTeachers.${idx}.subjectId`}
                  control={control}
                  rules={{ required: "Subject is required" }}
                  render={({ field, fieldState }) => (
                    <CustomDropdown
                      label="Subject"
                      options={dummySubjects}
                      placeholder="Select Subject"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      dropDownClass="w-48"
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
                      options={dummyTeachers}
                      placeholder="Select Teacher"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      dropDownClass="w-48"
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

          {/* add field button */}
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
