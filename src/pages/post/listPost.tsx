import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { Icons } from "../../assets/icons";
import { listPost } from "../../services/endpoints/postApi";
import { useNavigate } from "react-router-dom";

interface ListPostProps {
  postType: "schools" | "sessions" | "sections";
}

export default function ListPost({ postType }: ListPostProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    fetchData();
  }, [postType]);

  const fetchData = async () => {
    try {
      const res = await listPost(`/${postType}`);
      setData(res.data || []);
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

  const handleDelete = (id: string) => {
    console.log("Delete", id);
    // Add your delete logic here
  };

  return (
    <div className="p-6">
      {/* Header with title and Add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold capitalize text-gray-800">
          {postType}
        </h1>
        <Button variant="primary" text={`Add ${postType}`}  action={()=>navigate(`/${postType}/add`)}/>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3 capitalize">
                Title
              </th>
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
                <td className="px-4 py-4 text-gray-500 italic" colSpan={3}>
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {postType === "schools" ? item.name : item.id|| "-"}
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
      </div>
    </div>
  );
}
