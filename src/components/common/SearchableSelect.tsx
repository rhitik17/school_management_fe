import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { BiPlus } from "react-icons/bi";
//@ts-ignore
import preeti from "preeti";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";
interface Option {
  value: string;
  label: string;
}
interface CustomDropdownProps {
  label?: string;
  onAddFn?: (title: string) => Promise<{
    value: string;
    label: string;
  }>;
  options?: Option[];
  isMulti?: boolean;
  placeholder?: string;
  icon?: React.ReactNode | string;
  onChange: (value: string | string[]) => void;
  value?: string | string[];
  className?: string;
  dropdownPosition?: "start" | "center" | "end";
  dropDownClass?: string;
  required?: boolean;
  error?: string;
  onCreateOption?: (value: string) => Promise<void>;
  dataFetchFn?: (key?: string) => Promise<Option[] | undefined>;
  language?: string;
}
const SearchableSelect = ({
  label,
  options = [],
  isMulti = false,
  placeholder = "Select",
  // @ts-ignore
  icon,
  onChange,
  value,
  className = "",
  // @ts-ignore
  dropdownPosition,
  dropDownClass,
  required = false,
  error,
  // @ts-ignore
  onCreateOption,
  dataFetchFn,
  onAddFn,
  language = "EN",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Option[]>(options);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    isMulti
      ? Array.isArray(value)
        ? value
        : []
      : value
      ? [value as string]
      : []
  );
  // @ts-ignore
  const [isCreating, setIsCreating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Fetch items based on search term
  const fetchItems = useCallback(
    async (key?: string) => {
      if (!dataFetchFn && !options) return;
      setIsLoading(true);
      try {
        let data: Option[] = [];
        if (dataFetchFn) {
          data = (await dataFetchFn(key)) || [];
        } else if (options) {
          data = options;
        }
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [dataFetchFn, options]
  );
  const debouncedFetchItems = useCallback(
    debounce((key?: string) => {
      fetchItems(key);
    }, 500),
    [fetchItems]
  );
  useEffect(() => {
    debouncedFetchItems(searchQuery);
  }, [searchQuery, debouncedFetchItems]);
  useEffect(() => {
    if (isMulti) {
      setSelectedOptions(Array.isArray(value) ? value : []);
    } else {
      setSelectedOptions(value ? [value as string] : []);
    }
  }, [value, isMulti]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleOptionClick = (optionValue: string, label: string) => {
    if (isMulti) {
      const updatedSelection = selectedOptions.includes(optionValue)
        ? selectedOptions.filter((value) => value !== optionValue)
        : [...selectedOptions, optionValue];
      setSelectedOptions(updatedSelection);
      onChange(updatedSelection);
    } else {
      setSelectedOptions([optionValue]);
      setSelectedLabel(label);
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    }
  };
  const getDisplayValue = () => {
    const selectedLabels = selectedOptions
      .map((value) => items?.find((opt) => opt.value === value)?.label)
      .filter(Boolean);
    if (selectedLabel) return selectedLabel;
    if (selectedOptions.length == 0 || !selectedLabels) {
      return placeholder;
    }
    return isMulti ? (
      <div className="flex items-center gap-1 overflow-y-auto">
        {selectedLabels.map((txt, i) => (
          <span
            key={i}
            className="px-2 py-1 font-semibold text-white bg-blue-500 rounded-md"
          >
            {txt}
          </span>
        ))}
      </div>
    ) : (
      selectedLabels[0]
    );
  };
  const filteredOptions = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleOptionAddFn = async () => {
    try {
      const res = await onAddFn?.(searchQuery);
      if (res) {
        setSelectedOptions([res.value]);
        setSelectedLabel(res.label);
        onChange(res.value);
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="flex items-center gap-1 text-sm font-bold text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div
          className={`w-full cursor-pointer gap-3 focus:border-transparent rounded-lg  flex items-center justify-between px-3 py-2 text-sm bg-white border ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-normal text-gray-700 capitalize">
            {getDisplayValue()}
          </span>
          <Icons.AngleDown
            className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 bg-white border rounded-lg border-gray-200 ${dropDownClass}`}
        >
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    language === "NP" ? preeti(e.target.value) : e.target.value
                  )
                }
                className="w-full px-8 py-2 text-sm border rounded-lg outline-none"
                placeholder="Search or create..."
                onClick={(e) => e.stopPropagation()}
              />
              <Icons.Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
            </div>
          </div>
          <div className="overflow-y-auto max-h-60">
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : (
              <>
                {searchQuery && (
                  <div className="flex justify-end p-2 border-b">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg max-w-max hover:bg-red-600 disabled:bg-red-300"
                      onClick={async () => handleOptionAddFn()}
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        "Creating..."
                      ) : (
                        <span className="flex items-center gap-1 ">
                          <BiPlus />
                          Add
                        </span>
                      )}
                    </button>
                  </div>
                )}
                {filteredOptions.length > 0
                  ? filteredOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`px-4 py-2 text-sm cursor-pointer ${
                          selectedOptions.includes(option.value)
                            ? "bg-red-50 text-red-600 font-semibold"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          handleOptionClick(option.value, option.label)
                        }
                      >
                        {option.label}
                      </div>
                    ))
                  : !searchQuery && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No options found
                      </div>
                    )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchableSelect;
