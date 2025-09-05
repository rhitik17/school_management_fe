import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/post/CommonTable";
import { deleteClassTeacher, listClassTeacher } from "../../services/endpoints/classTeacherApi";



export default function ListClassTeacher() {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listClassTeacher();
      setData(res.data.results || []);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/class-teacher/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClassTeacher( id);
      // Refetch data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Define table columns based on postType
  const columns = [
    { key: "id", label: "ID" },
    {
      key: "title",
      label: "Title",
      render: (item: any) =>
         item.name || "-",
    },
  
  ];

  return (
    <CommonTable
      title={"Class Teacher"}
      data={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
      onAdd={() => navigate(`/assign-class-teacher`)}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
