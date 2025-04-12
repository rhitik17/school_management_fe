import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Button from "../../components/common/Button";
import SchoolFields from "../../components/post/SchoolFields";
import SessionFields from "../../components/post/SessionFields";
import SectionFields from "../../components/post/SectionFields";
import { createPost } from "../../services/endpoints/postApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type PostType = "schools" | "sessions" | "sections";

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
      case "sections":
        return <SectionFields control={control} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center  py-12 bg-white ">
      {/* header */}
      <div className="flex flex-col  w-full max-w-3xl  gap-8 ">
        <h1 className="text-xl font-semibold capitalize mb-4">
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
