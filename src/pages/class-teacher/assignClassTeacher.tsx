import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ClassTeacherFields from "../../components/postFields/ClassTeacherFields";
import CommonPostForm from "../../components/post/CommonPostForm";
import {
  assignClassTeacher,
  editClassTeacher,
  singleClassTeacher,
} from "../../services/endpoints/classTeacherApi";

const AssignClassTeacher = () => {
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
        const res = await singleClassTeacher(Number(id));
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
  }, [id]);

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    console.log(formData)
    try {
      let res;
      if (id) {
        res = await editClassTeacher(formData, Number(id));
        toast.success(res.message || `Class Teacher updated successfully`);
      } else {
        res = await assignClassTeacher(formData);

        toast.success(res.message || `Class Teacher added successfully`);
      }
      navigate(`/class-teachers`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail || error?.message || "An error occurred"
      );
    }
  };

  return (
    <CommonPostForm
     title={`${data ? "Edit" : "Add"} Class Teacher`}
      defaultValues={data}
      loading={loadingPost}
      onSubmit={handleSubmit}
      renderFields={(control, watch, setValue) => (
        <ClassTeacherFields
          control={control}
          watch={watch}
          setValue={setValue}
          data={data}
        />
      )}
      showFullWidth={true}
    />
  );
};

export default AssignClassTeacher;
