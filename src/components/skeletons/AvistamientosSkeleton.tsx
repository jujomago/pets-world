export const AvistamientoSkeleton = () => {
  return (
    <div className="mx-4">
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-44 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse grid place-items-center">
          Avistamientos
        </div>

        <div className="p-4 space-y-3">
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
