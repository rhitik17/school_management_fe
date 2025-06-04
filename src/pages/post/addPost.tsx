import React from "react";
import { useForm, } from "react-hook-form";
import Button from "../../components/common/Button";
import SchoolFields from "../../components/post/SchoolFields";
import SessionFields from "../../components/post/SessionFields";
import SectionFields from "../../components/post/SectionFields";
import { createPost } from "../../services/endpoints/postApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import ClassFields from "../../components/post/ClassFields";
import { PostType } from "../../types/postType";
import EmployeeFields from "../../components/post/EmployeeFields";
import StudentFields from "../../components/post/StudentFields";
import SubjectFields from "../../components/post/SubjectFields";

interface AddPostProps {
  postType: PostType;
}

const AddPost: React.FC<AddPostProps> = ({ postType }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await createPost(`${postType}`, data);
      toast.success(res.message);
      navigate(`/${postType}`);
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.message);
    }
  };

  const renderFields = () => {
    switch (postType) {
      case "schools":
        return <SchoolFields control={control} />;
      case "sessions":
        return <SessionFields control={control} />;
      case "classes":
        return <ClassFields control={control} />;
      case "sections":
        return <SectionFields control={control} />;
      case "subjects":
        return <SubjectFields control={control} />;
      case "employees":
        return <EmployeeFields control={control} />;
      case "students":
        return <StudentFields control={control} />;
      default:
        return null;
    }
  };

  const showFull = ["students", "employees"];

  return (
    <div className="flex flex-col items-center w-full h-full py-12 bg-white ">
      {/* header */}
      <div onClick={() => navigate(-1)} className="w-full cursor-pointer ">
        <span className="flex items-center justify-center p-2 border border-gray-300 rounded-full w-fit hover:scale-110">
          <Icons.AngleLeft className="size-5" />
        </span>
      </div>
      <div
        className={`flex flex-col w-full gap-8 ${
          showFull.includes(postType) ? "px-12" : "max-w-3xl"
        }`}
      >
        <h1 className="mb-4 text-xl font-semibold capitalize">
          Add {postType}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {renderFields()}
          <Button
            type="submit"
            disable={isSubmitting}
            className="w-full"
            variant="primary"
            text={isSubmitting ? "Saving..." : `Add ${postType}`}
          />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
