import { Controller } from "react-hook-form";
import FormInput from "../common/FormInput";


const ClassFields = ({ control }: any) => {
  // const [sections, setSections] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  // const dummySections = [
  //   { id: "dummy1", name: "Section A" },
  //   { id: "dummy2", name: "Section B" },
  //   { id: "dummy3", name: "Section C" },
  // ];

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const res = await listPost(`/sections`);
  //     setSections(res.data || []);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setSections(dummySections);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="space-y-4">
      {/* Class Name Field */}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput label="Class Name" placeholder="Class Name" {...field} />
        )}
      />

      {/* description */}
        <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput label="Class Description" placeholder="Class Description" {...field} />
        )}
      />

      {/* Section Checkboxes */}
      {/* <Controller
        name="sectionIds"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <div>
            <label className="block font-medium mb-2 text-sm">
              Select Sections
            </label>
            <div className="grid gap-2">
              {sections.map((section) => (
                <label
                  key={section.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={section.id}
                    checked={field.value.includes(section.id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        field.onChange([...field.value, section.id]);
                      } else {
                        field.onChange(
                          field.value.filter((id: any) => id !== section.id)
                        );
                      }
                    }}
                  />
                  {section.name}
                </label>
              ))}
              {sections.length === 0 && !loading && (
                <p className="text-xs text-gray-500">No sections found.</p>
              )}
            </div>
          </div>
        )}
      /> */}
    </div>
  );
};

export default ClassFields;
