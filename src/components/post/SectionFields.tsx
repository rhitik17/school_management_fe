import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";

const SectionFields = ({ control }: any) => {
  return (
    <>
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
    </>
  );
};

export default SectionFields;
