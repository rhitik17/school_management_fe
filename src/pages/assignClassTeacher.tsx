import { useForm, Controller } from "react-hook-form";
import CustomDropdown from "../components/common/CustomSelect";
import Button from "../components/common/Button";

const classOptions = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
];

const sectionOptions = [
  { value: "A", label: "Section A" },
  { value: "B", label: "Section B" },
  { value: "C", label: "Section C" },
];

const teacherList = [
  { value: "t1", label: "Mr. Smith" },
  { value: "t2", label: "Ms. Johnson" },
  { value: "t3", label: "Mrs. Lee" },
];

const AssignClassTeacher = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      class: "",
      section: "",
      teacher: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-3xl p-6 mx-auto space-y-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold ">Assign Class Teacher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Dropdown */}
        <Controller
          name="class"
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

        {/* Section Dropdown */}
        <Controller
          name="section"
          control={control}
          rules={{ required: "Section is required" }}
          render={({ field, fieldState }) => (
            <CustomDropdown
              label="Section"
              options={sectionOptions}
              placeholder="Select Section"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              dropDownClass="w-full"
              required
            />
          )}
        />

        {/* Teacher Radio Buttons */}
        <Controller
          name="teacher"
          control={control}
          rules={{ required: "Please select a teacher" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block mb-2 font-medium">Select Teacher</label>
              <div className="flex flex-col gap-2">
                {teacherList.map((teacher) => (
                  <label key={teacher.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={teacher.value}
                      checked={field.value === teacher.value}
                      onChange={() => field.onChange(teacher.value)}
                    />
                    {teacher.label}
                  </label>
                ))}
              </div>
              {fieldState.error && (
                <span className="text-xs text-red-500">{fieldState.error.message}</span>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          text="Assign Teacher"
          variant="primary"
          className="w-full "
        
        />
      </form>
    </div>
  );
};

export default AssignClassTeacher;  