import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";

const SectionFields = ({ control }: any) => {
  return (
    <>
      <div>
        <Controller
          name="name"
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
         <div>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Section Description"
              placeholder="Enter section description"
              {...field}
            />
          )}
        />
      </div>
    </>
  );
};

export default SectionFields;
