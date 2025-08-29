const SpinningLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative min-h-6 min-w-6 ${className}  flex items-center justify-center`}
    >
      {/* Outer Circle */}
      <div className="absolute inset-0 border-2 rounded-full "></div>

      {/* Animated Circle */}
      <div
        className="absolute inset-0 border-b-2 rounded-full border-b-primary-700 animate-spin"
        style={{
          animation: "spin 0.8s linear infinite",
        }}
      ></div>

      {/* Inner Circle */}
      <div
        className="absolute border border-gray-100 rounded-full inset-1 border-b-primary-700 animate-spin"
        style={{
          animation: "spin 1s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default SpinningLoader;

export const SpinningLoader2 = ({ className }: { className?: string }) => {
  return (
    <div className={`w-4 h-4 ${className} flex items-center justify-center`}>
      <svg
        className="w-full h-full mr-2 -ml-1 text-primary-700 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
