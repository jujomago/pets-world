export const CardsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-16 p-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="w-full bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="h-44 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
