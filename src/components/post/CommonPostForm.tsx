import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import Button from "../../components/common/Button";
import SpinningLoader from "../../components/common/loading/SpinningLoader";
import { FadeAnimation } from "../../utils/animation";
import { Icons } from "../../assets/icons";

interface CommonPostFormProps {
  title: string;
  defaultValues?: FieldValues;
  loading?: boolean;
  onSubmit: (data: any) => void | Promise<void>;
  renderFields: (control: any, watch?: any, setValue?: any) => React.ReactNode;
  showFullWidth?: boolean;
  isSubmitting?: boolean;
  backButton?: boolean;
}

const CommonPostForm: React.FC<CommonPostFormProps> = ({
  title,
  defaultValues = {},
  loading = false,
  onSubmit,
  renderFields,
  showFullWidth = false,
  isSubmitting = false,
  backButton = true,
}) => {
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues,
  });

  return (
    <div className="flex flex-col items-center w-full h-full py-12 bg-white">
      {backButton && (
        <div onClick={() => window.history.back()} className="w-full cursor-pointer mb-4">
          <span className="flex items-center justify-center p-2 border border-gray-300 rounded-full w-fit hover:scale-110">
            <Icons.AngleLeft className="size-5" />
          </span>
        </div>
      )}

      <div className={`flex flex-col w-full gap-8 ${showFullWidth ? "px-12" : "max-w-3xl"}`}>
        <h1 className="mb-4 text-xl font-semibold">{title}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence>
            {loading ? (
              <FadeAnimation className="h-full w-full flex items-center justify-center">
                <SpinningLoader className="h-16 w-16" />
              </FadeAnimation>
            ) : (
              <FadeAnimation>{renderFields(control, watch, setValue)}</FadeAnimation>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            disable={isSubmitting}
            className="w-full"
            variant="primary"
            text={isSubmitting ? (
              <>Saving... <SpinningLoader /></>
            ) : (
              title
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default CommonPostForm;
