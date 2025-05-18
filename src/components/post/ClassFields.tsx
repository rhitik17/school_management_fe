import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import CustomDropdown from "../common/CustomSelect";
import { useCallback, useEffect, useState } from "react";
import { listPost } from "../../services/endpoints/postApi";

const ClassFields = ({ control }: any) => {

const [teacherOptions, setTeacherOptions] = useState([]);

  const fetchSchool = useCallback(async () => {
    try {
      const res = await listPost("schools");
      const formatOptions = res.data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setTeacherOptions(formatOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <>
      <div>
        <Controller
          name="className"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput label="Class Name" placeholder="Class Name" {...field} />
          )}
        />
      </div>

      <div>
        <Controller
          name="monthlyTutionFee"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              type="number"
              label="Monthly Tution Fee"
              placeholder="Monthly Tution Fee"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="classTeacher"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomDropdown
              label="Class Teacher"
              placeholder="Select Teacher"
              options={teacherOptions}
              dropDownClass="w-full"
              {...field}
            />
          )}
        />
      </div>
    </>
  );
};

export default ClassFields;
