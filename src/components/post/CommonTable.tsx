import { useState } from "react";
import { Icons } from "../../assets/icons";
import Pagination from "../common/Pagination";
import TableLoading from "../common/loading/TableLoading";
import DeletePopup from "../common/model/DeletePopup";
import Button from "../common/Button";

interface PaginationProps {
  count: number;
  page: number;
  pages: number;
  previous: string;
  next: string;
  size: number;
}

interface Column<T> {
  key: keyof T | string; // key in data OR custom accessor
  label: string; // table header label
  render?: (item: T) => React.ReactNode; // optional custom renderer
}

interface CommonTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: PaginationProps;
  limit?: number;
  setLimit?: (val: number) => void;
  page?: number;
  setPage?: (val: number) => void;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CommonTable<T extends { id: string | number }>({
  title,
  data,
  columns,
  loading = false,
  pagination,
  limit = 10,
  setLimit,
  page = 1,
  setPage,
  onAdd,
  onEdit,
  onDelete,
}: CommonTableProps<T>) {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize">
          {title}
        </h1>
        {onAdd && (
          <Button
            variant="primary"
            text={`Add ${title}`}
            action={onAdd}
          />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="text-left text-gray-600 bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 capitalize">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-6">
                  <div className="w-full h-20 flex items-center justify-center">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-6">
                  <div className="w-full flex items-center justify-center text-gray-500">
                    No data found
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-4 py-3">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(String(item.id))}
                          className="text-blue-600 hover:text-blue-800"
                          title="view/edit"
                        >
                          <Icons.Eye size={18} />
                        </button>
                      )}
                      {onDelete && (
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
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {pagination && (
          <Pagination
            limit={limit}
            setLimit={setLimit!}
            page={page}
            setPage={setPage!}
            total={pagination?.size || 0}
            loading={loading}
          />
        )}
      </div>

      {/* Delete Popup */}
      {onDelete && (
        <DeletePopup
          open={openDeletePopup}
          handleClose={() => setOpenDeletePopup(false)}
          handleDelete={() => {
            if (selectedItem) onDelete(String(selectedItem.id));
            setOpenDeletePopup(false);
          }}
          title={`Confirm Delete ${title}`}
          deletingItem={(selectedItem as any)?.name || (selectedItem as any)?.full_name}
          description="This action cannot be undone."
          deleteButtonText="Delete"
          cancelButtonText="Cancel"
        />
      )}
    </div>
  );
}
