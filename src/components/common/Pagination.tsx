import { Icons } from "../../assets/icons";

type PaginationProps = {
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  total: number;
  loading: boolean;
  setPage: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  limit,
  setLimit,
  page,
  setPage,
  total,
  loading,
}) => {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="mt-4 flex justify-between items-center">
      {/* Items per page selector */}
      <div>
        Items Per Page:
        <select
          disabled={loading}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded-md ml-2"
        >
          {[10, 50, 100, 200, 500, 1000].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Display range of items */}
        <span className="text-gray-700">
          Start: {startItem} - End: {endItem}
        </span>

        {/* Previous button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={loading || page === 1}
          className="px-4 py-2 text-gray-700 rounded-lg disabled:opacity-50"
        >
          <Icons.AngleLeft />
        </button>

        {/* Next button */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={loading || page * limit >= total}
          className="px-4 py-2 text-gray-700 rounded-lg disabled:opacity-50"
        >
          <Icons.AngleLeft className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
