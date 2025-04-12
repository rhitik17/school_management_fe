import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import { useCallback, useEffect, useState } from "react";
import { listPost } from "../../services/endpoints/postApi";
import CustomDropdown from "../common/CustomSelect";

const SectionFields = ({ control }: any) => {
const [sessionOptions, setSessionOptions] = useState([]);

 const fetchSchool = useCallback(async () => {
    try {
      const res = await listPost("sessions");
      const formatOptions = res.data.map((item:any) => ({
        value: item.id,
        label: item.session,
      }));
      setSessionOptions(formatOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <>

<div className="">
        <Controller
          name="sessionId"
          control={control}
          
          defaultValue=""
          render={({ field }) => (
            <CustomDropdown
              label="Session"
              placeholder="Select Session"
              options={sessionOptions}
             
              dropDownClass="w-full"
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="section"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Section Name"
              placeholder="Enter section name"
              {...field}
            />
          )}
        />
      </div>

      {/* <div>
        <Controller
          name="classTeacher"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Class Teacher"
              placeholder="Enter class teacher's name"
              {...field}
            />
          )}
        />
      </div> */}
    </>
  );
};

export default SectionFields;
