import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SchoolFields from "../../components/postFields/SchoolFields";
import SessionFields from "../../components/postFields/SessionFields";
import SectionFields from "../../components/postFields/SectionFields";
import ClassFields from "../../components/postFields/ClassFields";
import EmployeeFields from "../../components/postFields/EmployeeFields";
import StudentFields from "../../components/postFields/StudentFields";
import SubjectFields from "../../components/postFields/SubjectFields";
import SubjectGroupFields from "../../components/postFields/subjectGroupFields";
import ClassTeacherFields from "../../components/postFields/ClassTeacherFields";

import {
  createPost,
  editPost,
  singlePost,
} from "../../services/endpoints/postApi";
import { createStudent } from "../../services/endpoints/studentApi";
import { getPostTitle, PostType } from "../../types/postType";
import CommonPostForm from "../../components/post/CommonPostForm";

interface AddPostProps {
  postType: PostType;
}

const AddPost: React.FC<AddPostProps> = ({ postType }) => {
  const [data, setData] = useState<any>();
  const [loadingPost, setLoadingPost] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single post data if editing
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoadingPost(true);
        const res = await singlePost(postType, Number(id));
        if (res?.data) setData(res.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.detail ||
            error?.message ||
            "An error occurred. Please try again."
        );
      } finally {
        setLoadingPost(false);
      }
    };
    fetchData();
  }, [id, postType]);

  // Determine default values for the form
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
      default:
        return {};
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    try {
      let res;
      if (id) {
        res = await editPost(postType, formData, Number(id));
        toast.success(
          res.message || `${getPostTitle(postType)} updated successfully`
        );
      } else {
        if (postType === "students") {
          res = await createStudent(formData);
        } else {
          res = await createPost(postType, formData);
        }
        toast.success(
          res.message || `${getPostTitle(postType)} added successfully`
        );
      }
      navigate(`/${postType}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail || error?.message || "An error occurred"
      );
    }
  };

  // Render fields dynamically based on post type
  const renderFields = (control: any, watch: any, setValue: any) => {
    switch (postType) {
      case "schools":
        return <SchoolFields control={control} />;
      case "academic-sessions":
        return (
          <SessionFields control={control} setValue={setValue} data={data} />
        );
      case "classes":
        return (
          <ClassFields control={control} setValue={setValue} data={data} />
        );
      case "sections":
        return (
          <SectionFields control={control} setValue={setValue} data={data} />
        );
      case "subjects":
        return (
          <SubjectFields control={control} setValue={setValue} data={data} />
        );
      case "subject-groups":
        return (
          <SubjectGroupFields
            control={control}
            watch={watch}
            setValue={setValue}
            data={data}
          />
        );
      case "class-teacher":
        return (
          <ClassTeacherFields
            control={control}
            watch={watch}
            setValue={setValue}
            data={data}
          />
        );
      case "employees":
        return (
          <EmployeeFields control={control} setValue={setValue} data={data} />
        );
      case "students":
        return (
          <StudentFields
            control={control}
            watch={watch}
            setValue={setValue}
            data={data}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CommonPostForm
      title={`${data ? "Edit" : "Add"} ${getPostTitle(postType)}`}
      defaultValues={data || getDefaultValues()}
      loading={loadingPost}
      onSubmit={handleSubmit}
      renderFields={renderFields}
      showFullWidth={["students", "employees"].includes(postType)}
    />
  );
};

export default AddPost;
