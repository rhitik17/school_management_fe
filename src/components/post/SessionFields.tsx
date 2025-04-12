import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";
import CustomDropdown from "../common/CustomSelect";
import { useCallback, useEffect, useState } from "react";
import { listPost } from "../../services/endpoints/postApi";
import { useAuthStore } from "../../stores/tokenStore";

const SessionFields = ({ control }: any) => {
  const [schoolOptions, setSchoolOptions] = useState([]);
  const {userData} = useAuthStore();

  const fetchSchool = useCallback(async () => {
    try {
      const res = await listPost("schools");
      const formatOptions = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSchoolOptions(formatOptions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <>
      <div className="hidden">
        <Controller
          name="schoolId"
          control={control}
          
          defaultValue={userData?.user.schoolId}
          render={({ field }) => (
            <CustomDropdown
              label="School Name"
              placeholder="Select School"
              options={schoolOptions}
             
              dropDownClass="w-full"
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="session"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Session Name"
              placeholder="Enter session Name"
              {...field}
            />
          )}
        />
      </div>
      {/* 
      <div>
        <Controller
          name="session"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput label="Session" type="date" {...field} />
          )}
        />
      </div> */}

      {/* <div>
        <Controller
          name="endDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput label="End Date" type="date" {...field} />
          )}
        />
      </div> */}
    </>
  );
};

export default SessionFields;
