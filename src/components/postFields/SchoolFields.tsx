import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";

const SchoolFields = ({ control }: any) => (
  <>
    <div>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput label="School Name" placeholder="School Name" {...field} />
        )}
      />
    </div>

    <div>
      <Controller
        name="establishedYear"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput label="Established Year" type="date" {...field} />
        )}
      />
    </div>
  </>
);

export default SchoolFields;
