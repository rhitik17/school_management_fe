import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { Icons } from "../../assets/icons";
import { deletePost, listPost } from "../../services/endpoints/postApi";
import { useNavigate } from "react-router-dom";
import { PostType } from "../../types/postType";
import Pagination from "../../components/common/Pagination";

interface ListPostProps {
  postType: PostType;
}

interface PaginationProps {
  count:number;
  page:number;
  pages:number
  previous:string;
  next:string;
  size:number;
}

export default function ListPost({ postType }: ListPostProps) {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    fetchData();
  }, [postType]);

  const fetchData = async () => {
    try {
      const res = await listPost(`/${postType}`);
      setData(res.results || []);
      setPagination(res.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    // Add your navigation or modal logic here
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePost(postType, id);
      console.log(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  return (
    <div className="p-6">
      {/* Header with title and Add button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">
          {postType}
        </h1>
        <Button
          variant="primary"
          text={`Add ${postType}`}
          action={() => navigate(`/${postType}/add`)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="text-left text-gray-600 bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3 capitalize">Title</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td className="px-4 py-4" colSpan={3}>
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td className="px-4 py-4 italic text-gray-500" colSpan={3}>
                  No data found.
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr
                  key={index}
                  className="transition border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">
                    {postType === "schools" ? item.name : item.name || "-"}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Icons.Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Icons.Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
         limit = {limit}
  setLimit = {setLimit}
  page={page }
  setPage = {setPage}
  total = {pagination?.size || 0}
  loading= {loading}
        
        />
      </div>
    </div>
  );
}
