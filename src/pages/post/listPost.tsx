import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { Icons } from "../../assets/icons";
import { deletePost, listPost } from "../../services/endpoints/postApi";
import { useNavigate } from "react-router-dom";
import { getPostTitle, PostType } from "../../types/postType";
import Pagination from "../../components/common/Pagination";
import TableLoading from "../../components/common/loading/TableLoading";
import DeletePopup from "../../components/common/model/DeletePopup";
import { Section } from "../../types/commonTypes";

interface ListPostProps {
  postType: PostType;
}

interface PaginationProps {
  count: number;
  page: number;
  pages: number;
  previous: string;
  next: string;
  size: number;
}

export default function ListPost({ postType }: ListPostProps) {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    fetchData();
  }, [postType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listPost(`/${postType}`);
      setData(res.data.results || []);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    navigate(`/${postType}/${id}`);
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

  return (
    <div className="p-6">
      {/* Header with title and Add button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">
          {getPostTitle(postType)}
        </h1>
        <Button
          variant="primary"
          text={`Add ${getPostTitle(postType)}`}
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
              {postType === "classes" && (
                <th className="px-4 py-3 capitalize">Sections</th>
              )}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-6">
                  <div className="w-full h-20 flex items-center justify-center">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6">
                  <div className="w-full flex items-center justify-center text-gray-500">
                    No data found
                  </div>
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
                    {postType === "students"
                      ? item.full_name
                      : item.name || "-"}
                  </td>

                  {postType === "classes" && (
                    <td className="px-4 py-3">
                      {item.sections
                        ?.map((section: Section) => section.name)
                        .join(", ")}
                    </td>
                  )}

                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="view/edit"
                    >
                      <Icons.Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setOpenDeletePopup(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                      title="delete"
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
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          total={pagination?.size || 0}
          loading={loading}
        />
      </div>
      <DeletePopup
        open={openDeletePopup}
        handleClose={() => setOpenDeletePopup(false)}
        handleDelete={() => handleDelete(selectedItem?.id)}
        title={`Confirm Delete ${getPostTitle(postType)}`}
        deletingItem={
          postType === "students" ? selectedItem?.full_name : selectedItem?.name
        }
        description="This action cannot be undone."
        deleteButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
}
