export const dropdownFormat = (
  list: any[],
  valueKey: string = "id",
  labelKey: string = "name"
): { value: string; label: string }[] => {
  return (list || []).map((item: any) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
