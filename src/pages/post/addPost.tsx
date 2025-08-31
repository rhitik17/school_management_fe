import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import SchoolFields from "../../components/post/SchoolFields";
import SessionFields from "../../components/post/SessionFields";
import SectionFields from "../../components/post/SectionFields";
import {
  createPost,
  editPost,
  singlePost,
} from "../../services/endpoints/postApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Icons } from "../../assets/icons";
import ClassFields from "../../components/post/ClassFields";
import { getPostTitle, PostType } from "../../types/postType";
import EmployeeFields from "../../components/post/EmployeeFields";
import StudentFields from "../../components/post/StudentFields";
import SubjectFields from "../../components/post/SubjectFields";
import SubjectGroupFields from "../../components/post/subjectGroupFields";
import { AnimatePresence } from "framer-motion";
import { FadeAnimation } from "../../utils/animation";
import SpinningLoader from "../../components/common/loading/SpinningLoader";
import { createStudent } from "../../services/endpoints/studentApi";

interface AddPostProps {
  postType: PostType;
}

const AddPost: React.FC<AddPostProps> = ({ postType }) => {
  const [data, setData] = useState();
  const [loadingPost, setLoadingPost] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // dynamic default values depending on postType
  const getDefaultValues = () => {
    switch (postType) {
      case "subject-groups":
        return {
          name: "",
          class_instance: undefined,
          description: "",
          section_ids: [],
          subject_teacher_mappings: [
            { subject: undefined, teacher: undefined },
          ],
        };
      case "classes":
        return { name: "", description: "", section_ids: [] };
      case "subjects":
        return { name: "", subject_type: undefined, subject_code: undefined };
      case "sections":
        return { name: "", description: "" };
      // add others as needed
      default:
        return {};
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: getDefaultValues(),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoadingPost(true);
          const res = await singlePost(postType, Number(id));
          if (res?.data) {
            setData(res?.data);
          }
        } catch (error: any) {
          console.error("Error:", error);
          const message =
            error?.response?.data?.detail ||
            error?.message ||
            "An error occurred. Please try again.";
          toast.error(message);
        } finally {
          setLoadingPost(false);
        }
      }
    };

    fetchData();
  }, [id, postType, reset]);

  const onSubmit = async (data?: any) => {
    try {
      let res;
      if (id) {
        res = await editPost(`${postType}`, data, Number(id));

        toast.success(
          res.message || `${getPostTitle(postType)} updated sucessfully`
        );
      } else {
        if (postType === "students") {
          res = await createStudent( data);
        } else {
          res = await createPost(`${postType}`, data);
        }
        toast.success(
          res.message || `${getPostTitle(postType)} added sucessfully`
        );
      }
      navigate(`/${postType}`);
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(message || error?.message);
    }
  };

  const renderFields = (data: any) => {
    switch (postType) {
      case "schools":
        return <SchoolFields control={control} />;
      case "academic-sessions":
        return (
          <SessionFields control={control} data={data} setValue={setValue} />
        );
      case "classes":
        return (
          <ClassFields control={control} data={data} setValue={setValue} />
        );
      case "sections":
        return (
          <SectionFields control={control} data={data} setValue={setValue} />
        );
      case "subjects":
        return (
          <SubjectFields control={control} data={data} setValue={setValue} />
        );
      case "subject-groups":
        return (
          <SubjectGroupFields
            control={control}
            watch={watch}
            data={data}
            setValue={setValue}
          />
        );
      case "employees":
        return (
          <EmployeeFields control={control} data={data} setValue={setValue} />
        );
      case "students":
        return (
          <StudentFields
            control={control}
            data={data}
            setValue={setValue}
            watch={watch}
          />
        );
      default:
        return null;
    }
  };

  const showFull = ["students", "employees", ""];

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
          {data ? "Edit" : "Add"} {getPostTitle(postType)}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <AnimatePresence>
            {loadingPost ? (
              <FadeAnimation className="h-full w-full flex items-center justify-center">
                <SpinningLoader className="h-16 w-16" />
              </FadeAnimation>
            ) : (
              <FadeAnimation>{renderFields(data)}</FadeAnimation>
            )}
          </AnimatePresence>
          <Button
            type="submit"
            disable={isSubmitting}
            className="w-full"
            variant="primary"
            text={
              isSubmitting ? (
                <>
                  Saving... <SpinningLoader />
                </>
              ) : (
                `${data ? "Update" : "Add"} ${getPostTitle(postType)}`
              )
            }
          />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
